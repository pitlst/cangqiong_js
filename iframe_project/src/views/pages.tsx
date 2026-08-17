import { useEffect, useMemo, useState } from 'react'

import { deductionColumns } from '@/components/data-table/deduction-columns'
import { labelColumns } from '@/components/data-table/label-columns'
import { quarterlyColumns } from '@/components/data-table/quarterly-columns'
import { DataToolbar } from '@/components/data-toolbar'
import { DataTable } from '@/components/ui/data-table'
import { DEFAULT_DEDUCTION_COLUMNS, type DeductionColumn, type DeductionRow } from '@/data/deduction'
import { QUARTERLY_ROWS } from '@/data/quarterly'
import { fetchDeductionItems, fetchDeductionItemsWithToast, getCachedDeductionError, getCachedDeductionItems } from '@/lib/cangqiong/deduction'
import { canFetchFromCangqiong } from '@/lib/cangqiong/session'
import { cn } from '@/lib/utils'

const QUARTERLY_ACTIONS = [
    { key: 'new', label: '新增', variant: 'default' as const },
    { key: 'edit', label: '修改' },
    { key: 'del', label: '删除' },
    { key: 'calc-score', label: '计算绩效得分' },
    { key: 'calc-eval', label: '计算绩效评价结果' },
    { key: 'calc-excellence', label: '计算创先争优结果' },
    { key: 'export', label: '导出' },
]

export function QuarterlyView() {
    return (
        <div className="flex min-h-0 flex-1 flex-col gap-2.5">
            <DataToolbar actions={QUARTERLY_ACTIONS} />
            <DataTable columns={quarterlyColumns} data={QUARTERLY_ROWS} getRowId={(row) => row.id} />
        </div>
    )
}

type DeductionStatus = 'idle' | 'loading' | 'ready' | 'error' | 'offline'

function errorMessage(err: unknown) {
    if (err instanceof Error && err.message) return err.message
    return String(err || '未知错误')
}

export function DeductionView() {
    const [status, setStatus] = useState<DeductionStatus>('idle')
    const [columns, setColumns] = useState<DeductionColumn[]>(DEFAULT_DEDUCTION_COLUMNS)
    const [rows, setRows] = useState<DeductionRow[]>([])
    const [error, setError] = useState('')

    function applyTable(table: { columns: DeductionColumn[]; rows: DeductionRow[] }) {
        setColumns(table.columns.length ? table.columns : DEFAULT_DEDUCTION_COLUMNS)
        setRows(table.rows)
        setStatus('ready')
        setError('')
    }

    async function loadDeduction(force = false) {
        if (!canFetchFromCangqiong()) {
            setStatus('offline')
            setError('当前不在苍穹环境，无法拉取扣分项')
            return
        }
        setStatus('loading')
        setError('')
        try {
            const table = force ? await fetchDeductionItemsWithToast({ force: true }) : await fetchDeductionItems()
            applyTable(table)
        } catch (err) {
            setError(errorMessage(err))
            setStatus('error')
        }
    }

    useEffect(() => {
        const cached = getCachedDeductionItems()
        if (cached) {
            applyTable(cached)
            return
        }
        const cachedError = getCachedDeductionError()
        if (cachedError) {
            setStatus('error')
            setError(cachedError)
            return
        }
        void loadDeduction()
    }, [])

    const tableColumns = useMemo(() => deductionColumns(columns), [columns])
    const emptyText = status === 'loading' ? '正在从苍穹加载扣分项…' : status === 'offline' || status === 'error' ? error || '加载失败' : '暂无扣分项'
    const loading = status === 'loading'

    return (
        <div className="flex min-h-0 flex-1 flex-col gap-2.5">
            <DataToolbar
                actions={[
                    { key: 'refresh', label: loading ? '加载中…' : '刷新', variant: 'default', disabled: loading },
                    { key: 'export', label: '导出', disabled: loading },
                ]}
                onAction={(key) => {
                    if (key === 'refresh') void loadDeduction(true)
                }}
            />
            <DataTable key={columns.map((col) => col.key).join('|')} columns={tableColumns} data={rows} emptyText={emptyText} getRowId={(row) => row._rowId} />
        </div>
    )
}

type SimpleTableViewProps = {
    actions: { key: string; label: string; variant?: 'default' | 'outline' }[]
    columns: string[]
    emptyText?: string
}

export function SimpleTableView({ actions, columns, emptyText }: SimpleTableViewProps) {
    return (
        <div className="flex min-h-0 flex-1 flex-col gap-2.5">
            <DataToolbar actions={actions} />
            <DataTable columns={labelColumns(columns)} data={[]} emptyText={emptyText} />
        </div>
    )
}

const ORG_NODES = ['中车集团党委', '市场营销部党支部', '技术中心党总支', '人力资源部党支部']

export function OrgView() {
    const [activeOrg, setActiveOrg] = useState(ORG_NODES[1])
    return (
        <div className="flex min-h-0 flex-1 overflow-hidden rounded-md border">
            <div className="w-56 shrink-0 border-r">
                <div className="text-muted-foreground px-3 py-2 text-xs">组织树</div>
                <div className="flex flex-col gap-0.5 p-2">
                    {ORG_NODES.map((name) => (
                        <button
                            key={name}
                            type="button"
                            onClick={() => setActiveOrg(name)}
                            className={cn(
                                'rounded-md px-2.5 py-1.5 text-left text-sm',
                                name === activeOrg ? 'bg-primary/10 text-foreground' : 'hover:bg-muted',
                            )}
                        >
                            {name}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2.5 p-3">
                <div className="flex items-center justify-between gap-2">
                    <DataToolbar actions={[{ key: 'export', label: '导出' }]} />
                    <span className="text-muted-foreground text-xs">当前节点：{activeOrg}</span>
                </div>
                <DataTable columns={labelColumns(['组织编码', '组织名称', '组织类型', '上级组织'])} data={[]} emptyText="当前节点下级组织" />
            </div>
        </div>
    )
}
