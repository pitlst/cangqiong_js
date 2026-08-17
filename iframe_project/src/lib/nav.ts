export type NavId = 'quarterly' | 'annual' | 'config' | 'deduction' | 'contribution_degree' | 'org'

export const PRIMARY_NAV: { id: NavId; label: string }[] = [
    { id: 'quarterly', label: '季度评价结果' },
    { id: 'annual', label: '年度评价结果' },
    { id: 'config', label: '配置项管理' },
]

export const SOURCE_NAV: { id: NavId; label: string }[] = [
    { id: 'deduction', label: '扣分项台账' },
    { id: 'contribution_degree', label: '季度党群绩效贡献度' },
    { id: 'org', label: '党组织查询' },
]

export const NAV_LABEL: Record<NavId, string> = {
    quarterly: '季度评价结果',
    annual: '年度评价结果',
    config: '配置项管理',
    deduction: '扣分项台账',
    contribution_degree: '季度党群绩效贡献度',
    org: '党组织查询',
}
