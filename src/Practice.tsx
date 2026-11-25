import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight, Bookmark, BookOpen, Check, Clock3, Headphones, Lightbulb, Play, RotateCcw,
} from 'lucide-react'
import { AnswerEditor, AnswerFeedback, evaluateAnswer, hasAnswer, initialAnswer, type Answer } from './Answer'
import { Breadcrumbs } from './Breadcrumbs'
import { questionsForType, typesForSkill, type PracticeSet } from './data'
import { difficultyLabels, formats, skillInfo, type Mode, type Question } from './data/types'
import { formatCountdown, PracticeAudioControls, SpeakingRecorderControls, useCountdown, usePracticeAudio, useSpeakingRecorder } from './media'
import { type useProgress } from './progress'
import { progressHref, questionHref, setsHref, skillHref, typeHref } from './routes'

type Phase = 'ready' | 'preparing' | 'working' | 'expired'
type PracticeProps = { question: Question; mode: Mode; store: ReturnType<typeof useProgress>; set?: PracticeSet }

const pearsonSection = {
  speaking: 'speaking-writing', writing: 'speaking-writing', reading: 'reading', listening: 'listening',
}

function DescribeChart({ chart }: { chart: NonNullable<Question['chart']> }) {
  const max = Math.max(1, ...chart.rows.map(row => row.value))
  return <figure className="chart-card" lang="en">
    <figcaption><strong>{chart.title}</strong><small>{chart.unit}</small></figcaption>
    {chart.rows.map(row => <div className="chart-row" key={row.label}>
      <span>{row.label}</span>
      <span className="chart-track" aria-hidden="true"><span className="chart-bar" style={{ width: `${row.value / max * 100}%` }} /></span>
      <strong>{row.value}</strong>
    </div>)}
  </figure>
}

export function Practice(props: PracticeProps) {
  const [version, setVersion] = useState(0)
  return <Exercise {...props} key={version} retry={() => {
    if (formats[props.question.type].skill === 'writing') props.store.saveDraft(props.question.id, '')
    setVersion(previous => previous + 1)
    window.scrollTo(0, 0)
    requestAnimationFrame(() => document.querySelector<HTMLElement>('#exercise-title')?.focus({ preventScroll: true }))
  }} />
}

function Exercise({ question, mode, store, set, retry }: PracticeProps & { retry: () => void }) {
  const format = formats[question.type]
  const skill = skillInfo[format.skill]
  const speaking = format.skill === 'speaking'
  const writing = format.skill === 'writing'
  const timed = mode === 'timed'
  const [phase, setPhase] = useState<Phase>('ready')
  const [answer, setAnswer] = useState(() => initialAnswer(question, writing ? store.progress.drafts[question.id] : undefined))
  const [submitted, setSubmitted] = useState(false)
  const sent = useRef(false)
  const [showHint, setShowHint] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)
  const timer = useCountdown()
  const recorder = useSpeakingRecorder(timed)
  const replySeconds = question.responseSeconds ?? format.seconds
  const isTimedListening = timed && !!question.audio && !speaking

  function expire() {
    if (speaking) recorder.stop()
    setPhase('expired')
  }

  function startAnswer() {
    setPhase('working')
    timer.start(replySeconds, expire)
  }

  function startSpeaking() {
    if (!format.preparation) {
      startAnswer()
      return
    }
    setPhase('preparing')
    timer.start(format.preparation, startAnswer)
  }

  const audio = usePracticeAudio(
    question.audio && `${import.meta.env.BASE_URL}audio/${question.audio.file}`,
    timed,
    () => { if (timed && speaking) startSpeaking() },
  )

  useEffect(() => {
    store.remember({ questionId: question.id, mode, setId: set?.id })
  }, [store, question.id, mode, set?.id])

  useEffect(() => {
    if (!isTimedListening || submitted) return
    if (audio.state === 'playing' && phase === 'ready') {
      setPhase('working')
      timer.start(replySeconds, () => setPhase('expired'))
    }
    if (audio.state === 'error' && phase !== 'ready') {
      setPhase('ready')
      timer.reset()
    }
  }, [isTimedListening, audio.state, phase, replySeconds, submitted, timer])

  const items = questionsForType(question.type)
  const itemIndex = items.findIndex(item => item.id === question.id)
  const sibling = items[itemIndex + 1]
  const skillTypes = typesForSkill(format.skill)
  const nextType = skillTypes[skillTypes.indexOf(question.type) + 1]
  const setStep = set?.steps.findIndex(step => step.id === question.id) ?? -1
  const nextQuestion = set ? set.steps[setStep + 1] : sibling ?? (nextType && questionsForType(nextType)[0])
  const editable = !submitted && (!timed || phase === 'working')
  const canSubmit = !submitted &&
    (!timed || phase === 'working' || phase === 'expired') &&
    (!question.audio || (audio.hasPlayed && audio.state !== 'playing' && audio.state !== 'loading' && audio.state !== 'error')) &&
    hasAnswer(question, answer)
  const marked = store.progress.review.includes(question.id)
  const timingText = question.type === 'read-aloud' && question.responseSeconds
    ? `Chuẩn bị 35 giây (Pearson: 30–40 giây) · Nói ${replySeconds} giây gợi ý`
    : format.timing

  function edit(next: Answer) {
    setAnswer(next)
    if (writing && typeof next === 'string') store.saveDraft(question.id, next)
  }

  function submit() {
    if (sent.current || !canSubmit) return
    sent.current = true
    const result = evaluateAnswer(question, answer)
    audio.stop()
    timer.reset()
    if (speaking) recorder.stop()
    store.addAttempt(question.id, mode, result)
    setSubmitted(true)
    requestAnimationFrame(() => {
      const heading = document.querySelector<HTMLElement>('#review-title')
      heading?.focus({ preventScroll: true })
      heading?.scrollIntoView({ block: 'start' })
    })
  }

  return <div className={`skill-${format.skill}`}>
    <Breadcrumbs links={[{ label: skill.name, href: skillHref(format.skill) }, { label: format.label, href: typeHref(question.type) }]} current={question.title} />
    <header className="page-intro">
      <p className="eyebrow" lang="en">{format.label}</p>
      <h1 id="exercise-title" tabIndex={-1} lang="en">{question.title}</h1>
      <p>{format.instruction}</p>
    </header>
    <div className="exercise-layout">
      <div className="exercise-main">
        <section className="panel exercise-panel" aria-label="Bài luyện">
          <div className="exercise-header">
            <div className="exercise-kicker"><span className="skill-count">{difficultyLabels[question.difficulty]}</span><span>{set ? `Câu ${setStep + 1} / ${set.steps.length} trong bộ` : `Câu ${itemIndex + 1} / ${items.length}`}</span></div>
            <nav className="mode-switch" aria-label="Chế độ luyện tập">
              <a className="mode-option" href={questionHref(question.id, 'study', set?.id)} aria-current={!timed ? 'page' : undefined}><BookOpen size={16} aria-hidden="true" /> Học</a>
              <a className="mode-option" href={questionHref(question.id, 'timed', set?.id)} aria-current={timed ? 'page' : undefined}><Clock3 size={16} aria-hidden="true" /> Luyện có giờ</a>
            </nav>
          </div>
          <div className="exercise-controls">
            <p className="timing-caption"><Clock3 size={16} aria-hidden="true" /> {timingText}</p>
            {!submitted && timer.remaining !== null && <div className="timer-display">
              <span>{phase === 'preparing' ? 'Chuẩn bị' : speaking ? 'Trả lời' : 'Thời gian còn lại'}</span>
              <strong role="timer" aria-label="Thời gian còn lại">{formatCountdown(timer.remaining)}</strong>
            </div>}
          </div>
          {phase === 'preparing' && !submitted && <p className="notice" role="status">Đang đếm giờ chuẩn bị. Hãy nghĩ trước các ý bạn sẽ nói.</p>}
          {phase === 'working' && speaking && !submitted && <p className="notice" role="status">Đến lượt trả lời. Bắt đầu nói hoặc bấm Ghi âm nếu mic đã sẵn sàng.</p>}
          {phase === 'expired' && !submitted && <p className="notice" role="status">{timed ? 'Đã hết giờ. Bạn có thể nộp phần đã làm hoặc bắt đầu lại.' : 'Đồng hồ đã hết. Bạn vẫn có thể tiếp tục trong chế độ Học.'}</p>}
          {!submitted && phase === 'ready' && !question.audio && <div className="exercise-actions">
            <button className={`button ${timed ? 'button-primary' : 'button-secondary'}`} type="button" onClick={speaking ? startSpeaking : startAnswer}>
              <Play size={16} aria-hidden="true" /> {timed ? 'Bắt đầu tính giờ' : 'Dùng đồng hồ'}
            </button>
          </div>}
          {question.audio && <div className="media-box">
            <p className="media-label"><Headphones size={17} aria-hidden="true" /> Audio luyện tập · giọng tổng hợp tiếng Anh</p>
            {!submitted && <PracticeAudioControls audio={audio} timed={timed} disabled={phase === 'expired'} />}
            {!submitted && !timed && <button className="button button-ghost" type="button" onClick={() => setShowTranscript(value => !value)} aria-expanded={showTranscript}>
              {showTranscript ? 'Ẩn transcript' : 'Xem transcript'}
            </button>}
            {!submitted && !timed && showTranscript && <div className="transcript"><p lang="en">{question.audio.transcript}</p></div>}
            {!submitted && !timed && phase === 'ready' && <button className="button button-ghost" type="button" onClick={speaking ? startSpeaking : startAnswer} disabled={!audio.hasPlayed || audio.state !== 'played'}>
              <Clock3 size={16} aria-hidden="true" /> Dùng đồng hồ
            </button>}
          </div>}
          {(!timed || phase !== 'ready' || !!question.audio || submitted) && <>
            <p className="question-prompt" lang="en">{question.prompt}</p>
            {(speaking || writing) && question.passage && <div className="reading-passage" lang="en">{question.passage}</div>}
            {question.chart && <DescribeChart chart={question.chart} />}
          </>}
          {!submitted && question.audio && (question.type === 'group-discussion' || question.type === 'spoken-summary') && <div className="exercise-notes">
            <label htmlFor="scratch-notes">Ghi chú khi nghe</label>
            <textarea id="scratch-notes" rows={3} disabled={timed && (phase === 'expired' || (audio.state !== 'playing' && !audio.hasPlayed))} />
          </div>}
          {speaking && <div className="media-box">
            <SpeakingRecorderControls recorder={recorder} canRecord={!timed || phase === 'working'} timed={timed} disabled={submitted || phase === 'expired'} />
          </div>}
          {!submitted && !speaking && (!timed || !!question.audio || phase !== 'ready') && <AnswerEditor question={question} answer={answer} onChange={edit} disabled={!editable} />}
          {!submitted && writing && editable && <p className="draft-note">{store.available ? 'Bản nháp được lưu trên trình duyệt khi bạn gõ.' : 'Bản nháp chỉ có trong phiên hiện tại.'}</p>}
          {!submitted && <div className="exercise-actions">
            <button className="button button-primary" type="button" onClick={submit} disabled={!canSubmit}><Check size={17} aria-hidden="true" /> Nộp bài</button>
            {set && nextQuestion && <a className="button button-ghost" href={questionHref(nextQuestion.id, mode, set.id)}>Bỏ qua câu này <ArrowRight size={17} aria-hidden="true" /></a>}
            {phase === 'expired' && timed && <button className="button button-secondary" type="button" onClick={retry}><RotateCcw size={16} aria-hidden="true" /> Bắt đầu lại</button>}
          </div>}
        </section>
        {submitted && <section className="panel review-panel" aria-labelledby="review-title">
          <h2 id="review-title" tabIndex={-1}>Xem lại bài làm</h2>
          <AnswerFeedback question={question} answer={answer} />
          {question.audio && <details className="transcript" open><summary>Transcript tiếng Anh</summary><p lang="en">{question.audio.transcript}</p></details>}
          <div className="exercise-actions">
            <button className="button button-secondary" type="button" onClick={retry}><RotateCcw size={16} aria-hidden="true" /> Làm lại bài này</button>
            {nextQuestion ? <a className="button button-primary" href={questionHref(nextQuestion.id, mode, set?.id)}>Sang câu tiếp theo <ArrowRight size={17} aria-hidden="true" /></a>
              : <a className="button button-primary" href={set ? progressHref : skillHref(format.skill)}>{set ? 'Xem tiến độ' : 'Chọn dạng bài khác'} <ArrowRight size={17} aria-hidden="true" /></a>}
            <button className="button button-ghost" type="button" onClick={() => store.toggleReview(question.id)} aria-pressed={marked}><Bookmark size={16} aria-hidden="true" /> {marked ? 'Đã đánh dấu cần ôn' : 'Đánh dấu cần ôn'}</button>
          </div>
        </section>}
      </div>
      <aside className="exercise-sidebar">
        <section className="panel">
          <h2><Lightbulb size={20} aria-hidden="true" /> Mẹo làm bài</h2>
          {!timed && !submitted && <><button className="button button-secondary" type="button" onClick={() => setShowHint(value => !value)} aria-expanded={showHint}>{showHint ? 'Ẩn gợi ý' : 'Xem gợi ý'}</button>{showHint && <p>{question.hint}</p>}</>}
          {timed && !submitted && <p>Lời giải và bài mẫu mở sau khi nộp. {question.audio ? 'Bấm phát để bắt đầu nghe. Mỗi lượt luyện có một lần phát thành công.' : 'Bấm bắt đầu để mở bài và chạy đồng hồ.'}</p>}
          {submitted && <p>{question.hint}</p>}
          <a className="text-link" href={`https://www.pearsonpte.com/pte-academic/test-format/${pearsonSection[format.skill]}/`}>Xem cấu trúc trên Pearson <ArrowRight size={16} aria-hidden="true" /></a>
        </section>
        <section className="panel">
          <h2>{set ? set.title : 'Bài cùng dạng'}</h2>
          <ul className="item-list">{(set?.steps ?? items).map(item => <li key={item.id}><a className="item-link" href={questionHref(item.id, mode, set?.id)} aria-current={item.id === question.id ? 'page' : undefined}><span><strong lang="en">{item.title}</strong><small>{set ? skillInfo[formats[item.type].skill].name : difficultyLabels[item.difficulty]}</small></span></a></li>)}</ul>
          {set && <a className="text-link" href={setsHref}>Chọn bộ khác <ArrowRight size={16} aria-hidden="true" /></a>}
        </section>
      </aside>
    </div>
  </div>
}
