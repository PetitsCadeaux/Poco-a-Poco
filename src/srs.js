// Repaso espaciado simple (variante de SM-2).
// Notas: 0 = otra vez, 1 = difícil, 2 = bien, 3 = fácil.

const MIN = 60 * 1000
const DAY = 24 * 60 * MIN

export const GRADES = [
  { value: 0, label: 'Otra vez' },
  { value: 1, label: 'Difícil' },
  { value: 2, label: 'Bien' },
  { value: 3, label: 'Fácil' },
]

function startOfDay(ts) {
  const d = new Date(ts)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

export function review(prev, grade, now = Date.now()) {
  const state = prev || { ease: 2.3, interval: 0, reps: 0, due: now }
  let { ease, interval, reps } = state

  if (grade === 0) {
    return { ease: Math.max(1.3, ease - 0.2), interval: 0, reps: 0, due: now + 10 * MIN }
  }

  if (grade === 1) {
    interval = reps === 0 ? 1 : Math.max(1, Math.round(interval * 1.2))
    ease = Math.max(1.3, ease - 0.15)
  } else if (grade === 2) {
    interval = reps === 0 ? 1 : reps === 1 ? 3 : Math.round(interval * ease)
  } else {
    interval = reps === 0 ? 3 : Math.round(Math.max(interval, 1) * ease * 1.3)
    ease += 0.1
  }

  return { ease, interval, reps: reps + 1, due: startOfDay(now) + interval * DAY }
}

// Texto corto para mostrar debajo de cada botón: cuándo vuelve a aparecer la frase.
export function previewLabel(prev, grade) {
  const next = review(prev, grade)
  if (next.interval === 0) return '10 min'
  if (next.interval === 1) return '1 día'
  return `${next.interval} días`
}

export function isDue(entry, now = Date.now()) {
  return Boolean(entry) && entry.due <= now
}
