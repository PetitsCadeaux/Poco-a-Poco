import { useEffect, useRef, useState } from 'react'
import { LANGS } from '../data/content.js'
import { speak, stopSpeaking, useVoiceCheck } from '../lib/speech.js'
import { startRecording, playUrl, recordingSupported } from '../lib/recorder.js'
import { GRADES, previewLabel } from '../lib/srs.js'
import Waveform from './Waveform.jsx'
import Icon from './Icon.jsx'

const NORMAL_RATE = 0.9
const REQUEUE_LIMIT = 2

export default function Player({ queue, lang, progress, slowRate, streak, onRate, onExit }) {
  const meta = LANGS[lang]
  const [list, setList] = useState(queue)
  const [idx, setIdx] = useState(0)
  const [stage, setStage] = useState('listen')
  const [plays, setPlays] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [recUrl, setRecUrl] = useState(null)
  const [recording, setRecording] = useState(false)
  const [error, setError] = useState('')
  const recorderRef = useRef(null)
  const requeued = useRef({})
  const voice = useVoiceCheck(meta.tts)

  const finished = idx >= list.length
  const item = list[idx]

  const replaceRecording = (url) =>
    setRecUrl((old) => {
      if (old) URL.revokeObjectURL(old)
      return url
    })

  // Al cambiar de frase se reinicia todo.
  useEffect(() => {
    setStage('listen')
    setPlays(0)
    setPlaying(false)
    setError('')
    replaceRecording(null)
  }, [idx])

  // Al salir se corta cualquier audio o grabación en curso.
  useEffect(
    () => () => {
      stopSpeaking()
      recorderRef.current?.stop()
    },
    []
  )

  const listen = (slow = false) => {
    if (!item) return
    setError('')
    setPlaying(true)
    setPlays((p) => p + 1)
    const ok = speak(item.text, meta.tts, {
      rate: slow ? slowRate : NORMAL_RATE,
      onend: () => setPlaying(false),
    })
    if (!ok) {
      setPlaying(false)
      setError('Este navegador no puede reproducir voz. Probá con Chrome, Edge o Safari.')
    }
  }

  const toggleRecord = async () => {
    setError('')
    if (recording) {
      const url = await recorderRef.current.stop()
      recorderRef.current = null
      setRecording(false)
      replaceRecording(url)
      return
    }
    try {
      stopSpeaking()
      setPlaying(false)
      recorderRef.current = await startRecording({
        onTimeout: (url) => {
          recorderRef.current = null
          setRecording(false)
          replaceRecording(url)
        },
      })
      setRecording(true)
    } catch {
      setError('No pude usar el micrófono. Revisá el permiso del navegador para este sitio.')
    }
  }

  const compare = async () => {
    if (!recUrl) return
    setPlaying(true)
    await playUrl(recUrl)
    const ok = speak(item.text, meta.tts, { rate: NORMAL_RATE, onend: () => setPlaying(false) })
    if (!ok) setPlaying(false)
  }

  const grade = (value) => {
    stopSpeaking()
    onRate(item, value)
    const seen = requeued.current[item.id] || 0
    if (value === 0 && seen < REQUEUE_LIMIT) {
      requeued.current[item.id] = seen + 1
      setList((l) => [...l, item])
    }
    setIdx((i) => i + 1)
  }

  if (finished) {
    return (
      <div className="player" style={{ '--acc': meta.color }}>
        <section className="card done">
          <Waveform seed={`listo-${lang}`} />
          <h2>Sesión completa</h2>
          <p>
            Practicaste {queue.length} {queue.length === 1 ? 'frase' : 'frases'} de {meta.name.toLowerCase()}.
          </p>
          {streak > 0 && (
            <p className="muted">
              Llevás {streak} {streak === 1 ? 'día' : 'días'} seguidos.
            </p>
          )}
          <button className="primary" onClick={onExit}>
            Volver al inicio
          </button>
        </section>
      </div>
    )
  }

  return (
    <div className="player" style={{ '--acc': meta.color }}>
      <header className="player-top">
        <button className="icon-btn" onClick={onExit} aria-label="Salir de la sesión">
          <Icon name="close" />
        </button>
        <div
          className="bar"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={list.length}
          aria-valuenow={idx}
          aria-label="Avance de la sesión"
        >
          <span style={{ width: `${(idx / list.length) * 100}%` }} />
        </div>
        <span className="count">
          {idx + 1}/{list.length}
        </span>
      </header>

      {voice.supported && !voice.hasVoice && (
        <p className="notice">
          Tu dispositivo no tiene una voz de {meta.name.toLowerCase()} instalada, así que puede sonar mal o no
          sonar. Instalá una desde los ajustes de voz del sistema.
        </p>
      )}

      <section className="card">
        <Waveform seed={item.text} playing={playing} />

        {stage === 'listen' ? (
          <div className="stack">
            <h2>Escuchá sin leer</h2>
            <p className="muted">Escuchá la frase 3 veces y fijate en la melodía antes de ver el texto.</p>
            <div className="dots" role="img" aria-label={`${Math.min(plays, 3)} de 3 escuchas`}>
              {[0, 1, 2].map((i) => (
                <span key={i} className={i < plays ? 'on' : ''} />
              ))}
            </div>
            <div className="row">
              <button className="play" onClick={() => listen(false)}>
                <Icon name="play" /> Escuchar
              </button>
              <button className="tonal" onClick={() => listen(true)}>
                Lento
              </button>
            </div>
            <button className={plays >= 3 ? 'primary wide' : 'link'} onClick={() => setStage('repeat')}>
              Ver el texto
            </button>
          </div>
        ) : (
          <div className="stack">
            <p className="target" lang={meta.tts}>
              {item.text}
            </p>
            <p className="pron">{item.pron}</p>
            <p className="es">{item.es}</p>
            <p className="muted small">Repetila en voz alta. Después grabate y compará con el original.</p>
            <div className="row wrap">
              <button className="play" onClick={() => listen(false)}>
                <Icon name="play" /> Escuchar
              </button>
              <button className="tonal" onClick={() => listen(true)}>
                Lento
              </button>
              {recordingSupported && (
                <button
                  className={`tonal${recording ? ' rec' : ''}`}
                  onClick={toggleRecord}
                  aria-pressed={recording}
                >
                  <Icon name={recording ? 'stop' : 'mic'} size={20} /> {recording ? 'Detener' : 'Grabar'}
                </button>
              )}
              {recUrl && (
                <button className="tonal" onClick={compare}>
                  <Icon name="compare" size={20} /> Comparar
                </button>
              )}
            </div>
          </div>
        )}
      </section>

      {error && (
        <p className="notice err" role="alert">
          {error}
        </p>
      )}

      {stage === 'repeat' && (
        <div className="grades" role="group" aria-label="¿Qué tan bien te salió?">
          {GRADES.map((g) => (
            <button key={g.value} onClick={() => grade(g.value)}>
              <strong>{g.label}</strong>
              <small>{previewLabel(progress[item.id], g.value)}</small>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
