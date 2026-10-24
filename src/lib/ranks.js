// Rangos por idioma: se ganan puntos (XP) practicando y cumpliendo misiones.
export const XP_PHRASE = 10
export const XP_BONUS = 5

export const RANKS = [
  { id: 'bronce', name: 'Bronce', min: 0, color: '#C9803A', shine: '#F2B777' },
  { id: 'plata', name: 'Plata', min: 150, color: '#A9B2C3', shine: '#E8ECF4' },
  { id: 'oro', name: 'Oro', min: 400, color: '#F2B91B', shine: '#FFE48A' },
  { id: 'platino', name: 'Platino', min: 800, color: '#4FC3CB', shine: '#B8F0F2' },
  { id: 'diamante', name: 'Diamante', min: 1500, color: '#5E9BFF', shine: '#CFE2FF' },
]

export function rankOf(xp = 0) {
  let current = RANKS[0]
  for (const r of RANKS) if (xp >= r.min) current = r
  const next = RANKS[RANKS.indexOf(current) + 1] || null
  const pct = next ? Math.round(((xp - current.min) / (next.min - current.min)) * 100) : 100
  return { rank: current, next, pct, toNext: next ? next.min - xp : 0 }
}
