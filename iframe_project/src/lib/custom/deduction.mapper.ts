import type { DeductionRow } from '@/lib/table-types'

/**
 * 扣分项台账：OpenAPI 响应 → 表格行
 * @param bills cqQueryAll(CQ_API_PATH.deduction) 返回的单据数组
 * @see DEFAULT_DEDUCTION_COLUMNS（@/data/deduction）列 key 需与返回值字段一致
 */
export function mapDeductionRows(bills: Record<string, unknown>[]): DeductionRow[] {
    // ========== 扣分项 JSON → UI 映射（请在此编写）==========
    //
    // 入参 bills：每项为一张单据（含 billno、billstatus、entryentity 分录等）
    // 出参 DeductionRow[]：每行需有 _rowId，其余 key 对齐表格列
    //
    console.log(bills)
    void bills
    return []
    // ========== 扣分项映射结束 ==========
}
