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
  data: Hearing[]
  onAdd: (type: HearingType) => void
  onUpdate: (id: string, data: Partial<Hearing>) => void
  onDelete: (id: string) => void
}

export function HearingTable({ title, type, data, onAdd, onUpdate, onDelete }: Props) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-slate-800 border-b-2 border-primary pb-1 inline-block">
          {title}
        </h2>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-[80px]">Nº</TableHead>
                <TableHead>Local / Tema</TableHead>
                <TableHead className="w-[180px]">Data</TableHead>
                <TableHead className="w-[140px]">Status</TableHead>
                <TableHead className="w-[60px] text-right print:hidden"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((h) => {
                const status = getStatus(h.date, h.type)
                return (
                  <TableRow key={h.id} className="group transition-colors">
                    <TableCell className="py-2">
                      <div className="print:hidden">
                        <InlineInput
                          value={h.num}
                          onChange={(v) => onUpdate(h.id, { num: v })}
                          placeholder="01"
                        />
                      </div>
                      <div className="hidden print:block px-2">{h.num || '-'}</div>
                    </TableCell>
                    <TableCell className="py-2">
                      <div className="print:hidden">
                        <InlineInput
                          value={h.local}
                          onChange={(v) => onUpdate(h.id, { local: v })}
                          placeholder="Digite o local/tema"
                        />
                      </div>
                      <div className="hidden print:block px-2">{h.local || '-'}</div>
                    </TableCell>
                    <TableCell className="py-2">
                      <div className="print:hidden">
                        <InlineInput
                          type="date"
                          value={toInputDate(h.date)}
                          onChange={(v) => onUpdate(h.id, { date: fromInputDate(v) })}
                        />
                      </div>
                      <div className="hidden print:block px-2 text-sm">{formatDateBr(h.date)}</div>
                    </TableCell>
                    <TableCell className="py-2">
                      <Badge
                        variant="outline"
                        className={cn('font-medium', getStatusColor(status))}
                      >
                        {status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-2 text-right print:hidden">
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
                  <TableCell colSpan={5} className="text-center py-6 text-slate-500">
                    Nenhum registro encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="p-2 border-t border-slate-100 bg-slate-50 print:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAdd(type)}
            className="text-primary hover:text-primary/80 hover:bg-primary/10"
          >
            <Plus className="h-4 w-4 mr-1" /> Adicionar Linha
          </Button>
        </div>
      </div>
    </div>
  )
}
