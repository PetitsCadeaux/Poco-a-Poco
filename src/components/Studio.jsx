import { useCallback, useEffect, useRef, useState } from 'react'
import { LANGS, LANG_ORDER, itemsOf } from '../data/content.js'
import { recordingSupported, startRecordingBlob } from '../lib/recorder.js'
import { buildZip, deleteClip, getClips, saveClip } from '../lib/voicebank.js'
import Flag from './Flag.jsx'
import Icon from './Icon.jsx'

const NAME_KEY = 'linguastar:speaker'
const readName = () => {
  try {
    return localStorage.getItem(NAME_KEY) || ''
  } catch {
    return ''
  }
}

// Estudio para que un hablante nativo grabe las frases con su propia voz.
export default function Studio({ lang: initial, onBack }) {
  const [lang, setLang] = useState(initial)
  const [speaker, setSpeaker] = useState(readName)
  const [clips, setClips] = useState({}) // id -> clip
  const [idx, setIdx] = useState(0)
  const [recording, setRecording] = useState(false)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const recRef = useRef(null)
  const audioRef = useRef(null)

  const items = itemsOf(lang)
  const item = items[idx]
  const meta = LANGS[lang]
  const done = items.filter((i) => clips[i.id]).length

  const refresh = useCallback(async () => {
    try {
      const list = await getClips(lang)
      setClips(Object.fromEntries(list.map((c) => [c.id, c])))
    } catch {
      setMessage('Este navegador no deja guardar grabaciones (¿modo privado?). Probá en una ventana normal.')
    }
  }, [lang])

  useEffect(() => {
    setIdx(0)
    setClips({})
    refresh()
  }, [refresh])

  useEffect(
    () => () => {
      recRef.current?.stop()
      audioRef.current?.pause()
    },
    []
  )

  const changeName = (v) => {
    setSpeaker(v)
    try {
      localStorage.setItem(NAME_KEY, v)
    } catch {
      /* sin almacenamiento: queda solo en pantalla */
    }
  }

  const save = async ({ blob, mime }) => {
    await saveClip(lang, item.id, blob, mime)
    await refresh()
  }

  const toggle = async () => {
    setMessage('')
    if (recording) {
      const result = await recRef.current.stop()
      recRef.current = null
      setRecording(false)
      await save(result)
      return
    }
    try {
      audioRef.current?.pause()
      recRef.current = await startRecordingBlob({
        onTimeout: async (result) => {
          recRef.current = null
          setRecording(false)
          await save(result)
        },
      })
      setRecording(true)
    } catch {
      setMessage('No pude usar el micrófono. Revisá el permiso del navegador para este sitio.')
    }
  }

  const play = () => {
    const c = clips[item.id]
    if (!c) return
    audioRef.current?.pause()
    const url = URL.createObjectURL(c.blob)
    const a = new Audio(url)
    a.onended = () => URL.revokeObjectURL(url)
    audioRef.current = a
    a.play().catch(() => {})
  }

  const remove = async () => {
    await deleteClip(lang, item.id)
    await refresh()
  }

  const download = async () => {
    setBusy(true)
    setMessage('')
    try {
      const { blob, count } = await buildZip(lang, speaker.trim())
      if (count === 0) {
        setMessage('Todavía no hay grabaciones de este idioma.')
      } else {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `linguastar-audio-${lang}.zip`
        document.body.appendChild(a)
        a.click()
        a.remove()
        setTimeout(() => URL.revokeObjectURL(url), 10000)
        setMessage(`Listo: se descargó un ZIP con ${count} ${count === 1 ? 'audio' : 'audios'}.`)
      }
    } catch {
      setMessage('No pude armar el ZIP. Probá de nuevo.')
    }
    setBusy(false)
  }

  return (
    <section className="list studio">
      <button className="link" onClick={onBack}>
        ← Volver
      </button>
      <h1>Estudio de voces</h1>
      <p className="muted">
        Para hablantes nativos: grabá cada frase con tu voz. Después la app la va a usar en lugar de la voz del
        dispositivo.
      </p>

      <article className="card">
        <div className="field">
          <label htmlFor="st-lang">Idioma</label>
          <select id="st-lang" value={lang} onChange={(e) => setLang(e.target.value)}>
            {LANG_ORDER.map((c) => (
              <option key={c} value={c}>
                {LANGS[c].name}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="st-name">Tu nombre (se muestra como “Voz de …”)</label>
          <input id="st-name" type="text" value={speaker} maxLength={40} onChange={(e) => changeName(e.target.value)} placeholder="Ej.: María" />
        </div>
        <p className="muted small">
          {done} de {items.length} frases grabadas.
        </p>
        <div className="meter" role="progressbar" aria-valuemin={0} aria-valuemax={items.length} aria-valuenow={done} aria-label="Frases grabadas">
          <span style={{ width: `${(done / items.length) * 100}%` }} />
        </div>
      </article>

      {!recordingSupported ? (
        <p className="notice err">Este navegador no puede grabar. Probá con Chrome, Edge o Safari actualizados.</p>
      ) : (
        <article className="card studio-card" style={{ '--c': meta.color }}>
          <div className="studio-top">
            <Flag lang={lang} width={34} />
            <span className="muted small">
              Frase {idx + 1} de {items.length} {clips[item.id] ? '· ✅ grabada' : ''}
            </span>
          </div>
          <p className="target" lang={meta.html}>
            {item.text}
          </p>
          <p className="pron">{item.pron}</p>
          <p className="es">{item.es}</p>
          <p className="muted small">Leéla con naturalidad, a velocidad normal. Si te equivocás, grabá de nuevo.</p>
          <div className="row wrap">
            <button className={`tonal${recording ? ' rec' : ''}`} onClick={toggle} aria-pressed={recording}>
              <Icon name={recording ? 'stop' : 'mic'} size={20} /> {recording ? 'Detener' : clips[item.id] ? 'Grabar de nuevo' : 'Grabar'}
            </button>
            {clips[item.id] && !recording && (
              <>
                <button className="play" onClick={play}>
                  <Icon name="play" /> Escuchar
                </button>
                <button className="link" onClick={remove}>
                  Borrar
                </button>
              </>
            )}
          </div>
          <div className="row wrap studio-nav">
            <button className="tonal" disabled={idx === 0 || recording} onClick={() => setIdx(idx - 1)}>
              ← Anterior
            </button>
            <button className="primary" disabled={idx >= items.length - 1 || recording} onClick={() => setIdx(idx + 1)}>
              Siguiente →
            </button>
          </div>
        </article>
      )}

      {message && <p className="notice info" role="status">{message}</p>}

      <article className="card">
        <h2>Entregar las grabaciones</h2>
        <p className="muted small">
          Las grabaciones quedan guardadas en este dispositivo. Cuando termines (aunque sea una parte), descargá el
          ZIP y pasáselo a quien administra la app para que lo suba.
        </p>
        <button className="primary" onClick={download} disabled={busy || done === 0}>
          Descargar ZIP ({done})
        </button>
      </article>
    </section>
  )
}
