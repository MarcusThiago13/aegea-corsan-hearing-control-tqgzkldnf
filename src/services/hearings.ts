import pb from '@/lib/pocketbase/client'
import { Hearing } from '@/types/hearing'

export const getHearings = async (): Promise<Hearing[]> => {
  const records = await pb.collection('hearings').getFullList({
    sort: 'created',
  })
  return records as unknown as Hearing[]
}

export const createHearing = async (data: Partial<Hearing>) => {
  return pb.collection('hearings').create(data)
}

export const updateHearing = async (id: string, data: Partial<Hearing>) => {
  return pb.collection('hearings').update(id, data)
}

export const deleteHearing = async (id: string) => {
  return pb.collection('hearings').delete(id)
}
