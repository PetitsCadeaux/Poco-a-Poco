import { makeZip } from './zip.js'

// Guarda las grabaciones del estudio en IndexedDB (los audios son muy grandes para localStorage).
const DB = 'linguastar-voices'
const STORE = 'clips'

const open = () =>
  new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1)
    req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: 'key' })
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })

const run = async (mode, fn) => {
  const db = await open()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, mode)
    const out = fn(tx.objectStore(STORE))
    tx.oncomplete = () => resolve(out.result)
    tx.onerror = () => reject(tx.error)
  })
}

export const extOf = (mime) => (mime.includes('mp4') ? 'm4a' : mime.includes('ogg') ? 'ogg' : 'webm')

export const saveClip = (lang, id, blob, mime) =>
  run('readwrite', (s) => s.put({ key: `${lang}/${id}`, lang, id, blob, mime, at: Date.now() }))

export const deleteClip = (lang, id) => run('readwrite', (s) => s.delete(`${lang}/${id}`))

export const getClips = async (lang) => {
  const all = await run('readonly', (s) => s.getAll())
  return all.filter((c) => c.lang === lang)
}

// ZIP listo para subir: carpeta audio/<idioma>/ con los archivos y un index.json con el nombre del hablante.
export async function buildZip(lang, speaker) {
  const clips = await getClips(lang)
  const enc = new TextEncoder()
  const files = []
  const items = {}
  for (const c of clips) {
    const file = `${c.id}.${extOf(c.mime)}`
    items[c.id] = file
    files.push({ name: `audio/${lang}/${file}`, data: new Uint8Array(await c.blob.arrayBuffer()) })
  }
  const index = { speaker: speaker || '', lang, items }
  files.push({ name: `audio/${lang}/index.json`, data: enc.encode(JSON.stringify(index, null, 2)) })
  return { blob: makeZip(files), count: clips.length }
}
