import { useEffect, type ReactNode } from 'react'
import { useTable, type ColumnDef, type RowData } from '@tanstack/react-table'
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from 'lucide-react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TablePager } from '@/components/table-pager'
import { dataTableFeatures, type DataTableFeatures } from '@/components/data-table/data-table-features'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type DataTableProps<TData extends RowData> = {
    columns: ColumnDef<DataTableFeatures, TData>[]
    data: TData[]
    emptyText?: string
    getRowId?: (originalRow: TData, index: number) => string
    selectedRowId?: string
    onRowSelect?: (row: TData) => void
    selectTone?: 'primary' | 'muted'
    enableSearch?: boolean
    toolbar?: ReactNode
}

export function DataTable<TData extends RowData>({
    columns,
    data,
    emptyText = '暂无数据',
    getRowId,
    selectedRowId,
    onRowSelect,
    selectTone = 'primary',
    enableSearch = false,
    toolbar,
}: DataTableProps<TData>) {
    const table = useTable(
        {
            features: dataTableFeatures,
            data,
            columns,
            getRowId,
            enableMultiRowSelection: false,
            globalFilterFn: 'includesString',
            initialState: {
                pagination: {
                    pageIndex: 0,
                    pageSize: 10,
                },
                rowSelection: selectedRowId ? { [selectedRowId]: true } : {},
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
    const colSpan = table.getVisibleLeafColumns().length || columns.length
    const rows = table.getRowModel().rows
    const searchValue = typeof table.state.globalFilter === 'string' ? table.state.globalFilter : ''

    useEffect(() => {
        const currentKeys = Object.keys(table.state.rowSelection).filter((key) => table.state.rowSelection[key])
        if (selectedRowId) {
            if (currentKeys.length === 1 && currentKeys[0] === selectedRowId) return
            table.setRowSelection({ [selectedRowId]: true })
            return
        }
        if (!currentKeys.length) return
        table.setRowSelection({})
    }, [selectedRowId])

    return (
        <div className="flex min-h-0 flex-1 flex-col gap-2.5">
            {toolbar || enableSearch ? (
                <div className="flex items-center gap-2">
                    {toolbar ? <div className="min-w-0 flex-1">{toolbar}</div> : null}
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
                                        if (target.closest('input, textarea, select, button')) return
                                        table.setRowSelection({ [row.id]: true })
                                        onRowSelect?.(row.original)
                                    }}
                                >
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
