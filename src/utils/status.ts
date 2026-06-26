import { HearingType } from '@/types/hearing'

export type Status = 'Realizada' | 'Agendada' | 'A agendar' | 'A definir'

export function getStatus(dateStr: string | undefined, type: HearingType): Status {
  if (!dateStr) return type === 'meeting' ? 'A definir' : 'A agendar'
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const d = new Date(dateStr.replace(' ', 'T'))
  if (isNaN(d.getTime())) return type === 'meeting' ? 'A definir' : 'A agendar'
  d.setHours(0, 0, 0, 0)
  return d < today ? 'Realizada' : 'Agendada'
}

export function getStatusColor(status: Status) {
  switch (status) {
    case 'Realizada':
      return 'bg-[#ecfdf3] text-[#15803d] border-transparent before:content-[""] before:inline-block before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#15803d] before:mr-1.5 inline-flex items-center rounded-full px-2.5 py-0.5'
    case 'Agendada':
      return 'bg-[#eff4ff] text-[#1d4ed8] border-transparent before:content-[""] before:inline-block before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#1d4ed8] before:mr-1.5 inline-flex items-center rounded-full px-2.5 py-0.5'
    case 'A agendar':
      return 'bg-[#fff7ec] text-[#b45309] border-transparent before:content-[""] before:inline-block before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#b45309] before:mr-1.5 inline-flex items-center rounded-full px-2.5 py-0.5'
    case 'A definir':
      return 'bg-[#fef2f2] text-[#dc2626] border-transparent before:content-[""] before:inline-block before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#dc2626] before:mr-1.5 inline-flex items-center rounded-full px-2.5 py-0.5'
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
