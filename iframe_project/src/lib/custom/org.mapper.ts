import type { OrgNode } from '@/lib/table-types'

const EMPTY_ORG_ROOT: OrgNode = { id: 'all', name: '全部组织', children: [] }

/**
 * 党组织：OpenAPI 响应 → 组织树
 * @param rows cqQueryAll(CQ_API_PATH.org) 返回的节点数组
 * @see OrgView 左侧树 + 右侧子节点表（DEFAULT_ORG_COLUMNS）
 */
export function mapOrgTree(rows: Record<string, unknown>[]): OrgNode {
    // ========== 党组织 JSON → UI 映射（请在此编写）==========
    //
    // 入参 rows：扁平组织节点列表（需自行拼 parentid / children 树结构）
    // 出参 OrgNode：根节点 id 建议为 'all'，name 为「全部组织」，children 为顶层组织
    //
    void rows
    return EMPTY_ORG_ROOT
    // ========== 党组织映射结束 ==========
}
