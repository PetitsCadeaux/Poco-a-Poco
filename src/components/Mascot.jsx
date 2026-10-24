import { Taegeuk } from './Flag.jsx'

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

export default function Mascot({ lang, talking = false, size = 200 }) {
  return (
    <svg
      className={`mascot${talking ? ' talking' : ''}`}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      role="img"
      aria-label="Pío, el pollito"
    >
      <g className="m-bob">
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
        <Accessory lang={lang} />
      </g>
    </svg>
  )
}
