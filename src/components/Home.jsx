import { LANGS, itemsOf } from '../data/content.js'
import { DAILY_GOAL, computeStreak, dayKey } from '../lib/storage.js'
import { countDue } from '../lib/queue.js'
import Mascot from './Mascot.jsx'
import Flag from './Flag.jsx'
import Icon from './Icon.jsx'
import Medal from './Medal.jsx'
import { rankOf } from '../lib/ranks.js'
import { MISSIONS, todayEntry } from '../lib/missions.js'

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`

export default function Home({ lang, days, items, daily, state, onStart, onGoLessons }) {
  const meta = LANGS[lang]
  const total = daily.queue.length
  const minutes = Math.max(1, Math.round(total * 0.8))
  const today = days[dayKey()] || 0
  const streak = computeStreak(days)
  const pct = Math.min(100, Math.round((today / DAILY_GOAL) * 100))
  const all = itemsOf(lang)
  const seen = all.filter((i) => items[i.id]).length
  const due = countDue(lang, items)
  const xp = state.xp?.[lang] || 0
  const rk = rankOf(xp)
  const entry = todayEntry(state.daily, lang)

  return (
    <section className="home">
      <div className="hero">
        <div className="hero-text">
          <span className="chip">
            <Flag lang={lang} width={26} /> {meta.name}
          </span>
          {total > 0 ? (
            <>
              <h1>Sesión de hoy</h1>
              <p>
                {daily.fresh.length > 0 && plural(daily.fresh.length, 'frase nueva', 'frases nuevas')}
                {daily.fresh.length > 0 && daily.due.length > 0 && ' y '}
                {daily.due.length > 0 && plural(daily.due.length, 'para repasar', 'para repasar')}. Unos {minutes}{' '}
                {minutes === 1 ? 'minuto' : 'minutos'} de {meta.name.toLowerCase()}.
              </p>
              <button className="cta" onClick={onStart}>
                <Icon name="play" size={22} /> Empezar
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
        <div className="hero-art">
          <Mascot lang={lang} size={240} />
        </div>
      </div>

      <div className="rank-row">
        <article className="card rank-card">
          <Medal rankId={rk.rank.id} size={72} />
          <div className="rank-info">
            <p className="stat-title">
              Rango {rk.rank.name} · {xp} puntos
            </p>
            <div className="meter" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={rk.pct} aria-label="Avance al próximo rango">
              <span style={{ width: `${rk.pct}%` }} />
            </div>
            <p className="muted small">
              {rk.next ? `Te faltan ${rk.toNext} puntos para ${rk.next.name}.` : '¡Llegaste al rango más alto!'}
            </p>
          </div>
        </article>
        <article className="card missions">
          <h2>Misiones de hoy</h2>
          <ul>
            {MISSIONS.map((m) => {
              const n = Math.min(entry[m.field], m.target)
              const done = entry.claimed.includes(m.id)
              return (
                <li key={m.id} className={done ? 'm-ok' : ''}>
                  <span className="m-icon" aria-hidden="true">{done ? '✅' : m.icon}</span>
                  <span className="m-text">
                    {m.title}
                    <small>
                      {n}/{m.target} · +{m.xp} puntos
                    </small>
                  </span>
                </li>
              )
            })}
          </ul>
        </article>
      </div>

      <div className="stats">
        <div className="stat grow">
          <p className="stat-title">
            Hoy: {today} de {DAILY_GOAL} frases
          </p>
          <div
            className="meter"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={DAILY_GOAL}
            aria-valuenow={Math.min(today, DAILY_GOAL)}
            aria-label="Meta diaria"
          >
            <span style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="stat">
          <p className="stat-big streak">
            <Icon name="flame" size={26} /> {streak}
          </p>
          <p className="muted small">{streak === 1 ? 'día seguido' : 'días seguidos'}</p>
        </div>
        <div className="stat">
          <p className="stat-big">{seen}</p>
          <p className="muted small">de {all.length} frases vistas</p>
        </div>
        <div className="stat">
          <p className="stat-big">{due}</p>
          <p className="muted small">{due === 1 ? 'para repasar' : 'para repasar'}</p>
        </div>
      </div>
    </section>
  )
}
