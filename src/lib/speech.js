import { useEffect, useState } from 'react'

const synth = typeof window !== 'undefined' ? window.speechSynthesis : null

export const speechSupported = Boolean(synth)

function voices() {
  return synth?.getVoices?.() || []
}

const normLang = (l) => l.replace('_', '-').toLowerCase()

// Puntaje de calidad: las voces "naturales/neuronales" y las de Google suenan mucho mejor que las básicas.
function score(voice, tts) {
  let s = 0
  if (/natural|neural|online/i.test(voice.name)) s += 10
  if (/google/i.test(voice.name)) s += 6
  if (/premium|enhanced|siri/i.test(voice.name)) s += 5
  if (normLang(voice.lang) === tts.toLowerCase()) s += 3
  if (!voice.localService) s += 1
  return s
}

// Todas las voces instaladas para ese idioma, de mejor a peor.
export function listVoices(tts) {
  const base = tts.split('-')[0].toLowerCase()
  return voices()
    .filter((v) => normLang(v.lang).startsWith(base))
    .sort((a, b) => score(b, tts) - score(a, tts))
}

// Usa la voz elegida por la persona si existe; si no, la mejor disponible.
export function findVoice(tts, preferredName) {
  const list = listVoices(tts)
  if (preferredName) {
    const chosen = list.find((v) => v.name === preferredName)
    if (chosen) return chosen
  }
  return list[0] || null
}

export function speak(text, tts, { rate = 0.9, voiceName, onend, silentH = false, endMark = false } = {}) {
  if (!synth) return false
  synth.cancel()
  let said = text
  // En español la H es muda: se saca para que ninguna voz la pronuncie (la CH se conserva).
  if (silentH) said = said.replace(/(?<![cC])[hH]/g, '')
  // Una palabra suelta a veces sale cortada; un punto final hace que la voz la termine bien.
  if (endMark && !/[.!?¡¿]$/.test(said.trim())) said = `${said.trim()}.`
  const utter = new SpeechSynthesisUtterance(said)
  utter.lang = tts
  const voice = findVoice(tts, voiceName)
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
export function useVoiceCheck(tts, voiceName) {
  const [, setTick] = useState(0)
  useEffect(() => {
    if (!synth) return undefined
    const bump = () => setTick((t) => t + 1)
    synth.addEventListener?.('voiceschanged', bump)
    return () => synth.removeEventListener?.('voiceschanged', bump)
  }, [])
  return {
    supported: speechSupported,
    hasVoice: Boolean(findVoice(tts, voiceName)),
    voices: listVoices(tts),
  }
}
