import { get_access_token } from '@/lib/cq_fetch'
import { CQ_API_PATH, CQ_OPENAPI } from '@/lib/config'
import type { BillPushRequest, BillPushResponse } from '@/lib/api/djconfig_type'

/**
 * 按单据编号提交配置项。请求体为 `{ data: { billno } }`。
 * 找不到单据时接口返回 status=false、data=null。
 */
export async function push_data(billno: string): Promise<void> {
    const token = await get_access_token()
    const body: BillPushRequest = { data: { billno } }
    const res = await fetch(CQ_OPENAPI.gateway + CQ_API_PATH.djconfig_push, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            access_token: token,
        },
        body: JSON.stringify(body),
    })
    const json = (await res.json()) as BillPushResponse
    if (!json.status) {
        throw new Error(`提交失败: ${json.message || '未知错误'} (errorCode: ${json.errorCode || '无'})`)
    }
    const result = json.data?.result
    if (!result?.length) return
    const failed = result.filter((item) => item.billStatus !== true)
    if (failed.length) {
        const detail = failed.map((item) => `billno=${item.number || '未知'} errors=${JSON.stringify(item.errors)}`).join('; ')
        throw new Error(`提交失败: ${failed.length} 条未成功。${detail}`)
    }
}
