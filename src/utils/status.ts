import { HearingType } from '@/types/hearing'

export type Status = 'Realizada' | 'Agendada' | 'A agendar' | 'A definir'

export function getStatus(dateStr: string | undefined, type: HearingType): Status {
  if (!dateStr) return type === 'meeting' ? 'A definir' : 'A agendar'
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const d = new Date(dateStr)
  d.setHours(0, 0, 0, 0)
  return d < today ? 'Realizada' : 'Agendada'
}

export function getStatusColor(status: Status) {
  switch (status) {
    case 'Realizada':
      return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400'
    case 'Agendada':
      return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400'
    case 'A agendar':
      return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400'
    case 'A definir':
      return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400'
  }
}

export function toInputDate(iso?: string) {
  if (!iso) return ''
  return iso.split(' ')[0]
}

export function fromInputDate(ymd: string) {
  if (!ymd) return ''
  return `${ymd} 12:00:00.000Z`
}

export function formatDateBr(iso?: string) {
  if (!iso) return ''
  const [y, m, d] = iso.split(' ')[0].split('-')
  if (!y || !m || !d) return ''
  return `${d}/${m}/${y}`
}
