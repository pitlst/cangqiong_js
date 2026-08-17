import { createColumnHelper } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { type DataTableFeatures } from '@/components/data-table/data-table-features'
import { DEFAULT_DEDUCTION_COLUMNS, type DeductionColumn, type DeductionRow } from '@/data/deduction'

const columnHelper = createColumnHelper<DataTableFeatures, DeductionRow>()

export function makeCqColumns(cols: DeductionColumn[] = DEFAULT_DEDUCTION_COLUMNS) {
    const list = cols.length ? cols : DEFAULT_DEDUCTION_COLUMNS
    return columnHelper.columns(
        list.map((col) =>
            columnHelper.accessor((row) => row[col.key], {
                id: col.key,
                header: col.numeric ? () => <div className="text-right">{col.label}</div> : col.label,
                cell: ({ getValue }) => {
                    const value = getValue()
                    if (col.badge) {
                        const status = String(value ?? '')
                        if (!status) return null
                        if (status === '暂存') {
                            return (
                                <Badge variant="outline" className="border-primary/40 bg-primary/5 text-primary">
                                    {status}
                                </Badge>
                            )
                        }
                        return <Badge variant="default">{status}</Badge>
                    }
                    if (col.numeric) return <div className="text-right">{value}</div>
                    if (col.wrap) return <div className="max-w-xs whitespace-normal">{value}</div>
                    return value
                },
            }),
        ),
    )
}

export const deductionColumns = makeCqColumns
