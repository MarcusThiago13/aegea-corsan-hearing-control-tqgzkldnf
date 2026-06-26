export type HearingType = 'thematic' | 'territorial' | 'visit' | 'meeting'

export interface Hearing {
  id: string
  num: string
  local: string
  date: string
  type: HearingType
  created: string
  updated: string
}
