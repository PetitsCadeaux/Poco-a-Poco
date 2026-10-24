import { LANG_ORDER, LANGS, VOICE_GROUPS, itemsOf } from '../data/content.js'
import { DAILY_GOAL, computeStreak, dayKey, lastDays } from '../lib/storage.js'
import { countDue } from '../lib/queue.js'
import VoicePicker from './VoicePicker.jsx'

export default function Progress({ state, onSettings, onReset }) {
  const { days, items, settings } = state
  const week = lastDays(days, 7)
  const max = Math.max(DAILY_GOAL, ...week.map((d) => d.count))
  const streak = computeStreak(days)
  const todayKey = dayKey()

  return (
    <section className="list">
      <h1>Tu progreso</h1>

      <article className="card">
        <h2>Última semana</h2>
        <div className="chart" role="img" aria-label={`Frases practicadas por día: ${week.map((d) => d.count).join(', ')}`}>
          {week.map((d) => (
            <div className={`col${d.key === todayKey ? ' today' : ''}`} key={d.key}>
              <span className="num">{d.count || ''}</span>
              <span className="bar-v" style={{ height: `${Math.max(4, (d.count / max) * 100)}%` }} />
              <span className="lbl">{d.label}</span>
            </div>
          ))}
        </div>
        <p className="muted small">
          Racha actual: {streak} {streak === 1 ? 'día' : 'días'}. La meta diaria es de {DAILY_GOAL} frases.
        </p>
      </article>

      <article className="card">
        <h2>Por idioma</h2>
        <ul className="langs">
          {LANG_ORDER.map((code) => {
            const all = itemsOf(code)
            const seen = all.filter((i) => items[i.id]).length
            const due = countDue(code, items)
            return (
              <li key={code} style={{ '--c': LANGS[code].color }}>
                <span className="dot" />
                <span className="name">{LANGS[code].name}</span>
                <span className="muted small">
                  {seen}/{all.length} vistas{due > 0 ? `, ${due} para repasar` : ''}
                </span>
              </li>
            )
          })}
        </ul>
      </article>

      <article className="card">
        <h2>Ajustes</h2>
        <div className="field">
          <label htmlFor="newPer">Frases nuevas por sesión</label>
          <div className="stepper">
            <button
              aria-label="Una menos"
              onClick={() => onSettings({ newPerSession: Math.max(3, settings.newPerSession - 1) })}
            >
              −
            </button>
            <output id="newPer">{settings.newPerSession}</output>
            <button
              aria-label="Una más"
              onClick={() => onSettings({ newPerSession: Math.min(10, settings.newPerSession + 1) })}
            >
              +
            </button>
          </div>
        </div>
        <div className="field">
          <label htmlFor="slow">Velocidad del botón Lento</label>
          <select
            id="slow"
            value={settings.slowRate}
            onChange={(e) => onSettings({ slowRate: Number(e.target.value) })}
          >
            <option value={0.5}>Muy lenta</option>
            <option value={0.6}>Lenta</option>
            <option value={0.75}>Un poco lenta</option>
          </select>
        </div>
        <h2 className="sub">Voces</h2>
        <p className="muted small">
          Si una voz suena mal, elegí otra de la lista y tocá Probar. Las que dicen Natural, Online o Google
          suelen sonar mejor.
        </p>
        {VOICE_GROUPS.map((group) => (
          <VoicePicker
            key={group.key}
            group={group}
            voiceName={settings.voices?.[group.key]}
            onChange={(name) => onSettings({ voices: { ...settings.voices, [group.key]: name } })}
          />
        ))}
        <button
          className="danger"
          onClick={() => {
            if (window.confirm('¿Borrar todo tu progreso en este dispositivo? No se puede deshacer.')) onReset()
          }}
        >
          Borrar progreso
        </button>
      </article>
    </section>
  )
}
