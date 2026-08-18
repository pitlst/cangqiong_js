import { createColumnHelper } from '@tanstack/react-table'

import { type DataTableFeatures } from '@/components/data-table-features'
import { OrgTree } from '@/components/org-tree'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTable } from '@/components/ui/data-table'
import { Field, FieldLabel } from '@/components/ui/field'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { ORG_ALL_ID, type OrgTreeNode } from '@/lib/api/org'

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

export function default_org_expanded(roots: OrgTreeNode[]) {
    return new Set([ORG_ALL_ID, ...roots.map((node) => node.id)])
}

export function OrgSelectPanel({
    roots,
    tableRows,
    selectedId,
    includeSelf,
    expandedIds,
    emptyText,
    includeSelfId = 'org-include-self',
    onSelect,
    onIncludeSelfChange,
    onExpandedChange,
}: {
    roots: OrgTreeNode[]
    tableRows: OrgTreeNode[]
    selectedId: string
    includeSelf: boolean
    expandedIds: Set<string>
    emptyText: string
    includeSelfId?: string
    onSelect: (id: string) => void
    onIncludeSelfChange: (checked: boolean) => void
    onExpandedChange: (id: string, open: boolean) => void
}) {
    return (
        <ResizablePanelGroup orientation="horizontal" className="min-h-0 flex-1">
            <ResizablePanel defaultSize="18rem" minSize="12rem" maxSize="50%" className="min-h-0">
                <Card className="flex h-full min-h-0 flex-col gap-0 overflow-hidden py-0">
                    <CardContent className="min-h-0 flex-1 px-0">
                        <OrgTree
                            roots={roots}
                            selectedId={selectedId}
                            expandedIds={expandedIds}
                            onSelect={onSelect}
                            onExpandedChange={onExpandedChange}
                        />
                    </CardContent>
                    <CardFooter className="border-t py-2">
                        <Field orientation="horizontal" className="w-auto gap-2">
                            <Checkbox
                                id={includeSelfId}
                                checked={includeSelf}
                                onCheckedChange={(checked) => onIncludeSelfChange(checked === true)}
                            />
                            <FieldLabel htmlFor={includeSelfId} className="font-normal">
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
                        onRowSelect={(row) => onSelect(row.id)}
                        selectTone="muted"
                    />
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
