import { useContext } from 'react'
import { Taegeuk } from './Flag.jsx'
import { HeroContext } from '../lib/hero.js'

// "Pío", el pollito mascota. Cambia de accesorio según el idioma, parpadea y mueve el pico cuando suena el audio.
function Accessory({ lang }) {
  if (lang === 'fr') {
    return (
      <g>
        <ellipse cx="102" cy="56" rx="42" ry="13" fill="#2447C9" />
        <ellipse cx="94" cy="49" rx="31" ry="13" fill="#2F58E8" />
        <circle cx="110" cy="38" r="5" fill="#E4323F" />
      </g>
    )
  }
  if (lang === 'ko') {
    return (
      <g>
        <g transform="translate(100 154)">
          <circle r="15" fill="#fff" />
          <Taegeuk r={12} />
        </g>
        <path d="M84 56 q16 -16 32 0 q-16 8 -32 0z" fill="#CD2E3A" />
        <circle cx="100" cy="54" r="5" fill="#1B4FA8" />
      </g>
    )
  }
  if (lang === 'ja') {
    return (
      <g>
        <path d="M42 82 Q100 54 158 82 L158 95 Q100 68 42 95Z" fill="#fff" stroke="#E5E7EB" strokeWidth="1.5" />
        <circle cx="100" cy="76" r="8" fill="#C8102E" />
        <path d="M156 86 l26 4 l-24 12z M156 90 l22 -6 l-4 18z" fill="#fff" stroke="#E5E7EB" strokeWidth="1" />
      </g>
    )
  }
  if (lang === 'pt') {
    return (
      <g>
        <path d="M100 56 q-12 -26 -34 -20 q14 20 34 20z" fill="#0E8A43" />
        <path d="M100 56 q12 -26 34 -20 q-14 20 -34 20z" fill="#13A855" />
        <path d="M100 54 q-9 -22 0 -38 q9 16 0 38z" fill="#0E8A43" />
        <circle cx="100" cy="50" r="5" fill="#FFD84D" />
      </g>
    )
  }
  if (lang === 'eu') {
    return (
      <g>
        <ellipse cx="100" cy="58" rx="48" ry="12" fill="#B21E14" />
        <ellipse cx="98" cy="50" rx="35" ry="12" fill="#D52B1E" />
        <circle cx="98" cy="38" r="3.5" fill="#1C2040" />
      </g>
    )
  }
  if (lang === 'qu') {
    return (
      <g>
        <path d="M58 72 Q100 8 142 72Z" fill="#C75A0C" />
        <path d="M64 62 Q100 26 136 62" fill="none" stroke="#FFD84D" strokeWidth="6" />
        <path d="M60 72 q-12 18 -4 36 q12 2 14 -12z" fill="#F2A33A" />
        <path d="M140 72 q12 18 4 36 q-12 2 -14 -12z" fill="#F2A33A" />
        <circle cx="100" cy="24" r="8" fill="#7B3FA0" />
      </g>
    )
  }
  if (lang === 'gn') {
    return (
      <g>
        <path d="M100 56 V44" stroke="#3A9D4E" strokeWidth="4" strokeLinecap="round" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <ellipse key={i} cx="100" cy="26" rx="6" ry="13" transform={`rotate(${i * 60} 100 40)`} fill="#8E5BD0" />
        ))}
        <circle cx="100" cy="40" r="6" fill="#F4E04D" />
      </g>
    )
  }
  if (lang === 'ay') {
    return (
      <g>
        <ellipse cx="100" cy="60" rx="46" ry="9" fill="#4B2E1A" />
        <path d="M72 60 q0 -32 28 -32 q28 0 28 32z" fill="#6B4429" />
        <path d="M72 55 H128" stroke="#E7C27A" strokeWidth="5" />
      </g>
    )
  }
  if (lang === 'gr') {
    return (
      <g>
        <path d="M68 64 Q100 16 132 64Z" fill="#F6B40E" />
        <path d="M100 26 L100 64 M84 36 L88 64 M116 36 L112 64" stroke="#1274BD" strokeWidth="5" />
        <circle cx="100" cy="24" r="5" fill="#E4323F" />
        <g className="prop">
          <ellipse cx="100" cy="16" rx="22" ry="3.6" fill="#1274BD" />
        </g>
      </g>
    )
  }
  return (
    <g>
      <path d="M100 56 V38" stroke="#3A9D4E" strokeWidth="4" strokeLinecap="round" />
      <path d="M100 48 q-16 0 -18 -10 q12 -2 18 10z" fill="#3A9D4E" />
      <path d="M86 28 q-2 -20 14 -24 q16 4 14 24 q-14 10 -28 0z" fill="#E30A17" />
      <path d="M100 4 q-5 12 0 24 q5 -12 0 -24z" fill="#B80812" />
    </g>
  )
}

const GOLD = '#FFC928'
const STAR = '0,-12 2.7,-3.7 11.4,-3.7 4.4,1.4 7,9.7 0,4.6 -7,9.7 -4.4,1.4 -11.4,-3.7 -2.7,-3.7'
const acc = { fill: 'var(--acc)' }
const acc2 = { fill: 'var(--acc2)' }

// Lo que se ve detrás del cuerpo (la capa).
function GearBack({ worn }) {
  if (!worn.includes('capa')) return null
  return <path d="M46 118 Q12 170 32 194 Q100 178 168 194 Q188 170 154 118Z" style={acc2} stroke="rgba(0,0,0,.15)" strokeWidth="2" />
}

// Accesorios que se ponen sobre la cabeza y el cuerpo.
function GearFront({ worn }) {
  const has = (id) => worn.includes(id)
  return (
    <g>
      {has('capa') && (
        <g transform="translate(100 150) scale(.7)">
          <circle r="11" fill={GOLD} stroke="#fff" strokeWidth="2" />
          <polygon points={STAR} fill="#fff" transform="scale(.6)" />
        </g>
      )}
      {has('bufanda') && (
        <g>
          <path d="M44 142 Q100 172 156 142 L152 160 Q100 190 48 160Z" style={acc} />
          <path d="M128 168 l14 28 l-15 5 l-8 -26z" style={acc2} />
        </g>
      )}
      {has('antifaz') && (
        <path
          fillRule="evenodd"
          style={acc}
          d="M50 90 Q100 72 150 90 L148 110 Q126 118 108 106 Q100 102 92 106 Q74 118 52 110Z M67 98a11 11 0 1 0 22 0a11 11 0 1 0 -22 0z M111 98a11 11 0 1 0 22 0a11 11 0 1 0 -22 0z"
        />
      )}
      {has('gafas') && (
        <g fill="#fff" fillOpacity=".25" stroke="#1C2040" strokeWidth="4">
          <circle cx="78" cy="98" r="15" />
          <circle cx="122" cy="98" r="15" />
          <path d="M93 98h14" fill="none" />
        </g>
      )}
      {has('corona') && (
        <g>
          <path d="M68 62 L76 30 L90 50 L100 22 L110 50 L124 30 L132 62Z" fill={GOLD} stroke="#E0A200" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="100" cy="42" r="4" fill="#E4323F" />
          <circle cx="82" cy="52" r="3" fill="#2F58E8" />
          <circle cx="118" cy="52" r="3" fill="#2F58E8" />
        </g>
      )}
      {has('estrella') && (
        <g transform={`translate(100 ${has('corona') ? -2 : 8}) scale(1.5)`}>
          <circle r="16" fill={GOLD} opacity=".25" />
          <polygon points={STAR} fill={GOLD} stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
        </g>
      )}
      {has('medalla') && (
        <g transform="translate(100 172)">
          <path d="M-8 -14 L-2 0 L2 0 L8 -14Z" fill="#2447C9" />
          <circle r="11" fill={GOLD} stroke="#fff" strokeWidth="2" />
          <polygon points={STAR} fill="#fff" transform="scale(.6)" />
        </g>
      )}
    </g>
  )
}

function Chick({ lang, worn }) {
  return (
    <>
      <ellipse cx="80" cy="176" rx="15" ry="6" fill="#F59E0B" />
      <ellipse cx="122" cy="176" rx="15" ry="6" fill="#F59E0B" />
      <ellipse cx="100" cy="112" rx="64" ry="60" fill="#FFD84D" />
      <ellipse cx="100" cy="130" rx="40" ry="34" fill="#FFF1A8" />
      <g transform="rotate(-18 38 122)">
        <ellipse className="wing wing-l" cx="38" cy="122" rx="14" ry="25" fill="#F5C530" />
      </g>
      <g transform="rotate(18 162 122)">
        <ellipse className="wing wing-r" cx="162" cy="122" rx="14" ry="25" fill="#F5C530" />
      </g>
      <path d="M94 54 q4 -16 10 0 q6 -14 9 2" fill="none" stroke="#F5C530" strokeWidth="5" strokeLinecap="round" />
      <circle cx="62" cy="116" r="8" fill="#FF9AA8" opacity=".7" />
      <circle cx="138" cy="116" r="8" fill="#FF9AA8" opacity=".7" />
      <g className="eyes">
        <circle cx="78" cy="98" r="9" fill="#1C2040" />
        <circle cx="122" cy="98" r="9" fill="#1C2040" />
        <circle cx="81" cy="95" r="3" fill="#fff" />
        <circle cx="125" cy="95" r="3" fill="#fff" />
      </g>
      <g className="beak">
        <path d="M90 110 L110 110 L100 126Z" fill="#F97316" />
      </g>
      {!worn.includes('corona') && <Accessory lang={lang} />}
    </>
  )
}

// "Chispa", la perrita superheroína (diseño propio). Mueve la cola y saca la lengua al hablar.
function Pup({ lang, worn }) {
  return (
    <>
      <path className="wing wing-r" d="M158 150 q32 -4 28 -36" fill="none" stroke="#B97A3E" strokeWidth="10" strokeLinecap="round" />
      <ellipse cx="80" cy="176" rx="15" ry="6" fill="#E9CF9A" />
      <ellipse cx="122" cy="176" rx="15" ry="6" fill="#E9CF9A" />
      <ellipse cx="100" cy="112" rx="64" ry="60" fill="#F3DDB0" />
      <ellipse cx="100" cy="134" rx="40" ry="32" fill="#FFF6E0" />
      <path d="M46 70 Q18 80 28 126 Q52 132 60 98Z" fill="#B97A3E" />
      <path d="M154 70 Q182 80 172 126 Q148 132 140 98Z" fill="#B97A3E" />
      <polygon points={STAR} transform="translate(78 98) scale(1.9)" fill="#9A6330" opacity=".9" />
      <circle cx="62" cy="118" r="8" fill="#FF9AA8" opacity=".6" />
      <circle cx="138" cy="118" r="8" fill="#FF9AA8" opacity=".6" />
      <g className="eyes">
        <circle cx="78" cy="98" r="9" fill="#1C2040" />
        <circle cx="122" cy="98" r="9" fill="#1C2040" />
        <circle cx="81" cy="95" r="3" fill="#fff" />
        <circle cx="125" cy="95" r="3" fill="#fff" />
      </g>
      <ellipse cx="100" cy="124" rx="26" ry="19" fill="#FFF8E8" />
      <ellipse cx="100" cy="112" rx="9" ry="6.5" fill="#1C2040" />
      <path d="M100 118 v6 M88 124 q12 8 12 0 q0 8 12 0" fill="none" stroke="#1C2040" strokeWidth="3" strokeLinecap="round" />
      <g className="beak">
        <path d="M93 128 Q100 146 107 128Z" fill="#FF7D8E" />
      </g>
      {!worn.includes('corona') && !worn.includes('antifaz') && <Accessory lang={lang} />}
    </>
  )
}

export default function Mascot({ lang, talking = false, size = 200, pet: petOverride, worn: wornOverride }) {
  const hero = useContext(HeroContext)
  const pet = petOverride || hero.pet
  const worn = wornOverride || hero.worn
  const name = pet === 'chispa' ? 'Chispa, la perrita' : 'Pío, el pollito'
  return (
    <svg
      className={`mascot${talking ? ' talking' : ''}`}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      role="img"
      aria-label={name}
    >
      <g className="m-bob">
        <GearBack worn={worn} />
        {pet === 'chispa' ? <Pup lang={lang} worn={worn} /> : <Chick lang={lang} worn={worn} />}
        <GearFront worn={worn} />
      </g>
    </svg>
  )
}
