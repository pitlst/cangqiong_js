import { useEffect, useState } from 'react'

import { quarterlyColumns } from '@/components/data-table/quarterly-columns'
import { DataToolbar } from '@/components/data-toolbar'
import { DataTable } from '@/components/ui/data-table'
import { exportTableToExcel } from '@/lib/excel'
import { NAV_LABEL } from '@/lib/nav'
import { get_err_message, type FetchStatus } from '@/lib/utils'
import { CONFIG_TYPE_NAME } from '@/lib/config'
import { fetch_data, type BillRow as DjConfigBillRow, BILL_COLUMNS } from '@/lib/api/djconfig_select'

export function quarterly_view() {
    const [status, setStatus] = useState<FetchStatus>('idle')
    const [rows, setRows] = useState<DjConfigBillRow[]>([])
    const [configs, setConfigs] = useState<DjConfigBillRow[]>([])
    const [error, setError] = useState('')

    async function run(force: boolean) {
        setStatus('loading')
        setError('')
        try {
            const data = force ? await fetch_data({ force: true }) : await fetch_data()
            const filtered_data = data.filter((row) => row.crrc_textfield === '季度评价结果')
            setRows(filtered_data)
            const filtered_config = data.filter((row) => row.crrc_textfield in CONFIG_TYPE_NAME)
            setConfigs(filtered_config)
            setStatus('ready')
        } catch (err) {
            setError(get_err_message(err))
            setStatus('error')
        }
    }

    useEffect(() => {
        void run(false)
    }, [])

    const loading = status === 'loading'
    const emptyText = status === 'loading' ? '正在加载季度评价结果…' : status === 'error' ? error || '加载失败' : '暂无季度评价结果'

    return (
        <div className="flex min-h-0 flex-1 flex-col gap-2.5">
            <DataToolbar
                actions={[
                    { key: 'refresh', label: loading ? '加载中…' : '刷新', variant: 'default', disabled: loading },
                    { key: 'new', label: '新增', variant: 'default' as const },
                    { key: 'edit', label: '修改' },
                    { key: 'del', label: '删除' },
                    { key: 'calc-score', label: '计算绩效得分' },
                    { key: 'calc-eval', label: '计算绩效评价结果' },
                    { key: 'calc-excellence', label: '计算创先争优结果' },
                    { key: 'export', label: '导出', disabled: loading },
                ]}
                onAction={(key) => {
                    if (key === 'refresh') void run(true)
                    if (key !== 'export') return
                    exportTableToExcel({
                        filename: NAV_LABEL.quarterly,
                        columns: BILL_COLUMNS.map((col) => ({ key: col.key, label: col.label })),
                        rows,
                    })
                }}
            />
            <DataTable columns={quarterlyColumns} data={rows} emptyText={emptyText} getRowId={(row) => row.id} />
        </div>
    )
}
