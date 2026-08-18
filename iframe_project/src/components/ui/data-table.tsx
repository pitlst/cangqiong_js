import { useEffect, type ReactNode } from 'react'
import { useTable, type ColumnDef, type RowData } from '@tanstack/react-table'
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from 'lucide-react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TablePager } from '@/components/table-pager'
import { dataTableFeatures, type DataTableFeatures } from '@/components/data-table-features'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type DataTableProps<TData extends RowData> = {
    columns: ColumnDef<DataTableFeatures, TData>[]
    data: TData[]
    emptyText?: string
    getRowId?: (originalRow: TData, index: number) => string
    selectedRowId?: string
    selectedRowIds?: string[]
    onRowSelect?: (row: TData) => void
    onSelectedRowIdsChange?: (ids: string[]) => void
    onRowOpen?: (row: TData) => void
    selectTone?: 'primary' | 'muted'
    enableSearch?: boolean
    enableSelectColumn?: boolean
    toolbar?: ReactNode
    pageSize?: number
}

function selected_ids(selection: Record<string, boolean>) {
    return Object.keys(selection).filter((id) => selection[id])
}

function same_ids(left: string[], right: string[]) {
    if (left.length !== right.length) return false
    const set = new Set(left)
    return right.every((id) => set.has(id))
}

export function DataTable<TData extends RowData>({
    columns,
    data,
    emptyText = '暂无数据',
    getRowId,
    selectedRowId,
    selectedRowIds,
    onRowSelect,
    onSelectedRowIdsChange,
    onRowOpen,
    selectTone = 'primary',
    enableSearch = false,
    enableSelectColumn = false,
    toolbar,
    pageSize = 50,
}: DataTableProps<TData>) {
    const multiSelect = enableSelectColumn
    const table = useTable(
        {
            features: dataTableFeatures,
            data,
            columns,
            getRowId,
            enableMultiRowSelection: multiSelect,
            globalFilterFn: 'includesString',
            initialState: {
                pagination: {
                    pageIndex: 0,
                    pageSize,
                },
                rowSelection: selectedRowIds?.length
                    ? Object.fromEntries(selectedRowIds.map((id) => [id, true]))
                    : selectedRowId
                      ? { [selectedRowId]: true }
                      : {},
            },
        },
        (state) => ({
            pagination: state.pagination,
            rowSelection: state.rowSelection,
            sorting: state.sorting,
            globalFilter: state.globalFilter,
        }),
    )

    const pagination = table.state.pagination
    const pageCount = Math.max(table.getPageCount(), 1)
    const colSpan = (table.getVisibleLeafColumns().length || columns.length) + (enableSelectColumn ? 1 : 0)
    const rows = table.getRowModel().rows
    const searchValue = typeof table.state.globalFilter === 'string' ? table.state.globalFilter : ''

    function emit_selection(next: Record<string, boolean>) {
        const ids = selected_ids(next)
        onSelectedRowIdsChange?.(ids)
        if (ids.length === 1) {
            const match = table.getRowModel().rows.find((row) => row.id === ids[0]) ?? all_rows().find((row) => row.id === ids[0])
            if (match) onRowSelect?.(match.original)
        }
    }

    function all_rows() {
        const table_with_models = table as typeof table & {
            getPrePaginatedRowModel?: () => { rows: typeof rows }
            getPrePaginationRowModel?: () => { rows: typeof rows }
            getFilteredRowModel?: () => { rows: typeof rows }
            getSortedRowModel?: () => { rows: typeof rows }
        }
        if (typeof table_with_models.getPrePaginatedRowModel === 'function') {
            return table_with_models.getPrePaginatedRowModel().rows
        }
        if (typeof table_with_models.getPrePaginationRowModel === 'function') {
            return table_with_models.getPrePaginationRowModel().rows
        }
        if (typeof table_with_models.getFilteredRowModel === 'function') {
            return table_with_models.getFilteredRowModel().rows
        }
        if (typeof table_with_models.getSortedRowModel === 'function') {
            return table_with_models.getSortedRowModel().rows
        }
        return table.getRowModel().rows
    }

    function apply_selection(ids: string[]) {
        const next = Object.fromEntries(ids.map((id) => [id, true]))
        table.setRowSelection(next)
        emit_selection(next)
    }

    function toggle_row(rowId: string) {
        const next = { ...table.state.rowSelection }
        if (next[rowId]) delete next[rowId]
        else next[rowId] = true
        table.setRowSelection(next)
        emit_selection(next)
    }

    useEffect(() => {
        if (multiSelect) {
            const nextIds = selectedRowIds ?? []
            const currentIds = selected_ids(table.state.rowSelection)
            if (same_ids(nextIds, currentIds)) return
            table.setRowSelection(Object.fromEntries(nextIds.map((id) => [id, true])))
            return
        }
        const currentKeys = selected_ids(table.state.rowSelection)
        if (selectedRowId) {
            if (currentKeys.length === 1 && currentKeys[0] === selectedRowId) return
            table.setRowSelection({ [selectedRowId]: true })
            return
        }
        if (!currentKeys.length) return
        table.setRowSelection({})
    }, [selectedRowId, selectedRowIds, multiSelect])

    return (
        <div className="flex min-h-0 flex-1 flex-col gap-2.5">
            {toolbar || enableSearch || enableSelectColumn ? (
                <div className="flex items-center gap-2">
                    {toolbar ? <div className="min-w-0">{toolbar}</div> : null}
                    {enableSelectColumn ? (
                        <>
                            <Button type="button" variant="outline" size="lg" onClick={() => apply_selection(rows.map((row) => row.id))}>
                                全选页面
                            </Button>
                            <Button type="button" variant="outline" size="lg" onClick={() => apply_selection(all_rows().map((row) => row.id))}>
                                全选全部
                            </Button>
                        </>
                    ) : null}
                    {enableSearch ? (
                        <Input
                            value={searchValue}
                            placeholder="搜索"
                            className="ml-auto w-56 shrink-0"
                            onChange={(event) => {
                                table.setGlobalFilter(event.target.value)
                                table.setPageIndex(0)
                            }}
                        />
                    ) : null}
                </div>
            ) : null}
            <div className="min-h-0 flex-1 overflow-auto">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="hover:bg-transparent">
                                {enableSelectColumn ? <TableHead className="text-muted-foreground w-12">选择</TableHead> : null}
                                {headerGroup.headers.map((header) => {
                                    const canSort = header.column.getCanSort()
                                    const sorted = header.column.getIsSorted()
                                    return (
                                        <TableHead key={header.id} className="text-muted-foreground">
                                            {header.isPlaceholder ? null : canSort ? (
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center gap-1 hover:text-foreground"
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    <table.FlexRender header={header} />
                                                    {sorted === 'asc' ? (
                                                        <ArrowUpIcon className="size-3.5" />
                                                    ) : sorted === 'desc' ? (
                                                        <ArrowDownIcon className="size-3.5" />
                                                    ) : (
                                                        <ArrowUpDownIcon className="size-3.5 opacity-50" />
                                                    )}
                                                </button>
                                            ) : (
                                                <table.FlexRender header={header} />
                                            )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {rows.length ? (
                            rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() ? 'selected' : undefined}
                                    className={cn(
                                        'cursor-pointer',
                                        selectTone === 'muted'
                                            ? 'hover:bg-muted/70 data-[state=selected]:bg-muted'
                                            : 'hover:bg-primary/8 data-[state=selected]:bg-primary/10',
                                        row.getIsSelected() && (selectTone === 'muted' ? 'bg-muted' : 'bg-primary/10'),
                                    )}
                                    onClick={(event) => {
                                        const target = event.target as HTMLElement
                                        if (target.closest('input, textarea, select, button, label')) return
                                        if (onRowOpen) {
                                            onRowOpen(row.original)
                                            return
                                        }
                                        table.setRowSelection({ [row.id]: true })
                                        onRowSelect?.(row.original)
                                    }}
                                >
                                    {enableSelectColumn ? (
                                        <TableCell className="w-12">
                                            <Label
                                                className="justify-center"
                                                onClick={(event) => {
                                                    event.preventDefault()
                                                    event.stopPropagation()
                                                    toggle_row(row.id)
                                                }}
                                            >
                                                <Checkbox checked={row.getIsSelected()} />
                                            </Label>
                                        </TableCell>
                                    ) : null}
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            <table.FlexRender cell={cell} />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={colSpan} className="text-muted-foreground h-24 text-center">
                                    {emptyText}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <TablePager
                page={pagination.pageIndex + 1}
                pageCount={pageCount}
                pageSize={pagination.pageSize}
                onPageChange={(page) => table.setPageIndex(page - 1)}
                onPageSizeChange={(size) => {
                    table.setPageSize(size)
                    table.setPageIndex(0)
                }}
            />
        </div>
    )
}
