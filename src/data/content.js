import { EMOJIS } from './emojis.js'
import { geringoso, geringosoSyllables } from '../lib/geringoso.js'

// Contenido de las lecciones.
// Cada frase: [texto, pronunciación aproximada para hispanohablantes, significado]
// Convenciones: ü = u francesa/turca (decí "i" con labios redondeados), ë = e muy cerrada con labios
// redondeados, MAYÚSCULAS = sílaba fuerte.

export const LANGS = {
  fr: { code: 'fr', name: 'Francés', native: 'Français', tts: 'fr-FR', html: 'fr', voiceKey: 'fr', color: '#2447C9', color2: '#E4323F' },
  pt: { code: 'pt', name: 'Portugués', native: 'Português', tts: 'pt-BR', html: 'pt-BR', voiceKey: 'pt', color: '#0E8A43', color2: '#FFD84D' },
  ko: { code: 'ko', name: 'Coreano', native: '한국어', tts: 'ko-KR', html: 'ko', voiceKey: 'ko', color: '#C9202F', color2: '#1B4FA8' },
  ja: { code: 'ja', name: 'Japonés', native: '日本語', tts: 'ja-JP', html: 'ja', voiceKey: 'ja', color: '#C8102E', color2: '#F7A8BC' },
  tr: { code: 'tr', name: 'Turco', native: 'Türkçe', tts: 'tr-TR', html: 'tr', voiceKey: 'tr', color: '#D20F23', color2: '#FFC9CD' },
  eu: { code: 'eu', name: 'Euskera', native: 'Euskara', tts: 'es-ES', html: 'eu', voiceKey: 'es', approx: true, color: '#D52B1E', color2: '#00873C' },
  qu: { code: 'qu', name: 'Quechua', native: 'Runasimi', tts: 'es-AR', html: 'qu', voiceKey: 'es', approx: true, color: '#C75A0C', color2: '#7B3FA0' },
  gn: { code: 'gn', name: 'Guaraní', native: "Avañe'ẽ", tts: 'es-AR', html: 'gn', voiceKey: 'es', approx: true, color: '#1A6FB5', color2: '#D52B1E' },
  ay: { code: 'ay', name: 'Aimara', native: 'Aymar aru', tts: 'es-AR', html: 'ay', voiceKey: 'es', approx: true, color: '#6A3FB5', color2: '#F59E0B' },
  gr: { code: 'gr', name: 'Geringoso', native: 'Lenguaje de la P', tts: 'es-AR', html: 'es-AR', voiceKey: 'es', color: '#1274BD', color2: '#F6B40E' },
}

export const LANG_ORDER = ['fr', 'pt', 'ko', 'ja', 'tr', 'eu', 'qu', 'gn', 'ay', 'gr']

// Las voces se eligen por grupo: quechua, guaraní, aimara, euskera y geringoso comparten voz en español.
export const VOICE_GROUPS = [
  { key: 'fr', label: 'Francés', tts: 'fr-FR', sample: 'Bonjour' },
  { key: 'pt', label: 'Portugués', tts: 'pt-BR', sample: 'Olá' },
  { key: 'ko', label: 'Coreano', tts: 'ko-KR', sample: '안녕하세요' },
  { key: 'ja', label: 'Japonés', tts: 'ja-JP', sample: 'こんにちは' },
  { key: 'tr', label: 'Turco', tts: 'tr-TR', sample: 'Merhaba' },
  { key: 'es', label: 'Español (quechua, guaraní, aimara, euskera y geringoso)', tts: 'es-AR', sample: 'Hola, ¿cómo estás?' },
]

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
        ['죄송합니다', 'chwe-song-ham-ni-da', 'Lo siento'],
        ['네', 'ne', 'Sí'],
        ['아니요', 'a-ni-yo', 'No'],
        ['처음 뵙겠습니다', 'cho-um bwep-ket-sum-ni-da', 'Mucho gusto (primera vez)'],
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
      tip: 'El japonés suena parejo: todas las sílabas duran más o menos lo mismo y casi no hay acento fuerte. En こんにちは la última letra se escribe は pero se dice "wa". La h japonesa (ha, hi, hai) es una h suave, como en inglés "hat", mucho más débil que la j del español.',
      items: [
        ['こんにちは', 'kon-ni-chi-wa', 'Hola (de día)'],
        ['おはようございます', 'o-ha-yo go-za-i-mas', 'Buen día (a la mañana)'],
        ['こんばんは', 'kom-ban-wa', 'Buenas noches (al llegar)'],
        ['ありがとう', 'a-ri-ga-tó', 'Gracias'],
        ['すみません', 'su-mi-ma-sen', 'Disculpe / perdón'],
        ['はい', 'hai', 'Sí'],
        ['いいえ', 'í-e', 'No'],
        ['はじめまして', 'ha-yi-me-ma-shi-te', 'Mucho gusto'],
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
        ['はち', 'ha-chi', 'ocho'],
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

// ───────── Lenguas nuevas ─────────
// Ojo: el contenido de quechua, guaraní, aimara y euskera está escrito de memoria y con ortografías
// estándar. Conviene que lo revise una persona que hable cada lengua (hay variantes según la región).

const num = (words, prons) => words.map((w, i) => [w, prons[i], String(i + 1)])

raw.pt = [
  {
    title: 'Saludos',
    tip: 'En el portugués de Brasil la d y la t antes de i suenan "dj" y "tch": "bom dia" es "bon DJI-a" y "noite" es "NOI-tchi". La o final sin acento suena como u: "obrigado" es "o-bri-GA-du".',
    items: [
      ['Olá', 'o-LÁ', 'Hola'],
      ['Bom dia', 'bon DJI-a', 'Buen día'],
      ['Boa tarde', 'BO-a TAR-dji', 'Buenas tardes'],
      ['Boa noite', 'BO-a NOI-tchi', 'Buenas noches'],
      ['Tchau', 'chau', 'Chau'],
      ['Obrigada', 'o-bri-GA-da', 'Gracias (dicho por una mujer)'],
      ['Por favor', 'por fa-VOR', 'Por favor'],
      ['Desculpa', 'des-KUL-pa', 'Perdón'],
      ['De nada', 'dji NA-da', 'De nada'],
      ['Meu nome é Nadia', 'meu NO-mi é NA-dia', 'Me llamo Nadia'],
    ],
  },
  {
    title: 'Sonidos clave',
    tip: 'Las vocales nasales (ão, ã) suenan por la nariz. "lh" suena como "ly" y "nh" como la ñ. La r al comienzo de palabra suena como una j suave, casi una h: "rio" es "HI-u".',
    items: [
      ['pão', 'paũ (nasal)', 'pan'],
      ['coração', 'ko-ra-SAUN (nasal)', 'corazón'],
      ['filho', 'FI-lyu', 'hijo'],
      ['ninho', 'NI-ñu', 'nido'],
      ['rio', 'HI-u', 'río'],
      ['gente', 'YEN-tchi', 'gente'],
    ],
  },
  {
    title: 'Números del 1 al 10',
    tip: 'Dois, três, seis y dez terminan con una s suave. Um y uma suenan nasales, como una u que pasa por la nariz.',
    items: num(
      ['um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez'],
      ['ũ', 'dois', 'tres', 'KUA-tru', 'SIN-ku', 'seis', 'SE-tchi', 'OI-tu', 'NO-vi', 'des']
    ),
  },
  {
    title: 'En la cafetería',
    tip: 'En el portugués de Brasil se dice "você" para tratar de vos o de usted, y las frases son parecidas al español pero con otra melodía. Escuchá cómo sube y baja el tono.',
    items: [
      ['Um café, por favor', 'ũ ka-FÉ por fa-VOR', 'Un café, por favor'],
      ['Quanto custa?', 'KUAN-tu KUS-ta', '¿Cuánto cuesta?'],
      ['A conta, por favor', 'a KON-ta por fa-VOR', 'La cuenta, por favor'],
      ['Não entendo', 'nãu en-TEN-du', 'No entiendo'],
      ['Pode repetir?', 'PO-dji he-pe-TCHIR', '¿Puede repetir?'],
      ['Fale mais devagar', 'FA-li mais dji-va-GAR', 'Hable más despacio'],
      ['Onde fica o banheiro?', 'ON-dji FI-ka u ba-ÑEI-ru', '¿Dónde queda el baño?'],
      ['Eu falo um pouco de português', 'eu FA-lu ũ POU-ku dji por-tu-GUÊS', 'Hablo un poco de portugués'],
    ],
  },
]

raw.eu = [
  {
    title: 'Saludos',
    tip: 'El euskera se lee como se escribe y tiene 5 vocales como el español. La x suena "sh" (kaixo = KAI-sho), la tx suena "ch" y la tz suena "ts". La h casi no se pronuncia.',
    items: [
      ['Kaixo', 'KAI-sho', 'Hola'],
      ['Egun on', 'E-gun on', 'Buen día'],
      ['Arratsalde on', 'a-rrat-SAL-de on', 'Buenas tardes'],
      ['Gabon', 'ga-BON', 'Buenas noches'],
      ['Agur', 'a-GUR', 'Chau'],
      ['Eskerrik asko', 'es-KE-rrik AS-ko', 'Muchas gracias'],
      ['Mesedez', 'me-SE-des', 'Por favor'],
      ['Bai', 'bai', 'Sí'],
      ['Ez', 'es', 'No'],
      ['Nire izena Nadia da', 'NI-re i-SE-na Nadia da', 'Me llamo Nadia'],
    ],
  },
  {
    title: 'Sonidos y palabras',
    tip: 'La tx suena como la ch del español, la z suena como una s, y la tz como "ts". Probá decir "txakur" y "etxe" muy marcado: son palabras muy usadas.',
    items: [
      ['txakur', 'cha-KUR', 'perro'],
      ['etxe', 'E-che', 'casa'],
      ['zazpi', 'SAS-pi', 'siete'],
      ['ikastola', 'i-kas-TO-la', 'escuela en euskera'],
      ['gazta', 'GAS-ta', 'queso'],
      ['eguzki', 'e-GUS-ki', 'sol'],
    ],
  },
  {
    title: 'Números del 1 al 10',
    tip: 'La h de "hiru" y "hamar" casi no se pronuncia en el euskera estándar. Los números del 1 al 5 son cortos y muy fáciles de repetir.',
    items: num(
      ['bat', 'bi', 'hiru', 'lau', 'bost', 'sei', 'zazpi', 'zortzi', 'bederatzi', 'hamar'],
      ['bat', 'bi', 'I-ru', 'lau', 'bost', 'sei', 'SAS-pi', 'SOR-tsi', 'be-de-RA-tsi', 'a-MAR']
    ),
  },
  {
    title: 'Frases útiles',
    tip: 'Para preguntar algo se cambia la melodía, igual que en español. "Zer moduz?" es la forma más usada para preguntar "¿cómo andás?" entre amigos.',
    items: [
      ['Zer moduz?', 'ser mo-DUS', '¿Qué tal?'],
      ['Ondo', 'ON-do', 'Bien'],
      ['Ez dut ulertzen', 'es dut u-LER-tsen', 'No entiendo'],
      ['Mesedez, errepikatu', 'me-SE-des e-rre-pi-KA-tu', 'Repetí, por favor'],
      ['Euskaraz ikasten ari naiz', 'eus-KA-ras i-KAS-ten A-ri nais', 'Estoy aprendiendo euskera'],
    ],
  },
]

raw.qu = [
  {
    title: 'Saludos',
    tip: 'Es quechua del sur, el que se habla en Perú, Bolivia y el noroeste argentino (puede variar según la zona). La ll suena como "ly" y la q es una k que sale de más atrás en la garganta. Tiene solo tres vocales: a, i, u.',
    items: [
      ['Rimaykullayki', 'ri-mai-ku-LYAI-ki', 'Mis saludos (muy respetuoso)'],
      ['Allillanchu?', 'a-lyi-LYAN-chu', '¿Cómo estás?'],
      ['Allillanmi', 'a-lyi-LYAN-mi', 'Estoy bien'],
      ['Yusulpayki', 'yu-sul-PAI-ki', 'Gracias'],
      ['Ima sutiyki?', 'I-ma su-TI-ki', '¿Cómo te llamás?'],
      ['Sutiyqa Nadiam', 'su-TI-ka NA-diam', 'Me llamo Nadia'],
      ['Arí', 'a-RI', 'Sí'],
      ['Manan', 'MA-nan', 'No'],
      ['Tupananchiskama', 'tu-pa-nan-chis-KA-ma', 'Hasta que nos volvamos a ver'],
    ],
  },
  {
    title: 'Números del 1 al 10',
    tip: 'La q y la qh de "pichqa" y "qanchis" suenan como una k fuerte, más al fondo de la garganta. Los números se usan mucho en los mercados.',
    items: num(
      ['huk', 'iskay', 'kimsa', 'tawa', 'pichqa', 'suqta', 'qanchis', 'pusaq', 'isqun', 'chunka'],
      ['juk', 'is-KAI', 'KIM-sa', 'TA-wa', 'PICH-ka', 'SOK-ta', 'KAN-chis', 'PU-sak', 'IS-kun', 'CHUN-ka']
    ),
  },
  {
    title: 'Palabras de todos los días',
    tip: 'Muchas palabras quechuas ya las usamos en castellano: wawa (bebé), inti (sol), mayu (río). Escuchá cómo suenan en su origen.',
    items: [
      ['mama', 'MA-ma', 'mamá, señora'],
      ['tayta', 'TAI-ta', 'papá, señor'],
      ['wawa', 'WA-wa', 'bebé'],
      ['yaku', 'YA-ku', 'agua'],
      ['inti', 'IN-ti', 'sol'],
      ['killa', 'KI-lya', 'luna'],
      ['mayu', 'MA-yu', 'río'],
      ['urpi', 'UR-pi', 'paloma'],
      ['sumaq', 'SU-mak', 'lindo, hermoso'],
      ['mikuy', 'MI-kui', 'comer'],
    ],
  },
]

raw.gn = [
  {
    title: 'Saludos',
    tip: 'Es el guaraní que se habla en Paraguay, Corrientes y Misiones. La y es una vocal propia, entre i y u (decí "i" sin sonreír). La ã y la ẽ suenan por la nariz. El apóstrofe (\') es una pausa corta, como en "Mba\'e".',
    items: [
      ["Mba'éichapa?", 'mba-É-i-cha-pa', '¿Cómo estás?'],
      ['Iporã', 'i-po-RÃ', 'Bien, lindo'],
      ['Aguyje', 'a-gu-YE', 'Gracias'],
      ["Ko'ẽ porã", 'ko-Ẽ po-RÃ', 'Buen día'],
      ["Ka'aru porã", 'ka-a-RU po-RÃ', 'Buenas tardes'],
      ['Pyhare porã', 'pi-ha-RE po-RÃ', 'Buenas noches'],
      ['Heẽ', 'he-Ẽ', 'Sí'],
      ['Nahániri', 'na-HA-ni-ri', 'No'],
      ['Che réra Nadia', 'che RE-ra Nadia', 'Me llamo Nadia'],
      ['Jajotopata', 'ya-yo-to-PA-ta', 'Hasta luego'],
    ],
  },
  {
    title: 'Números del 1 al 10',
    tip: 'La j del guaraní suena como la y del español. Del 6 al 9 se arman sumando: po (cinco) + los números del uno al cuatro.',
    items: num(
      ['peteĩ', 'mokõi', 'mbohapy', 'irundy', 'po', 'poteĩ', 'pokõi', 'poapy', 'porundy', 'pa'],
      ['pe-te-Ĩ', 'mo-ko-Ĩ', 'mbo-ha-PY', 'i-run-DY', 'po', 'po-te-Ĩ', 'po-ko-Ĩ', 'po-a-PY', 'po-run-DY', 'pa']
    ),
  },
  {
    title: 'Palabras de todos los días',
    tip: 'Seguro conocés varias: chipa, mandioca, tereré. La palabra "y" (agua) es solo la vocal y del guaraní, una i sin sonreír.',
    items: [
      ['mitã', 'mi-TÃ', 'niño, niña'],
      ['kuarahy', 'kua-ra-HY', 'sol'],
      ['jasy', 'ya-SY', 'luna'],
      ['y', 'y (i sin sonreír)', 'agua'],
      ['tata', 'ta-TA', 'fuego'],
      ["mandi'o", 'man-di-O', 'mandioca'],
      ['chipa', 'CHI-pa', 'chipa'],
      ["ka'a", 'ka-A', 'yerba, hierba'],
    ],
  },
]

raw.ay = [
  {
    title: 'Saludos',
    tip: 'La x suena como una j suave y la q como una k que sale del fondo de la garganta. Las consonantes con apóstrofe o con h (ph, kh) se dicen con un golpecito de aire.',
    items: [
      ['Aski urukipan', 'AS-ki u-ru-KI-pan', 'Buen día'],
      ['Kamisaraki', 'ka-mi-sa-RA-ki', '¿Cómo estás?'],
      ['Waliki', 'wa-LI-ki', 'Estoy bien'],
      ['Yuspagara', 'yus-pa-GA-ra', 'Gracias'],
      ['Jisa', 'JI-sa', 'Sí'],
      ['Janiwa', 'JA-ni-wa', 'No'],
      ['Sutijaxa Nadiawa', 'su-TI-ja-ja NA-dia-wa', 'Me llamo Nadia'],
      ['Jikisiñkama', 'ji-ki-SIN-ka-ma', 'Hasta que nos encontremos'],
    ],
  },
  {
    title: 'Números del 1 al 10',
    tip: 'La x de "suxta" suena como una j suave. "Llätunka" es el nueve: la ll suena "ly".',
    items: num(
      ['maya', 'paya', 'kimsa', 'pusi', 'phisqa', 'suxta', 'paqallqu', 'kimsaqallqu', 'llätunka', 'tunka'],
      ['MA-ya', 'PA-ya', 'KIM-sa', 'PU-si', 'PIS-ka', 'SUJ-ta', 'pa-KAL-ku', 'kim-sa-KAL-ku', 'lya-TUN-ka', 'TUN-ka']
    ),
  },
  {
    title: 'Palabras de todos los días',
    tip: 'Estas palabras se usan en toda la zona del altiplano. Fijate en la q de "jaqi" y "qala": suena más atrás que la k.',
    items: [
      ['uta', 'U-ta', 'casa'],
      ['uma', 'U-ma', 'agua'],
      ['jaqi', 'JA-ki', 'persona'],
      ['phaxsi', 'PAJ-si', 'luna'],
      ['wara', 'WA-ra', 'estrella'],
      ['qala', 'KA-la', 'piedra'],
    ],
  },
]

const gr = (list) => list.map((es) => [geringoso(es), geringosoSyllables(es).toLowerCase(), es])

raw.gr = [
  {
    title: 'Primeras palabras',
    tip: 'La regla: después de cada vocal agregás una p y repetís esa misma vocal. "casa" se vuelve "ca-pa-sa-pa". Decilo rápido y de corrido, ¡como un idioma secreto!',
    items: gr(['Hola', 'Chau', 'Mamá', 'Papá', 'Casa', 'Gato', 'Pelota', 'Amigo']),
  },
  {
    title: 'Frases para jugar',
    tip: 'Con frases más largas se complica: hay que ir sílaba por sílaba. Empezá despacio y después acelerá. Si te trabás, ¡es parte del juego!',
    items: gr([
      '¿Cómo estás?',
      'Vamos a jugar',
      'Qué lindo día',
      'Tengo hambre',
      'Me gusta el chocolate',
      '¿Querés jugar conmigo?',
      'No entiendo',
      'Hasta mañana',
    ]),
  },
  {
    title: 'Números del 1 al 10',
    tip: 'Los números son cortos, así que son ideales para practicar la regla. Probá contar hasta diez de corrido sin equivocarte.',
    items: gr(['Uno', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'Siete', 'Ocho', 'Nueve', 'Diez']),
  },
]

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
        emoji: EMOJIS[lang]?.[li]?.[0] || '🔤',
        items: lesson.items.map(([text, pron, es], ii) => ({
          id: `${id}-${ii + 1}`,
          lang,
          lessonId: id,
          text,
          pron,
          es,
          emoji: EMOJIS[lang]?.[li]?.[ii] || '🔤',
        })),
      }
    }),
  ])
)

export const itemsOf = (lang) => LESSONS[lang].flatMap((l) => l.items)
