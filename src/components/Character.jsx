import { GEAR, PETS, TITLES, levelOf, totalXpOf } from '../lib/level.js'
import Mascot from './Mascot.jsx'

// Pantalla "Mi personaje": elegir mascota, ponerle nombre y vestirla con lo que se desbloqueó.
export default function Character({ lang, state, level, onChange, onBack }) {
  const { hero } = state
  const lv = levelOf(totalXpOf(state.xp))
  const worn = hero.worn.filter((id) => GEAR.some((g) => g.id === id && g.level <= level))
  const pet = PETS.find((p) => p.id === hero.pet) || PETS[0]

  const toggle = (id) => onChange({ worn: worn.includes(id) ? worn.filter((w) => w !== id) : [...worn, id] })

  return (
    <section className="list character">
      <button className="link" onClick={onBack}>
        ← Volver
      </button>
      <h1>Mi personaje</h1>

      <article className="card char-preview">
        <Mascot lang={lang} size={220} pet={hero.pet} worn={worn} />
        <p className="char-name">{hero.name.trim() || pet.name}</p>
        <p className="level-line">
          Nivel {lv.level} · {lv.title}
        </p>
        <div className="meter" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={lv.pct} aria-label="Avance al próximo nivel">
          <span style={{ width: `${lv.pct}%` }} />
        </div>
        <p className="muted small">
          {lv.level < 100 ? `Te faltan ${lv.toNext} puntos para el nivel ${lv.level + 1}.` : '¡Nivel máximo!'}
        </p>
      </article>

      <article className="card">
        <h2>Elegí tu mascota</h2>
        <div className="pet-pick">
          {PETS.map((p) => (
            <button key={p.id} className={hero.pet === p.id ? 'on' : ''} aria-pressed={hero.pet === p.id} onClick={() => onChange({ pet: p.id })}>
              <Mascot lang={lang} size={84} pet={p.id} worn={[]} />
              <strong>{p.name}</strong>
              <small>{p.kind}</small>
            </button>
          ))}
        </div>
        <div className="field">
          <label htmlFor="pet-name">Nombre de tu mascota</label>
          <input id="pet-name" type="text" maxLength={14} value={hero.name} placeholder={pet.name} onChange={(e) => onChange({ name: e.target.value })} />
        </div>
      </article>

      <article className="card">
        <h2>Ropero</h2>
        <p className="muted small">Cada accesorio se desbloquea al llegar a cierto nivel.</p>
        <ul className="gear-list">
          {GEAR.map((g) => {
            const open = level >= g.level
            const on = worn.includes(g.id)
            return (
              <li key={g.id}>
                <button className={on ? 'on' : ''} disabled={!open} aria-pressed={on} onClick={() => toggle(g.id)}>
                  <span className="g-icon" aria-hidden="true">{open ? g.icon : '🔒'}</span>
                  <span className="g-name">{g.name}</span>
                  <small>{open ? (on ? 'Puesto' : 'Tocá para ponerlo') : `Nivel ${g.level}`}</small>
                </button>
              </li>
            )
          })}
        </ul>
      </article>

      <article className="card">
        <h2>Títulos</h2>
        <ul className="titles">
          {[...TITLES].reverse().map((t) => (
            <li key={t.min} className={level >= t.min ? 'got' : ''}>
              <span>{level >= t.min ? '✅' : '🔒'}</span> Nivel {t.min}: {t.name}
            </li>
          ))}
        </ul>
      </article>
    </section>
  )
}
