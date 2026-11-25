import { useCallback, useEffect, useRef, useState } from 'react'

export function formatCountdown(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  return `${String(minutes).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
}

export function useCountdown() {
  const [remaining, setRemaining] = useState<number | null>(null)
  const [running, setRunning] = useState(false)
  const timeout = useRef<number | null>(null)
  const deadline = useRef(0)
  const paused = useRef<number | null>(null)
  const onExpire = useRef<(() => void) | undefined>(undefined)

  const stopTimer = useCallback(() => {
    if (timeout.current !== null) window.clearInterval(timeout.current)
    timeout.current = null
  }, [])

  const begin = useCallback((milliseconds: number) => {
    stopTimer()
    deadline.current = performance.now() + milliseconds
    paused.current = null
    setRemaining(Math.ceil(milliseconds / 1000))
    setRunning(true)
    const tick = () => {
      const seconds = Math.max(0, Math.ceil((deadline.current - performance.now()) / 1000))
      setRemaining(seconds)
      if (seconds === 0) {
        stopTimer()
        setRunning(false)
        onExpire.current?.()
      }
    }
    if (milliseconds <= 0) tick()
    else timeout.current = window.setInterval(tick, 100)
  }, [stopTimer])

  const start = useCallback((seconds: number, callback?: () => void) => {
    onExpire.current = callback
    begin(seconds * 1000)
  }, [begin])

  const reset = useCallback(() => {
    stopTimer()
    onExpire.current = undefined
    paused.current = null
    setRemaining(null)
    setRunning(false)
  }, [stopTimer])

  const pause = useCallback(() => {
    if (timeout.current === null) return
    paused.current = Math.max(0, deadline.current - performance.now())
    stopTimer()
    setRemaining(Math.ceil(paused.current / 1000))
    setRunning(false)
  }, [stopTimer])

  const resume = useCallback(() => {
    if (paused.current !== null) begin(paused.current)
  }, [begin])

  useEffect(() => stopTimer, [stopTimer])

  return { remaining, running, start, reset, pause, resume }
}

type AudioState = 'idle' | 'loading' | 'playing' | 'played' | 'error'

export function usePracticeAudio(src: string | undefined, timed: boolean, onComplete?: () => void) {
  const [state, setState] = useState<AudioState>('idle')
  const [hasPlayed, setHasPlayed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const active = useRef<{ dispose: () => void } | null>(null)
  const played = useRef(false)
  const completion = useRef(onComplete)

  useEffect(() => { completion.current = onComplete }, [onComplete])
  useEffect(() => () => { active.current?.dispose() }, [src, timed])

  const stop = useCallback(() => {
    if (!active.current) return
    active.current.dispose()
    setState(played.current ? 'played' : 'idle')
  }, [])

  const play = useCallback(() => {
    if (!src || active.current || (timed && played.current)) return

    const element = new Audio()
    let watchdog: number | null = null
    function clearWatchdog() {
      if (watchdog !== null) window.clearTimeout(watchdog)
      watchdog = null
    }

    const playback = {
      dispose() {
        clearWatchdog()
        element.onended = null
        element.onerror = null
        element.onplaying = null
        element.onwaiting = null
        element.onstalled = null
        element.pause()
        element.removeAttribute('src')
        element.load()
        if (active.current === playback) active.current = null
      },
    }
    function fail(message: string) {
      if (active.current !== playback) return
      playback.dispose()
      setError(message)
      setState('error')
    }
    function watchForStall() {
      clearWatchdog()
      watchdog = window.setTimeout(() => {
        fail('Đã chờ quá lâu để phát audio. Hãy kiểm tra kết nối và thử lại.')
      }, 12000)
    }

    active.current = playback
    setError(null)
    setState('loading')
    element.onplaying = () => {
      if (active.current !== playback) return
      clearWatchdog()
      setState('playing')
    }
    element.onwaiting = watchForStall
    element.onstalled = () => {
      if (element.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) watchForStall()
    }
    element.onended = () => {
      if (active.current !== playback) return
      playback.dispose()
      played.current = true
      setHasPlayed(true)
      setState('played')
      completion.current?.()
    }
    element.onerror = () => fail('Audio không phát được. Bạn có thể thử lại hoặc chọn bài khác.')
    element.src = src
    watchForStall()
    void element.play().catch(() => fail('Trình duyệt chưa phát được audio. Kiểm tra âm lượng và thử lại.'))
  }, [src, timed])

  return { state, hasPlayed, error, play, stop }
}

export type PracticeAudio = ReturnType<typeof usePracticeAudio>

export function PracticeAudioControls({
  audio, timed, disabled = false,
}: {
  audio: PracticeAudio
  timed: boolean
  disabled?: boolean
}) {
  const busy = audio.state === 'loading' || audio.state === 'playing'
  const onlyOnce = timed && audio.hasPlayed
  let label = 'Phát audio'
  if (audio.state === 'error') label = 'Thử phát lại'
  else if (audio.hasPlayed && !onlyOnce) label = 'Nghe lại'
  else if (onlyOnce) label = 'Đã phát một lần'

  return (
    <div className="media-panel">
      <div className="media-actions">
        <button className="button secondary" type="button" onClick={audio.play} disabled={disabled || busy || onlyOnce}>
          {label}
        </button>
        <span className="media-status" role="status">
          {audio.state === 'loading' && 'Đang tải audio…'}
          {audio.state === 'playing' && 'Đang phát audio…'}
          {audio.state === 'idle' && (timed ? 'Audio chỉ phát một lần.' : 'Bạn có thể nghe lại trong chế độ Học.')}
          {audio.state === 'played' && 'Audio đã phát xong.'}
        </span>
      </div>
      {audio.error && (
        <p className="media-error" role="alert">{audio.error} Sự cố này không được tính là một lượt làm sai.</p>
      )}
    </div>
  )
}

type RecorderState = 'idle' | 'requesting' | 'ready' | 'recording' | 'stopping' | 'recorded' | 'fallback'

function stopTracks(stream: MediaStream | null) {
  stream?.getTracks().forEach(track => track.stop())
}

export function useSpeakingRecorder(timed: boolean) {
  const [state, setState] = useState<RecorderState>('idle')
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null)
  const [hasRecorded, setHasRecorded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const stateRef = useRef<RecorderState>('idle')
  const generation = useRef(0)
  const used = useRef(false)
  const streamRef = useRef<MediaStream | null>(null)
  const requestRef = useRef<Promise<MediaStream | null> | null>(null)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const recordingRef = useRef<string | null>(null)

  const transition = useCallback((nextState: RecorderState) => {
    stateRef.current = nextState
    setState(nextState)
  }, [])

  const release = useCallback(() => {
    generation.current += 1
    requestRef.current = null
    const recorder = recorderRef.current
    if (recorder) {
      recorder.ondataavailable = null
      recorder.onstop = null
      recorder.onerror = null
      if (recorder.state !== 'inactive') recorder.stop()
      recorderRef.current = null
    }
    stopTracks(streamRef.current)
    streamRef.current = null
    if (recordingRef.current) {
      URL.revokeObjectURL(recordingRef.current)
      recordingRef.current = null
    }
  }, [])

  useEffect(() => release, [release])

  const clear = useCallback(() => {
    release()
    setRecordingUrl(null)
    setError(null)
    transition('idle')
  }, [release, transition])

  const decline = useCallback(() => {
    clear()
    transition('fallback')
  }, [clear, transition])

  const prepare = useCallback((): Promise<MediaStream | null> => {
    if (timed && used.current) return Promise.resolve(null)
    if (streamRef.current) return Promise.resolve(streamRef.current)
    if (requestRef.current) return requestRef.current
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setError('Thiết bị hoặc trình duyệt này chưa hỗ trợ ghi âm ở đây.')
      transition('fallback')
      return Promise.resolve(null)
    }

    const requestedGeneration = generation.current
    setError(null)
    transition('requesting')
    const request = navigator.mediaDevices.getUserMedia({ audio: true }).then(
      stream => {
        if (requestedGeneration !== generation.current) {
          stopTracks(stream)
          return null
        }
        requestRef.current = null
        streamRef.current = stream
        transition('ready')
        return stream
      },
      () => {
        if (requestedGeneration === generation.current) {
          requestRef.current = null
          setError('Không mở được mic. Bạn có thể kiểm tra quyền mic hoặc tiếp tục tự luyện.')
          transition('fallback')
        }
        return null
      },
    )
    requestRef.current = request
    return request
  }, [timed, transition])

  const record = useCallback(async () => {
    if (recorderRef.current || (timed && used.current)) return
    const startingGeneration = generation.current
    const stream = timed ? streamRef.current : await prepare()
    if (!stream || startingGeneration !== generation.current || recorderRef.current || (timed && used.current)) return

    const chunks: Blob[] = []
    const showFailure = () => {
      release()
      setRecordingUrl(null)
      setError('Không ghi được âm thanh. Bạn vẫn có thể tự luyện và nộp bài.')
      transition('fallback')
    }

    try {
      const recorder = new MediaRecorder(stream)
      recorder.ondataavailable = ({ data }) => {
        if (data.size) chunks.push(data)
      }
      recorder.onstop = () => {
        if (recorderRef.current !== recorder) return
        recorderRef.current = null
        stopTracks(stream)
        streamRef.current = null
        if (recordingRef.current) URL.revokeObjectURL(recordingRef.current)
        const recording = new Blob(chunks, { type: recorder.mimeType || chunks[0]?.type })
        if (!recording.size) {
          showFailure()
          return
        }
        const url = URL.createObjectURL(recording)
        recordingRef.current = url
        setRecordingUrl(url)
        transition('recorded')
      }
      recorder.onerror = () => {
        if (recorderRef.current === recorder) showFailure()
      }
      recorder.start()
      recorderRef.current = recorder
      if (recordingRef.current) {
        URL.revokeObjectURL(recordingRef.current)
        recordingRef.current = null
        setRecordingUrl(null)
      }
      used.current = true
      setHasRecorded(timed)
      transition('recording')
    } catch {
      showFailure()
    }
  }, [prepare, release, timed, transition])

  const stop = useCallback(() => {
    const recorder = recorderRef.current
    if (recorder && recorder.state !== 'inactive' && stateRef.current === 'recording') {
      transition('stopping')
      recorder.stop()
    } else if (stateRef.current === 'requesting' || stateRef.current === 'ready') {
      clear()
    }
  }, [clear, transition])

  return { state, recordingUrl, hasRecorded, error, prepare, record, stop, clear, decline }
}

export type SpeakingRecorder = ReturnType<typeof useSpeakingRecorder>

export function SpeakingRecorderControls({
  recorder, canRecord, disabled = false, timed = false,
}: {
  recorder: SpeakingRecorder
  canRecord: boolean
  disabled?: boolean
  timed?: boolean
}) {
  const { state } = recorder
  const busy = state === 'requesting' || state === 'stopping'
  const recording = state === 'recording'
  const mayUseMic = !recorder.hasRecorded && !recording && state !== 'recorded' && (!timed || !canRecord || state === 'ready')
  const mayRecord = canRecord && (!timed || state === 'ready')

  return (
    <div className="media-panel">
      <div className="media-actions">
        {mayUseMic && (
          <button
            className="button secondary"
            type="button"
            onClick={() => { void (mayRecord ? recorder.record() : recorder.prepare()) }}
            disabled={disabled || busy || (state === 'ready' && !canRecord)}
          >
            {mayRecord ? 'Ghi âm' : 'Bật mic'}
          </button>
        )}
        {recording && (
          <button className="button secondary" type="button" onClick={recorder.stop}>Dừng ghi</button>
        )}
        {!recording && !recorder.hasRecorded && state !== 'recorded' && state !== 'fallback' && (
          <button className="button ghost" type="button" onClick={recorder.decline} disabled={disabled}>
            Luyện không dùng mic
          </button>
        )}
        <span className="media-status" role="status">
          {state === 'idle' && !recorder.hasRecorded && (
            timed && canRecord ? 'Bạn có thể nói thành tiếng và tự đánh giá sau khi nộp.' : 'Bản ghi chỉ tồn tại trong bài này.'
          )}
          {state === 'requesting' && 'Đang chờ quyền sử dụng mic…'}
          {state === 'ready' && 'Mic đã sẵn sàng.'}
          {state === 'recording' && 'Đang ghi âm…'}
          {state === 'stopping' && 'Đang chuẩn bị bản ghi…'}
          {state === 'recorded' && 'Bạn có thể nghe lại bản ghi của mình.'}
          {state === 'fallback' && 'Hãy nói thành tiếng và tự đánh giá sau khi nộp.'}
          {state === 'idle' && recorder.hasRecorded && 'Bản ghi đã được xoá.'}
        </span>
      </div>
      {recorder.error && <p className="media-error" role="alert">{recorder.error}</p>}
      {recorder.recordingUrl && (
        <div className="media-actions">
          <audio className="recording-preview" controls preload="metadata" src={recorder.recordingUrl} aria-label="Nghe lại bản ghi của bạn" />
          <button className="button ghost" type="button" onClick={recorder.clear}>Xoá bản ghi</button>
        </div>
      )}
    </div>
  )
}
