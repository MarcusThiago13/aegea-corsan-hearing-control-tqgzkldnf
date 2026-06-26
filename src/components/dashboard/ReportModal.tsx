import { Hearing } from '@/types/hearing'
import { getStatus, formatDateBr } from '@/utils/status'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Copy, MessageCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useMemo } from 'react'

interface Props {
  open: boolean
  onOpenChange: (o: boolean) => void
  hearings: Hearing[]
}

export function ReportModal({ open, onOpenChange, hearings }: Props) {
  const { toast } = useToast()

  const reportText = useMemo(() => {
    const thematic = hearings.filter((h) => h.type === 'thematic')
    const territorial = hearings.filter((h) => h.type === 'territorial')
    const meetings = hearings.filter((h) => h.type === 'meeting')

    const formatLine = (h: Hearing) => {
      const status = getStatus(h.date, h.type)
      let emoji = '✅'
      if (status === 'Agendada') emoji = '📅'
      else if (status === 'A agendar') emoji = '🟡'
      else if (status === 'A definir') emoji = '🟣'

      const dateStr = status === 'Agendada' ? `: ${formatDateBr(h.date)}` : ''
      return `${emoji} ${h.num || '-'} - ${h.local || 'Sem local'} (${status}${dateStr})`
    }

    const stats = hearings.reduce(
      (acc, h) => {
        acc[getStatus(h.date, h.type)] = (acc[getStatus(h.date, h.type)] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return `*RELATÓRIO DA COMISSÃO AEGEA/CORSAN*

*Audiências Temáticas:*
${thematic.map(formatLine).join('\n') || 'Nenhuma registrada.'}

*Audiências Territoriais:*
${territorial.map(formatLine).join('\n') || 'Nenhuma registrada.'}

*Reuniões:*
${meetings.map(formatLine).join('\n') || 'Nenhuma registrada.'}

*Resumo:* ✅ ${stats['Realizada'] || 0} realizadas · 📅 ${stats['Agendada'] || 0} agendadas · 🟡 ${stats['A agendar'] || 0} a agendar · 🟣 ${stats['A definir'] || 0} a definir`
  }, [hearings])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(reportText)
    toast({ title: 'Copiado para a área de transferência!' })
  }

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(reportText)}`, '_blank')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Texto para WhatsApp</DialogTitle>
          <DialogDescription>
            Copie o texto formatado para colar no WhatsApp ou abra diretamente.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea readOnly value={reportText} className="min-h-[300px] font-mono text-sm" />
        </div>
        <DialogFooter className="flex gap-2 sm:justify-end">
          <Button variant="outline" onClick={handleCopy}>
            <Copy className="w-4 h-4 mr-2" /> Copiar Texto
          </Button>
          <Button onClick={handleWhatsApp} className="bg-green-600 hover:bg-green-700">
            <MessageCircle className="w-4 h-4 mr-2" /> Abrir no WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
