import { StatsCards } from '@/components/dashboard/StatsCards'
import { Toolbar } from '@/components/dashboard/Toolbar'
import { HearingTable } from '@/components/dashboard/HearingTable'

export default function Index() {
  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto w-full space-y-8 flex-1 flex flex-col h-full animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Audiências Públicas
        </h1>
        <p className="text-slate-500 text-lg">
          Painel de controle e acompanhamento das audiências da Comissão Especial de Fiscalização.
        </p>
      </div>

      <StatsCards />

      <div className="flex flex-col flex-1 space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <Toolbar />
        <HearingTable />
      </div>
    </div>
  )
}
