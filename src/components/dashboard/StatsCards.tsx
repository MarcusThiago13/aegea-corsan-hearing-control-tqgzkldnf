import { Hearing } from '@/types/hearing'
import { getStatus } from '@/utils/status'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, CalendarDays, Clock, HelpCircle } from 'lucide-react'

export function StatsCards({ hearings }: { hearings: Hearing[] }) {
  const stats = hearings.reduce(
    (acc, h) => {
      const status = getStatus(h.date, h.type)
      acc[status] = (acc[status] || 0) + 1
      return acc
    },
    { Realizada: 0, Agendada: 0, 'A agendar': 0, 'A definir': 0 } as Record<string, number>,
  )

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 print:hidden">
      <Card className="bg-white border-[#e7ecf3] rounded-xl border-t-[3px] border-t-green-600 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Realizadas</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stats['Realizada']}</div>
        </CardContent>
      </Card>
      <Card className="bg-white border-[#e7ecf3] rounded-xl border-t-[3px] border-t-blue-700 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Agendadas</CardTitle>
          <CalendarDays className="h-4 w-4 text-blue-700" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-700">{stats['Agendada']}</div>
        </CardContent>
      </Card>
      <Card className="bg-white border-[#e7ecf3] rounded-xl border-t-[3px] border-t-amber-600 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">A agendar</CardTitle>
          <Clock className="h-4 w-4 text-amber-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-600">{stats['A agendar']}</div>
        </CardContent>
      </Card>
      <Card className="bg-white border-[#e7ecf3] rounded-xl border-t-[3px] border-t-red-600 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">A definir</CardTitle>
          <HelpCircle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{stats['A definir']}</div>
        </CardContent>
      </Card>
    </div>
  )
}
