import { oralQuestions } from './oral'
import { writtenQuestions } from './written'
import { formats, type Question, type QuestionType, type Skill } from './types'

export const questions = [...oralQuestions, ...writtenQuestions].sort(
  (first, second) => Number(first.difficulty === 'exam') - Number(second.difficulty === 'exam'),
)
export const questionsForType = (type: QuestionType) => questions.filter(question => question.type === type)
export const typesForSkill = (skill: Skill) =>
  (Object.keys(formats) as QuestionType[]).filter(type => formats[type].skill === skill)

function makeSet(id: string, title: string, types: QuestionType[], difficulty: Question['difficulty']) {
  return {
    id, title,
    steps: types.map(type => {
      const question = questionsForType(type).find(item => item.difficulty === difficulty)
      if (!question) throw new Error(`Không có bài ${type} cho bộ ${id}`)
      return question
    }),
  }
}

export const practiceSets = [
  makeSet('nhap-mon', 'Bộ nhập môn', ['read-aloud', 'written-summary', 'reading-dropdown', 'dictation'], 'foundation'),
  makeSet('gan-dang-thi', 'Bộ gần dạng thi', ['describe-image', 'written-summary', 'choice-multiple', 'listening-blanks'], 'exam'),
]

export type PracticeSet = (typeof practiceSets)[number]
