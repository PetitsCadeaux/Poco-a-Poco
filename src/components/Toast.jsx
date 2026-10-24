// Aviso que aparece unos segundos cuando se cumple una misión o se sube de rango.
export default function Toast({ claim }) {
  if (!claim || Date.now() - claim.at > 5000) return null
  return (
    <div className="toast" key={claim.at} role="status">
      <span aria-hidden="true">{claim.rank ? '🏅' : '⭐'}</span> {claim.text}
    </div>
  )
}
