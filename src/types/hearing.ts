export type HearingType = 'thematic' | 'territorial' | 'meeting'

export interface Hearing {
  id: string
  num: string
  local: string
  date: string
  type: HearingType
  created: string
  updated: string
}
