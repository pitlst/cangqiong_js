import { toast } from 'sonner'

import { invalidateConfigCache } from '@/lib/custom/config.select'
import type { ConfigDeleteInput, ConfigDeleteResult } from '@/lib/custom/config.types'
import { CQ_API_PATH } from '@/lib/openapi/config'
import { cqErrorMessage, cqPost } from '@/lib/openapi/client'

export const CONFIG_DELETE_TOAST_ID = 'cq-config-delete'

/** 组装 djconfig_delete 请求体 */
export function buildConfigDeleteRequest(input: ConfigDeleteInput): unknown {
    // ========== djconfig_delete 请求体（请在此编写）==========
    //
    // 入参 input：通常含主键 id 或单据编号 billno
    // 出参：POST body，结构与苍穹「djconfig_delete」在线调试一致
    //
    void input
    return {}
    // ========== djconfig_delete 请求体结束 ==========
}

/** 解析 djconfig_delete 响应 data */
export function parseConfigDeleteResult(data: unknown): ConfigDeleteResult {
    // ========== djconfig_delete 响应解析（请在此编写）==========
    //
    // 入参 data：cqPost 返回的 json.data
    // 出参：业务层可用的结果对象（如是否成功、提示信息等）
    //
    if (data && typeof data === 'object' && !Array.isArray(data)) {
        return data as ConfigDeleteResult
    }
    return {}
    // ========== djconfig_delete 响应解析结束 ==========
}

export async function deleteConfigItem(input: ConfigDeleteInput): Promise<ConfigDeleteResult> {
    const body = buildConfigDeleteRequest(input)
    const json = await cqPost<unknown>(CQ_API_PATH.djconfig_delete, body)
    const result = parseConfigDeleteResult(json.data)
    invalidateConfigCache()
    return result
}

export async function deleteConfigItemWithToast(input: ConfigDeleteInput) {
    toast.loading('正在删除配置项…', { id: CONFIG_DELETE_TOAST_ID })
    try {
        const result = await deleteConfigItem(input)
        toast.success('配置项删除成功', { id: CONFIG_DELETE_TOAST_ID, closeButton: true })
        return result
    } catch (err) {
        toast.error('配置项删除失败', {
            id: CONFIG_DELETE_TOAST_ID,
            description: cqErrorMessage(err),
            closeButton: true,
        })
        throw err
    }
}
