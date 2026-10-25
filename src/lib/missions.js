import { dayKey } from './storage.js'
import { XP_BONUS, XP_PHRASE, rankOf } from './ranks.js'
import { GEAR, levelOf, totalXpOf } from './level.js'

// Misiones del día, para cada idioma. Hablar en voz alta es parte central.
export const MISSIONS = [
  { id: 'practice', field: 'practiced', target: 5, xp: 20, icon: '📚', title: 'Practicá 5 frases', done: '¡Practicaste 5 frases!' },
  { id: 'speak', field: 'spoken', target: 3, xp: 30, icon: '🎤', title: 'Hablá: grabate diciendo 3 frases', done: '¡Hablaste 3 frases!' },
  { id: 'compare', field: 'compared', target: 2, xp: 20, icon: '🔁', title: 'Compará tu voz con la original 2 veces', done: '¡Comparaste tu voz!' },
]

export const emptyEntry = () => ({ practiced: 0, spoken: 0, compared: 0, claimed: [] })

export function todayEntry(daily, lang) {
  return daily && daily.date === dayKey() ? daily.langs?.[lang] || emptyEntry() : emptyEntry()
}

// Aplica un evento ('practice' | 'spoke' | 'compared') y devuelve el estado nuevo.
// Si se cumple una misión o se sube de rango, deja el aviso en lastClaim.
export function applyEvent(state, lang, event, grade = 0) {
  const key = dayKey()
  const base = state.daily && state.daily.date === key ? state.daily : { date: key, langs: {} }
  const entry = { ...emptyEntry(), ...(base.langs[lang] || {}) }
  entry.claimed = [...entry.claimed]

  const xpBefore = state.xp?.[lang] || 0
  let xp = xpBefore
  if (event === 'practice') {
    entry.practiced += 1
    xp += XP_PHRASE + (grade >= 2 ? XP_BONUS : 0)
  }
  if (event === 'spoke') entry.spoken += 1
  if (event === 'compared') entry.compared += 1

  let lastClaim = state.lastClaim || null
  for (const m of MISSIONS) {
    if (entry[m.field] >= m.target && !entry.claimed.includes(m.id)) {
      entry.claimed.push(m.id)
      xp += m.xp
      lastClaim = { text: `${m.done} +${m.xp} puntos`, at: Date.now() }
    }
  }

  const before = rankOf(xpBefore).rank
  const after = rankOf(xp).rank
  if (after.id !== before.id) lastClaim = { text: `¡Subiste a ${after.name}!`, at: Date.now(), rank: after.id }

  const newXp = { ...state.xp, [lang]: xp }
  const lvBefore = levelOf(totalXpOf(state.xp)).level
  const lvAfter = levelOf(totalXpOf(newXp)).level
  if (lvAfter > lvBefore) {
    const unlocked = GEAR.filter((g) => g.level > lvBefore && g.level <= lvAfter).map((g) => g.name)
    const lvText = `¡Nivel ${lvAfter}!${unlocked.length ? ` Desbloqueaste: ${unlocked.join(', ')}.` : ''}`
    const rankText = after.id !== before.id ? `¡Subiste a ${after.name}! ` : ''
    lastClaim = { text: rankText + lvText, at: Date.now(), rank: 'nivel' }
  }

  return {
    ...state,
    xp: newXp,
    daily: { date: key, langs: { ...base.langs, [lang]: entry } },
    lastClaim,
  }
}
