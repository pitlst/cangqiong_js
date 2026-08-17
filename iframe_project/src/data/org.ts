import type { DeductionColumn, OrgNode } from '@/lib/table-types'

export type { OrgNode } from '@/lib/table-types'

export const DEFAULT_ORG_COLUMNS: DeductionColumn[] = [
    { key: 'number', label: '组织编码', sortable: true, compact: true },
    { key: 'name', label: '组织名称', sortable: true },
    { key: 'orgType', label: '组织类型', sortable: true, compact: true },
    { key: 'parentName', label: '上级组织', sortable: true },
    { key: 'foundedAt', label: '成立日期', sortable: true, compact: true },
    { key: 'level', label: '层级', sortable: true, compact: true },
    { key: 'status', label: '状态', sortable: true, badge: true, compact: true },
]

export const DEFAULT_ORG_TREE: OrgNode = {
    id: 'all',
    name: '全部组织',
    children: [],
}
