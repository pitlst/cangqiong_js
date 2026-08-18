import { get_access_token } from '@/lib/cq_fetch'
import { CQ_API_PATH, CQ_OPENAPI } from '@/lib/config'
import type { BillAddError, BillAddRequest, BillAddResponse, BillAddResult, BillAddRow } from '@/lib/api/djconfig_type'

function format_row_errors(errors: BillAddError[]) {
    return errors
        .flatMap((err) => err.rowMsg)
        .filter(Boolean)
        .join('；')
}

function format_failed_items(items: BillAddResult[]) {
    return items
        .map((item) => {
            const billno = item.number || item.keys?.billno || '未知'
            const detail = format_row_errors(item.errors)
            return detail ? `billno=${billno} ${detail}` : `billno=${billno}`
        })
        .join('; ')
}

/**
 * 新增配置项单据。可传一条或多条，请求体为 `{ data: BillAddRow[] }`。
 */
export async function add_data(rows: BillAddRow | BillAddRow[]): Promise<BillAddResult[]> {
    const data = Array.isArray(rows) ? rows : [rows]
    const token = await get_access_token()
    const body: BillAddRequest = { data }
    const res = await fetch(CQ_OPENAPI.gateway + CQ_API_PATH.djconfig_add, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            access_token: token,
        },
        body: JSON.stringify(body),
    })
    const json = (await res.json()) as BillAddResponse
    if (!json.status) {
        const from_result = json.data?.result?.length ? format_failed_items(json.data.result) : ''
        throw new Error(`新增失败: ${json.message || from_result || '未知错误'} (errorCode: ${json.errorCode || '无'})`)
    }
    if (!json.data) {
        throw new Error(`新增失败: 响应缺少 data 字段 (errorCode: ${json.errorCode || '无'})`)
    }
    const failed = json.data.result.filter((item) => item.billStatus !== true)
    if (failed.length) {
        throw new Error(`新增失败: ${failed.length} 条未成功。${format_failed_items(failed)}`)
    }
    return json.data.result
}
