export const recordingSupported =
  typeof navigator !== 'undefined' &&
  Boolean(navigator.mediaDevices?.getUserMedia) &&
  typeof window !== 'undefined' &&
  typeof window.MediaRecorder !== 'undefined'

const MAX_MS = 15000

// Empieza a grabar el micrófono. Devuelve { stop() } que resuelve con la URL del audio grabado.
// Si pasan 15 segundos sin que se detenga, corta sola y avisa por onTimeout(url).
export async function startRecording({ onTimeout } = {}) {
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
      const type = recorder.mimeType || mime || 'audio/webm'
      resolve(URL.createObjectURL(new Blob(chunks, { type })))
    }
  })

  let stoppedByUser = false
  recorder.start()
  const timer = setTimeout(() => {
    if (recorder.state !== 'inactive' && !stoppedByUser) {
      recorder.stop()
      finished.then((url) => onTimeout && onTimeout(url))
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

export function playUrl(url) {
  return new Promise((resolve) => {
    const audio = new Audio(url)
    audio.onended = resolve
    audio.onerror = resolve
    audio.play().catch(resolve)
  })
}
