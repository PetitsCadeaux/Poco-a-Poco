import { RANKS } from '../lib/ranks.js'

// Medalla dibujada en SVG con el color del rango.
export default function Medal({ rankId, size = 56 }) {
  const r = RANKS.find((x) => x.id === rankId) || RANKS[0]
  const n = RANKS.indexOf(r) + 1
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label={`Rango ${r.name}`} className="medal">
      <path d="M20 4h10l4 18-9 3z" fill="#E5484D" />
      <path d="M44 4H34l-4 18 9 3z" fill="#2447C9" />
      <circle cx="32" cy="38" r="22" fill={r.color} />
      <circle cx="32" cy="38" r="17" fill={r.shine} opacity="0.55" />
      <circle cx="32" cy="38" r="22" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" />
      <path
        d="M32 25l3.7 7.6 8.3 1.2-6 5.9 1.4 8.3L32 43.9l-7.4 3.9 1.4-8.3-6-5.9 8.3-1.2z"
        fill="#fff"
        fillOpacity="0.9"
      />
      <text x="32" y="60" textAnchor="middle" fontSize="0" aria-hidden="true">{n}</text>
    </svg>
  )
}
