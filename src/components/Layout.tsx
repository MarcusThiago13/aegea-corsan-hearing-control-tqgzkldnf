import { Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { LogOut, User } from 'lucide-react'

export default function Layout() {
  const { isAuthenticated, user, signOut } = useAuth()

  const today = new Date().toLocaleDateString('pt-BR')

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="bg-gradient-to-r from-[#1e5631] to-[#143d22] text-white print-hidden shadow-md">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Comissão Especial de Fiscalização da AEGEA/CORSAN
            </h1>
          </div>
          {isAuthenticated && (
            <div className="flex items-center gap-4 text-sm bg-black/20 rounded-full px-4 py-2">
              <div className="flex flex-col text-right">
                <span className="font-medium">{user?.name || 'Administrador'}</span>
                <span className="text-green-200 text-xs">Data ref: {today}</span>
              </div>
              <div className="h-8 w-px bg-white/20 mx-1"></div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
                onClick={signOut}
                title="Sair"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 mt-auto print-hidden">
        <div className="container mx-auto px-4 text-center sm:text-left text-sm text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>
            Os status ("A agendar", "Agendada", "Realizada", "A definir") são calculados
            automaticamente com base na data do evento versus a data atual.
          </p>
          <p className="font-medium text-slate-400">Sistema de Controle de Audiências v1.0</p>
        </div>
      </footer>
    </div>
  )
}
