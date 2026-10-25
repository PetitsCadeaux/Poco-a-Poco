// Nivel general del jugador (suma los puntos de todos los idiomas) y cosas que se desbloquean.
export const MAX_LEVEL = 100
export const xpForLevel = (n) => 20 * (n - 1) ** 2

export const TITLES = [
  { min: 100, name: 'Maestro de idiomas' },
  { min: 50, name: 'Experto' },
  { min: 25, name: 'Aventurero' },
  { min: 10, name: 'Explorador' },
  { min: 1, name: 'Principiante' },
]

export const titleOf = (level) => TITLES.find((t) => level >= t.min).name

export function levelOf(totalXp = 0) {
  const level = Math.min(MAX_LEVEL, Math.floor(Math.sqrt(totalXp / 20)) + 1)
  const base = xpForLevel(level)
  const next = level < MAX_LEVEL ? xpForLevel(level + 1) : null
  return {
    level,
    title: titleOf(level),
    toNext: next ? next - totalXp : 0,
    pct: next ? Math.round(((totalXp - base) / (next - base)) * 100) : 100,
  }
}

export const totalXpOf = (xp = {}) => Object.values(xp).reduce((a, b) => a + (Number(b) || 0), 0)

// Ropa y accesorios que se desbloquean al subir de nivel.
export const GEAR = [
  { id: 'gafas', name: 'Gafas', level: 3, icon: '🕶️' },
  { id: 'bufanda', name: 'Bufanda', level: 5, icon: '🧣' },
  { id: 'capa', name: 'Capa de superhéroe', level: 10, icon: '🦸' },
  { id: 'antifaz', name: 'Antifaz', level: 15, icon: '🎭' },
  { id: 'corona', name: 'Corona', level: 25, icon: '👑' },
  { id: 'estrella', name: 'Estrella brillante', level: 50, icon: '🌟' },
  { id: 'medalla', name: 'Medalla de maestro', level: 100, icon: '🏅' },
]

export const PETS = [
  { id: 'pio', name: 'Pío', kind: 'El pollito' },
  { id: 'chispa', name: 'Chispa', kind: 'La perrita superheroína' },
]
