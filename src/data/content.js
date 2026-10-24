// Contenido de las lecciones.
// Cada frase: [texto, pronunciación aproximada para hispanohablantes, significado]
// Convenciones: ü = u francesa/turca (decí "i" con labios redondeados), ë = e muy cerrada con labios
// redondeados, MAYÚSCULAS = sílaba fuerte.

export const LANGS = {
  fr: { code: 'fr', name: 'Francés', native: 'Français', tts: 'fr-FR', color: '#2F4BE0' },
  ko: { code: 'ko', name: 'Coreano', native: '한국어', tts: 'ko-KR', color: '#D92F68' },
  ja: { code: 'ja', name: 'Japonés', native: '日本語', tts: 'ja-JP', color: '#D6232F' },
  tr: { code: 'tr', name: 'Turco', native: 'Türkçe', tts: 'tr-TR', color: '#0B7F72' },
}

export const LANG_ORDER = ['fr', 'ko', 'ja', 'tr']

const raw = {
  fr: [
    {
      title: 'Saludos',
      tip: 'En francés muchas consonantes finales no se pronuncian: en "salut" la t es muda y en "vous" la s también. Escuchá la melodía antes de fijarte en las letras.',
      items: [
        ['Bonjour', 'bon-YUR', 'Hola / buen día'],
        ['Bonsoir', 'bon-SUAR', 'Buenas noches (al llegar)'],
        ['Salut', 'sa-LÜ', 'Chau / hola (informal)'],
        ['Au revoir', 'o rë-VUAR', 'Adiós'],
        ['Merci', 'mer-SI', 'Gracias'],
        ["S'il vous plaît", 'sil vu PLÉ', 'Por favor'],
        ['Excusez-moi', 'ek-skü-ZÉ muá', 'Disculpe'],
        ["Je m'appelle Nadia", 'yë ma-PEL Nadia', 'Me llamo Nadia'],
      ],
    },
    {
      title: 'Sonidos clave',
      tip: 'La u francesa: decí "i" y redondeá los labios sin mover la lengua (ü). La r sale de la garganta, como una j suave. En las vocales nasales el aire pasa por la nariz y la n casi no se pronuncia (ya = nasal). La ë es una e cerrada con labios redondeados.',
      items: [
        ['tu', 'tü', 'vos / tú'],
        ['rue', 'rü', 'calle'],
        ['rouge', 'ruy', 'rojo'],
        ['trois', 'truá', 'tres'],
        ['deux', 'dë', 'dos'],
        ['oiseau', 'ua-ZÓ', 'pájaro'],
        ['vin', 'ván (nasal)', 'vino'],
        ['pain', 'pán (nasal)', 'pan'],
        ['bon', 'bon (nasal)', 'bueno'],
      ],
    },
    {
      title: 'Números del 1 al 10',
      tip: 'Cinq, six, sept, huit, neuf y dix terminan en una consonante que sí se oye cuando los decís solos. Practicá el ü de "huit": una u francesa seguida de i.',
      items: [
        ['un', 'ën (nasal)', 'uno'],
        ['deux', 'dë', 'dos'],
        ['trois', 'truá', 'tres'],
        ['quatre', 'katr', 'cuatro'],
        ['cinq', 'sánk', 'cinco'],
        ['six', 'sis', 'seis'],
        ['sept', 'set', 'siete'],
        ['huit', 'üit', 'ocho'],
        ['neuf', 'nëf', 'nueve'],
        ['dix', 'dis', 'diez'],
      ],
    },
    {
      title: 'En la cafetería',
      tip: 'Las frases de cortesía van pegadas: decí "silvuplé" como una sola palabra, con el golpe de voz al final.',
      items: [
        ["Un café, s'il vous plaît", 'ën ka-FÉ sil vu PLÉ', 'Un café, por favor'],
        ['Je voudrais un croissant', 'yë vu-DRÉ ën kruasán', 'Quisiera un croissant'],
        ["L'addition, s'il vous plaît", 'la-di-SION sil vu PLÉ', 'La cuenta, por favor'],
        ["C'est combien ?", 'sé kom-BIÁN', '¿Cuánto cuesta?'],
        ['Je ne comprends pas', 'yë në kom-PRÁN pa', 'No entiendo'],
        ['Pouvez-vous répéter ?', 'pu-vé-VU ré-pe-TÉ', '¿Puede repetir?'],
        ["Parlez plus lentement, s'il vous plaît", 'par-LÉ plü lan-të-MAN sil vu PLÉ', 'Hable más despacio, por favor'],
        ['Où sont les toilettes ?', 'u son lé tua-LET', '¿Dónde está el baño?'],
      ],
    },
    {
      title: 'Presentarse',
      tip: 'En las preguntas la entonación sube al final. Practicá "Comment ça va ?" subiendo y "Ça va bien" bajando.',
      items: [
        ['Comment vous appelez-vous ?', 'ko-MAN vu za-pë-lé-VU', '¿Cómo se llama?'],
        ['Enchanté', 'an-shan-TÉ', 'Encantada / encantado'],
        ['Je suis argentine', 'yë süi ar-yan-TÍN', 'Soy argentina'],
        ["J'apprends le français", 'ya-PRAN lë fran-SÉ', 'Estoy aprendiendo francés'],
        ['Comment ça va ?', 'ko-man sa VA', '¿Cómo andás?'],
        ['Ça va bien, merci', 'sa va BIÁN mer-SI', 'Bien, gracias'],
        ['Et vous ?', 'é VU', '¿Y usted?'],
        ['Je parle un peu français', 'yë parl ën pë fran-SÉ', 'Hablo un poco de francés'],
      ],
    },
  ],
  ko: [
    {
      title: 'Saludos',
      tip: 'El coreano tiene niveles de cortesía. Las frases que terminan en -요 y -니다 son seguras con cualquier persona. Las sílabas suenan parejas, casi sin acento fuerte.',
      items: [
        ['안녕하세요', 'an-nyong-ha-se-yo', 'Hola'],
        ['안녕히 가세요', 'an-nyong-hi ga-se-yo', 'Adiós (a quien se va)'],
        ['감사합니다', 'gam-sa-ham-ni-da', 'Gracias'],
        ['죄송합니다', 'chue-song-ham-ni-da', 'Lo siento'],
        ['네', 'ne', 'Sí'],
        ['아니요', 'a-ni-yo', 'No'],
        ['처음 뵙겠습니다', 'cho-um buep-get-sum-ni-da', 'Mucho gusto (primera vez)'],
        ['저는 나디아예요', 'cho-nun Nadia-ye-yo', 'Soy Nadia'],
      ],
    },
    {
      title: 'Vocales del Hangul',
      tip: 'El Hangul se aprende en uno o dos días: cada letra es un sonido. Las dos vocales que no existen en español: ㅓ (eo) es una o abierta y ㅡ (eu) es una u con los labios estirados, como sonriendo.',
      items: [
        ['아', 'a', 'sonido "a"'],
        ['어', 'eo (o abierta)', 'sonido "eo"'],
        ['오', 'o', 'sonido "o"'],
        ['우', 'u', 'sonido "u"'],
        ['으', 'eu (u sin redondear)', 'sonido "eu"'],
        ['이', 'i', 'sonido "i"'],
        ['에', 'e', 'sonido "e"'],
        ['애', 'e abierta', 'sonido "ae"'],
      ],
    },
    {
      title: 'Números del 1 al 10',
      tip: 'Hay dos sistemas de números. Estos (일, 이, 삼...) se usan para fechas, dinero y teléfonos. El otro sistema lo vemos más adelante.',
      items: [
        ['일', 'il', 'uno'],
        ['이', 'i', 'dos'],
        ['삼', 'sam', 'tres'],
        ['사', 'sa', 'cuatro'],
        ['오', 'o', 'cinco'],
        ['육', 'yuk', 'seis'],
        ['칠', 'chil', 'siete'],
        ['팔', 'pal', 'ocho'],
        ['구', 'gu', 'nueve'],
        ['십', 'sip', 'diez'],
      ],
    },
  ],
  ja: [
    {
      title: 'Saludos',
      tip: 'El japonés suena parejo: todas las sílabas duran más o menos lo mismo y casi no hay acento fuerte. En こんにちは la última letra se escribe は pero se dice "wa".',
      items: [
        ['こんにちは', 'kon-ni-chi-wa', 'Hola (de día)'],
        ['おはようございます', 'o-ha-yo go-za-i-mas', 'Buen día (a la mañana)'],
        ['こんばんは', 'kom-ban-wa', 'Buenas noches (al llegar)'],
        ['ありがとう', 'a-ri-ga-tó', 'Gracias'],
        ['すみません', 'su-mi-ma-sen', 'Disculpe / perdón'],
        ['はい', 'jai', 'Sí'],
        ['いいえ', 'í-e', 'No'],
        ['はじめまして', 'ja-yi-me-ma-shi-te', 'Mucho gusto'],
        ['わたしはナディアです', 'wa-ta-shi wa Nadia des', 'Soy Nadia'],
      ],
    },
    {
      title: 'Vocales y primeros hiragana',
      tip: 'Solo hay 5 vocales y son iguales a las del español, pero la u se dice con los labios relajados, sin redondear. Hoy: la fila あ (vocales) y la fila か (ka, ki, ku, ke, ko).',
      items: [
        ['あ', 'a', 'sonido "a"'],
        ['い', 'i', 'sonido "i"'],
        ['う', 'u (labios relajados)', 'sonido "u"'],
        ['え', 'e', 'sonido "e"'],
        ['お', 'o', 'sonido "o"'],
        ['か', 'ka', 'sonido "ka"'],
        ['き', 'ki', 'sonido "ki"'],
        ['く', 'ku', 'sonido "ku"'],
        ['け', 'ke', 'sonido "ke"'],
        ['こ', 'ko', 'sonido "ko"'],
      ],
    },
    {
      title: 'Números del 1 al 10',
      tip: 'El 4 se dice "yon" o "shi" y el 7 "nana" o "shichi". Para empezar quedate con "yon" y "nana". Las vocales largas (ō, ū) duran el doble.',
      items: [
        ['いち', 'i-chi', 'uno'],
        ['に', 'ni', 'dos'],
        ['さん', 'san', 'tres'],
        ['よん', 'yon', 'cuatro'],
        ['ご', 'go', 'cinco'],
        ['ろく', 'ro-ku', 'seis'],
        ['なな', 'na-na', 'siete'],
        ['はち', 'ja-chi', 'ocho'],
        ['きゅう', 'kiú', 'nueve'],
        ['じゅう', 'yiú', 'diez'],
      ],
    },
  ],
  tr: [
    {
      title: 'Saludos',
      tip: 'El turco se pronuncia como se escribe y el golpe de voz va casi siempre en la última sílaba (marcado en MAYÚSCULAS). Cada letra tiene un solo sonido. La h es una h suave, mucho más débil que la j del español, y entre consonante y vocal casi no se oye: "merhaba" suena como "meraba".',
      items: [
        ['Merhaba', 'me-ra-BA', 'Hola'],
        ['Günaydın', 'gün-ay-DIN', 'Buen día'],
        ['İyi akşamlar', 'i-yi ak-sham-LAR', 'Buenas tardes / noches'],
        ['Teşekkür ederim', 'te-shek-KÜR e-de-RIM', 'Gracias'],
        ['Lütfen', 'lüt-FEN', 'Por favor'],
        ['Evet', 'e-VET', 'Sí'],
        ['Hayır', 'ha-YIR', 'No'],
        ['Memnun oldum', 'mem-NUN ol-DUM', 'Mucho gusto'],
        ['Benim adım Nadia', 'be-NIM a-DIM Nadia', 'Me llamo Nadia'],
        ['Görüşürüz', 'gë-rü-shü-RÜZ', 'Nos vemos'],
      ],
    },
    {
      title: 'Letras especiales',
      tip: 'La ı (sin punto) es una i dicha sin sonreír, un sonido seco entre i y u. La ö y la ü son como la ë y la ü del francés. La ş suena "sh", la ç suena "ch" y la ğ no se pronuncia: alarga la vocal anterior.',
      items: [
        ['ışık', 'ı-SHIK', 'luz'],
        ['göz', 'gëz', 'ojo'],
        ['gül', 'gül', 'rosa'],
        ['şeker', 'she-KER', 'azúcar'],
        ['çay', 'chai', 'té'],
        ['dağ', 'daa', 'montaña'],
      ],
    },
    {
      title: 'Números del 1 al 10',
      tip: 'En turco los sufijos cambian según las vocales de la palabra (armonía vocálica). Por ahora solo escuchá y repetí los números.',
      items: [
        ['bir', 'bir', 'uno'],
        ['iki', 'i-ki', 'dos'],
        ['üç', 'üch', 'tres'],
        ['dört', 'dërt', 'cuatro'],
        ['beş', 'besh', 'cinco'],
        ['altı', 'al-tı', 'seis'],
        ['yedi', 'ye-di', 'siete'],
        ['sekiz', 'se-kiz', 'ocho'],
        ['dokuz', 'do-kuz', 'nueve'],
        ['on', 'on', 'diez'],
      ],
    },
  ],
}

export const LESSONS = Object.fromEntries(
  Object.entries(raw).map(([lang, lessons]) => [
    lang,
    lessons.map((lesson, li) => {
      const id = `${lang}-${li + 1}`
      return {
        id,
        lang,
        title: lesson.title,
        tip: lesson.tip,
        items: lesson.items.map(([text, pron, es], ii) => ({
          id: `${id}-${ii + 1}`,
          lang,
          lessonId: id,
          text,
          pron,
          es,
        })),
      }
    }),
  ])
)

export const itemsOf = (lang) => LESSONS[lang].flatMap((l) => l.items)
