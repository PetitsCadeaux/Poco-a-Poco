import { Taegeuk } from './Flag.jsx'

// Fondo animado según la bandera de cada idioma. Es solo decoración: no recibe clics ni lo leen los lectores de pantalla.
const STAR = '0,-12 2.7,-3.7 11.4,-3.7 4.4,1.4 7,9.7 0,4.6 -7,9.7 -4.4,1.4 -11.4,-3.7 -2.7,-3.7'

const BUBBLES = [
  { x: '6%', s: 96, d: '0s', t: '26s', c: '#2447C9' },
  { x: '19%', s: 54, d: '-9s', t: '21s', c: '#E4323F' },
  { x: '34%', s: 40, d: '-4s', t: '19s', c: '#fff', ring: true },
  { x: '58%', s: 70, d: '-13s', t: '24s', c: '#2447C9' },
  { x: '76%', s: 112, d: '-6s', t: '28s', c: '#E4323F' },
  { x: '90%', s: 48, d: '-16s', t: '20s', c: '#fff', ring: true },
]

const PETALS = Array.from({ length: 14 }, (_, i) => ({
  x: `${(i * 7.3 + 3) % 100}%`,
  d: `${-((i * 2.7) % 16)}s`,
  t: `${13 + ((i * 3) % 7)}s`,
  s: 0.8 + ((i * 5) % 6) / 10,
}))

const STARS = [
  { x: '12%', y: '18%', s: 0.9, d: '0s' },
  { x: '28%', y: '70%', s: 0.6, d: '-1.2s' },
  { x: '46%', y: '12%', s: 0.7, d: '-0.6s' },
  { x: '66%', y: '78%', s: 1.1, d: '-2s' },
  { x: '84%', y: '40%', s: 0.8, d: '-1.7s' },
  { x: '92%', y: '86%', s: 0.6, d: '-0.3s' },
]

export default function Backdrop({ lang }) {
  return (
    <div className={`backdrop bd-${lang}`} aria-hidden="true">
      {lang === 'fr' &&
        BUBBLES.map((b, i) => (
          <span
            key={i}
            className={`bub${b.ring ? ' ring' : ''}`}
            style={{ '--x': b.x, '--s': `${b.s}px`, '--d': b.d, '--t': b.t, '--c': b.c }}
          />
        ))}

      {lang === 'ko' && (
        <>
          <svg className="ko-big spin" width="420" height="420" viewBox="-44 -44 88 88">
            <Taegeuk r={40} />
          </svg>
          <svg className="ko-small spin-rev" width="150" height="150" viewBox="-44 -44 88 88">
            <Taegeuk r={40} />
          </svg>
        </>
      )}

      {lang === 'ja' && (
        <>
          <span className="sun" />
          {PETALS.map((p, i) => (
            <span
              key={i}
              className="petal"
              style={{ '--x': p.x, '--d': p.d, '--t': p.t, '--k': p.s }}
            />
          ))}
        </>
      )}

      {lang === 'tr' && (
        <>
          <svg className="tr-moon" width="380" height="380" viewBox="-44 -44 88 88">
            <mask id="moon-mask">
              <rect x="-44" y="-44" width="88" height="88" fill="#fff" />
              <circle cx="14" cy="0" r="32" fill="#000" />
            </mask>
            <circle r="40" fill="#D20F23" mask="url(#moon-mask)" />
          </svg>
          {STARS.map((s, i) => (
            <svg
              key={i}
              className="tr-star"
              style={{ left: s.x, top: s.y, '--k': s.s, '--d': s.d }}
              width="40"
              height="40"
              viewBox="-14 -14 28 28"
            >
              <polygon points={STAR} fill="#D20F23" />
            </svg>
          ))}
        </>
      )}
    </div>
  )
}
