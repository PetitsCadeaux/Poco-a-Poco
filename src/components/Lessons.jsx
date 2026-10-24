import { LANGS, LESSONS } from '../data/content.js'

export default function Lessons({ lang, progress, onPractice }) {
  const meta = LANGS[lang]
  return (
    <section className="list">
      <h1>Lecciones de {meta.name.toLowerCase()}</h1>
      <div className="lesson-grid">
        {LESSONS[lang].map((lesson) => {
          const seen = lesson.items.filter((i) => progress[i.id]).length
          const pct = Math.round((seen / lesson.items.length) * 100)
          return (
            <article className="card lesson" key={lesson.id}>
              <div className="emoji-strip" aria-hidden="true">
                {lesson.items.slice(0, 6).map((i) => (
                  <span key={i.id}>{i.emoji}</span>
                ))}
              </div>
              <h2>{lesson.title}</h2>
              <p className="muted small">
                {seen} de {lesson.items.length} frases practicadas
              </p>
              <div className="meter" aria-hidden="true">
                <span style={{ width: `${pct}%` }} />
              </div>
              <details>
                <summary>Consejo de pronunciación</summary>
                <p>{lesson.tip}</p>
              </details>
              <button className="primary wide" onClick={() => onPractice(lesson.id)}>
                {seen === 0 ? 'Empezar lección' : 'Practicar de nuevo'}
              </button>
            </article>
          )
        })}
      </div>
    </section>
  )
}
