import pb from '@/lib/pocketbase/client'
import { Hearing } from '@/types/hearing'

export const getHearings = async (): Promise<Hearing[]> => {
  return pb.collection('hearings').getFullList<Hearing>({
    sort: '-date',
  })
}

export const getHearing = async (id: string): Promise<Hearing> => {
  return pb.collection('hearings').getOne<Hearing>(id)
}

export const createHearing = async (data: Partial<Hearing>): Promise<Hearing> => {
  return pb.collection('hearings').create<Hearing>(data)
}

export const updateHearing = async (id: string, data: Partial<Hearing>): Promise<Hearing> => {
  return pb.collection('hearings').update<Hearing>(id, data)
}

export const deleteHearing = async (id: string): Promise<void> => {
  return pb.collection('hearings').delete(id)
}
