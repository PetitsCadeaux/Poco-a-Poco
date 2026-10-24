import { useEffect, useMemo, useState } from 'react'
import { LANGS, LANG_ORDER } from './data/content.js'
import { computeStreak, dayKey, loadState, saveState } from './lib/storage.js'
import { review } from './lib/srs.js'
import { buildDailySession, buildLessonSession } from './lib/queue.js'
import { stopSpeaking } from './lib/speech.js'
import Home from './components/Home.jsx'
import Lessons from './components/Lessons.jsx'
import Progress from './components/Progress.jsx'
import Player from './components/Player.jsx'
import Icon from './components/Icon.jsx'
import Flag from './components/Flag.jsx'
import Backdrop from './components/Backdrop.jsx'

const TABS = [
  { id: 'home', label: 'Hoy', icon: 'home' },
  { id: 'lessons', label: 'Lecciones', icon: 'book' },
  { id: 'progress', label: 'Progreso', icon: 'chart' },
]

export default function App() {
  const [state, setState] = useState(loadState)
  const [view, setView] = useState('home')
  const [session, setSession] = useState(null)

  useEffect(() => {
    saveState(state)
  }, [state])

  const { lang, items, days, settings } = state

  const daily = useMemo(
    () => buildDailySession(lang, items, settings.newPerSession),
    // El plan del día se recalcula al cambiar de idioma, de ajustes o al volver a Inicio.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang, settings.newPerSession, view, session === null]
  )

  const setLang = (code) => setState((s) => ({ ...s, lang: code }))

  const rate = (item, grade) =>
    setState((s) => {
      const key = dayKey()
      return {
        ...s,
        items: { ...s.items, [item.id]: review(s.items[item.id], grade) },
        days: { ...s.days, [key]: (s.days[key] || 0) + 1 },
      }
    })

  const startSession = (queue) => {
    if (queue.length > 0) setSession({ queue, lang })
  }

  const exitSession = () => {
    stopSpeaking()
    setSession(null)
    setView('home')
  }

  if (session) {
    return (
      <div className="shell focus" data-lang={session.lang}>
        <Backdrop lang={session.lang} />
        <div className="stage">
          <Player
            queue={session.queue}
            lang={session.lang}
            progress={items}
            slowRate={settings.slowRate}
            voiceName={settings.voices?.[session.lang]}
            streak={computeStreak(days)}
            onRate={rate}
            onExit={exitSession}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="shell" data-lang={lang}>
      <Backdrop lang={lang} />

      <aside className="side">
        <span className="brand">Poco a poco</span>

        <nav className="langs-tabs" aria-label="Idioma">
          {LANG_ORDER.map((code) => (
            <button
              key={code}
              className={`lang-btn${code === lang ? ' on' : ''}`}
              data-code={code}
              aria-pressed={code === lang}
              onClick={() => setLang(code)}
            >
              <Flag lang={code} width={34} />
              <span className="ln-name">{LANGS[code].name}</span>
              <span className="ln-native" lang={LANGS[code].tts}>
                {LANGS[code].native}
              </span>
            </button>
          ))}
        </nav>

        <nav className="side-nav" aria-label="Secciones">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={view === tab.id ? 'on' : ''}
              aria-current={view === tab.id ? 'page' : undefined}
              onClick={() => setView(tab.id)}
            >
              <Icon name={tab.icon} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="stage">
        <main>
          {view === 'home' && (
            <Home
              lang={lang}
              days={days}
              items={items}
              daily={daily}
              onStart={() => startSession(daily.queue)}
              onGoLessons={() => setView('lessons')}
            />
          )}
          {view === 'lessons' && (
            <Lessons
              lang={lang}
              progress={items}
              onPractice={(lessonId) => startSession(buildLessonSession(lang, lessonId))}
            />
          )}
          {view === 'progress' && (
            <Progress
              state={state}
              onSettings={(patch) => setState((s) => ({ ...s, settings: { ...s.settings, ...patch } }))}
              onReset={() => setState((s) => ({ ...s, items: {}, days: {} }))}
            />
          )}
        </main>
      </div>

      <nav className="tabbar" aria-label="Secciones">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={view === tab.id ? 'on' : ''}
            aria-current={view === tab.id ? 'page' : undefined}
            onClick={() => setView(tab.id)}
          >
            <Icon name={tab.icon} />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
