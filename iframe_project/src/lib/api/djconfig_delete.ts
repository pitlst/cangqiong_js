import { get_access_token } from '@/lib/cq_fetch'
import { CQ_API_PATH, CQ_OPENAPI } from '@/lib/config'
import type { BillDeleteRequest, BillDeleteResponse, BillDeleteResult } from '@/lib/api/djconfig_type'

/**
 * 按单据编号删除配置项。请求体为 `{ data: { billno } }`。
 * 找不到单据时接口返回 status=false、data=null。
 */
export async function delete_data(billno: string): Promise<BillDeleteResult[]> {
    const token = await get_access_token()
    const body: BillDeleteRequest = { data: { billno } }
    const res = await fetch(CQ_OPENAPI.gateway + CQ_API_PATH.djconfig_delete, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            access_token: token,
        },
        body: JSON.stringify(body),
    })
    const json = (await res.json()) as BillDeleteResponse
    if (!json.status) {
        throw new Error(`删除失败: ${json.message || '未知错误'} (errorCode: ${json.errorCode || '无'})`)
    }
    if (!json.data) {
        throw new Error(`删除失败: 响应缺少 data 字段 (errorCode: ${json.errorCode || '无'})`)
    }
    const failed = json.data.result.filter((item) => item.billStatus !== true)
    if (failed.length) {
        const detail = failed.map((item) => `billno=${item.number || '未知'} errors=${JSON.stringify(item.errors)}`).join('; ')
        throw new Error(`删除失败: ${failed.length} 条未成功。${detail}`)
    }
    return json.data.result
}
