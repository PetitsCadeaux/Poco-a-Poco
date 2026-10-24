import { useMemo } from 'react'

// Barras de sonido con una forma que depende del texto (siempre la misma para la misma frase).
// Se pintan con el color del idioma mientras suena el audio.
function shape(seed, bars) {
  let h = 0
  for (const ch of seed) h = (h * 31 + ch.codePointAt(0)) >>> 0
  return Array.from({ length: bars }, (_, i) => {
    h = (Math.imul(h, 1664525) + 1013904223) >>> 0
    const envelope = 0.3 + 0.7 * Math.sin((Math.PI * (i + 0.5)) / bars)
    return Math.round((18 + (h % 82)) * envelope)
  })
}

export default function Waveform({ seed, playing = false, bars = 34 }) {
  const heights = useMemo(() => shape(seed, bars), [seed, bars])
  return (
    <div className={`wave${playing ? ' playing' : ''}`} aria-hidden="true">
      {heights.map((h, i) => (
        <span key={i} style={{ '--h': h, '--i': i }} />
      ))}
    </div>
  )
}
