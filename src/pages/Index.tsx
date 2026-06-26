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
      num: '',
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

  const thematic = hearings.filter((h) => h.type === 'thematic')
  const territorial = hearings.filter((h) => h.type === 'territorial')
  const meetings = hearings.filter((h) => h.type === 'meeting')

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto w-full space-y-8 flex-1 flex flex-col h-full animate-in fade-in duration-500 print:p-0 print:space-y-4">
      <div className="flex flex-col gap-2 print:text-center print:mb-6">
        <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider print:text-slate-800">
          Assembleia Legislativa do RS
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 print:text-2xl">
          Comissão Especial de Fiscalização da AEGEA/CORSAN
        </h1>
        <p className="text-slate-500 text-lg print:text-base print:text-slate-700">
          Quadro de controle das audiências públicas e reuniões
        </p>
      </div>

      <StatsCards hearings={hearings} />

      <div className="flex flex-col flex-1 space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm print:border-none print:shadow-none print:p-0">
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
