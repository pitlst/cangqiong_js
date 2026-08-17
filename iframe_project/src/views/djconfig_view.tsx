import { useMemo, useEffect, useState } from 'react'

import { quarterlyColumns } from '@/components/data-table/quarterly-columns'
import { DataToolbar } from '@/components/data-toolbar'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { exportTableToExcel } from '@/lib/excel'
import { NAV_LABEL } from '@/lib/nav'
import { get_err_message, type FetchStatus } from '@/lib/utils'
import { CONFIG_TYPE_NAME } from '@/lib/type'
import { fetch_data, type BillRow as DjConfigBillRow, BILL_COLUMNS } from '@/lib/api/djconfig_select'

type ConfigFormValues = {
    billno: string
    crrc_textfield: string
    crrc_largetextfield: string
}

export function djconfig_view() {
    const [status, setStatus] = useState<FetchStatus>('idle')
    const [rows, setRows] = useState<DjConfigBillRow[]>([])
    const [error, setError] = useState('')

    const [selectedRowId, setSelectedRowId] = useState('')
    const [formOpen, setFormOpen] = useState(false)
    const [formMode, setFormMode] = useState<'new' | 'edit'>('new')
    const [formValues, setFormValues] = useState<ConfigFormValues>({ billno: '', crrc_textfield: '', crrc_largetextfield: '' })
    const tableColumns = useMemo(() => makeCqColumns(DEFAULT_CONFIG_COLUMNS), [])
    const selectedRow = rows.find((row) => row._rowId === selectedRowId) || null

    async function run(force: boolean) {
        setStatus('loading')
        setError('')
        try {
            const data = force ? await fetch_data({ force: true }) : await fetch_data()
            const filtered = data.filter((row) => row.crrc_textfield in CONFIG_TYPE_NAME)
            setRows(filtered)
            setStatus('ready')
        } catch (err) {
            setError(get_err_message(err))
            setStatus('error')
        }
    }

    useEffect(() => {
        void run(false)
    }, [])

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

    const loading = status === 'loading'
    const emptyText = status === 'loading' ? '正在加载配置项数据…' : status === 'error' ? error || '加载失败' : '暂无配置项数据'

    return (
        <div className="flex min-h-0 flex-1 flex-col gap-2.5">
            <DataToolbar
                actions={[
                    { key: 'refresh', label: loading ? '加载中…' : '刷新', variant: 'default', disabled: loading },
                    { key: 'new', label: '新增', variant: 'default' as const },
                    { key: 'edit', label: '修改' },
                    { key: 'del', label: '删除' },
                    { key: 'export', label: '导出', disabled: loading },
                ]}
                onAction={(key) => {
                    if (key === 'new') openNewForm()
                    if (key === 'edit') openEditForm()
                    if (key === 'del') handleDelete()
                    if (key === 'refresh') void run(true)
                    if (key !== 'export') return
                    exportTableToExcel({
                        filename: NAV_LABEL.quarterly,
                        columns: BILL_COLUMNS.map((col) => ({ key: col.key, label: col.label })),
                        rows,
                    })
                }}
            />
            <DataTable columns={quarterlyColumns} data={rows} emptyText={emptyText} getRowId={(row) => row.id} onRowSelect={(row) => setSelectedRowId(row._rowId)} />            {formOpen ? (
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
                            <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>
                                取消
                            </Button>
                            <Button type="button" onClick={handleSave}>
                                保存
                            </Button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
