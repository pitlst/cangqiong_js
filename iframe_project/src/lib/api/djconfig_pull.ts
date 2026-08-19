import { cq_fetch } from '@/lib/cq_fetch'
import { CQ_API_PATH } from '@/lib/config'
import type { BillPullRequest, BillPullResponse } from '@/lib/api/djconfig_type'

/**
 * 按单据编号撤销配置项。请求体为 `{ data: { billno } }`。
 * 找不到单据时接口返回 status=false、data=null。
 */
export async function pull_data(billno: string): Promise<void> {
    const body: BillPullRequest = { data: { billno } }
    const res = await cq_fetch(CQ_API_PATH.djconfig_pull, {
        method: 'POST',
        body: JSON.stringify(body),
    })
    const json = (await res.json()) as BillPullResponse
    if (!json.status) {
        throw new Error(`撤销失败: ${json.message || '未知错误'} (errorCode: ${json.errorCode || '无'})`)
    }
    const result = json.data?.result
    if (!result?.length) return
    const failed = result.filter((item) => item.billStatus !== true)
    if (failed.length) {
        const detail = failed.map((item) => `billno=${item.number || '未知'} errors=${JSON.stringify(item.errors)}`).join('; ')
        throw new Error(`撤销失败: ${failed.length} 条未成功。${detail}`)
    }
}
