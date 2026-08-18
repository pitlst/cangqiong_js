import { useEffect, useMemo, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import { type DataTableFeatures } from '@/components/data-table-features'
import { DataToolbar } from '@/components/data-toolbar'
import { OrgTree } from '@/components/org-tree'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTable } from '@/components/ui/data-table'
import { Field, FieldLabel } from '@/components/ui/field'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { ORG_ALL_ID, build_tree, collect_table_rows, fetch_data, find_path, trans_data, type OrgTreeNode, type ParseOrgRow } from '@/lib/api/org'
import { NAV_LABEL } from '@/lib/nav'
import { get_err_message, type FetchStatus } from '@/lib/utils'

const columnHelper = createColumnHelper<DataTableFeatures, OrgTreeNode>()

function format_text(value: string | number | null | undefined) {
    if (value == null || value === '') return '-'
    return String(value)
}

function format_date(value: string) {
    if (!value) return '-'
    return value.slice(0, 10)
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

const orgColumns = columnHelper.columns([
    columnHelper.display({
        id: 'seq',
        header: () => <div className="text-right">序号</div>,
        cell: ({ row }) => <div className="text-right">{row.index + 1}</div>,
    }),
    columnHelper.accessor('name', {
        header: '组织名称',
        cell: ({ getValue }) => <span className="text-primary">{format_text(getValue())}</span>,
    }),
    columnHelper.accessor('status_title', {
        header: '数据状态',
        cell: ({ getValue }) => <StatusBadge status={getValue()} />,
    }),
    columnHelper.accessor('parent_name', {
        header: '上级名称',
        cell: ({ getValue }) => format_text(getValue()),
    }),
    columnHelper.accessor('crrc_combofield_title', {
        header: '党组织类别',
        cell: ({ getValue }) => format_text(getValue()),
    }),
    columnHelper.accessor('crrc_datefield', {
        header: '成立时间',
        cell: ({ getValue }) => format_date(getValue()),
    }),
    columnHelper.accessor('crrc_datefield3', {
        header: '本届委员会成立时间',
        cell: ({ getValue }) => format_date(getValue()),
    }),
    columnHelper.accessor('crrc_integerfield', {
        header: () => <div className="text-right">任期</div>,
        cell: ({ getValue }) => <div className="text-right">{getValue()}</div>,
    }),
    columnHelper.accessor('crrc_stepperfield', {
        header: () => <div className="text-right">排序码</div>,
        cell: ({ getValue }) => <div className="text-right">{getValue()}</div>,
    }),
    columnHelper.accessor('crrc_datefield2', {
        header: '下次换届选举时间',
        cell: ({ getValue }) => format_date(getValue()),
    }),
    columnHelper.accessor('level', {
        header: () => <div className="text-right">级次</div>,
        cell: ({ getValue }) => <div className="text-right">{getValue()}</div>,
    }),
    columnHelper.accessor('longnumber', {
        header: '长编码',
        cell: ({ getValue }) => format_text(getValue()),
    }),
    columnHelper.accessor('fullname', {
        header: '组织长名称',
        cell: ({ getValue }) => format_text(getValue()),
    }),
])

function default_expanded(roots: OrgTreeNode[]) {
    return new Set([ORG_ALL_ID, ...roots.map((node) => node.id)])
}

export function PartyOrgSelectView() {
    const [status, setStatus] = useState<FetchStatus>('idle')
    const [rawRows, setRawRows] = useState<ParseOrgRow[]>([])
    const [error, setError] = useState('')
    const [selectedId, setSelectedId] = useState(ORG_ALL_ID)
    const [includeSelf, setIncludeSelf] = useState(true)
    const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set([ORG_ALL_ID]))

    const roots = useMemo(() => build_tree(rawRows), [rawRows])
    const tableRows = useMemo(() => collect_table_rows(roots, selectedId, includeSelf), [roots, selectedId, includeSelf])

    async function run(force: boolean) {
        setStatus('loading')
        setError('')
        try {
            const data = force ? await fetch_data({ force: true }) : await fetch_data()
            const parsed = trans_data(data)
            const next_roots = build_tree(parsed)
            setRawRows(parsed)
            setSelectedId(ORG_ALL_ID)
            setExpandedIds(default_expanded(next_roots))
            setStatus('ready')
        } catch (err) {
            setError(get_err_message(err))
            setStatus('error')
        }
    }

    useEffect(() => {
        void run(false)
    }, [])

    function handleExpandedChange(id: string, open: boolean) {
        setExpandedIds((prev) => {
            const next = new Set(prev)
            if (open) next.add(id)
            else next.delete(id)
            return next
        })
    }

    function select_node(id: string) {
        setSelectedId(id)
        if (id === ORG_ALL_ID) {
            handleExpandedChange(ORG_ALL_ID, true)
            return
        }
        const path = find_path(roots, id)
        setExpandedIds((prev) => {
            const next = new Set(prev)
            next.add(ORG_ALL_ID)
            path.slice(0, -1).forEach((node) => next.add(node.id))
            return next
        })
    }

    const loading = status === 'loading'
    const emptyText = status === 'loading' ? '正在加载党组织…' : status === 'error' ? error || '加载失败' : '暂无党组织'

    return (
        <div className="relative flex min-h-0 flex-1 flex-col">
            <header className="mb-2.5 flex items-center justify-between gap-2">
                <h1 className="text-lg font-semibold tracking-tight">{NAV_LABEL.org}</h1>
                <DataToolbar
                    actions={[{ key: 'refresh', label: status === 'loading' ? '加载中…' : '刷新', variant: 'default', disabled: loading }]}
                    onAction={(key) => {
                        if (key === 'refresh') void run(true)
                    }}
                />
            </header>
            <ResizablePanelGroup orientation="horizontal" className="min-h-0 flex-1">
                <ResizablePanel defaultSize="18rem" minSize="12rem" maxSize="50%" className="min-h-0">
                    <Card className="flex h-full min-h-0 flex-col gap-0 overflow-hidden py-0">
                        <CardContent className="min-h-0 flex-1 px-0">
                            <OrgTree
                                roots={roots}
                                selectedId={selectedId}
                                expandedIds={expandedIds}
                                onSelect={select_node}
                                onExpandedChange={handleExpandedChange}
                            />
                        </CardContent>
                        <CardFooter className="border-t py-2">
                            <Field orientation="horizontal" className="w-auto gap-2">
                                <Checkbox id="org-include-self" checked={includeSelf} onCheckedChange={(checked) => setIncludeSelf(checked === true)} />
                                <FieldLabel htmlFor="org-include-self" className="font-normal">
                                    包含本级
                                </FieldLabel>
                            </Field>
                        </CardFooter>
                    </Card>
                </ResizablePanel>
                <ResizableHandle withHandle className="mx-1" />
                <ResizablePanel minSize="20rem" className="min-h-0 min-w-0">
                    <div className="relative flex h-full min-h-0 min-w-0 flex-col">
                        <DataTable
                            key={`${selectedId}-${String(includeSelf)}`}
                            columns={orgColumns}
                            data={tableRows}
                            emptyText={emptyText}
                            getRowId={(row) => row.id}
                            selectedRowId={selectedId === ORG_ALL_ID ? '' : selectedId}
                            onRowSelect={(row) => select_node(row.id)}
                            selectTone="muted"
                            pageSize={50}
                        />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}
