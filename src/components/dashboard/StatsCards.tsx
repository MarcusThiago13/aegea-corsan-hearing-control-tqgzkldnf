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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 print-hidden">
      <Card className="border-l-4 border-l-green-600">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Realizadas</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats['Realizada']}</div>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-blue-600">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Agendadas</CardTitle>
          <CalendarDays className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats['Agendada']}</div>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-amber-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">A agendar</CardTitle>
          <Clock className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats['A agendar']}</div>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-purple-600">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">A definir</CardTitle>
          <HelpCircle className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats['A definir']}</div>
        </CardContent>
      </Card>
    </div>
  )
}
