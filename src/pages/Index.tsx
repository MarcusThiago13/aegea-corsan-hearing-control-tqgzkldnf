import { useState, useEffect } from 'react'
import { getHearings } from '@/services/hearings'
import { Hearing } from '@/types/hearing'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { Toolbar } from '@/components/dashboard/Toolbar'
import { HearingTable } from '@/components/dashboard/HearingTable'
import { useRealtime } from '@/hooks/use-realtime'

export default function Index() {
  const [hearings, setHearings] = useState<Hearing[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const loadData = async () => {
    try {
      const data = await getHearings()
      setHearings(data as Hearing[])
    } catch (error) {
      console.error('Failed to load hearings', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useRealtime('hearings', () => {
    loadData()
  })

  const filteredHearings = hearings.filter((h) => {
    if (
      search &&
      !h.num.toLowerCase().includes(search.toLowerCase()) &&
      !h.local?.toLowerCase().includes(search.toLowerCase())
    ) {
      return false
    }
    if (typeFilter !== 'all' && h.type !== typeFilter) {
      return false
    }
    return true
  })

  return (
    <div className="flex-1 p-4 md:p-8 pt-6 space-y-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#1e5631]">Painel de Audiências</h2>
          <p className="text-muted-foreground">Comissão Especial de Fiscalização AEGEA/CORSAN</p>
        </div>
      </div>

      <StatsCards hearings={filteredHearings} />

      <div className="flex flex-col space-y-4">
        <Toolbar
          search={search}
          onSearchChange={setSearch}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
        <HearingTable hearings={filteredHearings} loading={loading} />
      </div>
    </div>
  )
}
