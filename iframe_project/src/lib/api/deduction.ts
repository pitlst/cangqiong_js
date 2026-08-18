import { get_access_token } from '@/lib/cq_fetch'
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
    { key: 'crrc_radiooptgroupfield', label: '期间' },
    { key: 'crrc_radiooptgroupfield_title', label: '期间_标题' },
] as const

export const ENTRY_COLUMNS = [
    { key: 'id', label: 'id' },
    { key: 'seq', label: '分录行号' },
    { key: 'modifydatefield', label: '修改时间' },
    { key: 'crrc_textfield', label: '扣分事项' },
    { key: 'crrc_decimalfield', label: '扣分分数' },
    { key: 'crrc_textfield1', label: '扣分依据' },
    { key: 'crrc_bigintfield', label: '单据id' },
    { key: 'crrc_billstatusfield', label: '单据状态' },
    { key: 'crrc_billstatusfield_title', label: '单据状态_标题' },
    { key: 'crrc_billstatusfield1', label: '数据状态' },
    { key: 'crrc_billstatusfield1_title', label: '数据状态_标题' },
    { key: 'crrc_textfield2', label: '分录编号' },
    { key: 'crrc_datefield1', label: '日期' },
    { key: 'crrc_radiooptgroupfield1', label: '期间' },
    { key: 'crrc_radiooptgroupfield1_title', label: '期间_标题' },
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
        const token = await get_access_token()
        const allRows: BillRow[] = []
        let pageNo = 1
        const pageSize = CQ_OPENAPI.pageSize
        while (true) {
            const body = {
                data: {},
                pageSize,
                pageNo,
            }
            const res = await fetch(CQ_OPENAPI.gateway + CQ_API_PATH.deduction, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    access_token: token,
                },
                body: JSON.stringify(body),
            })
            const json = (await res.json()) as CrrcBillPageResponse
            if (!json.status) {
                throw new Error(`分页查询失败: ${json.message || '未知错误'} (errorCode: ${json.errorCode || '无'})`)
            }
            if (!json.data) {
                throw new Error('分页查询失败: 响应缺少 data 字段')
            }
            allRows.push(...json.data.rows)
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
