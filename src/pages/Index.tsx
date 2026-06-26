import { useState, useEffect } from 'react'
import { Hearing, HearingType } from '@/types/hearing'
import { getHearings, createHearing, updateHearing, deleteHearing } from '@/services/hearings'
import { useRealtime } from '@/hooks/use-realtime'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { Toolbar } from '@/components/dashboard/Toolbar'
import { HearingTable } from '@/components/dashboard/HearingTable'

export default function Index() {
  const [hearings, setHearings] = useState<Hearing[]>([])

  const loadData = async () => {
    try {
      const data = await getHearings()
      setHearings(data)
    } catch (error) {
      console.error('Error loading hearings:', error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useRealtime('hearings', () => {
    loadData()
  })

  const handleAdd = async (type: HearingType) => {
    await createHearing({
      type,
      num: Date.now().toString(),
      local: '',
      date: '',
    })
  }

  const handleUpdate = async (id: string, data: Partial<Hearing>) => {
    await updateHearing(id, data)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja remover este registro?')) {
      await deleteHearing(id)
    }
  }

  const sortHearings = (arr: Hearing[]) =>
    arr.sort((a, b) => {
      if (!a.date && !b.date) return 0
      if (!a.date) return 1
      if (!b.date) return -1
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })

  const thematic = sortHearings(hearings.filter((h) => h.type === 'thematic'))
  const territorial = sortHearings(hearings.filter((h) => h.type === 'territorial'))
  const meetings = sortHearings(hearings.filter((h) => h.type === 'meeting'))

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto w-full space-y-6 flex-1 flex flex-col h-full animate-in fade-in duration-500 print:p-0 print:space-y-4 print:max-w-none">
      <div className="flex flex-col gap-1 print:text-center print:mb-4 bg-[#1e5631] text-white p-5 md:p-6 rounded-xl shadow-sm print:bg-transparent print:text-black print:p-0 print:shadow-none print:border-b print:border-slate-300 print:pb-4">
        <div className="text-sm font-semibold text-green-100 uppercase tracking-wider print:text-slate-500">
          Gabinete da Deputada Estadual Stela Farias - AL/RS
        </div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white print:text-black uppercase">
          Comissão Especial de Fiscalização da AEGEA/CORSAN — Quadro de controle das audiências
          públicas e reuniões
        </h1>
      </div>

      <StatsCards hearings={hearings} />

      <div className="flex flex-col flex-1 space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm print:border-none print:shadow-none print:p-0 print:space-y-4">
        <Toolbar hearings={hearings} onReload={loadData} />
        <HearingTable
          title="Audiências Temáticas"
          type="thematic"
          data={thematic}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
        <HearingTable
          title="Audiências Territoriais"
          type="territorial"
          data={territorial}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
        <HearingTable
          title="Reuniões"
          type="meeting"
          data={meetings}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}
