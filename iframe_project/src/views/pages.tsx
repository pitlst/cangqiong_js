import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { ChevronRightIcon } from 'lucide-react'

import { makeCqColumns } from '@/components/data-table/deduction-columns'
import { labelColumns } from '@/components/data-table/label-columns'
import { quarterlyColumns } from '@/components/data-table/quarterly-columns'
import { DataToolbar } from '@/components/data-toolbar'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { CONFIG_ROWS, DEFAULT_CONFIG_COLUMNS } from '@/data/config'
import { DEFAULT_DEDUCTION_COLUMNS, type DeductionColumn, type DeductionRow, type DeductionTable } from '@/data/deduction'
import { DEFAULT_ORG_COLUMNS, type OrgNode } from '@/data/org'
import { DEFAULT_PARTY_COLUMNS } from '@/data/party'
import { QUARTERLY_EXPORT_COLUMNS, type QuarterlyRow } from '@/data/quarterly'
import { fetchDeductionItems, fetchDeductionItemsWithToast, getCachedDeductionError, getCachedDeductionItems } from '@/lib/custom/deduction'
import { fetchOrgTree, fetchOrgTreeWithToast, getCachedOrgError, getCachedOrgTree } from '@/lib/custom/org'
import { fetchPartyQuarterly, fetchPartyQuarterlyWithToast, getCachedPartyError, getCachedPartyQuarterly } from '@/lib/custom/party'
import { fetchQuarterly, fetchQuarterlyWithToast, getCachedQuarterly, getCachedQuarterlyError } from '@/lib/custom/quarterly'
import { cqErrorMessage } from '@/lib/openapi/client'
import { exportTableToExcel } from '@/lib/excel'
import { NAV_LABEL } from '@/lib/nav'
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

const CONFIG_ACTIONS = [
    { key: 'new', label: '新增', variant: 'default' as const },
    { key: 'edit', label: '修改' },
    { key: 'del', label: '删除' },
    { key: 'export', label: '导出' },
]

type ToolbarAction = { key: string; label: string; variant?: 'default' | 'outline'; disabled?: boolean }

type FetchStatus = 'idle' | 'loading' | 'ready' | 'error'

function errorMessage(err: unknown) {
    return cqErrorMessage(err)
}

type FetchedTableViewProps = {
    defaultColumns: DeductionColumn[]
    getCached: () => DeductionTable | null
    getError: () => string
    load: () => Promise<DeductionTable>
    refresh: () => Promise<DeductionTable>
    exportName: string
    loadingText: string
    emptyText: string
}

function FetchedTableView({ defaultColumns, getCached, getError, load, refresh, exportName, loadingText, emptyText }: FetchedTableViewProps) {
    const [status, setStatus] = useState<FetchStatus>('idle')
    const [columns, setColumns] = useState<DeductionColumn[]>(defaultColumns)
    const [rows, setRows] = useState<DeductionRow[]>([])
    const [error, setError] = useState('')

    function applyTable(table: DeductionTable) {
        setColumns(table.columns.length ? table.columns : defaultColumns)
        setRows(table.rows)
        setStatus('ready')
        setError('')
    }

    async function run(force: boolean) {
        setStatus('loading')
        setError('')
        try {
            applyTable(force ? await refresh() : await load())
        } catch (err) {
            setError(errorMessage(err))
            setStatus('error')
        }
    }

    useEffect(() => {
        const cached = getCached()
        if (cached) {
            applyTable(cached)
            return
        }
        const cachedError = getError()
        if (cachedError) {
            setStatus('error')
            setError(cachedError)
            return
        }
        void run(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only
    }, [])

    const tableColumns = useMemo(() => makeCqColumns(columns), [columns])
    const empty = status === 'loading' ? loadingText : status === 'error' ? error || '加载失败' : emptyText
    const loading = status === 'loading'

    return (
        <div className="flex min-h-0 flex-1 flex-col gap-2.5">
            <DataToolbar
                actions={[
                    { key: 'refresh', label: loading ? '加载中…' : '刷新', variant: 'default', disabled: loading },
                    { key: 'export', label: '导出', disabled: loading },
                ]}
                onAction={(key) => {
                    if (key === 'refresh') void run(true)
                    if (key === 'export') {
                        exportTableToExcel({
                            filename: exportName,
                            columns: columns.map((col) => ({ key: col.key, label: col.label })),
                            rows,
                        })
                    }
                }}
            />
            <DataTable key={columns.map((col) => col.key).join('|')} columns={tableColumns} data={rows} emptyText={empty} getRowId={(row) => row._rowId} />
        </div>
    )
}

export function QuarterlyView() {
    const [status, setStatus] = useState<FetchStatus>('idle')
    const [rows, setRows] = useState<QuarterlyRow[]>([])
    const [error, setError] = useState('')

    async function run(force: boolean) {
        setStatus('loading')
        setError('')
        try {
            const data = force ? await fetchQuarterlyWithToast({ force: true }) : await fetchQuarterly()
            setRows(data)
            setStatus('ready')
        } catch (err) {
            setError(errorMessage(err))
            setStatus('error')
        }
    }

    useEffect(() => {
        const cached = getCachedQuarterly()
        if (cached) {
            setRows(cached)
            setStatus('ready')
            return
        }
        const cachedError = getCachedQuarterlyError()
        if (cachedError) {
            setStatus('error')
            setError(cachedError)
            return
        }
        void run(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only
    }, [])

    const loading = status === 'loading'
    const emptyText = status === 'loading' ? '正在加载季度评价结果…' : status === 'error' ? error || '加载失败' : '暂无季度评价结果'

    return (
        <div className="flex min-h-0 flex-1 flex-col gap-2.5">
            <DataToolbar
                actions={[
                    { key: 'refresh', label: loading ? '加载中…' : '刷新', variant: 'default', disabled: loading },
                    ...QUARTERLY_ACTIONS.filter((action) => action.key !== 'export'),
                    { key: 'export', label: '导出', disabled: loading },
                ]}
                onAction={(key) => {
                    if (key === 'refresh') void run(true)
                    if (key !== 'export') return
                    exportTableToExcel({
                        filename: NAV_LABEL.quarterly,
                        columns: QUARTERLY_EXPORT_COLUMNS.map((col) => ({ key: col.key, label: col.label })),
                        rows,
                    })
                }}
            />
            <DataTable columns={quarterlyColumns} data={rows} emptyText={emptyText} getRowId={(row) => row.id} />
        </div>
    )
}

export function DeductionView() {
    return (
        <FetchedTableView
            defaultColumns={DEFAULT_DEDUCTION_COLUMNS}
            getCached={getCachedDeductionItems}
            getError={getCachedDeductionError}
            load={() => fetchDeductionItems()}
            refresh={() => fetchDeductionItemsWithToast({ force: true })}
            exportName={NAV_LABEL.deduction}
            loadingText="正在加载扣分项…"
            emptyText="暂无扣分项"
        />
    )
}

export function PartyQuarterlyView() {
    return (
        <FetchedTableView
            defaultColumns={DEFAULT_PARTY_COLUMNS}
            getCached={getCachedPartyQuarterly}
            getError={getCachedPartyError}
            load={() => fetchPartyQuarterly()}
            refresh={() => fetchPartyQuarterlyWithToast({ force: true })}
            exportName={NAV_LABEL.partyQuarterly}
            loadingText="正在加载季度党群绩效…"
            emptyText="暂无季度党群绩效"
        />
    )
}

type ConfigFormValues = {
    billno?: string
    crrc_textfield: string
    crrc_largetextfield: string
}

export function ConfigView() {
    const [rows, setRows] = useState<DeductionRow[]>(CONFIG_ROWS)
    const [selectedRowId, setSelectedRowId] = useState('')
    const [formOpen, setFormOpen] = useState(false)
    const [formMode, setFormMode] = useState<'new' | 'edit'>('new')
    const [formValues, setFormValues] = useState<ConfigFormValues>({ crrc_textfield: '', crrc_largetextfield: '' })

    const tableColumns = useMemo(() => makeCqColumns(DEFAULT_CONFIG_COLUMNS), [])
    const selectedRow = rows.find((row) => row._rowId === selectedRowId) || null

    function openNewForm() {
        setFormMode('new')
        setFormValues({ billno: '', crrc_textfield: '', crrc_largetextfield: '' })
        setFormOpen(true)
    }

    function openEditForm() {
        if (!selectedRow) return
        setFormMode('edit')
        setFormValues({
            billno: String(selectedRow.billno || ''),
            crrc_textfield: String(selectedRow.crrc_textfield || ''),
            crrc_largetextfield: String(selectedRow.crrc_largetextfield || ''),
        })
        setFormOpen(true)
    }

    function handleDelete() {
        if (!selectedRow) return
        const label = String(selectedRow.billno || selectedRow._rowId)
        if (!window.confirm(`确定删除配置项「${label}」？`)) return
        setRows((prev) => prev.filter((row) => row._rowId !== selectedRowId))
        setSelectedRowId('')
    }

    function handleSave() {
        if (!formValues.crrc_textfield.trim()) return
        if (formMode === 'new') {
            const id = `cfg-${Date.now()}`
            setRows((prev) => [
                ...prev,
                {
                    _rowId: id,
                    billno: formValues.billno || '',
                    billstatus: '暂存',
                    crrc_textfield: formValues.crrc_textfield,
                    crrc_largetextfield: formValues.crrc_largetextfield,
                },
            ])
        } else if (selectedRow) {
            setRows((prev) =>
                prev.map((row) =>
                    row._rowId === selectedRow._rowId
                        ? {
                            ...row,
                            billno: formValues.billno || '',
                            crrc_textfield: formValues.crrc_textfield,
                            crrc_largetextfield: formValues.crrc_largetextfield,
                        }
                        : row,
                ),
            )
        }
        setFormOpen(false)
    }

    return (
        <div className="relative flex min-h-0 flex-1 flex-col gap-2.5">
            <DataToolbar
                actions={[
                    { key: 'new', label: '新增', variant: 'default' },
                    { key: 'edit', label: '修改', disabled: !selectedRow },
                    { key: 'del', label: '删除', disabled: !selectedRow },
                    ...CONFIG_ACTIONS.filter((a) => a.key === 'export'),
                ]}
                onAction={(key) => {
                    if (key === 'new') openNewForm()
                    if (key === 'edit') openEditForm()
                    if (key === 'del') handleDelete()
                    if (key === 'export') {
                        exportTableToExcel({
                            filename: NAV_LABEL.config,
                            columns: DEFAULT_CONFIG_COLUMNS.map((col) => ({ key: col.key, label: col.label })),
                            rows,
                        })
                    }
                }}
            />
            <DataTable
                columns={tableColumns}
                data={rows}
                emptyText="暂无配置项"
                getRowId={(row) => row._rowId}
                selectedRowId={selectedRowId}
                onRowSelect={(row) => setSelectedRowId(row._rowId)}
            />
            {formOpen ? (
                <div className="bg-background/80 absolute inset-0 z-20 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-card flex w-full max-w-lg flex-col gap-3 rounded-lg border p-4 shadow-lg">
                        <h2 className="text-base font-semibold">{formMode === 'new' ? '新增配置项' : '修改配置项'}</h2>
                        <label className="flex flex-col gap-1 text-sm">
                            <span className="text-muted-foreground">单据编号</span>
                            <input
                                className="border-input bg-background rounded-md border px-3 py-2"
                                value={formValues.billno || ''}
                                onChange={(e) => setFormValues((prev) => ({ ...prev, billno: e.target.value }))}
                            />
                        </label>
                        <label className="flex flex-col gap-1 text-sm">
                            <span className="text-muted-foreground">数据类型</span>
                            <input
                                className="border-input bg-background rounded-md border px-3 py-2"
                                value={formValues.crrc_textfield}
                                onChange={(e) => setFormValues((prev) => ({ ...prev, crrc_textfield: e.target.value }))}
                            />
                        </label>
                        <label className="flex flex-col gap-1 text-sm">
                            <span className="text-muted-foreground">配置（JSON 或文本）</span>
                            <textarea
                                className="border-input bg-background min-h-32 rounded-md border px-3 py-2 font-mono text-sm"
                                value={formValues.crrc_largetextfield}
                                onChange={(e) => setFormValues((prev) => ({ ...prev, crrc_largetextfield: e.target.value }))}
                            />
                        </label>
                        <div className="flex justify-end gap-2 pt-1">
                            <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>取消</Button>
                            <Button type="button" onClick={handleSave}>保存</Button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

type SimpleTableViewProps = {
    actions: ToolbarAction[]
    columns: string[]
    exportName: string
    emptyText?: string
}

export function SimpleTableView({ actions, columns, exportName, emptyText }: SimpleTableViewProps) {
    return (
        <div className="flex min-h-0 flex-1 flex-col gap-2.5">
            <DataToolbar
                actions={actions}
                onAction={(key) => {
                    if (key !== 'export') return
                    exportTableToExcel({
                        filename: exportName,
                        columns: columns.map((label) => ({ key: label, label })),
                        rows: [],
                    })
                }}
            />
            <DataTable columns={labelColumns(columns)} data={[]} emptyText={emptyText} />
        </div>
    )
}

function defaultOrgExpanded(root: OrgNode | null) {
    const expanded: Record<string, boolean> = { all: true }
    if (root?.children?.[0]?.id) expanded[root.children[0].id] = true
    return expanded
}

function defaultOrgActiveId(root: OrgNode | null) {
    return root?.children?.[0]?.id || root?.id || ''
}

function findOrgNode(root: OrgNode | null, id: string, parent: OrgNode | null = null): { node: OrgNode; parent: OrgNode | null } | null {
    if (!root) return null
    if (root.id === id) return { node: root, parent }
    for (const child of root.children || []) {
        const hit = findOrgNode(child, id, root)
        if (hit) return hit
    }
    return null
}

function orgToRow(node: OrgNode, parentName: string): DeductionRow {
    return {
        _rowId: node.id,
        number: String(node.number || ''),
        name: node.name,
        orgType: String(node.orgType || ''),
        parentName: parentName || node.parentName || '',
        foundedAt: String(node.foundedAt || ''),
        level: node.level == null ? '' : node.level,
        status: String(node.status || ''),
    }
}

const ORG_TREE_WIDTH_MIN = 180
const ORG_TREE_WIDTH_MAX = 560
const ORG_TREE_WIDTH_DEFAULT = 224

function clampOrgTreeWidth(width: number) {
    return Math.min(ORG_TREE_WIDTH_MAX, Math.max(ORG_TREE_WIDTH_MIN, width))
}

function OrgTreeResizer({ width, onWidthChange }: { width: number; onWidthChange: (width: number) => void }) {
    const drag = useRef<{ startX: number; startW: number } | null>(null)
    const widthRef = useRef(width)
    const onWidthChangeRef = useRef(onWidthChange)
    const [active, setActive] = useState(false)
    widthRef.current = width
    onWidthChangeRef.current = onWidthChange

    useEffect(() => {
        if (!active) return
        const prevCursor = document.body.style.cursor
        const prevSelect = document.body.style.userSelect
        document.body.style.cursor = 'col-resize'
        document.body.style.userSelect = 'none'
        function move(event: PointerEvent) {
            const start = drag.current
            if (!start) return
            onWidthChangeRef.current(clampOrgTreeWidth(start.startW + event.clientX - start.startX))
        }
        function up() {
            drag.current = null
            setActive(false)
        }
        window.addEventListener('pointermove', move)
        window.addEventListener('pointerup', up)
        window.addEventListener('pointercancel', up)
        return () => {
            window.removeEventListener('pointermove', move)
            window.removeEventListener('pointerup', up)
            window.removeEventListener('pointercancel', up)
            document.body.style.cursor = prevCursor
            document.body.style.userSelect = prevSelect
        }
    }, [active])

    return (
        <div
            role="separator"
            aria-orientation="vertical"
            aria-valuemin={ORG_TREE_WIDTH_MIN}
            aria-valuemax={ORG_TREE_WIDTH_MAX}
            aria-valuenow={Math.round(width)}
            aria-label="拖动调整组织树宽度"
            title="拖动调整宽度"
            tabIndex={0}
            onPointerDown={(event: ReactPointerEvent<HTMLDivElement>) => {
                event.preventDefault()
                drag.current = { startX: event.clientX, startW: widthRef.current }
                setActive(true)
            }}
            onKeyDown={(event) => {
                if (event.key === 'ArrowLeft') {
                    event.preventDefault()
                    onWidthChange(clampOrgTreeWidth(width - 16))
                } else if (event.key === 'ArrowRight') {
                    event.preventDefault()
                    onWidthChange(clampOrgTreeWidth(width + 16))
                }
            }}
            className={cn(
                'relative z-10 w-2 shrink-0 cursor-col-resize touch-none',
                'before:bg-border hover:before:bg-primary before:absolute before:inset-y-0 before:left-1/2 before:w-px before:-translate-x-1/2',
                active && 'before:bg-primary',
            )}
        />
    )
}

function OrgTreeItem({
    node,
    activeId,
    expanded,
    depth,
    onSelect,
    onToggle,
}: {
    node: OrgNode
    activeId: string
    expanded: Record<string, boolean>
    depth: number
    onSelect: (id: string) => void
    onToggle: (id: string) => void
}) {
    const hasKids = !!(node.children && node.children.length)
    const isOpen = !!expanded[node.id]
    return (
        <div>
            <div
                className={cn(
                    'flex w-full items-center gap-1 rounded-md py-1.5 pr-2 text-sm',
                    node.id === activeId ? 'bg-primary/10 text-foreground' : 'hover:bg-muted',
                )}
                style={{ paddingLeft: 8 + depth * 12 }}
            >
                <button
                    type="button"
                    aria-label={isOpen ? '折叠' : '展开'}
                    disabled={!hasKids}
                    className={cn('flex size-4 shrink-0 items-center justify-center', hasKids ? 'cursor-pointer' : 'pointer-events-none opacity-0')}
                    onClick={() => onToggle(node.id)}
                >
                    <ChevronRightIcon className={cn('size-3.5 transition-transform', isOpen && 'rotate-90')} />
                </button>
                <button type="button" onClick={() => onSelect(node.id)} className="min-w-0 flex-1 truncate text-left">
                    {node.name}
                </button>
            </div>
            {hasKids && isOpen
                ? node.children.map((child) => (
                    <OrgTreeItem
                        key={child.id}
                        node={child}
                        activeId={activeId}
                        expanded={expanded}
                        depth={depth + 1}
                        onSelect={onSelect}
                        onToggle={onToggle}
                    />
                ))
                : null}
        </div>
    )
}

export function OrgView() {
    const [status, setStatus] = useState<FetchStatus>('idle')
    const [tree, setTree] = useState<OrgNode | null>(null)
    const [error, setError] = useState('')
    const [activeId, setActiveId] = useState('')
    const [expanded, setExpanded] = useState<Record<string, boolean>>({ all: true })
    const [treeWidth, setTreeWidth] = useState(ORG_TREE_WIDTH_DEFAULT)

    function applyTree(root: OrgNode | null) {
        setTree(root)
        setStatus('ready')
        setError('')
        if (root) {
            setActiveId(defaultOrgActiveId(root))
            setExpanded(defaultOrgExpanded(root))
        }
    }

    async function run(force: boolean) {
        setStatus('loading')
        setError('')
        try {
            applyTree(force ? await fetchOrgTreeWithToast({ force: true }) : await fetchOrgTree())
        } catch (err) {
            setError(errorMessage(err))
            setStatus('error')
        }
    }

    useEffect(() => {
        const cached = getCachedOrgTree()
        if (cached) {
            applyTree(cached)
            return
        }
        const cachedError = getCachedOrgError()
        if (cachedError) {
            setStatus('error')
            setError(cachedError)
            return
        }
        void run(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only
    }, [])

    const meta = findOrgNode(tree, activeId)
    const current = meta?.node || tree
    const parentName = current && meta?.parent && meta.parent.id !== 'all' ? meta.parent.name : current && current.id !== 'all' ? '' : ''
    const childRows = (current?.children || []).map((child) => orgToRow(child, current && current.id === 'all' ? '' : current?.name || parentName))
    const tableColumns = useMemo(() => makeCqColumns(DEFAULT_ORG_COLUMNS), [])
    const loading = status === 'loading'
    const emptyText = status === 'loading' ? '正在加载党组织…' : status === 'error' ? error || '加载失败' : '当前节点下级组织'

    return (
        <div className="flex min-h-0 flex-1 overflow-hidden rounded-md border">
            <div className="flex min-h-0 shrink-0 flex-col" style={{ width: treeWidth }}>
                <div className="text-muted-foreground shrink-0 px-3 py-2 text-xs">组织树</div>
                <div className="min-h-0 flex-1 overflow-auto p-1">
                    {tree ? (
                        <OrgTreeItem
                            node={tree}
                            activeId={activeId}
                            expanded={expanded}
                            depth={0}
                            onSelect={setActiveId}
                            onToggle={(id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))}
                        />
                    ) : (
                        <div className="text-muted-foreground px-3 py-6 text-center text-xs">{emptyText}</div>
                    )}
                </div>
            </div>
            <OrgTreeResizer width={treeWidth} onWidthChange={setTreeWidth} />
            <div className="flex min-w-0 flex-1 flex-col gap-2.5 p-3">
                <div className="flex items-center justify-between gap-2">
                    <DataToolbar
                        actions={[
                            { key: 'refresh', label: loading ? '加载中…' : '刷新', variant: 'default', disabled: loading },
                            { key: 'export', label: '导出', disabled: loading },
                        ]}
                        onAction={(key) => {
                            if (key === 'refresh') void run(true)
                            if (key === 'export') {
                                exportTableToExcel({
                                    filename: NAV_LABEL.org,
                                    columns: DEFAULT_ORG_COLUMNS.map((col) => ({ key: col.key, label: col.label })),
                                    rows: childRows,
                                })
                            }
                        }}
                    />
                    <span className="text-muted-foreground text-xs">当前节点：{current?.name || '—'}</span>
                </div>
                <DataTable columns={tableColumns} data={childRows} emptyText={emptyText} getRowId={(row) => row._rowId} />
            </div>
        </div>
    )
}
