import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Printer, MessageSquare, Download, Upload } from 'lucide-react'
import { Hearing } from '@/types/hearing'
import { ReportModal } from './ReportModal'
import { createHearing, deleteHearing } from '@/services/hearings'
import { useToast } from '@/hooks/use-toast'

export function Toolbar({ hearings, onReload }: { hearings: Hearing[]; onReload: () => void }) {
  const [reportOpen, setReportOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handlePrint = () => window.print()

  const handleExport = () => {
    const data = hearings.map(({ id, created, updated, ...rest }) => rest)
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `aegea_corsan_export_${new Date().toISOString().split('T')[0]}.json`
    a.click()
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async (event) => {
      try {
        const data = JSON.parse(event.target?.result as string)
        if (!Array.isArray(data)) throw new Error('Invalid format')
        toast({ title: 'Importando dados...', description: 'Aguarde um momento.' })
        for (const h of hearings) {
          await deleteHearing(h.id)
        }
        for (const item of data) {
          await createHearing({
            num: item.num || Date.now().toString(),
            local: item.local,
            date: item.date,
            type: item.type,
          })
        }
        toast({ title: 'Importação concluída com sucesso!' })
        onReload()
      } catch (err) {
        toast({ title: 'Erro na importação', variant: 'destructive' })
      }
    }
    reader.readAsText(file)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-white rounded-lg border border-slate-200 shadow-sm print:hidden">
      <Button
        variant="default"
        className="bg-[#0e7490] hover:bg-[#0b5a73] text-white"
        onClick={() => setReportOpen(true)}
      >
        <MessageSquare className="w-4 h-4 mr-2" /> Texto p/ WhatsApp
      </Button>
      <Button variant="outline" onClick={handlePrint}>
        <Printer className="w-4 h-4 mr-2" /> PDF / Imprimir
      </Button>
      <div className="flex-1" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        className="text-slate-600"
      >
        <Upload className="w-4 h-4 mr-2" /> Importar arquivo
      </Button>
      <Button variant="ghost" size="sm" onClick={handleExport} className="text-slate-600">
        <Download className="w-4 h-4 mr-2" /> Backup em arquivo
      </Button>
      <input
        type="file"
        accept=".json"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImport}
      />
      <ReportModal open={reportOpen} onOpenChange={setReportOpen} hearings={hearings} />
    </div>
  )
}
