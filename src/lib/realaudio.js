import { useEffect, useState } from 'react'

// Si existe /audio/<idioma>/index.json, la app usa voces reales grabadas por hablantes.
// Si no existe (o falla algo), se usa la voz del dispositivo.
const cache = {}

export function loadIndex(lang) {
  if (!cache[lang]) {
    cache[lang] = fetch(`/audio/${lang}/index.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => (j && j.items && typeof j.items === 'object' ? j : null))
      .catch(() => null)
  }
  return cache[lang]
}

export function useRealAudio(lang) {
  const [index, setIndex] = useState(null)
  useEffect(() => {
    let alive = true
    setIndex(null)
    loadIndex(lang).then((j) => alive && setIndex(j))
    return () => {
      alive = false
    }
  }, [lang])
  return {
    speaker: index?.speaker || '',
    has: (id) => Boolean(index?.items?.[id]),
    url: (id) => (index?.items?.[id] ? `/audio/${lang}/${index.items[id]}` : null),
  }
}
