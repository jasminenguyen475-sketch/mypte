import { Fragment, useId, useState } from 'react'
import { formats, type Question } from './data/types'

export type Answer = string | string[] | number[]
export type PracticeScore = { correct: number; total: number }

const writingTargets = {
  'written-summary': { min: 5, max: 75, form: 'một câu' },
  essay: { min: 200, max: 300 },
  'spoken-summary': { min: 50, max: 70 },
} as const

function writingTarget(question: Question) {
  switch (question.type) {
    case 'written-summary':
    case 'essay':
    case 'spoken-summary':
      return writingTargets[question.type]
    default:
      return undefined
  }
}

function textAnswer(answer: Answer): string {
  return typeof answer === 'string' ? answer : ''
}

function stringAnswers(answer: Answer): string[] {
  return Array.isArray(answer) ? answer.filter((value): value is string => typeof value === 'string') : []
}

function numberAnswers(answer: Answer): number[] {
  return Array.isArray(answer) ? answer.filter((value): value is number => typeof value === 'number') : []
}

function words(value: string): string[] {
  return value.match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu) ?? []
}

function normalized(value: string): string {
  return value.trim().toLowerCase().replaceAll('’', "'")
}

export function initialAnswer(question: Question, draft = ''): Answer {
  if (formats[question.type].selection) return []
  switch (question.type) {
    case 'written-summary':
    case 'essay':
      return draft
    case 'reorder':
      return question.parts?.map((_, index) => index) ?? []
    case 'incorrect-words':
      return []
    case 'reading-dropdown':
    case 'reading-drag':
    case 'listening-blanks':
      return (question.answers ?? []).map(() => '')
    default:
      return ''
  }
}

export function hasAnswer(question: Question, answer: Answer): boolean {
  switch (question.type) {
    case 'read-aloud':
    case 'repeat-sentence':
    case 'describe-image':
    case 'respond-situation':
    case 'group-discussion':
    case 'reorder':
      return true
    default:
      if (typeof answer === 'string') return words(answer).length > 0
      return answer.some((item) => typeof item === 'number' || Boolean(item.trim()))
  }
}

type DictationWord =
  | { kind: 'match' | 'missing'; expected: string }
  | { kind: 'extra'; actual: string }
  | { kind: 'spelling'; actual: string; expected: string }

function similarSpelling(first: string, second: string): boolean {
  const a = normalized(first)
  const b = normalized(second)
  const length = Math.max(a.length, b.length)
  const limit = length >= 7 ? 2 : 1
  if (length < 3 || Math.abs(a.length - b.length) > limit) return false

  const distance = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : i)),
  )
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      distance[i][j] = Math.min(
        distance[i - 1][j] + 1,
        distance[i][j - 1] + 1,
        distance[i - 1][j - 1] + Number(a[i - 1] !== b[j - 1]),
      )
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        distance[i][j] = Math.min(distance[i][j], distance[i - 2][j - 2] + 1)
      }
    }
  }
  return distance[a.length][b.length] <= limit
}

export function compareDictation(expectedText: string, actualText: string): DictationWord[] {
  const expected = words(expectedText)
  const actual = words(actualText)
  const matches = expected.map((target) =>
    actual.map((input) => {
      if (normalized(target) === normalized(input)) return 0
      return similarSpelling(target, input) ? 1 : Number.POSITIVE_INFINITY
    }),
  )
  const cost = Array.from({ length: expected.length + 1 }, () => new Array<number>(actual.length + 1))

  for (let i = expected.length; i >= 0; i -= 1) {
    for (let j = actual.length; j >= 0; j -= 1) {
      if (i === expected.length) {
        cost[i][j] = actual.length - j
      } else if (j === actual.length) {
        cost[i][j] = expected.length - i
      } else {
        cost[i][j] = Math.min(
          cost[i + 1][j] + 1,
          cost[i][j + 1] + 1,
          cost[i + 1][j + 1] + matches[i][j],
        )
      }
    }
  }

  const result: DictationWord[] = []
  let i = 0
  let j = 0
  while (i < expected.length || j < actual.length) {
    const match = matches[i]?.[j]
    if (match !== undefined && cost[i][j] === cost[i + 1][j + 1] + match) {
      result.push(match === 0
        ? { kind: 'match', expected: expected[i] }
        : { kind: 'spelling', expected: expected[i], actual: actual[j] })
      i += 1
      j += 1
    } else if (i < expected.length && cost[i][j] === cost[i + 1][j] + 1) {
      result.push({ kind: 'missing', expected: expected[i] })
      i += 1
    } else {
      result.push({ kind: 'extra', actual: actual[j] })
      j += 1
    }
  }
  return result
}

function picksScore(chosen: number[], expected: number[]): PracticeScore {
  const unique = [...new Set(chosen)]
  const hits = unique.filter((index) => expected.includes(index)).length
  return { correct: Math.max(0, hits - (unique.length - hits)), total: expected.length }
}

function orderedPair(first: number, second: number, expected: number[]): boolean {
  const index = expected.indexOf(first)
  return index >= 0 && expected[index + 1] === second
}

export function evaluateAnswer(question: Question, answer: Answer): PracticeScore | null {
  const expected = question.correct ?? []
  const selected = numberAnswers(answer)
  if (formats[question.type].selection) return picksScore(selected, expected)

  switch (question.type) {
    case 'reading-dropdown':
    case 'reading-drag':
    case 'listening-blanks': {
      const actual = stringAnswers(answer)
      const targets = question.answers ?? []
      return {
        correct: targets.filter((target, index) => normalized(actual[index] ?? '') === normalized(target)).length,
        total: targets.length,
      }
    }
    case 'incorrect-words':
      return picksScore(selected, expected)
    case 'reorder':
      return {
        correct: selected.slice(0, -1).filter((first, index) => orderedPair(first, selected[index + 1], expected)).length,
        total: Math.max(0, expected.length - 1),
      }
    case 'dictation': {
      const compared = compareDictation(question.audio?.transcript ?? '', textAnswer(answer))
      return { correct: compared.filter((word) => word.kind === 'match').length, total: compared.length }
    }
    default:
      return null
  }
}

type AnswerEditorProps = {
  question: Question
  answer: Answer
  onChange: (answer: Answer) => void
  disabled?: boolean
}

function GapEditor({ question, answer, onChange, disabled }: AnswerEditorProps) {
  const actual = stringAnswers(answer)
  const pool = question.options ?? []
  const drag = question.type === 'reading-drag'
  const typeIn = question.type === 'listening-blanks'
  const parts = question.parts ?? []

  function update(index: number, value: string) {
    onChange(actual.map((previous, position) => (position === index ? value : previous)))
  }

  return <>
    {drag && <div className="word-bank">
      <span>Ngân hàng từ</span>
      <ul lang="en">{pool.map((word, index) => <li key={index}>{word}</li>)}</ul>
    </div>}
    <p className="exercise-passage" lang="en">
      {parts.map((part, index) => <Fragment key={index}>
        {part}
        {index < parts.length - 1 && (typeIn
          ? <input
              className="gap-input"
              aria-label={'Chỗ trống ' + (index + 1)}
              value={actual[index] ?? ''}
              disabled={disabled}
              onChange={(event) => update(index, event.target.value)}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              maxLength={100}
            />
          : <select
              className="gap-select"
              aria-label={'Chỗ trống ' + (index + 1)}
              value={actual[index] ?? ''}
              disabled={disabled}
              onChange={(event) => update(index, event.target.value)}
            >
              <option value="" lang="vi">Chỗ trống {index + 1}</option>
              {[...new Set(drag ? pool : question.gapOptions?.[index] ?? [])].map((option) => {
                const usedElsewhere = actual.filter((value, position) => value === option && position !== index).length
                const available = pool.filter((word) => word === option).length
                return <option key={option} value={option} disabled={drag && usedElsewhere >= available}>{option}</option>
              })}
            </select>)}
      </Fragment>)}
    </p>
  </>
}

function ChoiceEditor({ question, answer, onChange, disabled }: AnswerEditorProps) {
  const group = useId()
  const selected = numberAnswers(answer)
  const multiple = formats[question.type].selection === 'multiple'

  function update(index: number) {
    if (!multiple) {
      onChange([index])
      return
    }
    onChange(selected.includes(index) ? selected.filter((item) => item !== index) : [...selected, index])
  }

  return <>
    {question.passage && <p className="exercise-passage" lang="en">{question.passage}</p>}
    <fieldset className="answer-options">
      <legend>{multiple ? 'Chọn tất cả phương án phù hợp' : 'Chọn một đáp án'}</legend>
      {question.options?.map((option, index) => <label className="answer-option" key={index}>
        <input
          name={group}
          type={multiple ? 'checkbox' : 'radio'}
          checked={selected.includes(index)}
          disabled={disabled}
          onChange={() => update(index)}
        />
        <span lang="en">{option}</span>
      </label>)}
    </fieldset>
  </>
}

function ReorderEditor({ question, answer, onChange, disabled }: AnswerEditorProps) {
  const [announcement, setAnnouncement] = useState('')
  const order = numberAnswers(answer)
  const parts = question.parts ?? []

  function move(position: number, offset: number, button: HTMLButtonElement) {
    const destination = position + offset
    if (disabled || destination < 0 || destination >= order.length) return
    const next = order.slice()
    const [item] = next.splice(position, 1)
    next.splice(destination, 0, item)
    onChange(next)
    setAnnouncement('Đã chuyển đoạn ở vị trí ' + (position + 1) + ' sang vị trí ' + (destination + 1) + '.')
    requestAnimationFrame(() => {
      if (button.isConnected && document.activeElement === document.body) button.focus()
    })
  }

  return <>
    <ol className="reorder-list">
      {order.map((item, position) => <li className="reorder-item" key={item}>
        <span lang="en">{parts[item]}</span>
        <div className="reorder-actions">
          <button type="button" aria-disabled={disabled || position === 0}
            aria-label={'Đưa đoạn ở vị trí ' + (position + 1) + ' lên'}
            onClick={(event) => move(position, -1, event.currentTarget)}>Lên</button>
          <button type="button" aria-disabled={disabled || position === order.length - 1}
            aria-label={'Đưa đoạn ở vị trí ' + (position + 1) + ' xuống'}
            onClick={(event) => move(position, 1, event.currentTarget)}>Xuống</button>
        </div>
      </li>)}
    </ol>
    <p role="status" className="sr-only">{announcement}</p>
  </>
}

function HighlightEditor({ question, answer, onChange, disabled }: AnswerEditorProps) {
  const selected = numberAnswers(answer)
  return <div className="highlight-words" lang="en">
    {question.parts?.map((token, index) => <button
      className="highlight-word"
      type="button"
      key={index}
      aria-pressed={selected.includes(index)}
      disabled={disabled}
      onClick={() => onChange(selected.includes(index) ? selected.filter((item) => item !== index) : [...selected, index])}
    >{token}</button>)}
  </div>
}

function ResponseEditor({ question, answer, onChange, disabled }: AnswerEditorProps) {
  const id = useId()
  const value = textAnswer(answer)
  const target = writingTarget(question)
  return <div className="response-field">
    <label htmlFor={id}>{question.type === 'dictation' ? 'Câu bạn nghe được' : 'Câu trả lời của bạn'}</label>
    <textarea
      id={id}
      className="response-input"
      lang="en"
      rows={question.type === 'dictation' ? 3 : 8}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      disabled={disabled}
      autoComplete="off"
      spellCheck={false}
      autoCorrect="off"
      autoCapitalize={question.type === 'dictation' ? 'off' : undefined}
      maxLength={question.type === 'dictation' ? 2000 : undefined}
      aria-describedby={target ? id + '-count' : undefined}
    />
    {target && <p id={id + '-count'} className="response-count">
      <output htmlFor={id}>{words(value).length} từ</output>
      {' · Mục tiêu ' + target.min + '–' + target.max + ' từ'}
      {'form' in target && (' trong ' + target.form)}
    </p>}
  </div>
}

export function AnswerEditor(props: AnswerEditorProps) {
  const { question } = props
  if (formats[question.type].selection) return <div className="answer-editor"><ChoiceEditor {...props} /></div>
  switch (question.type) {
    case 'reading-dropdown':
    case 'reading-drag':
    case 'listening-blanks':
      return <div className="answer-editor"><GapEditor {...props} /></div>
    case 'reorder':
      return <div className="answer-editor"><ReorderEditor {...props} /></div>
    case 'incorrect-words':
      return <div className="answer-editor"><HighlightEditor {...props} /></div>
    case 'written-summary':
    case 'essay':
    case 'spoken-summary':
    case 'dictation':
      return <div className="answer-editor"><ResponseEditor {...props} /></div>
    default:
      return null
  }
}

type DetailProps = { right: boolean; status?: string; actual: string; expected?: string; clue?: string }

function AnswerDetail({ right, status, actual, expected, clue }: DetailProps) {
  return <li className={'answer-detail ' + (right ? 'is-correct' : 'is-incorrect')}>
    <span className="feedback-status">{status ?? (right ? 'Đúng' : 'Sai')}</span>
    {' '}<span lang="en">{actual}</span>
    {expected && <p>Đáp án <strong lang="en">{expected}</strong></p>}
    {clue && <p>{clue}</p>}
  </li>
}

function GapFeedback({ question, answer }: Pick<AnswerEditorProps, 'question' | 'answer'>) {
  const entered = stringAnswers(answer)
  return <ol className="answer-details">
    {question.answers?.map((expected, index) => {
      const actual = entered[index] ?? ''
      const right = normalized(actual) === normalized(expected)
      const status = 'Chỗ trống ' + (index + 1) + ' · ' + (right ? 'Đúng' : (actual ? 'Sai' : 'Bỏ trống'))
      return <AnswerDetail key={index} right={right} actual={actual} status={status}
        expected={right ? undefined : expected} clue={question.clues?.[index]} />
    })}
  </ol>
}

function ChoiceFeedback({ question, answer }: Pick<AnswerEditorProps, 'question' | 'answer'>) {
  const chosen = numberAnswers(answer)
  const expected = question.correct ?? []
  return <>
    <ul className="answer-details">
      {question.options?.map((option, index) => {
        const picked = chosen.includes(index)
        const target = expected.includes(index)
        const status = target ? (picked ? 'Chọn đúng' : 'Bỏ sót đáp án') : (picked ? 'Chọn sai' : 'Phương án sai · đã bỏ qua')
        return <AnswerDetail key={index} right={picked === target} status={status} actual={option} clue={question.clues?.[index]} />
      })}
    </ul>
    {formats[question.type].selection === 'multiple' && <p>Mỗi lựa chọn sai trừ một lựa chọn đúng trong kết quả luyện tập, tối thiểu là 0.</p>}
  </>
}

function ReorderFeedback({ question, answer }: Pick<AnswerEditorProps, 'question' | 'answer'>) {
  const selected = numberAnswers(answer)
  const expected = question.correct ?? []
  const parts = question.parts ?? []
  return <>
    <h3>Thứ tự bạn xếp</h3>
    <ol className="answer-details">
      {selected.map((item, index) => {
        const first = index === 0
        const right = !first && orderedPair(selected[index - 1], item, expected)
        return <li key={item} className={'answer-detail' + (first ? '' : (right ? ' is-correct' : ' is-incorrect'))}>
          {!first && <p className="feedback-status">{right ? 'Nối đúng với đoạn trước' : 'Nối sai với đoạn trước'}</p>}
          <span lang="en">{parts[item]}</span>
        </li>
      })}
    </ol>
    <h3>Thứ tự đúng</h3>
    <ol className="answer-details">
      {expected.map((item, index) => <li className="answer-detail" key={item}>
        <span lang="en">{parts[item]}</span>
        {question.clues?.[index] && <p>{question.clues[index]}</p>}
      </li>)}
    </ol>
  </>
}

function HighlightFeedback({ question, answer }: Pick<AnswerEditorProps, 'question' | 'answer'>) {
  const selected = numberAnswers(answer)
  const expected = question.correct ?? []
  const parts = question.parts ?? []
  const relevant = [...new Set([...expected, ...selected])].sort((a, b) => a - b)
  return <>
    <ul className="answer-details">
      {relevant.map((index) => {
        const target = expected.indexOf(index)
        const picked = selected.includes(index)
        const right = target >= 0 && picked
        const status = target < 0 ? 'Chọn nhầm từ' : (picked ? 'Chọn đúng' : 'Bỏ sót từ')
        return <AnswerDetail key={index} right={right} status={status} actual={parts[index]}
          expected={target < 0 ? undefined : question.answers?.[target]} clue={question.clues?.[target]} />
      })}
    </ul>
    <p>Mỗi từ chọn nhầm trừ một từ chọn đúng trong kết quả luyện tập, tối thiểu là 0.</p>
  </>
}

function DictationFeedback({ question, answer }: Pick<AnswerEditorProps, 'question' | 'answer'>) {
  const diff = compareDictation(question.audio?.transcript ?? '', textAnswer(answer))
  return <>
    <ul className="dictation-diff answer-details">
      {diff.map((word, index) => {
        switch (word.kind) {
          case 'match':
            return <AnswerDetail key={index} right actual={word.expected} />
          case 'missing':
            return <AnswerDetail key={index} right={false} status="Thiếu từ" actual={word.expected} />
          case 'extra':
            return <AnswerDetail key={index} right={false} status="Thừa từ" actual={word.actual} />
          case 'spelling':
            return <AnswerDetail key={index} right={false} status="Sai chính tả hoặc từ gần giống" actual={word.actual} expected={word.expected} />
        }
      })}
    </ul>
    <p>Kết quả bỏ qua viết hoa và dấu câu. Từ thừa làm giảm độ chính xác luyện tập.</p>
  </>
}

const defaultChecks: Partial<Record<Question['type'], string[]>> = {
  'read-aloud': [
    'Mình đã đọc đủ từ và đúng thứ tự.',
    'Mình ngắt nhẹ ở những chỗ hợp lý.',
    'Mình nói đủ rõ để người nghe hiểu.',
  ],
  'repeat-sentence': [
    'Mình lặp lại đủ từ và giữ đúng thứ tự.',
    'Mình nối các cụm từ, ít dừng giữa chừng.',
    'Mình nói đủ rõ để người nghe hiểu.',
  ],
  'describe-image': [
    'Mình nêu nội dung chính và ít nhất một so sánh đáng chú ý.',
    'Mình ít dừng giữa chừng.',
    'Mình nói đủ rõ để người nghe hiểu.',
  ],
  'respond-situation': [
    'Mình trả lời đủ những điều tình huống yêu cầu.',
    'Mình ít dừng giữa chừng.',
    'Mình nói rõ ràng và lịch sự phù hợp với người nghe.',
  ],
  'group-discussion': [
    'Mình nêu đúng ý chính và quan điểm của từng người.',
    'Mình ít dừng giữa chừng.',
    'Mình nói đủ rõ để người nghe hiểu.',
  ],
  'written-summary': [
    'Mình viết đúng một câu trong khoảng 5–75 từ.',
    'Mình giữ ý chính và bỏ chi tiết phụ.',
    'Mình kiểm tra cách nối các ý, viết hoa và dấu câu.',
  ],
  essay: [
    'Mình viết 200–300 từ.',
    'Mình trả lời đúng trọng tâm và nêu rõ quan điểm.',
    'Mỗi đoạn thân bài có luận điểm và ví dụ hoặc lý do hỗ trợ.',
    'Mình đọc lại để sửa câu khó hiểu và lỗi chính tả.',
  ],
  'spoken-summary': [
    'Mình viết 50–70 từ.',
    'Mình giữ chủ đề và các ý chính có trong đoạn nghe.',
    'Mình diễn đạt lại bằng câu hoàn chỉnh và kiểm tra chính tả.',
  ],
}

function WritingReview({ question, answer }: Pick<AnswerEditorProps, 'question' | 'answer'>) {
  const target = writingTarget(question)
  if (!target) return null
  const submitted = textAnswer(answer)
  const count = words(submitted).length
  const inRange = count >= target.min && count <= target.max
  return <section className="answer-sample">
    <h3>Bài bạn nộp</h3>
    <p lang="en">{submitted || '—'}</p>
    <p className={'answer-detail ' + (inRange ? 'is-correct' : 'is-incorrect')}>
      <span className="feedback-status">{inRange ? 'Đạt yêu cầu độ dài' : 'Cần chỉnh độ dài'}</span>
      {' · ' + count + ' từ · Mục tiêu ' + target.min + '–' + target.max + ' từ'}
    </p>
  </section>
}

function ScoreDetails({ question, answer }: Pick<AnswerEditorProps, 'question' | 'answer'>) {
  if (formats[question.type].selection) return <ChoiceFeedback question={question} answer={answer} />
  switch (question.type) {
    case 'reading-dropdown':
    case 'reading-drag':
    case 'listening-blanks':
      return <GapFeedback question={question} answer={answer} />
    case 'reorder':
      return <ReorderFeedback question={question} answer={answer} />
    case 'incorrect-words':
      return <HighlightFeedback question={question} answer={answer} />
    case 'dictation':
      return <DictationFeedback question={question} answer={answer} />
    default:
      return null
  }
}

export function AnswerFeedback({ question, answer }: Pick<AnswerEditorProps, 'question' | 'answer'>) {
  const score = evaluateAnswer(question, answer)
  const checks = writingTarget(question) && question.checklist?.length
    ? question.checklist
    : [...(defaultChecks[question.type] ?? []), ...(question.checklist ?? [])]
  return <section className="answer-feedback" aria-label="Kết quả luyện tập">
    {score && <p className="answer-score">Kết quả luyện tập <strong>{score.correct}/{score.total}</strong></p>}
    <ScoreDetails question={question} answer={answer} />
    <WritingReview question={question} answer={answer} />
    {!!question.outline?.length && <section>
      <h3>Dàn ý gợi ý</h3>
      <ol>{question.outline.map((step, index) => <li key={index}>{step}</li>)}</ol>
    </section>}
    {question.model && <section className="answer-sample">
      <h3>Câu trả lời tham khảo</h3>
      <p lang="en">{question.model}</p>
    </section>}
    <section>
      <h3>{score ? 'Giải thích đáp án' : 'Điểm cần chú ý'}</h3>
      <p>{question.explanation}</p>
    </section>
    {checks.length > 0 && <fieldset className="answer-checklist">
      <legend>Tự đánh giá</legend>
      {checks.map((step, index) => <label key={index}><input type="checkbox" /> <span>{step}</span></label>)}
    </fieldset>}
  </section>
}
