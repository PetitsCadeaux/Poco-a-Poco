import { Taegeuk } from './Flag.jsx'

// Fondo animado según la bandera o el tema de cada idioma. Es solo decoración: no recibe clics
// ni lo leen los lectores de pantalla.
const STAR = '0,-12 2.7,-3.7 11.4,-3.7 4.4,1.4 7,9.7 0,4.6 -7,9.7 -4.4,1.4 -11.4,-3.7 -2.7,-3.7'
const WIPHALA = ['#D8262C', '#F08A1C', '#FFD400', '#FFFFFF', '#2E9B3E', '#1F5FBF', '#7B3FA0']

const POSITIONS = [
  { x: '6%', s: 96, d: '0s', t: '26s' },
  { x: '19%', s: 54, d: '-9s', t: '21s' },
  { x: '34%', s: 40, d: '-4s', t: '19s' },
  { x: '58%', s: 70, d: '-13s', t: '24s' },
  { x: '76%', s: 112, d: '-6s', t: '28s' },
  { x: '90%', s: 48, d: '-16s', t: '20s' },
]

const BUBBLE_COLORS = {
  fr: ['#2447C9', '#E4323F', '#fff', '#2447C9', '#E4323F', '#fff'],
  pt: ['#0E8A43', '#FFD84D', '#1F4FA8', '#0E8A43', '#FFD84D', '#1F4FA8'],
}

const PETALS = Array.from({ length: 14 }, (_, i) => ({
  x: `${(i * 7.3 + 3) % 100}%`,
  d: `${-((i * 2.7) % 16)}s`,
  t: `${13 + ((i * 3) % 7)}s`,
  s: 0.8 + ((i * 5) % 6) / 10,
}))

const DROPS = Array.from({ length: 22 }, (_, i) => ({
  x: `${(i * 4.7 + 2) % 100}%`,
  d: `${-((i * 1.3) % 9)}s`,
  t: `${3.2 + ((i * 7) % 5) / 2}s`,
  h: 26 + ((i * 11) % 30),
}))

const SQUARES = Array.from({ length: 12 }, (_, i) => ({
  x: `${(i * 8.9 + 4) % 100}%`,
  s: 26 + ((i * 13) % 38),
  d: `${-((i * 3.1) % 22)}s`,
  t: `${20 + ((i * 5) % 12)}s`,
  c: WIPHALA[i % 7],
}))

const SYLLABLES = ['pa', 'pe', 'pi', 'po', 'pu', 'pa', 'pe', 'pi', 'po', 'pu']

const STARS = [
  { x: '12%', y: '18%', s: 0.9, d: '0s' },
  { x: '28%', y: '70%', s: 0.6, d: '-1.2s' },
  { x: '46%', y: '12%', s: 0.7, d: '-0.6s' },
  { x: '66%', y: '78%', s: 1.1, d: '-2s' },
  { x: '84%', y: '40%', s: 0.8, d: '-1.7s' },
  { x: '92%', y: '86%', s: 0.6, d: '-0.3s' },
]

function Rosette({ color, size, className }) {
  // Un mandala de petalos, inspirado en el ñandutí (el encaje paraguayo).
  return (
    <svg className={className} width={size} height={size} viewBox="-50 -50 100 100">
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse key={i} cx="0" cy="-30" rx="7" ry="17" transform={`rotate(${i * 30})`} fill={color} />
      ))}
      <circle r="14" fill={color} />
      <circle r="6" fill="#fff" />
    </svg>
  )
}

function Sun({ className }) {
  return (
    <svg className={className} width="380" height="380" viewBox="-50 -50 100 100">
      {Array.from({ length: 16 }, (_, i) => (
        <polygon key={i} points="-3.4,-30 3.4,-30 0,-47" transform={`rotate(${i * 22.5})`} fill="#C75A0C" />
      ))}
      <circle r="24" fill="#C75A0C" />
      <circle r="15" fill="#fff" opacity=".5" />
    </svg>
  )
}

export default function Backdrop({ lang }) {
  const colors = BUBBLE_COLORS[lang]
  return (
    <div className={`backdrop bd-${lang}`} aria-hidden="true">
      {colors &&
        POSITIONS.map((b, i) => (
          <span
            key={i}
            className={`bub${colors[i] === '#fff' ? ' ring' : ''}`}
            style={{ '--x': b.x, '--s': `${b.s}px`, '--d': b.d, '--t': b.t, '--c': colors[i] }}
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
            <span key={i} className="petal" style={{ '--x': p.x, '--d': p.d, '--t': p.t, '--k': p.s }} />
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

      {lang === 'eu' &&
        DROPS.map((d, i) => (
          <span key={i} className="drop" style={{ '--x': d.x, '--d': d.d, '--t': d.t, '--h': `${d.h}px` }} />
        ))}

      {lang === 'qu' && <Sun className="qu-sun spin" />}

      {lang === 'gn' && (
        <>
          <Rosette color="#1A6FB5" size={430} className="gn-big spin" />
          <Rosette color="#D52B1E" size={160} className="gn-small spin-rev" />
        </>
      )}

      {lang === 'ay' &&
        SQUARES.map((q, i) => (
          <span
            key={i}
            className="sq"
            style={{ '--x': q.x, '--s': `${q.s}px`, '--d': q.d, '--t': q.t, '--c': q.c }}
          />
        ))}

      {lang === 'gr' &&
        SYLLABLES.map((t, i) => (
          <span
            key={i}
            className="syl"
            style={{ '--x': `${(i * 10.3 + 3) % 96}%`, '--d': `${-((i * 3.7) % 20)}s`, '--t': `${18 + ((i * 3) % 9)}s` }}
          >
            {t}
          </span>
        ))}
    </div>
  )
}
