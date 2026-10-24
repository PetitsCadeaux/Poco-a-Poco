import { useEffect, useState } from 'react'

const synth = typeof window !== 'undefined' ? window.speechSynthesis : null

export const speechSupported = Boolean(synth)

function voices() {
  return synth?.getVoices?.() || []
}

// Busca una voz instalada que coincida con el idioma (fr-FR, ko-KR, ja-JP, tr-TR).
export function findVoice(tts) {
  const base = tts.split('-')[0].toLowerCase()
  const list = voices()
  const exact = list.find((v) => v.lang.replace('_', '-').toLowerCase() === tts.toLowerCase())
  return exact || list.find((v) => v.lang.toLowerCase().startsWith(base)) || null
}

export function speak(text, tts, { rate = 0.9, onend } = {}) {
  if (!synth) return false
  synth.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = tts
  const voice = findVoice(tts)
  if (voice) utter.voice = voice
  utter.rate = rate
  const done = () => onend && onend()
  utter.onend = done
  utter.onerror = done
  synth.speak(utter)
  return true
}

export function stopSpeaking() {
  synth?.cancel?.()
}

// Las voces del navegador cargan de forma asíncrona: este hook avisa cuando están listas.
export function useVoiceCheck(tts) {
  const [, setTick] = useState(0)
  useEffect(() => {
    if (!synth) return undefined
    const bump = () => setTick((t) => t + 1)
    synth.addEventListener?.('voiceschanged', bump)
    return () => synth.removeEventListener?.('voiceschanged', bump)
  }, [])
  return { supported: speechSupported, hasVoice: Boolean(findVoice(tts)) }
}
