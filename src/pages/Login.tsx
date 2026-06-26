import { useState, type FormEvent } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ShieldCheck } from 'lucide-react'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    const { error } = await signIn(username, password)
    setLoading(false)

    if (error) {
      setErrorMsg('Usuário(a) ou senha incorretos.')
    } else {
      navigate('/')
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-t-4 border-t-[#1e5631]">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-2">
            <ShieldCheck className="h-6 w-6 text-[#1e5631]" />
          </div>
          <CardTitle className="text-2xl font-bold">Acesso Restrito</CardTitle>
          <CardDescription>Painel de Controle da Comissão AEGEA/CORSAN</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuário(a)</Label>
              <Input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nome de usuário"
                className={errorMsg ? 'border-red-500 focus-visible:ring-red-500' : ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errorMsg ? 'border-red-500 focus-visible:ring-red-500' : ''}
              />
            </div>
            {errorMsg && <p className="text-sm text-red-500 font-medium">{errorMsg}</p>}
            <Button
              type="submit"
              className="w-full bg-[#1e5631] hover:bg-[#143d22]"
              disabled={loading}
            >
              {loading ? 'Autenticando...' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
