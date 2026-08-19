import { cq_fetch } from '@/lib/cq_fetch'
import { CACHE_TTL_MS, CQ_API_PATH, CQ_OPENAPI, type CqPageResponse } from '@/lib/config'

/** 季度党群绩效贡献度分录（entryentity），仅保留 ENTRY_COLUMNS 中的字段 */
export type BillEntry = {
    id: string
    seq: number
    modifydatefield: string
    crrc_decimalfield: number
    crrc_largetextfield_tag: string
    crrc_decimalfield1: number
    crrc_largetextfield1_tag: string
    crrc_decimalfield2: number
    crrc_largetextfield2_tag: string
    crrc_decimalfield3: number
    crrc_largetextfield3_tag: string
    crrc_decimalfield5: number
    crrc_largetextfield4_tag: string
    crrc_decimalfield7: number
    crrc_largetextfield5_tag: string
    crrc_decimalfield9: number
    crrc_decimalfield11: number
    crrc_decimalfield13: number
    crrc_basedatafield1_name: string | null
    crrc_basedatafield1_number: string
    crrc_basedatafield1_masterid: string
    crrc_basedatafield1_id: string
    crrc_basedatafield1_fullname: string | null
    crrc_basedatafield1_longnumber: string
}

/** 季度党群绩效贡献度单据行 */
export type BillRow = {
    id: string
    billno: string
    billstatus: string
    billstatus_title: string
    auditdate: string | null
    modifytime: string
    createtime: string
    crrc_datetimefield: string | null
    crrc_combofield: string
    crrc_combofield_title: string
    entryentity: BillEntry[]
}

export type CrrcBillPageResponse = CqPageResponse<BillRow>

/** 转换后的分录，字段与 ENTRY_COLUMNS 一一对应 */
export type ParseBillEntry = {
    id: string
    seq: number
    modifydatefield: string
    crrc_decimalfield: number
    crrc_largetextfield_tag: string
    crrc_decimalfield1: number
    crrc_largetextfield1_tag: string
    crrc_decimalfield2: number
    crrc_largetextfield2_tag: string
    crrc_decimalfield3: number
    crrc_largetextfield3_tag: string
    crrc_decimalfield5: number
    crrc_largetextfield4_tag: string
    crrc_decimalfield7: number
    crrc_largetextfield5_tag: string
    crrc_decimalfield9: number
    crrc_decimalfield11: number
    crrc_decimalfield13: number
    crrc_basedatafield1_name: string
    crrc_basedatafield1_number: string
    crrc_basedatafield1_id: string
    crrc_basedatafield1_fullname: string
    crrc_basedatafield1_longnumber: string
}

/** 转换后的单据 */
export type ParseBillRow = {
    id: string
    billno: string
    billstatus_title: string
    auditdate: string | null
    modifytime: string
    createtime: string
    bill_date: string
    year: string
    quarter: string
    entry: ParseBillEntry[]
}

const QUARTER_TEXT: Record<string, string> = {
    '1': '一季度',
    '2': '二季度',
    '3': '三季度',
    '4': '四季度',
}

function year_of(value: string | null | undefined) {
    if (!value) return ''
    const year = value.slice(0, 4)
    return /^\d{4}$/.test(year) ? year : value
}

function text_of(value: string | null | undefined) {
    if (value == null) return ''
    return value
}

function score_of(value: number | null | undefined) {
    const score = Number(value)
    return Number.isFinite(score) ? score : 0
}

function quarter_of(value: string | null | undefined, title: string | null | undefined) {
    const key = text_of(value)
    if (QUARTER_TEXT[key]) return QUARTER_TEXT[key]
    return text_of(title)
}

export function trans_data(source_data: BillRow[]): ParseBillRow[] {
    return source_data.map((row) => ({
        id: row.id,
        billno: row.billno,
        billstatus_title: row.billstatus_title,
        auditdate: row.auditdate,
        modifytime: row.modifytime,
        createtime: row.createtime,
        bill_date: text_of(row.crrc_datetimefield),
        year: year_of(row.crrc_datetimefield),
        quarter: quarter_of(row.crrc_combofield, row.crrc_combofield_title),
        entry: (row.entryentity ?? []).map((item) => ({
            id: text_of(item.id),
            seq: item.seq,
            modifydatefield: text_of(item.modifydatefield),
            crrc_decimalfield: score_of(item.crrc_decimalfield),
            crrc_largetextfield_tag: text_of(item.crrc_largetextfield_tag),
            crrc_decimalfield1: score_of(item.crrc_decimalfield1),
            crrc_largetextfield1_tag: text_of(item.crrc_largetextfield1_tag),
            crrc_decimalfield2: score_of(item.crrc_decimalfield2),
            crrc_largetextfield2_tag: text_of(item.crrc_largetextfield2_tag),
            crrc_decimalfield3: score_of(item.crrc_decimalfield3),
            crrc_largetextfield3_tag: text_of(item.crrc_largetextfield3_tag),
            crrc_decimalfield5: score_of(item.crrc_decimalfield5),
            crrc_largetextfield4_tag: text_of(item.crrc_largetextfield4_tag),
            crrc_decimalfield7: score_of(item.crrc_decimalfield7),
            crrc_largetextfield5_tag: text_of(item.crrc_largetextfield5_tag),
            crrc_decimalfield9: score_of(item.crrc_decimalfield9),
            crrc_decimalfield11: score_of(item.crrc_decimalfield11),
            crrc_decimalfield13: score_of(item.crrc_decimalfield13),
            crrc_basedatafield1_name: text_of(item.crrc_basedatafield1_name),
            crrc_basedatafield1_number: text_of(item.crrc_basedatafield1_number),
            crrc_basedatafield1_id: text_of(item.crrc_basedatafield1_id),
            crrc_basedatafield1_fullname: text_of(item.crrc_basedatafield1_fullname),
            crrc_basedatafield1_longnumber: text_of(item.crrc_basedatafield1_longnumber),
        })),
    }))
}

export const BILL_COLUMNS = [
    { key: 'id', label: 'id' },
    { key: 'billno', label: '单据编号' },
    { key: 'billstatus', label: '单据状态' },
    { key: 'billstatus_title', label: '单据状态_标题' },
    { key: 'auditdate', label: '审核日期' },
    { key: 'modifytime', label: '修改时间' },
    { key: 'createtime', label: '创建时间' },
    { key: 'crrc_datetimefield', label: '日期' },
    { key: 'crrc_combofield', label: '季度' },
    { key: 'crrc_combofield_title', label: '季度_标题' },
] as const

export const ENTRY_COLUMNS = [
    { key: 'id', label: 'id' },
    { key: 'seq', label: '分录行号' },
    { key: 'crrc_basedatafield1_name', label: '党组织' },
    { key: 'crrc_basedatafield1_number', label: '党组织编码' },
    { key: 'crrc_basedatafield1_id', label: '党组织id' },
    { key: 'crrc_basedatafield1_fullname', label: '党组织全称' },
    { key: 'crrc_basedatafield1_longnumber', label: '党组织长编码' },
    { key: 'modifydatefield', label: '修改时间' },
    { key: 'crrc_decimalfield', label: '基层党组织获得公司及以上党组织表彰奖励-得分' },
    { key: 'crrc_largetextfield_tag', label: '基层党组织获得公司及以上党组织表彰奖励-项点' },
    { key: 'crrc_decimalfield1', label: '基层党组织承担公司及以上党组织重点课题、专项任务-得分' },
    { key: 'crrc_largetextfield1_tag', label: '基层党组织承担公司及以上党组织重点课题、专项任务-项点' },
    { key: 'crrc_decimalfield2', label: '基层党组织代表公司做党建经验交流发言-得分' },
    { key: 'crrc_largetextfield2_tag', label: '基层党组织代表公司做党建经验交流发言-项点' },
    { key: 'crrc_decimalfield3', label: '围绕“动力”党建品牌建设，提升基层党建工作质量，激发组织活力-得分' },
    { key: 'crrc_largetextfield3_tag', label: '围绕“动力”党建品牌建设，提升基层党建工作质量，激发组织活力-项点' },
    { key: 'crrc_decimalfield5', label: '基层党组织积极开展新闻宣传、传播企业文化-得分' },
    { key: 'crrc_largetextfield4_tag', label: '基层党组织积极开展新闻宣传、传播企业文化-项点' },
    { key: 'crrc_decimalfield7', label: '基层党组织积极支持党委巡察工作和纪委工作-得分' },
    { key: 'crrc_largetextfield5_tag', label: '基层党组织积极支持党委巡察工作和纪委工作-项点' },
    { key: 'crrc_decimalfield9', label: '基层工会季度贡献度评价-得分' },
    { key: 'crrc_decimalfield11', label: '基层团组织贡献度评价-得分' },
    { key: 'crrc_decimalfield13', label: '合计' },
] as const

let contributionTask: Promise<BillRow[]> | null = null
let lastContributionRows: BillRow[] | null = null
let lastContributionFetchTime = 0

function is_cache_expired(): boolean {
    return Date.now() - lastContributionFetchTime > CACHE_TTL_MS
}

/**
 * 分页拉取季度党群绩效贡献度，默认走模块内缓存。
 * 请求体为 `{ data: {}, pageSize, pageNo }`。
 */
export function fetch_data(options?: { force?: boolean }): Promise<BillRow[]> {
    if (contributionTask) return contributionTask
    if (!options?.force && lastContributionRows && !is_cache_expired()) {
        return Promise.resolve(lastContributionRows)
    }
    const task = (async () => {
        const allRows: BillRow[] = []
        let pageNo = 1
        const pageSize = CQ_OPENAPI.pageSize
        while (true) {
            const body = {
                data: {},
                pageSize,
                pageNo,
            }
            const res = await cq_fetch(CQ_API_PATH.quarterly_performance, {
                method: 'POST',
                body: JSON.stringify(body),
            })
            const json = (await res.json()) as CrrcBillPageResponse
            if (!json.status) {
                throw new Error(`分页查询失败: ${json.message || '未知错误'} (errorCode: ${json.errorCode || '无'})`)
            }
            if (!json.data) {
                throw new Error('分页查询失败: 响应缺少 data 字段')
            }
            allRows.push(
                ...json.data.rows.map((row) => ({
                    ...row,
                    entryentity: row.entryentity ?? [],
                })),
            )
            if (json.data.lastPage) {
                break
            }
            pageNo++
            if (pageNo > CQ_OPENAPI.maxPages) {
                throw new Error('分页查询异常: 超出最大页数限制')
            }
        }
        return allRows
    })()
        .then((rows) => {
            lastContributionRows = rows
            lastContributionFetchTime = Date.now()
            return rows
        })
        .finally(() => {
            if (contributionTask === task) contributionTask = null
        })

    contributionTask = task
    return task
}
