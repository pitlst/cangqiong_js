import { createColumnHelper } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { type DataTableFeatures } from '@/components/data-table/data-table-features'
import type { BillEntry, BillRow } from '@/lib/api/deduction'

const billHelper = createColumnHelper<DataTableFeatures, BillRow>()
const entryHelper = createColumnHelper<DataTableFeatures, BillEntry>()

export function StatusBadge({ status }: { status: string }) {
    if (!status) return <span className="text-muted-foreground">-</span>
    if (status === '暂存') {
        return (
            <Badge variant="outline" className="border-primary/40 bg-primary/5 text-primary">
                {status}
            </Badge>
        )
    }
    return <Badge variant="default">{status}</Badge>
}

export function format_year(value: string | null | undefined) {
    if (!value) return '-'
    const year = value.slice(0, 4)
    return /^\d{4}$/.test(year) ? year : value
}

export function format_text(value: string | number | null | undefined) {
    if (value == null || value === '') return '-'
    return String(value)
}

export const deductionBillColumns = billHelper.columns([
    billHelper.accessor('billno', {
        header: '单据编号',
    }),
    billHelper.accessor('billstatus_title', {
        header: '单据状态',
        cell: ({ getValue }) => <StatusBadge status={getValue()} />,
    }),
    billHelper.accessor((row) => format_year(row.crrc_datefield), {
        id: 'year',
        header: '年份',
    }),
    billHelper.accessor('crrc_radiooptgroupfield_title', {
        header: '季度',
        cell: ({ getValue }) => format_text(getValue()),
    }),
    billHelper.accessor('crrc_textfield6', {
        header: '备注',
        cell: ({ getValue }) => format_text(getValue()),
    }),
    billHelper.accessor((row) => row.entryentity?.length ?? 0, {
        id: 'entryCount',
        header: () => <div className="text-right">分录数</div>,
        cell: ({ getValue }) => <div className="text-right">{getValue()}</div>,
    }),
    billHelper.accessor('createtime', {
        header: '创建时间',
    }),
    billHelper.accessor('modifytime', {
        header: '修改时间',
    }),
])

export const deductionEntryColumns = entryHelper.columns([
    entryHelper.accessor('seq', {
        header: () => <div className="text-right">分录行号</div>,
        cell: ({ getValue }) => <div className="text-right">{getValue()}</div>,
    }),
    entryHelper.accessor('crrc_textfield', {
        header: '扣分事项',
        cell: ({ getValue }) => <div className="max-w-xs whitespace-normal">{format_text(getValue())}</div>,
    }),
    entryHelper.accessor('crrc_decimalfield', {
        header: () => <div className="text-right">扣分分数</div>,
        cell: ({ getValue }) => <div className="text-right">{getValue()}</div>,
    }),
    entryHelper.accessor('crrc_textfield1', {
        header: '扣分依据',
        cell: ({ getValue }) => <div className="max-w-md whitespace-normal">{format_text(getValue())}</div>,
    }),
    entryHelper.accessor((row) => format_year(row.crrc_datefield1), {
        id: 'year',
        header: '年份',
    }),
    entryHelper.accessor('crrc_radiooptgroupfield1_title', {
        header: '季度',
        cell: ({ getValue }) => format_text(getValue()),
    }),
    entryHelper.accessor('crrc_billstatusfield_title', {
        header: '单据状态',
        cell: ({ getValue }) => <StatusBadge status={getValue()} />,
    }),
    entryHelper.accessor('crrc_billstatusfield1_title', {
        header: '数据状态',
        cell: ({ getValue }) => format_text(getValue()),
    }),
    entryHelper.accessor('modifydatefield', {
        header: '修改时间',
    }),
])
