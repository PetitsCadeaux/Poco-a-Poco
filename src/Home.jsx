import { LANGS } from '../data/content.js'
import { DAILY_GOAL, computeStreak, dayKey } from '../lib/storage.js'
import Waveform from './Waveform.jsx'
import Icon from './Icon.jsx'

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`

export default function Home({ lang, days, daily, onStart, onGoLessons }) {
  const meta = LANGS[lang]
  const total = daily.queue.length
  const minutes = Math.max(1, Math.round(total * 0.8))
  const today = days[dayKey()] || 0
  const streak = computeStreak(days)
  const pct = Math.min(100, Math.round((today / DAILY_GOAL) * 100))

  return (
    <section className="home">
      <div className="hero">
        <Waveform seed={meta.native} bars={40} />
        {total > 0 ? (
          <>
            <h1>Sesión de hoy</h1>
            <p>
              {daily.fresh.length > 0 && `${plural(daily.fresh.length, 'frase nueva', 'frases nuevas')}`}
              {daily.fresh.length > 0 && daily.due.length > 0 && ' y '}
              {daily.due.length > 0 && `${plural(daily.due.length, 'para repasar', 'para repasar')}`}. Unos {minutes}{' '}
              {minutes === 1 ? 'minuto' : 'minutos'} de {meta.name.toLowerCase()}.
            </p>
            <button className="cta" onClick={onStart}>
              <Icon name="play" size={20} /> Empezar
            </button>
          </>
        ) : (
          <>
            <h1>Todo al día</h1>
            <p>
              No tenés frases nuevas ni para repasar en {meta.name.toLowerCase()}. Practicá una lección cuando
              quieras.
            </p>
            <button className="cta" onClick={onGoLessons}>
              Ver lecciones
            </button>
          </>
        )}
      </div>

      <div className="stats">
        <div className="stat grow">
          <p className="stat-title">
            Hoy: {today} de {DAILY_GOAL} frases
          </p>
          <div className="meter" role="progressbar" aria-valuemin={0} aria-valuemax={DAILY_GOAL} aria-valuenow={Math.min(today, DAILY_GOAL)} aria-label="Meta diaria">
            <span style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="stat">
          <p className="stat-title streak">
            <Icon name="flame" size={20} /> {streak}
          </p>
          <p className="muted small">{streak === 1 ? 'día seguido' : 'días seguidos'}</p>
        </div>
      </div>
    </section>
  )
}
