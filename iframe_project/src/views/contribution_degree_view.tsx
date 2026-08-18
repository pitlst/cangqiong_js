import { useEffect, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import { DetailSection } from '@/components/bill-detail'
import { type DataTableFeatures } from '@/components/data-table-features'
import { DataToolbar } from '@/components/data-toolbar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { exportTableToExcel } from '@/lib/excel'
import { NAV_LABEL } from '@/lib/nav'
import { get_err_message, type FetchStatus } from '@/lib/utils'
import { ENTRY_COLUMNS, fetch_data, trans_data, type ParseBillEntry, type ParseBillRow } from '@/lib/api/contribution_degree'

const columnHelper = createColumnHelper<DataTableFeatures, ParseBillRow>()
const entryHelper = createColumnHelper<DataTableFeatures, ParseBillEntry>()

function format_text(value: string | number | null | undefined) {
    if (value == null || value === '') return '-'
    return String(value)
}

function StatusBadge({ status }: { status: string }) {
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

function ScoreCell({ value }: { value: number }) {
    return <div className="text-right">{value}</div>
}

function ItemCell({ value }: { value: string }) {
    const text = format_text(value)
    return (
        <div className="max-h-20 min-w-52 max-w-md overflow-y-auto whitespace-pre-wrap" title={text === '-' ? undefined : text}>
            {text}
        </div>
    )
}

const contributionColumns = columnHelper.columns([
    columnHelper.accessor('billno', {
        header: '单据编号',
    }),
    columnHelper.accessor('billstatus_title', {
        header: '单据状态',
        cell: ({ getValue }) => <StatusBadge status={getValue()} />,
    }),
    columnHelper.accessor('year', {
        header: '年份',
        cell: ({ getValue }) => format_text(getValue()),
    }),
    columnHelper.accessor('quarter', {
        header: '季度',
        cell: ({ getValue }) => format_text(getValue()),
    }),
    columnHelper.accessor((row) => row.entry?.length ?? 0, {
        id: 'entryCount',
        header: () => <div className="text-right">分录数</div>,
        cell: ({ getValue }) => <div className="text-right">{getValue()}</div>,
    }),
    columnHelper.accessor('createtime', {
        header: '创建时间',
    }),
    columnHelper.accessor('modifytime', {
        header: '修改时间',
    }),
])

const EXPORT_COLUMNS = [
    { key: 'billno', label: '单据编号' },
    { key: 'billstatus_title', label: '单据状态' },
    { key: 'year', label: '年份' },
    { key: 'quarter', label: '季度' },
    { key: 'bill_date', label: '日期' },
    { key: 'auditdate', label: '审核日期' },
    { key: 'createtime', label: '创建时间' },
    { key: 'modifytime', label: '修改时间' },
] as const

function LongHeader({ label, align = 'left' }: { label: string; align?: 'left' | 'right' }) {
    return <div className={align === 'right' ? 'min-w-28 max-w-52 text-right whitespace-normal' : 'min-w-48 max-w-72 whitespace-normal'}>{label}</div>
}

const contributionEntryColumns = entryHelper.columns(
    ENTRY_COLUMNS.filter((col) => col.key !== 'id').map((col) => {
        if (col.key === 'seq') {
            return entryHelper.accessor('seq', {
                header: () => <LongHeader label={col.label} align="right" />,
                cell: ({ getValue }) => <div className="text-right">{getValue()}</div>,
            })
        }
        if (col.key === 'modifydatefield') {
            return entryHelper.accessor('modifydatefield', {
                header: col.label,
                cell: ({ getValue }) => format_text(getValue()),
            })
        }
        if (col.key.endsWith('_tag')) {
            return entryHelper.accessor(col.key, {
                header: () => <LongHeader label={col.label} />,
                cell: ({ getValue }) => <ItemCell value={String(getValue() ?? '')} />,
            })
        }
        if (col.key.startsWith('crrc_decimalfield')) {
            return entryHelper.accessor(col.key, {
                header: () => <LongHeader label={col.label} align="right" />,
                cell: ({ getValue }) => <ScoreCell value={Number(getValue())} />,
            })
        }
        return entryHelper.accessor(col.key, {
            header: () => <LongHeader label={col.label} />,
            cell: ({ getValue }) => format_text(String(getValue() ?? '')),
        })
    }),
)

function ReadField({ label, value }: { label: string; value: string }) {
    return (
        <Field className="min-w-0 gap-1">
            <FieldLabel>{label}</FieldLabel>
            <Input readOnly value={value} />
        </Field>
    )
}

function ContributionDetail({ bill, onClose }: { bill: ParseBillRow; onClose: () => void }) {
    return (
        <Dialog
            open
            onOpenChange={(open) => {
                if (!open) onClose()
            }}
        >
            <DialogContent className="flex h-[90vh] max-h-[90vh] w-full flex-col gap-3 overflow-hidden sm:max-w-[96vw]">
                <DialogHeader className="shrink-0">
                    <DialogTitle>季度党群绩效贡献度详情</DialogTitle>
                </DialogHeader>
                <DetailSection title="基本信息" className="shrink-0">
                    <FieldGroup className="grid grid-cols-4 gap-x-3 gap-y-2">
                        <ReadField label="单据编号" value={bill.billno} />
                        <ReadField label="单据状态" value={bill.billstatus_title} />
                        <ReadField label="年份" value={format_text(bill.year)} />
                        <ReadField label="季度" value={format_text(bill.quarter)} />
                    </FieldGroup>
                </DetailSection>
                <DetailSection title="分录" className="min-h-0 flex-1 overflow-hidden">
                    <div className="flex h-full min-h-0 flex-col overflow-hidden">
                        <DataTable
                            columns={contributionEntryColumns}
                            data={bill.entry}
                            emptyText="暂无分录"
                            getRowId={(row) => row.id}
                            selectTone="muted"
                        />
                    </div>
                </DetailSection>
                <DialogFooter className="shrink-0">
                    <Button type="button" variant="outline" onClick={onClose}>
                        关闭
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export function ContributionDegreeView() {
    const [status, setStatus] = useState<FetchStatus>('idle')
    const [rows, setRows] = useState<ParseBillRow[]>([])
    const [error, setError] = useState('')
    const [selectedRowId, setSelectedRowId] = useState('')
    const [detailBill, setDetailBill] = useState<ParseBillRow | null>(null)

    async function run(force: boolean) {
        setStatus('loading')
        setError('')
        try {
            const data = force ? await fetch_data({ force: true }) : await fetch_data()
            setRows(trans_data(data))
            setStatus('ready')
        } catch (err) {
            setError(get_err_message(err))
            setStatus('error')
        }
    }

    useEffect(() => {
        void run(false)
    }, [])

    function openDetail(bill: ParseBillRow) {
        setSelectedRowId(bill.id)
        setDetailBill(bill)
    }

    const loading = status === 'loading'
    const emptyText =
        status === 'loading' ? '正在加载季度党群绩效贡献度…' : status === 'error' ? error || '加载失败' : '暂无季度党群绩效贡献度'

    return (
        <div className="relative flex min-h-0 flex-1 flex-col gap-2.5">
            <div className="relative flex min-h-0 flex-1 flex-col">
                <DataTable
                    columns={contributionColumns}
                    data={rows}
                    emptyText={emptyText}
                    getRowId={(row) => row.id}
                    selectedRowId={selectedRowId}
                    onRowSelect={openDetail}
                    enableSearch
                    toolbar={
                        <DataToolbar
                            actions={[
                                { key: 'refresh', label: status === 'loading' ? '加载中…' : '刷新', variant: 'default', disabled: loading },
                                { key: 'export', label: '导出', disabled: loading },
                            ]}
                            onAction={(key) => {
                                if (key === 'refresh') void run(true)
                                if (key !== 'export') return
                                exportTableToExcel({
                                    filename: NAV_LABEL.contribution_degree,
                                    columns: EXPORT_COLUMNS.map((col) => ({ key: col.key, label: col.label })),
                                    rows,
                                })
                            }}
                        />
                    }
                />
            </div>
            {detailBill ? <ContributionDetail key={detailBill.id} bill={detailBill} onClose={() => setDetailBill(null)} /> : null}
        </div>
    )
}
