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

const WIPHALA = ['#D8262C', '#F08A1C', '#FFD400', '#FFFFFF', '#2E9B3E', '#1F5FBF', '#7B3FA0']

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
        {lang === 'pt' && (
          <>
            <rect width="36" height="24" fill="#009C3B" />
            <polygon points="18,3 33,12 18,21 3,12" fill="#FFDF00" />
            <circle cx="18" cy="12" r="5.2" fill="#002776" />
            <path d="M13.2 11.2 Q18 9.6 22.8 12.4" stroke="#fff" strokeWidth="1" fill="none" />
          </>
        )}
        {lang === 'eu' && (
          <>
            <rect width="36" height="24" fill="#D52B1E" />
            <path d="M0 0 L36 24 M36 0 L0 24" stroke="#009B48" strokeWidth="3.4" />
            <rect y="10" width="36" height="4" fill="#fff" />
            <rect x="16" width="4" height="24" fill="#fff" />
          </>
        )}
        {lang === 'gn' && (
          <>
            <rect width="36" height="8" fill="#D52B1E" />
            <rect y="8" width="36" height="8" fill="#fff" />
            <rect y="16" width="36" height="8" fill="#0038A8" />
            <circle cx="18" cy="12" r="3" fill="none" stroke="#2E7D32" strokeWidth="1" />
            <circle cx="18" cy="12" r="1" fill="#F4C20D" />
          </>
        )}
        {lang === 'qu' &&
          WIPHALA.map((c, i) => <rect key={c} y={(i * 24) / 7} width="36" height={24 / 7 + 0.2} fill={c} />)}
        {lang === 'ay' &&
          Array.from({ length: 49 }, (_, n) => {
            const r = Math.floor(n / 7)
            const c = n % 7
            return (
              <rect
                key={n}
                x={(c * 36) / 7}
                y={(r * 24) / 7}
                width={36 / 7 + 0.2}
                height={24 / 7 + 0.2}
                fill={WIPHALA[(c - r + 7) % 7]}
              />
            )
          })}
        {lang === 'gr' && (
          <>
            <rect width="36" height="24" fill="#74ACDF" />
            <rect y="8" width="36" height="8" fill="#fff" />
            <circle cx="18" cy="12" r="2.8" fill="#F6B40E" />
          </>
        )}
        <rect width="36" height="24" rx="3.5" fill="none" stroke="rgba(0,0,0,.18)" />
      </g>
    </svg>
  )
}
