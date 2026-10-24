export const recordingSupported =
  typeof navigator !== 'undefined' &&
  Boolean(navigator.mediaDevices?.getUserMedia) &&
  typeof window !== 'undefined' &&
  typeof window.MediaRecorder !== 'undefined'

const MAX_MS = 15000

// Núcleo común: graba el micrófono y entrega { blob, mime }. Corta solo a los 15 segundos.
async function begin({ onTimeout } = {}) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  const mime = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'].find((m) =>
    window.MediaRecorder.isTypeSupported?.(m)
  )
  const recorder = new window.MediaRecorder(stream, mime ? { mimeType: mime } : undefined)
  const chunks = []
  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size) chunks.push(e.data)
  }

  const finished = new Promise((resolve) => {
    recorder.onstop = () => {
      stream.getTracks().forEach((t) => t.stop())
      const type = (recorder.mimeType || mime || 'audio/webm').split(';')[0]
      resolve({ blob: new Blob(chunks, { type }), mime: type })
    }
  })

  let stoppedByUser = false
  recorder.start()
  const timer = setTimeout(() => {
    if (recorder.state !== 'inactive' && !stoppedByUser) {
      recorder.stop()
      finished.then((r) => onTimeout && onTimeout(r))
    }
  }, MAX_MS)

  return {
    stop() {
      stoppedByUser = true
      clearTimeout(timer)
      if (recorder.state !== 'inactive') recorder.stop()
      return finished
    },
  }
}

// Para el práctico: devuelve { stop() } que resuelve con la URL del audio grabado.
export async function startRecording({ onTimeout } = {}) {
  const rec = await begin({ onTimeout: onTimeout && ((r) => onTimeout(URL.createObjectURL(r.blob))) })
  return { stop: () => rec.stop().then((r) => URL.createObjectURL(r.blob)) }
}

// Para el estudio de voces: devuelve { stop() } que resuelve con { blob, mime }.
export const startRecordingBlob = begin

export function playUrl(url) {
  return new Promise((resolve) => {
    const audio = new Audio(url)
    audio.onended = resolve
    audio.onerror = resolve
    audio.play().catch(resolve)
  })
}
