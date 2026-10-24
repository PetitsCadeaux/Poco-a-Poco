import { LESSONS, itemsOf } from '../data/content.js'
import { isDue } from './srs.js'

const MAX_REVIEWS = 12

// Sesión del día: primero lo que toca repasar, después frases nuevas en el orden de las lecciones.
export function buildDailySession(lang, progress, newCount) {
  const all = itemsOf(lang)
  const now = Date.now()
  const due = all
    .filter((item) => isDue(progress[item.id], now))
    .sort((a, b) => progress[a.id].due - progress[b.id].due)
    .slice(0, MAX_REVIEWS)
  const fresh = all.filter((item) => !progress[item.id]).slice(0, newCount)
  return { due, fresh, queue: [...due, ...fresh] }
}

export function buildLessonSession(lang, lessonId) {
  const lesson = LESSONS[lang].find((l) => l.id === lessonId)
  return lesson ? lesson.items : []
}

export function countDue(lang, progress) {
  const now = Date.now()
  return itemsOf(lang).filter((item) => isDue(progress[item.id], now)).length
}
