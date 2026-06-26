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
      <Card className="bg-white border-[#eceff4] rounded-xl shadow-sm border">
        <CardContent className="p-5 flex flex-col justify-between h-full gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#16a34a]" />
            <span className="text-sm font-medium text-slate-500">Realizadas</span>
          </div>
          <div className="text-[26px] font-bold text-[#0f172a] leading-none">
            {stats['Realizada']}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white border-[#eceff4] rounded-xl shadow-sm border">
        <CardContent className="p-5 flex flex-col justify-between h-full gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#1d4ed8]" />
            <span className="text-sm font-medium text-slate-500">Agendadas</span>
          </div>
          <div className="text-[26px] font-bold text-[#0f172a] leading-none">
            {stats['Agendada']}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white border-[#eceff4] rounded-xl shadow-sm border">
        <CardContent className="p-5 flex flex-col justify-between h-full gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#d97706]" />
            <span className="text-sm font-medium text-slate-500">A agendar</span>
          </div>
          <div className="text-[26px] font-bold text-[#0f172a] leading-none">
            {stats['A agendar']}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white border-[#eceff4] rounded-xl shadow-sm border">
        <CardContent className="p-5 flex flex-col justify-between h-full gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
            <span className="text-sm font-medium text-slate-500">A definir</span>
          </div>
          <div className="text-[26px] font-bold text-[#0f172a] leading-none">
            {stats['A definir']}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
