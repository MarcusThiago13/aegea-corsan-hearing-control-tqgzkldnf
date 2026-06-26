import { useState, useEffect } from 'react'
import { Hearing, HearingType } from '@/types/hearing'
import { getStatus, getStatusColor, toInputDate, fromInputDate, formatDateBr } from '@/utils/status'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trash2, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

function InlineInput({
  value,
  onChange,
  type = 'text',
  placeholder = '',
}: {
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
}) {
  const [val, setVal] = useState(value)
  useEffect(() => setVal(value), [value])
  return (
    <Input
      type={type}
      value={val}
      placeholder={placeholder}
      onChange={(e) => setVal(e.target.value)}
      onBlur={() => {
        if (val !== value) onChange(val)
      }}
      className="h-8 border-transparent hover:border-input focus:border-input bg-transparent px-2"
    />
  )
}

interface Props {
  title: string
  type: HearingType
  themeColor?: string
  data: Hearing[]
  onAdd: (type: HearingType) => void
  onUpdate: (id: string, data: Partial<Hearing>) => void
  onDelete: (id: string) => void
}

export function HearingTable({
  title,
  type,
  themeColor = '#0e7490',
  data,
  onAdd,
  onUpdate,
  onDelete,
}: Props) {
  return (
    <div className="mb-8 print:mb-4">
      <div className="flex items-center gap-3 mb-4 print:hidden">
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: themeColor }} />
        <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
        <div className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full text-xs font-medium">
          {data.length}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-[#eceff4] overflow-hidden shadow-sm print:border-slate-300 print:shadow-none print:rounded-none print:border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-transparent print:border-b-2 print:border-black">
              <TableRow className="hover:bg-transparent border-b border-[#eceff4]">
                <TableHead className="text-[#94a3b8] text-xs uppercase font-semibold tracking-wider h-10 px-4">
                  {type === 'meeting'
                    ? 'Reunião como convidada no tema AEGEA/CORSAN'
                    : type === 'visit'
                      ? 'Unidade / Local da visita'
                      : 'Audiência / Cidade-sede'}
                </TableHead>
                <TableHead className="w-[180px] text-[#94a3b8] text-xs uppercase font-semibold tracking-wider h-10 px-4">
                  {type === 'meeting'
                    ? 'Data da reunião'
                    : type === 'visit'
                      ? 'Data da visita'
                      : 'Data da audiência'}
                </TableHead>
                <TableHead className="w-[140px] text-[#94a3b8] text-xs uppercase font-semibold tracking-wider h-10 px-4">
                  Status
                </TableHead>
                <TableHead className="w-[60px] text-right print:hidden h-10 px-4"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((h) => {
                const status = getStatus(h.date, h.type)
                return (
                  <TableRow
                    key={h.id}
                    className="group transition-colors border-b border-[#f4f6fa] border-l-[3px] last:border-b-0 hover:bg-slate-50 print:border-b print:border-slate-300"
                    style={{ borderLeftColor: themeColor }}
                  >
                    <TableCell className="py-3 px-4 border-r-0 print:py-2">
                      <div className="print:hidden">
                        <InlineInput
                          value={h.local}
                          onChange={(v) => onUpdate(h.id, { local: v })}
                          placeholder="Digite o local/tema"
                        />
                      </div>
                      <div className="hidden print:block">{h.local || '-'}</div>
                    </TableCell>
                    <TableCell className="py-3 px-4 border-r-0 print:py-2">
                      <div className="print:hidden">
                        <InlineInput
                          type="date"
                          value={toInputDate(h.date)}
                          onChange={(v) => onUpdate(h.id, { date: fromInputDate(v) })}
                        />
                      </div>
                      <div className="hidden print:block text-sm">{formatDateBr(h.date)}</div>
                    </TableCell>
                    <TableCell className="py-3 px-4 print:py-2">
                      <Badge
                        variant="outline"
                        className={cn(
                          'font-medium whitespace-nowrap print:border-none print:p-0 print:text-black',
                          getStatusColor(status),
                        )}
                      >
                        {status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 px-4 text-right print:hidden">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => onDelete(h.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
              {data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                    Nenhum registro encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="p-3 border-t border-[#eceff4] bg-white print:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAdd(type)}
            className="text-[#0e7490] hover:text-[#0e7490]/80 hover:bg-[#0e7490]/10"
          >
            <Plus className="h-4 w-4 mr-1" /> Adicionar Linha
          </Button>
        </div>
      </div>
    </div>
  )
}
