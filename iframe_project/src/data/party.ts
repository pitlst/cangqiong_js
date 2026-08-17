import type { DeductionColumn, DeductionRow } from '@/lib/table-types'

export type { DeductionColumn, DeductionRow, DeductionTable } from '@/lib/table-types'

export const DEFAULT_PARTY_COLUMNS: DeductionColumn[] = [
    { key: 'crrc_basedatafield1', label: '党组织', sortable: true },
    { key: 'crrc_combofield', label: '季度', sortable: true, compact: true },
    { key: 'crrc_datetimefield', label: '统计年', sortable: true, compact: true },
    { key: 'billno', label: '编号', sortable: true, compact: true },
    { key: 'billstatus', label: '数据状态', sortable: true, badge: true, compact: true },
]

export const PARTY_ROWS: DeductionRow[] = []
