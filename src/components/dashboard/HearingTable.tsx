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
  themeColor?: 'blue' | 'sky' | 'red'
  data: Hearing[]
  onAdd: (type: HearingType) => void
  onUpdate: (id: string, data: Partial<Hearing>) => void
  onDelete: (id: string) => void
}

export function HearingTable({
  title,
  type,
  themeColor = 'blue',
  data,
  onAdd,
  onUpdate,
  onDelete,
}: Props) {
  const themes = {
    blue: {
      titleBorder: 'border-blue-700',
      rowBorder: 'border-l-blue-700',
    },
    sky: {
      titleBorder: 'border-sky-600',
      rowBorder: 'border-l-sky-600',
    },
    red: {
      titleBorder: 'border-red-600',
      rowBorder: 'border-l-red-600',
    },
  }
  const theme = themes[themeColor]

  return (
    <div className="mb-8 print:mb-4">
      <div className="flex items-center justify-between mb-3 print:hidden">
        <h2
          className={cn(
            'text-lg font-bold text-slate-800 border-b-2 pb-1 inline-block',
            theme.titleBorder,
          )}
        >
          {title}
        </h2>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm print:border-slate-300 print:shadow-none print:rounded-none print:border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-blue-700 print:bg-transparent print:border-b-2 print:border-black">
              <TableRow className="hover:bg-blue-700 print:hover:bg-transparent border-b-0">
                <TableHead className="text-white print:text-black font-bold">
                  {type === 'meeting'
                    ? 'Reunião como convidada no tema AEGEA/CORSAN'
                    : 'Audiência / Cidade-sede'}
                </TableHead>
                <TableHead className="w-[180px] text-white print:text-black font-bold">
                  {type === 'meeting' ? 'Data da reunião' : 'Data da audiência'}
                </TableHead>
                <TableHead className="w-[140px] text-white print:text-black font-bold">
                  Status
                </TableHead>
                <TableHead className="w-[60px] text-right print:hidden"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((h) => {
                const status = getStatus(h.date, h.type)
                return (
                  <TableRow
                    key={h.id}
                    className={cn(
                      'group transition-colors print:border-b print:border-slate-300',
                      'even:bg-slate-50',
                      `border-l-[3px] ${theme.rowBorder}`,
                    )}
                  >
                    <TableCell className="py-1 border-r border-slate-200/50 print:border-slate-300 print:py-2">
                      <div className="print:hidden">
                        <InlineInput
                          value={h.local}
                          onChange={(v) => onUpdate(h.id, { local: v })}
                          placeholder="Digite o local/tema"
                        />
                      </div>
                      <div className="hidden print:block px-2">{h.local || '-'}</div>
                    </TableCell>
                    <TableCell className="py-1 border-r border-slate-200/50 print:border-slate-300 print:py-2">
                      <div className="print:hidden">
                        <InlineInput
                          type="date"
                          value={toInputDate(h.date)}
                          onChange={(v) => onUpdate(h.id, { date: fromInputDate(v) })}
                        />
                      </div>
                      <div className="hidden print:block px-2 text-sm">{formatDateBr(h.date)}</div>
                    </TableCell>
                    <TableCell className="py-1 print:py-2 print:border-r print:border-slate-300">
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
                    <TableCell className="py-1 text-right print:hidden">
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
                  <TableCell colSpan={4} className="text-center py-6 text-slate-500">
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
            className="text-blue-700 hover:text-blue-800 hover:bg-blue-700/10"
          >
            <Plus className="h-4 w-4 mr-1" /> Adicionar Linha
          </Button>
        </div>
      </div>
    </div>
  )
}
