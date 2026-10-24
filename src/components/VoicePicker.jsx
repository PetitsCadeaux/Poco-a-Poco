import { findVoice, speak, useVoiceCheck } from '../lib/speech.js'

// Permite elegir y probar la voz de cada grupo de idiomas (las voces dependen del dispositivo).
export default function VoicePicker({ group, voiceName, onChange }) {
  const { voices } = useVoiceCheck(group.tts, voiceName)
  const current = findVoice(group.tts, voiceName)

  return (
    <div className="field voice">
      <label htmlFor={`voice-${group.key}`}>{group.label}</label>
      {voices.length === 0 ? (
        <p className="muted small">No hay voces instaladas en este dispositivo.</p>
      ) : (
        <div className="voice-row">
          <select
            id={`voice-${group.key}`}
            value={current ? current.name : ''}
            onChange={(e) => onChange(e.target.value)}
          >
            {voices.map((v) => (
              <option key={v.name} value={v.name}>
                {v.name}
              </option>
            ))}
          </select>
          <button className="tonal" onClick={() => speak(group.sample, group.tts, { voiceName: current?.name })}>
            Probar
          </button>
        </div>
      )}
    </div>
  )
}
