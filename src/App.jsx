import { useEffect, useMemo, useState } from 'react'
import { LANGS, LANG_ORDER } from './data/content.js'
import { computeStreak, dayKey, loadState, saveState } from './lib/storage.js'
import { review } from './lib/srs.js'
import { applyEvent } from './lib/missions.js'
import { buildDailySession, buildLessonSession } from './lib/queue.js'
import { stopSpeaking } from './lib/speech.js'
import Home from './components/Home.jsx'
import Lessons from './components/Lessons.jsx'
import Progress from './components/Progress.jsx'
import Player from './components/Player.jsx'
import Icon from './components/Icon.jsx'
import Flag from './components/Flag.jsx'
import Backdrop from './components/Backdrop.jsx'
import Toast from './components/Toast.jsx'
import WorldMap from './components/WorldMap.jsx'
import Studio from './components/Studio.jsx'
import Character from './components/Character.jsx'
import { HeroContext } from './lib/hero.js'
import { GEAR, levelOf, totalXpOf } from './lib/level.js'

const TABS = [
  { id: 'home', label: 'Hoy', icon: 'home' },
  { id: 'map', label: 'Mundo', icon: 'globe' },
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

  // Al cambiar de idioma, el menú se desplaza para que el elegido se vea (importante en el celular).
  useEffect(() => {
    document.querySelector('.lang-btn.on')?.scrollIntoView({ inline: 'center', block: 'nearest' })
  }, [state.lang, session])

  const { lang, items, days, settings } = state

  const daily = useMemo(
    () => buildDailySession(lang, items, settings.newPerSession),
    // El plan del día se recalcula al cambiar de idioma, de ajustes o al volver a Inicio.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang, settings.newPerSession, view, session === null]
  )

  // Solo se muestra la ropa que ya está desbloqueada para el nivel actual.
  const level = levelOf(totalXpOf(state.xp)).level
  const hero = useMemo(
    () => ({
      pet: state.hero.pet,
      name: state.hero.name,
      worn: state.hero.worn.filter((id) => GEAR.some((g) => g.id === id && g.level <= level)),
    }),
    [state.hero, level]
  )

  const setLang = (code) => setState((s) => ({ ...s, lang: code }))

  const rate = (item, grade) =>
    setState((s) => {
      const key = dayKey()
      return applyEvent(
        {
          ...s,
          items: { ...s.items, [item.id]: review(s.items[item.id], grade) },
          days: { ...s.days, [key]: (s.days[key] || 0) + 1 },
        },
        s.lang,
        'practice',
        grade
      )
    })

  // 'spoke' = se grabó diciendo la frase, 'compared' = comparó su voz con la original.
  const mission = (event) => setState((s) => applyEvent(s, s.lang, event))

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
      <HeroContext.Provider value={hero}>
      <div className="shell focus" data-lang={session.lang}>
        <Backdrop lang={session.lang} />
        <div className="stage">
          <Player
            queue={session.queue}
            lang={session.lang}
            progress={items}
            slowRate={settings.slowRate}
            voiceName={settings.voices?.[LANGS[session.lang].voiceKey]}
            streak={computeStreak(days)}
            onRate={rate}
            onMission={mission}
            onExit={exitSession}
          />
        </div>
        <Toast claim={state.lastClaim} />
      </div>
      </HeroContext.Provider>
    )
  }

  return (
    <HeroContext.Provider value={hero}>
    <div className="shell" data-lang={lang}>
      <Backdrop lang={lang} />

      <aside className="side">
        <span className="brand">
          <span>
            <span className="brand-star" aria-hidden="true">✨</span> LinguaStar
          </span>
          <small>Brilla aprendiendo idiomas</small>
        </span>

        <nav className="langs-tabs" aria-label="Idioma">
          {LANG_ORDER.map((code) => (
            <button
              key={code}
              className={`lang-btn${code === lang ? ' on' : ''}`}
              data-code={code}
              style={{ '--c': LANGS[code].color }}
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
              state={state}
              onCharacter={() => setView('character')}
              onStart={() => startSession(daily.queue)}
              onGoLessons={() => setView('lessons')}
            />
          )}
          {view === 'character' && (
            <Character
              lang={lang}
              state={state}
              level={level}
              onChange={(patch) => setState((s) => ({ ...s, hero: { ...s.hero, ...patch } }))}
              onBack={() => setView('home')}
            />
          )}
          {view === 'studio' && <Studio lang={lang} onBack={() => setView('progress')} />}
          {view === 'map' && (
            <section className="list">
              <h1>Mundo</h1>
              <p className="muted">Arrastrá y acercá el mapa. Tocá una bandera para aprender el idioma de ese lugar.</p>
              <WorldMap
                lang={lang}
                onPick={(code) => {
                  setLang(code)
                  setView('home')
                }}
              />
            </section>
          )}
          {view === 'lessons' && (
            <Lessons
              lang={lang}
              progress={items}
              voiceName={settings.voices?.es}
              onPractice={(lessonId) => startSession(buildLessonSession(lang, lessonId))}
            />
          )}
          {view === 'progress' && (
            <Progress
              state={state}
              onStudio={() => setView('studio')}
              onSettings={(patch) => setState((s) => ({ ...s, settings: { ...s.settings, ...patch } }))}
              onReset={() => setState((s) => ({ ...s, items: {}, days: {}, xp: {}, daily: { date: '', langs: {} }, lastClaim: null }))}
            />
          )}
        </main>
      </div>

      <Toast claim={state.lastClaim} />

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
    </HeroContext.Provider>
  )
}
