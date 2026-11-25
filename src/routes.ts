import { useEffect, useState } from 'react'
import { type Mode, type QuestionType, type Skill } from './data/types'

export const homeHref = '#/'
export const progressHref = '#/tien-do'
export const setsHref = '#/bo-luyen'
export const skillHref = (skill: Skill) => `#/ky-nang/${skill}`
export const typeHref = (type: QuestionType) => `#/dang-bai/${type}`
export function questionHref(id: string, mode: Mode = 'study', setId?: string) {
  const query = new URLSearchParams()
  if (mode === 'timed') query.set('mode', 'timed')
  if (setId) query.set('set', setId)
  return `#/bai/${id}${query.size ? `?${query}` : ''}`
}

const readHash = () => window.location.hash.slice(1) || '/'

export function useRoute() {
  const [hash, setHash] = useState(readHash)
  useEffect(() => {
    const handleChange = () => {
      setHash(readHash())
      window.scrollTo(0, 0)
      requestAnimationFrame(() => document.querySelector<HTMLElement>('#main')?.focus({ preventScroll: true }))
    }
    window.addEventListener('hashchange', handleChange)
    return () => window.removeEventListener('hashchange', handleChange)
  }, [])
  const [path, query] = hash.split('?')
  const [section, id] = path.split('/').filter(Boolean)
  const params = new URLSearchParams(query)
  const mode: Mode = params.get('mode') === 'timed' ? 'timed' : 'study'
  return { section, id, mode, setId: params.get('set') }
}
