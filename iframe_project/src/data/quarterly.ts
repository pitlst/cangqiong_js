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

export const QUARTERLY_ROWS: QuarterlyRow[] = [
    {
        id: '1',
        billNo: 'QJ20265167',
        quarter: '2025-Q3',
        orgName: '市场营销部党支部',
        partyScore: 70.3,
        excellenceScore: 81,
        totalScore: 75.7,
        grade: '合格',
        status: '已审核',
    },
    {
        id: '2',
        billNo: 'QJ20266107',
        quarter: '2026-Q2',
        orgName: '市场营销部党支部',
        partyScore: 83.1,
        excellenceScore: 89.3,
        totalScore: 86.2,
        grade: '良好',
        status: '已审核',
    },
    {
        id: '3',
        billNo: 'QJ20266078',
        quarter: '2026-Q1',
        orgName: '市场营销部党支部',
        partyScore: 94.9,
        excellenceScore: 95.4,
        totalScore: 95.2,
        grade: '优秀',
        status: '暂存',
    },
    {
        id: '4',
        billNo: 'QJ20265173',
        quarter: '2025-Q4',
        orgName: '市场营销部党支部',
        partyScore: 85.5,
        excellenceScore: 89.7,
        totalScore: 87.6,
        grade: '良好',
        status: '已提交',
    },
    {
        id: '5',
        billNo: 'QJ20265166',
        quarter: '2025-Q3',
        orgName: '市场营销部党支部',
        partyScore: 70.3,
        excellenceScore: 81,
        totalScore: 75.7,
        grade: '合格',
        status: '已审核',
    },
    {
        id: '6',
        billNo: 'QJ20266106',
        quarter: '2026-Q2',
        orgName: '市场营销部党支部',
        partyScore: 83.1,
        excellenceScore: 89.3,
        totalScore: 86.2,
        grade: '良好',
        status: '已审核',
    },
    {
        id: '7',
        billNo: 'QJ20266077',
        quarter: '2026-Q1',
        orgName: '市场营销部党支部',
        partyScore: 94.9,
        excellenceScore: 95.4,
        totalScore: 95.2,
        grade: '优秀',
        status: '暂存',
    },
    {
        id: '8',
        billNo: 'QJ20265172',
        quarter: '2025-Q4',
        orgName: '市场营销部党支部',
        partyScore: 85.5,
        excellenceScore: 89.7,
        totalScore: 87.6,
        grade: '良好',
        status: '已提交',
    },
    {
        id: '9',
        billNo: 'QJ20265165',
        quarter: '2025-Q3',
        orgName: '市场营销部党支部',
        partyScore: 70.3,
        excellenceScore: 81,
        totalScore: 75.7,
        grade: '合格',
        status: '已审核',
    },
    {
        id: '10',
        billNo: 'QJ20266105',
        quarter: '2026-Q2',
        orgName: '市场营销部党支部',
        partyScore: 83.1,
        excellenceScore: 89.3,
        totalScore: 86.2,
        grade: '良好',
        status: '已审核',
    },
]
