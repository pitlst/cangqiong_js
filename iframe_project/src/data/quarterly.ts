export type DocStatus = '已审核' | '暂存' | '已提交'
export type Grade = '合格' | '良好' | '优秀'

export type QuarterlyRow = {
    id: string
    billNo: string
    quarter: string
    orgName: string
    partyScore: number
    excellenceScore: number
    totalScore: number
    grade: Grade
    status: DocStatus
}

export const QUARTERLY_EXPORT_COLUMNS = [
    { key: 'billNo', label: '单据编号' },
    { key: 'quarter', label: '评价季度' },
    { key: 'orgName', label: '党组织' },
    { key: 'partyScore', label: '党群绩效得分' },
    { key: 'excellenceScore', label: '创先争优得分' },
    { key: 'totalScore', label: '综合得分' },
    { key: 'grade', label: '评价等级' },
    { key: 'status', label: '单据状态' },
] as const
