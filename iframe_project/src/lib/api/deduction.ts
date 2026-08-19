import { cq_fetch } from '@/lib/cq_fetch'
import { CACHE_TTL_MS, CQ_API_PATH, CQ_OPENAPI, type CqPageResponse } from '@/lib/config'

/** 扣分台账分录（entryentity） */
export type BillEntry = {
    id: string
    seq: number
    modifydatefield: string
    crrc_textfield: string
    crrc_decimalfield: number
    crrc_textfield1: string
    crrc_bigintfield: string
    crrc_billstatusfield: string
    crrc_billstatusfield_title: string
    crrc_billstatusfield1: string
    crrc_billstatusfield1_title: string
    crrc_textfield2: string
    crrc_datefield1: string | null
    crrc_radiooptgroupfield1: string
    crrc_radiooptgroupfield1_title: string
    crrc_basedatafield_name: string | null
    crrc_basedatafield_number: string
    crrc_basedatafield_masterid: string
    crrc_basedatafield_id: string
    crrc_basedatafield_fullname: string | null
    crrc_basedatafield_longnumber: string
}

/** 扣分台账单据行 */
export type BillRow = {
    id: string
    billno: string
    billstatus: string
    billstatus_title: string
    auditdate: string | null
    modifytime: string
    createtime: string
    crrc_textfield6: string
    crrc_datefield: string | null
    crrc_radiooptgroupfield: string
    crrc_radiooptgroupfield_title: string
    entryentity: BillEntry[]
}

export type CrrcBillPageResponse = CqPageResponse<BillRow>

/** 转换后的分录 */
export type ParseBillEntry = {
    id: string
    seq: number
    item: string
    score: number
    basis: string
    org_name: string
    org_fullname: string
    entry_no: string
    year: string
    quarter: string
    billstatus_title: string
    data_status: string
    modifytime: string
}

/** 转换后的单据 */
export type ParseBillRow = {
    id: string
    billno: string
    billstatus_title: string
    auditdate: string | null
    modifytime: string
    createtime: string
    remark: string
    year: string
    quarter: string
    entry: ParseBillEntry[]
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

export function trans_data(source_data: BillRow[]): ParseBillRow[] {
    return source_data.map((row) => ({
        id: row.id,
        billno: row.billno,
        billstatus_title: row.billstatus_title,
        auditdate: row.auditdate,
        modifytime: row.modifytime,
        createtime: row.createtime,
        remark: row.crrc_textfield6 ?? '',
        year: year_of(row.crrc_datefield),
        quarter: row.crrc_radiooptgroupfield_title ?? '',
        entry: (row.entryentity ?? []).map((item) => {
            const score = Number(item.crrc_decimalfield)
            return {
                id: item.id,
                seq: item.seq,
                item: text_of(item.crrc_textfield),
                score: Number.isFinite(score) ? score : 0,
                basis: text_of(item.crrc_textfield1),
                org_name: text_of(item.crrc_basedatafield_name),
                org_fullname: text_of(item.crrc_basedatafield_fullname),
                entry_no: text_of(item.crrc_textfield2),
                year: year_of(item.crrc_datefield1),
                quarter: text_of(item.crrc_radiooptgroupfield1_title),
                billstatus_title: text_of(item.crrc_billstatusfield_title),
                data_status: text_of(item.crrc_billstatusfield1_title),
                modifytime: text_of(item.modifydatefield),
            }
        }),
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
    { key: 'crrc_textfield6', label: '备注' },
    { key: 'crrc_datefield', label: '日期' },
    { key: 'crrc_radiooptgroupfield', label: '季度' },
    { key: 'crrc_radiooptgroupfield_title', label: '季度_标题' },
] as const

export const ENTRY_COLUMNS = [
    { key: 'id', label: 'id' },
    { key: 'seq', label: '分录行号' },
    { key: 'modifydatefield', label: '修改时间' },
    { key: 'crrc_textfield', label: '扣分事项' },
    { key: 'crrc_textfield1', label: '扣分依据' },
    { key: 'crrc_decimalfield', label: '扣分分数' },
    { key: 'crrc_bigintfield', label: '单据id' },
    { key: 'crrc_billstatusfield', label: '单据状态' },
    { key: 'crrc_billstatusfield_title', label: '单据状态_标题' },
    { key: 'crrc_billstatusfield1', label: '数据状态' },
    { key: 'crrc_billstatusfield1_title', label: '数据状态_标题' },
    { key: 'crrc_textfield2', label: '分录编号' },
    { key: 'crrc_datefield1', label: '日期' },
    { key: 'crrc_radiooptgroupfield1', label: '季度' },
    { key: 'crrc_radiooptgroupfield1_title', label: '季度_标题' },
    { key: 'crrc_basedatafield_name', label: '被扣分组织' },
    { key: 'crrc_basedatafield_number', label: '被扣分组织编码' },
    { key: 'crrc_basedatafield_id', label: '被扣分组织id' },
    { key: 'crrc_basedatafield_fullname', label: '被扣分组织全称' },
    { key: 'crrc_basedatafield_longnumber', label: '被扣分组织长编码' },
] as const

let deductionTask: Promise<BillRow[]> | null = null
let lastDeductionRows: BillRow[] | null = null
let lastDeductionFetchTime = 0

function is_cache_expired(): boolean {
    return Date.now() - lastDeductionFetchTime > CACHE_TTL_MS
}

/**
 * 分页拉取扣分项台账，默认走模块内缓存。
 * 请求体为 `{ data: {}, pageSize, pageNo }`。
 */
export function fetch_data(options?: { force?: boolean }): Promise<BillRow[]> {
    if (deductionTask) return deductionTask
    if (!options?.force && lastDeductionRows && !is_cache_expired()) {
        return Promise.resolve(lastDeductionRows)
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
            const res = await cq_fetch(CQ_API_PATH.deduction, {
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
            lastDeductionRows = rows
            lastDeductionFetchTime = Date.now()
            return rows
        })
        .finally(() => {
            if (deductionTask === task) deductionTask = null
        })

    deductionTask = task
    return task
}
