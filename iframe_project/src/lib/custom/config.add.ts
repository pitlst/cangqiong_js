import { toast } from 'sonner'

import { invalidateConfigCache } from '@/lib/custom/config.select'
import type { ConfigAddInput, ConfigAddResult } from '@/lib/custom/config.types'
import { CQ_API_PATH } from '@/lib/openapi/config'
import { cqErrorMessage, cqPost } from '@/lib/openapi/client'

export const CONFIG_ADD_TOAST_ID = 'cq-config-add'

/** 组装 djconfig_add 请求体（新增或修改，请按苍穹 API 区分是否传 id） */
export function buildConfigAddRequest(input: ConfigAddInput): unknown {
    // ========== djconfig_add 请求体（请在此编写）==========
    //
    // 入参 input：表单字段，如 billno、crrc_textfield、crrc_largetextfield 等
    // 出参：POST body，结构与苍穹「djconfig_add」在线调试一致
    //
    void input
    return {}
    // ========== djconfig_add 请求体结束 ==========
}

/** 解析 djconfig_add 响应 data */
export function parseConfigAddResult(data: unknown): ConfigAddResult {
    // ========== djconfig_add 响应解析（请在此编写）==========
    //
    // 入参 data：cqPost 返回的 json.data（可能含 id、billno 等）
    // 出参：业务层可用的结果对象
    //
    if (data && typeof data === 'object' && !Array.isArray(data)) {
        return data as ConfigAddResult
    }
    return {}
    // ========== djconfig_add 响应解析结束 ==========
}

export async function addConfigItem(input: ConfigAddInput): Promise<ConfigAddResult> {
    const body = buildConfigAddRequest(input)
    const json = await cqPost<unknown>(CQ_API_PATH.djconfig_add, body)
    const result = parseConfigAddResult(json.data)
    invalidateConfigCache()
    return result
}

export async function addConfigItemWithToast(input: ConfigAddInput) {
    toast.loading('正在保存配置项…', { id: CONFIG_ADD_TOAST_ID })
    try {
        const result = await addConfigItem(input)
        toast.success('配置项保存成功', { id: CONFIG_ADD_TOAST_ID, closeButton: true })
        return result
    } catch (err) {
        toast.error('配置项保存失败', {
            id: CONFIG_ADD_TOAST_ID,
            description: cqErrorMessage(err),
            closeButton: true,
        })
        throw err
    }
}
