import type { DeductionRow } from '@/lib/table-types'

/**
 * 季度党群绩效：OpenAPI 响应 → 表格行
 * @param bills cqQueryAll(CQ_API_PATH.partyQuarterly) 返回的单据数组
 * @see DEFAULT_PARTY_COLUMNS（@/data/party）列 key 需与返回值字段一致
 */
export function mapPartyQuarterlyRows(bills: Record<string, unknown>[]): DeductionRow[] {
    // ========== 季度党群绩效 JSON → UI 映射（请在此编写）==========
    //
    // 入参 bills：每项为一张单据（单据头 + entryentity 分录）
    // 出参 DeductionRow[]：每行需有 _rowId，其余 key 对齐表格列
    //
    void bills
    return []
    // ========== 季度党群绩效映射结束 ==========
}
