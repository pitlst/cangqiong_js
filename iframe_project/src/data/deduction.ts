import type { DeductionColumn } from '@/lib/cangqiong/types'

export type { DeductionColumn, DeductionRow, DeductionTable } from '@/lib/cangqiong/types'

export const DEFAULT_DEDUCTION_COLUMNS: DeductionColumn[] = [
    { key: 'billno', label: '单据编号', sortable: true, compact: true },
    { key: 'billstatus', label: '单据状态', sortable: true, badge: true, compact: true },
    { key: 'crrc_datefield', label: '年份', sortable: true, compact: true },
    { key: 'crrc_radiooptgroupfield', label: '季度', sortable: true, compact: true },
    { key: 'crrc_textfield', label: '扣分事项', sortable: true, wrap: true },
    { key: 'crrc_textfield1', label: '扣分依据', sortable: true, wrap: true },
    { key: 'crrc_decimalfield', label: '扣分分数', sortable: true, numeric: true, compact: true },
    { key: 'crrc_basedatafield', label: '被扣分组织', sortable: true },
    { key: 'crrc_orgfield_name', label: '输出部门.名称', sortable: true },
]
