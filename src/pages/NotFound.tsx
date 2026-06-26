import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 h-full text-center px-4 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h1 className="text-6xl font-bold text-[#1e5631]">404</h1>
        <h2 className="text-2xl font-semibold text-slate-800">Página não encontrada</h2>
        <p className="text-slate-500 max-w-md mx-auto">
          Desculpe, não conseguimos encontrar a página que você está procurando.
        </p>
      </div>
      <div className="mt-8">
        <Button asChild className="bg-[#1e5631] hover:bg-[#143d22]">
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Voltar ao Início
          </Link>
        </Button>
      </div>
    </div>
  )
}
