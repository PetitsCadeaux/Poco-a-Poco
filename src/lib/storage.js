const KEY = 'poco-a-poco:v1'

export const DAILY_GOAL = 15

const defaults = {
  lang: 'fr',
  items: {}, // id -> { ease, interval, reps, due }
  days: {}, // 'YYYY-MM-DD' -> cantidad de frases practicadas
  settings: { newPerSession: 5, slowRate: 0.6, voices: {} },
  xp: {}, // puntos por idioma
  daily: { date: '', langs: {} }, // misiones del día
  lastClaim: null,
  hero: { pet: 'pio', name: '', worn: [] }, // mascota y ropa elegidas
}

export function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || '{}')
    return {
      ...defaults,
      ...parsed,
      settings: { ...defaults.settings, ...(parsed.settings || {}) },
      hero: { ...defaults.hero, ...(parsed.hero || {}) },
    }
  } catch {
    return { ...defaults }
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* sin espacio o modo privado: se sigue sin guardar */
  }
}

export function dayKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// Días seguidos con práctica. Si hoy todavía no practicaste, la racha sigue viva hasta que termine el día.
export function computeStreak(days) {
  const cursor = new Date()
  if (!days[dayKey(cursor)]) cursor.setDate(cursor.getDate() - 1)
  let streak = 0
  while (days[dayKey(cursor)] > 0) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export function lastDays(days, n = 7) {
  const out = []
  const cursor = new Date()
  cursor.setDate(cursor.getDate() - (n - 1))
  for (let i = 0; i < n; i += 1) {
    out.push({
      key: dayKey(cursor),
      label: cursor.toLocaleDateString('es-AR', { weekday: 'narrow' }),
      count: days[dayKey(cursor)] || 0,
    })
    cursor.setDate(cursor.getDate() + 1)
  }
  return out
}
