import { useCallback, useEffect, useRef, useState } from 'react'
import { LANGS } from '../data/content.js'
import { H, LAND, PINS, SEAS, W, project } from '../data/world.js'
import Flag from './Flag.jsx'

const toPath = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'}${project(p).map((n) => n.toFixed(1)).join(' ')}`).join('') + 'Z'
const LAND_PATHS = LAND.map(toPath)
const MAX_ZOOM = 14

// Mapa con arrastre y zoom (rueda, botones o pellizco). Tocá una bandera para elegir ese idioma.
export default function WorldMap({ lang, onPick }) {
  const box = useRef(null)
  const [size, setSize] = useState({ w: 600, h: 360 })
  const [view, setView] = useState(null) // { s: escala, x, y: traslación en px }
  const [selected, setSelected] = useState(() => PINS.find((p) => p.lang === lang) || PINS[0])
  const drag = useRef({ pointers: new Map(), moved: 0, last: null })
  const anim = useRef(0)

  const minScale = Math.max(size.w / W, size.h / H)

  const clamp = useCallback(
    (v) => {
      const s = Math.min(Math.max(v.s, minScale), minScale * MAX_ZOOM)
      const x = Math.min(0, Math.max(size.w - W * s, v.x))
      const y = Math.min(0, Math.max(size.h - H * s, v.y))
      return { s, x, y }
    },
    [minScale, size]
  )

  const centerOn = useCallback(
    (at, zoom) => {
      const [px, py] = project(at)
      const s = minScale * zoom
      return clamp({ s, x: size.w / 2 - px * s, y: size.h / 2 - py * s })
    },
    [clamp, minScale, size]
  )

  // Mide el contenedor.
  useEffect(() => {
    const el = box.current
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight })
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Vista inicial: centrada en el idioma actual.
  useEffect(() => {
    setView((v) => (v ? clamp(v) : centerOn(selected.at, 2.2)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size])

  const flyTo = useCallback(
    (target) => {
      cancelAnimationFrame(anim.current)
      const from = view
      const t0 = performance.now()
      const step = (now) => {
        const k = Math.min(1, (now - t0) / 450)
        const e = 1 - Math.pow(1 - k, 3)
        setView({ s: from.s + (target.s - from.s) * e, x: from.x + (target.x - from.x) * e, y: from.y + (target.y - from.y) * e })
        if (k < 1) anim.current = requestAnimationFrame(step)
      }
      anim.current = requestAnimationFrame(step)
    },
    [view]
  )

  useEffect(() => () => cancelAnimationFrame(anim.current), [])

  const zoomAt = useCallback(
    (factor, cx, cy) =>
      setView((v) => {
        if (!v) return v
        const s = Math.min(Math.max(v.s * factor, minScale), minScale * MAX_ZOOM)
        const k = s / v.s
        return clamp({ s, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k })
      }),
    [clamp, minScale]
  )

  // La rueda del mouse hace zoom (necesita un listener no pasivo para no mover la página).
  useEffect(() => {
    const el = box.current
    const onWheel = (e) => {
      e.preventDefault()
      const r = el.getBoundingClientRect()
      zoomAt(e.deltaY < 0 ? 1.25 : 0.8, e.clientX - r.left, e.clientY - r.top)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [zoomAt])

  const pick = (pin) => {
    setSelected(pin)
    if (view) flyTo(centerOn(pin.at, Math.max(4, view.s / minScale)))
  }

  const onPointerDown = (e) => {
    cancelAnimationFrame(anim.current)
    const d = drag.current
    d.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
    d.moved = 0
    d.last = null
  }

  const onPointerMove = (e) => {
    const d = drag.current
    const prev = d.pointers.get(e.pointerId)
    if (!prev || !view) return
    const cur = { x: e.clientX, y: e.clientY }
    const r = box.current.getBoundingClientRect()
    if (d.pointers.size === 1) {
      d.moved += Math.abs(cur.x - prev.x) + Math.abs(cur.y - prev.y)
      if (d.moved > 6) setView((v) => clamp({ ...v, x: v.x + cur.x - prev.x, y: v.y + cur.y - prev.y }))
    } else if (d.pointers.size === 2) {
      // Pellizco: se compara la distancia entre los dos dedos antes y después.
      const other = [...d.pointers.entries()].find(([id]) => id !== e.pointerId)[1]
      const before = Math.hypot(prev.x - other.x, prev.y - other.y)
      const after = Math.hypot(cur.x - other.x, cur.y - other.y)
      d.moved += 10
      if (before > 0) zoomAt(after / before, (cur.x + other.x) / 2 - r.left, (cur.y + other.y) / 2 - r.top)
    }
    d.pointers.set(e.pointerId, cur)
  }

  const onPointerUp = (e) => {
    const d = drag.current
    const wasTap = d.pointers.size === 1 && d.moved <= 6
    d.pointers.delete(e.pointerId)
    if (!wasTap) return
    const hit = e.target.closest?.('[data-pin]')
    if (hit) pick(PINS.find((p) => p.id === hit.dataset.pin))
  }

  const step = (factor) => zoomAt(factor, size.w / 2, size.h / 2)
  const reset = () => view && flyTo(centerOn(selected.at, 2.2))
  const meta = LANGS[selected.lang]

  return (
    <div className="worldmap">
      <div className="map-box" ref={box}>
        {view && (
          <svg
            className="map-svg"
            width={size.w}
            height={size.h}
            role="group"
            aria-label="Mapa del mundo. Tocá una bandera para elegir su idioma."
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <g transform={`translate(${view.x} ${view.y}) scale(${view.s})`}>
              <rect width={W} height={H} className="sea" />
              {[...Array(11)].map((_, i) => (
                <line key={`m${i}`} x1={(i * W) / 10} x2={(i * W) / 10} y1="0" y2={H} className="grid" />
              ))}
              {[...Array(5)].map((_, i) => (
                <line key={`p${i}`} y1={((i + 1) * H) / 6} y2={((i + 1) * H) / 6} x1="0" x2={W} className="grid" />
              ))}
              {LAND_PATHS.map((d, i) => (
                <path key={i} d={d} className="land" strokeWidth={1.2 / view.s} />
              ))}
              {SEAS.map(([lo, la, rx, ry], i) => {
                const [cx, cy] = project([lo, la])
                return <ellipse key={i} cx={cx} cy={cy} rx={rx * (W / 360)} ry={ry * (H / 180)} className="sea" />
              })}
              {PINS.map((pin) => {
                const [px, py] = project(pin.at)
                const on = pin.id === selected.id
                const mine = pin.lang === lang
                // Con poco zoom las banderas se achican para no taparse entre sí.
                const pinK = Math.min(1, 0.5 + 0.12 * (view.s / minScale)) / view.s
                return (
                  <g
                    key={pin.id}
                    data-pin={pin.id}
                    className={`pin${on ? ' on' : ''}${mine ? ' mine' : ''}`}
                    transform={`translate(${px} ${py}) scale(${pinK})`}
                    tabIndex={0}
                    role="button"
                    aria-label={`${pin.country}: ${LANGS[pin.lang].name}`}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), pick(pin))}
                  >
                    <circle r="21" className="pin-halo" fill={LANGS[pin.lang].color} />
                    <g transform="translate(-16 -11)">
                      <Flag lang={pin.lang} width={32} />
                    </g>
                  </g>
                )
              })}
            </g>
          </svg>
        )}
        <div className="map-ctrl">
          <button onClick={() => step(1.6)} aria-label="Acercar">+</button>
          <button onClick={() => step(1 / 1.6)} aria-label="Alejar">−</button>
          <button onClick={reset} aria-label="Volver a mi idioma">◎</button>
        </div>
        <p className="map-note">Mapa dibujado a mano, no exacto.</p>
      </div>

      <article className="card map-card" style={{ '--c': meta.color }}>
        <Flag lang={selected.lang} width={64} />
        <div className="map-info">
          <h2>{selected.country}</h2>
          <p>
            Acá se habla <strong>{meta.name}</strong>{' '}
            <span lang={meta.html} className="muted">
              ({meta.native})
            </span>
          </p>
        </div>
        <button className="primary" onClick={() => onPick(selected.lang)}>
          {selected.lang === lang ? 'Seguir con' : 'Aprender'} {meta.name}
        </button>
      </article>
    </div>
  )
}
