import { useEffect, useState } from 'react'
import { Hearing, HearingType } from '@/types/hearing'
import { getHearings, updateHearing, deleteHearing, createHearing } from '@/services/hearings'
import { useRealtime } from '@/hooks/use-realtime'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { Toolbar } from '@/components/dashboard/Toolbar'
import { HearingTable } from '@/components/dashboard/HearingTable'
import { useToast } from '@/hooks/use-toast'

export default function Index() {
  const [hearings, setHearings] = useState<Hearing[]>([])
  const { toast } = useToast()

  const loadData = async () => {
    try {
      const data = await getHearings()
      setHearings(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useRealtime('hearings', () => {
    loadData()
  })

  const handleAdd = async (type: HearingType) => {
    try {
      await createHearing({ num: '', local: '', date: '', type })
      toast({ title: 'Registro adicionado' })
    } catch (err) {
      toast({ title: 'Erro ao adicionar', variant: 'destructive' })
    }
  }

  const handleUpdate = async (id: string, data: Partial<Hearing>) => {
    try {
      await updateHearing(id, data)
    } catch (err) {
      toast({ title: 'Erro ao salvar', variant: 'destructive' })
      loadData() // revert
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente excluir este registro?')) return
    try {
      await deleteHearing(id)
      toast({ title: 'Registro excluído' })
    } catch (err) {
      toast({ title: 'Erro ao excluir', variant: 'destructive' })
    }
  }

  const thematic = hearings.filter((h) => h.type === 'thematic')
  const territorial = hearings.filter((h) => h.type === 'territorial')
  const meetings = hearings.filter((h) => h.type === 'meeting')

  return (
    <div className="container mx-auto py-8 px-4 flex-1 animate-fade-in">
      <StatsCards hearings={hearings} />
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
  )
}
