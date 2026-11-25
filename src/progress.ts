import { useRef, useState } from 'react'
import { formats, type Mode, type Skill } from './data/types'
import { questions } from './data'

const storageKey = 'pte-tung-buoc.v1'
const questionById = new Map(questions.map(question => [question.id, question]))

export interface Result {
  correct: number
  total: number
}

export interface Attempt {
  questionId: string
  mode: Mode
  at: number
  result: Result | null
}

type Position = Pick<Attempt, 'questionId' | 'mode'> & { setId?: string }
type Progress = {
  attempts: Attempt[]
  drafts: Record<string, string>
  review: string[]
  last: Position | null
}

const emptyProgress = (): Progress => ({ attempts: [], drafts: {}, review: [], last: null })

function readProgress() {
  try {
    const saved = window.localStorage.getItem(storageKey)
    if (!saved) return { progress: emptyProgress(), available: true }
    const data = JSON.parse(saved) as Partial<Progress>
    return {
      available: true,
      progress: {
        attempts: Array.isArray(data.attempts)
          ? data.attempts.filter(attempt => attempt && questionById.has(attempt.questionId) &&
              (attempt.result === null || (attempt.result?.total > 0 && Number.isFinite(attempt.result.correct))) &&
              (attempt.mode === 'study' || attempt.mode === 'timed') && Number.isFinite(attempt.at))
          : [],
        drafts: data.drafts && typeof data.drafts === 'object' ? data.drafts : {},
        review: Array.isArray(data.review) ? data.review.filter(id => questionById.has(id)) : [],
        last: data.last && questionById.has(data.last.questionId) &&
          (data.last.mode === 'study' || data.last.mode === 'timed') ? data.last : null,
      },
    }
  } catch {
    return { progress: emptyProgress(), available: false }
  }
}

export function useProgress() {
  const [snapshot, setSnapshot] = useState(readProgress)
  const current = useRef(snapshot.progress)

  function save(change: (progress: Progress) => Progress) {
    const progress = change(current.current)
    current.current = progress
    let available = true
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(progress))
    } catch {
      available = false
    }
    setSnapshot({ progress, available })
  }

  return {
    ...snapshot,
    remember(position: Position) {
      if (current.current.last?.questionId === position.questionId && current.current.last.mode === position.mode && current.current.last.setId === position.setId) return
      save(progress => ({ ...progress, last: position }))
    },
    saveDraft(questionId: string, value: string) {
      save(progress => {
        const drafts = { ...progress.drafts }
        if (value) drafts[questionId] = value
        else delete drafts[questionId]
        return { ...progress, drafts }
      })
    },
    addAttempt(questionId: string, mode: Mode, result: Result | null) {
      save(progress => {
        const review = new Set(progress.review)
        if (result && result.correct < result.total) review.add(questionId)
        if (result && result.correct === result.total) review.delete(questionId)
        return { ...progress, review: [...review], attempts: [{ questionId, mode, result, at: Date.now() }, ...progress.attempts] }
      })
    },
    toggleReview(questionId: string) {
      save(progress => ({
        ...progress,
        review: progress.review.includes(questionId)
          ? progress.review.filter(id => id !== questionId)
          : [...progress.review, questionId],
      }))
    },
    reset() {
      save(emptyProgress)
    },
  }
}

export function completedCount(attempts: Attempt[], skill?: Skill) {
  return new Set(attempts.filter(attempt => {
    const question = questionById.get(attempt.questionId)
    return question && (!skill || formats[question.type].skill === skill)
  }).map(attempt => attempt.questionId)).size
}

export function accuracy(attempts: Attempt[]) {
  const { correct, total } = attempts.reduce((sum, { result }) => ({
    correct: sum.correct + (result?.correct ?? 0),
    total: sum.total + (result?.total ?? 0),
  }), { correct: 0, total: 0 })
  return total ? Math.round(100 * correct / total) : null
}

export const getQuestion = (id: string) => questionById.get(id)
