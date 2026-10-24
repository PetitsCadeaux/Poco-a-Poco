// Geringoso (versión "p"): después de cada vocal se agrega una "p" y la misma vocal.
// casa -> capasapa, hola -> hopolapa. Es una aproximación: cada grupo de chicos lo juega un poco distinto.

const VOWELS = 'aeiouáéíóúü'
const BASE = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', ü: 'u' }
const isVowel = (c) => c !== undefined && VOWELS.includes(c.toLowerCase())
const plain = (c) => BASE[c.toLowerCase()] || c.toLowerCase()

// La "u" de que, qui, gue y gui no se pronuncia: no cuenta como vocal.
function silentU(chars, i) {
  const c = chars[i].toLowerCase()
  if (c !== 'u') return false
  const prev = (chars[i - 1] || '').toLowerCase()
  const next = (chars[i + 1] || '').toLowerCase()
  return (prev === 'q' || prev === 'g') && 'eiéí'.includes(next) && next !== ''
}

export function geringoso(text) {
  const chars = [...text]
  let out = ''
  chars.forEach((c, i) => {
    out += c
    if (isVowel(c) && !silentU(chars, i)) out += `p${plain(c)}`
  })
  return out
}

// Separa en sílabas para leerlo en voz alta: co-po-mo-po e-pes-ta-pas
const VALID_ONSETS = ['ch', 'll', 'rr', 'pl', 'pr', 'bl', 'br', 'tr', 'dr', 'cl', 'cr', 'fl', 'fr', 'gl', 'gr']

function syllabify(word) {
  const chars = [...word]
  const units = []
  let cur = ''
  chars.forEach((c, i) => {
    cur += c
    if (isVowel(c) && !silentU(chars, i)) {
      units.push({ str: cur, onset: cur.length - 1 })
      cur = ''
    }
  })
  if (!units.length) return word
  units[units.length - 1].str += cur

  for (let k = 1; k < units.length; k += 1) {
    const u = units[k]
    while (u.onset > 1) {
      const lastTwo = u.str.slice(u.onset - 2, u.onset).toLowerCase()
      if (VALID_ONSETS.includes(lastTwo) && u.onset === 2) break
      if (/(qu|gu)$/i.test(u.str.slice(0, u.onset)) && u.onset === 2) break
      units[k - 1].str += u.str[0]
      u.str = u.str.slice(1)
      u.onset -= 1
    }
  }
  return units.map((u) => u.str).join('-')
}

export function geringosoSyllables(text) {
  return geringoso(text).split(' ').map(syllabify).join(' ')
}
