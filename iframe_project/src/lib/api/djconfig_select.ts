import { get_access_token } from '@/lib/cq_fetch'
import { CQ_API_PATH, CACHE_TTL_MS, type CqPageResponse } from '@/lib/config'

// 单据的行数据类型
export type BillRow = {
    id: string
    billno: string
    billstatus: string
    billstatus_title: string
    auditdate: string | null
    modifytime: string
    createtime: string
    crrc_largetextfield: string
    crrc_largetextfield_tag: string
    crrc_textfield: string
}

// 完整响应类型
export type CrrcBillPageResponse = CqPageResponse<BillRow>

// 字段的中文对应
export const BILL_COLUMNS = [
    { key: 'id', label: 'id' },
    { key: 'billNo', label: '单据编号' },
    { key: 'billstatus', label: '单据状态' },
    { key: 'billstatus_title', label: '单据状态_标题' },
    { key: 'auditdate', label: '审核日期' },
    { key: 'modifytime', label: '修改时间' },
    { key: 'createtime', label: '创建时间' },
    { key: 'crrc_largetextfield', label: '配置' },
    { key: 'crrc_largetextfield_tag', label: '配置_详情' },
    { key: 'crrc_textfield', label: '数据类型' },
] as const

let quarterlyTask: Promise<BillRow[]> | null = null
let lastQuarterlyRows: BillRow[] | null = null
let lastQuarterlyFetchTime: number = 0

function is_cache_expired(): boolean {
    return Date.now() - lastQuarterlyFetchTime > CACHE_TTL_MS
}

/**
 * 负责请求配置项中季度评价结果的数据
 */
export function fetch_data(options?: { force?: boolean }): Promise<BillRow[]> {
    // 1. 有请求正在进行中 → 直接复用（避免重复发请求）
    if (quarterlyTask) return quarterlyTask
    // 2. 缓存有效：非强制刷新、有数据、且未过期
    if (!options?.force && lastQuarterlyRows && !is_cache_expired()) {
        return Promise.resolve(lastQuarterlyRows)
    }
    // 3. 发起新请求
    const task = (async () => {
        const token = await get_access_token()
        const allRows: BillRow[] = []
        let pageNo = 1
        const pageSize = 100 // 可适当调大，减少请求次数
        while (true) {
            const body = {
                data: {},
                pageSize,
                pageNo,
            }
            const res = await fetch(CQ_API_PATH.deduction, {
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
            if (pageNo > 1000) {
                throw new Error('分页查询异常: 超出最大页数限制')
            }
        }
        return allRows
    })()
        .then((rows) => {
            lastQuarterlyRows = rows
            lastQuarterlyFetchTime = Date.now()
            return rows
        })
        .finally(() => {
            if (quarterlyTask === task) quarterlyTask = null
        })

    quarterlyTask = task
    return task
}
