// Banderas dibujadas a mano en SVG (no dependen de emojis, que en Windows se ven como letras).
const STAR = '0,-12 2.7,-3.7 11.4,-3.7 4.4,1.4 7,9.7 0,4.6 -7,9.7 -4.4,1.4 -11.4,-3.7 -2.7,-3.7'

export function Taegeuk({ r = 40 }) {
  const k = r / 40
  return (
    <g transform={`scale(${k})`}>
      <circle r="40" fill="#1B4FA8" />
      <path d="M-40 0 A40 40 0 0 1 40 0 A20 20 0 0 1 0 0 A20 20 0 0 0 -40 0Z" fill="#CD2E3A" />
    </g>
  )
}

export default function Flag({ lang, width = 36 }) {
  const height = (width * 24) / 36
  return (
    <svg
      className="flag"
      width={width}
      height={height}
      viewBox="0 0 36 24"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <clipPath id={`clip-${lang}`}>
        <rect width="36" height="24" rx="3.5" />
      </clipPath>
      <g clipPath={`url(#clip-${lang})`}>
        {lang === 'fr' && (
          <>
            <rect width="12" height="24" fill="#2447C9" />
            <rect x="12" width="12" height="24" fill="#fff" />
            <rect x="24" width="12" height="24" fill="#E4323F" />
          </>
        )}
        {lang === 'ko' && (
          <>
            <rect width="36" height="24" fill="#fff" />
            <g transform="translate(18 12)">
              <Taegeuk r={6.5} />
            </g>
            <g fill="#111">
              <rect x="4" y="3" width="6" height="1.2" />
              <rect x="4" y="5" width="6" height="1.2" />
              <rect x="26" y="18" width="6" height="1.2" />
              <rect x="26" y="20" width="6" height="1.2" />
            </g>
          </>
        )}
        {lang === 'ja' && (
          <>
            <rect width="36" height="24" fill="#fff" />
            <circle cx="18" cy="12" r="7" fill="#C8102E" />
          </>
        )}
        {lang === 'tr' && (
          <>
            <rect width="36" height="24" fill="#E30A17" />
            <circle cx="14" cy="12" r="6.5" fill="#fff" />
            <circle cx="15.8" cy="12" r="5.2" fill="#E30A17" />
            <polygon points={STAR} fill="#fff" transform="translate(21 12) scale(.46)" />
          </>
        )}
        <rect width="36" height="24" rx="3.5" fill="none" stroke="rgba(0,0,0,.18)" />
      </g>
    </svg>
  )
}
