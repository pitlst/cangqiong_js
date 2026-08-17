import type { DeductionColumn, DeductionRow } from '@/lib/table-types'

export type { DeductionColumn, DeductionRow, DeductionTable } from '@/lib/table-types'

export const DEFAULT_CONFIG_COLUMNS: DeductionColumn[] = [
    { key: 'billno', label: '单据编号', sortable: true, compact: true },
    { key: 'billstatus', label: '单据状态', sortable: true, badge: true, compact: true },
    { key: 'crrc_textfield', label: '数据类型', sortable: true },
    { key: 'crrc_largetextfield', label: '配置', sortable: true, wrap: true },
]

export const CONFIG_ROWS: DeductionRow[] = []
