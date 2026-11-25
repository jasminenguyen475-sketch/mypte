import { expect, test } from '@playwright/test'
import { readdirSync } from 'node:fs'
import { questions, questionsForType } from '../src/data'
import { formats, type QuestionType } from '../src/data/types'

test('The 200 original questions have balanced levels and usable answer data', () => {
  expect(questions).toHaveLength(200)
  expect(new Set(questions.map(question => question.id)).size).toBe(200)

  for (const type of Object.keys(formats) as QuestionType[]) {
    const items = questionsForType(type)
    expect(items.map(question => question.difficulty), type).toEqual([
      ...Array(5).fill('foundation'), ...Array(5).fill('exam'),
    ])
    expect(new Set(items.map(question => question.title)).size, type).toBe(10)
  }

  for (const question of questions) {
    const { id, type, audio, correct, options, answers, parts, gapOptions } = question
    const { selection, skill } = formats[type]
    if (skill === 'listening') expect(audio?.transcript, id).toBeTruthy()
    if (selection) {
      expect(options?.length, id).toBeGreaterThanOrEqual(3)
      if (selection === 'single') expect(correct?.length, id).toBe(1)
      else expect(correct?.length, id).toBeGreaterThanOrEqual(2)
      expect(correct?.every(index => Number.isInteger(index) && index >= 0 && index < options!.length), id).toBe(true)
      expect(new Set(correct).size, id).toBe(correct?.length)
    }
    if (type === 'reorder') expect(correct?.slice().sort((a, b) => a - b), id).toEqual(parts?.map((_, index) => index))
    if (type === 'incorrect-words') expect(correct?.every(index => index >= 0 && index < parts!.length), id).toBe(true)
    if (type === 'reading-dropdown' || type === 'reading-drag' || type === 'listening-blanks') {
      expect(answers?.length, id).toBe((parts?.length ?? 0) - 1)
      if (type === 'reading-dropdown') expect(answers?.every((word, i) => gapOptions?.[i].includes(word)), id).toBe(true)
      if (type === 'reading-drag') expect(answers?.every(word => options?.includes(word)), id).toBe(true)
    }
  }

  const audioFiles = questions.flatMap(question => question.audio ? [question.audio.file] : [])
  expect(audioFiles).toHaveLength(110)
  expect(new Set(audioFiles).size).toBe(audioFiles.length)
  expect(audioFiles.sort()).toEqual(readdirSync('public/audio').filter(file => file.endsWith('.mp3')).sort())
})
