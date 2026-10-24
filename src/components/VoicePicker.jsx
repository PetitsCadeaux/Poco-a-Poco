import { LANGS, itemsOf } from '../data/content.js'
import { findVoice, speak, useVoiceCheck } from '../lib/speech.js'

// Permite elegir y probar la voz de cada idioma (las voces dependen del dispositivo).
export default function VoicePicker({ lang, voiceName, onChange }) {
  const meta = LANGS[lang]
  const { voices } = useVoiceCheck(meta.tts, voiceName)
  const current = findVoice(meta.tts, voiceName)
  const sample = itemsOf(lang)[0].text

  return (
    <div className="field voice">
      <label htmlFor={`voice-${lang}`}>{meta.name}</label>
      {voices.length === 0 ? (
        <p className="muted small">No hay voces instaladas en este dispositivo.</p>
      ) : (
        <div className="voice-row">
          <select
            id={`voice-${lang}`}
            value={current ? current.name : ''}
            onChange={(e) => onChange(e.target.value)}
          >
            {voices.map((v) => (
              <option key={v.name} value={v.name}>
                {v.name}
              </option>
            ))}
          </select>
          <button className="tonal" onClick={() => speak(sample, meta.tts, { voiceName: current?.name })}>
            Probar
          </button>
        </div>
      )}
    </div>
  )
}
