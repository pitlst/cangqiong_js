import type { QuarterlyRow } from '@/data/quarterly'

/**
 * 季度评价结果：OpenAPI 响应 → 表格行
 * @param bills cqQueryAll(CQ_API_PATH.quarterly) 返回的单据数组
 * @see QuarterlyRow（@/data/quarterly）、quarterlyColumns 列定义
 */
export function mapQuarterlyRows(bills: Record<string, unknown>[]): QuarterlyRow[] {
    // ========== 季度评价结果 JSON → UI 映射（请在此编写）==========
    //
    // 入参 bills：每项为一张评价结果单据
    // 出参 QuarterlyRow[]：id、billNo、quarter、orgName、partyScore、excellenceScore、totalScore、grade、status
    //
    void bills
    return []
    // ========== 季度评价结果映射结束 ==========
}
