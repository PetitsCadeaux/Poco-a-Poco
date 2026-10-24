import { useState } from 'react'
import { geringoso, geringosoSyllables } from '../lib/geringoso.js'
import { speak } from '../lib/speech.js'
import Icon from './Icon.jsx'

// Juego: escribís una palabra o una frase y la ves (y la escuchás) en geringoso.
export default function GeringosoToy({ voiceName }) {
  const [text, setText] = useState('')
  const trimmed = text.trim()
  const out = trimmed ? geringoso(trimmed) : ''
  const syl = trimmed ? geringosoSyllables(trimmed).toLowerCase() : ''

  return (
    <article className="card toy">
      <h2>Traductor de geringoso</h2>
      <label className="muted small" htmlFor="gr-input">
        Escribí una palabra o una frase en castellano.
      </label>
      <input
        id="gr-input"
        type="text"
        value={text}
        maxLength={60}
        autoComplete="off"
        placeholder="Por ejemplo: mi perro"
        onChange={(e) => setText(e.target.value)}
      />
      <div className="toy-out" aria-live="polite">
        {out ? (
          <>
            <p className="big">{out}</p>
            <p className="syl-line">{syl}</p>
          </>
        ) : (
          <p className="muted">Acá aparece en geringoso.</p>
        )}
      </div>
      <button
        className="play"
        disabled={!out}
        onClick={() => speak(out, 'es-AR', { rate: 0.85, voiceName })}
      >
        <Icon name="play" /> Escuchar
      </button>
    </article>
  )
}
