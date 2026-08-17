import type { DeductionRow } from '@/lib/table-types'

/**
 * 配置项：djconfig_select 响应 → 表格行
 * @param bills parseConfigSelectRows 解析后的单据数组
 * @see DEFAULT_CONFIG_COLUMNS（@/data/config）列 key 需与返回值字段一致
 */
export function mapConfigRows(bills: Record<string, unknown>[]): DeductionRow[] {
    // ========== 配置项 JSON → UI 映射（请在此编写）==========
    //
    // 入参 bills：djconfig_select 返回的单据列表
    // 出参 DeductionRow[]：每行需有 _rowId，字段对齐 billno / billstatus / crrc_textfield / crrc_largetextfield
    //
    void bills
    return []
    // ========== 配置项映射结束 ==========
}
