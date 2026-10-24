// Genera audios con voces neuronales de Google Cloud Text-to-Speech y los guarda en public/audio/<idioma>/.
// Se corre desde GitHub (Actions) con la clave en la variable GOOGLE_TTS_KEY. No pisa audios que ya existen.
import { mkdir, writeFile, readdir, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { LANGS, itemsOf } from '../src/data/content.js'

const KEY = process.env.GOOGLE_TTS_KEY
if (!KEY) {
  console.error('Falta la clave GOOGLE_TTS_KEY.')
  process.exit(1)
}

// Idiomas con voz automática. Euskera, quechua, guaraní y aimara no tienen: esos se graban con personas.
const TARGETS = [
  { lang: 'fr', code: 'fr-FR' },
  { lang: 'pt', code: 'pt-BR' },
  { lang: 'ko', code: 'ko-KR' },
  { lang: 'ja', code: 'ja-JP' },
  { lang: 'tr', code: 'tr-TR' },
  { lang: 'gr', code: 'es-US', silentH: true },
]
const PREFER = ['Neural2', 'Wavenet', 'Standard'] // de mejor a peor, entre las que existan
const API = 'https://texttospeech.googleapis.com/v1'

async function api(path, options) {
  const res = await fetch(`${API}${path}${path.includes('?') ? '&' : '?'}key=${KEY}`, options)
  if (!res.ok) throw new Error(`${path} -> ${res.status} ${await res.text()}`)
  return res.json()
}

async function pickVoice(code) {
  const { voices = [] } = await api(`/voices?languageCode=${code}`)
  const names = voices.map((v) => v.name).filter((n) => n.startsWith(code))
  for (const kind of PREFER) {
    const found = names.filter((n) => n.includes(`-${kind}-`)).sort()
    if (found.length) return found[0]
  }
  throw new Error(`No hay voces para ${code}`)
}

const ext = 'mp3'
let made = 0

for (const t of TARGETS) {
  const voice = await pickVoice(t.code)
  console.log(`${t.lang}: voz ${voice}`)
  const dir = new URL(`../public/audio/${t.lang}/`, import.meta.url)
  await mkdir(dir, { recursive: true })

  for (const item of itemsOf(t.lang)) {
    const file = new URL(`${item.id}.${ext}`, dir)
    if (existsSync(file)) continue
    let text = item.text
    if (t.silentH) text = text.replace(/(?<![cC])[hH]/g, '')
    const { audioContent } = await api('/text:synthesize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: { text },
        voice: { languageCode: t.code, name: voice },
        audioConfig: { audioEncoding: 'MP3', speakingRate: 0.92 },
      }),
    })
    await writeFile(file, Buffer.from(audioContent, 'base64'))
    made += 1
  }

  // Índice: todos los archivos mp3 que hay en la carpeta. Si ya había voces de personas, no se toca.
  const indexFile = new URL('index.json', dir)
  let keep = null
  if (existsSync(indexFile)) {
    const old = JSON.parse(await readFile(indexFile, 'utf8'))
    if (old.speaker && old.speaker !== 'Google') keep = old
  }
  if (keep) {
    console.log(`${t.lang}: ya tiene voces de ${keep.speaker}, no se reemplaza el índice.`)
    continue
  }
  const files = (await readdir(dir)).filter((f) => f.endsWith(`.${ext}`))
  const items = Object.fromEntries(files.map((f) => [f.replace(`.${ext}`, ''), f]))
  await writeFile(indexFile, JSON.stringify({ speaker: 'Google', lang: t.lang, items }, null, 2))
}

console.log(`Listo: ${made} audios nuevos.`)
