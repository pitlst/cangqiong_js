import { toast } from 'sonner'

import { DEFAULT_CONFIG_COLUMNS } from '@/data/config'
import { mapConfigRows } from '@/lib/custom/config.mapper'
import type { ConfigSelectQuery, DeductionTable } from '@/lib/custom/config.types'
import { CQ_API_PATH } from '@/lib/openapi/config'
import { cqErrorMessage, cqPost } from '@/lib/openapi/client'

export const CONFIG_SELECT_TOAST_ID = 'cq-config-select-load'

let configTask: Promise<DeductionTable> | null = null
let lastConfigTable: DeductionTable | null = null
let lastConfigError = ''

export function getCachedConfigItems() {
    return lastConfigTable
}

export function getCachedConfigError() {
    return lastConfigError
}

/** 组装 djconfig_select 请求体 */
export function buildConfigSelectRequest(query: ConfigSelectQuery = {}): unknown {
    // ========== djconfig_select 请求体（请在此编写）==========
    //
    // 入参 query：可选查询条件
    // 出参：POST body，结构与苍穹「djconfig_select」在线调试一致
    //
    void query
    return {}
    // ========== djconfig_select 请求体结束 ==========
}

/** 从 djconfig_select 响应 data 中解析单据列表（映射前） */
export function parseConfigSelectRows(data: unknown): Record<string, unknown>[] {
    // ========== djconfig_select 响应解析（请在此编写）==========
    //
    // 入参 data：cqPost 返回的 json.data
    // 出参：单据对象数组，交给 mapConfigRows 转为表格行
    //
    void data
    return []
    // ========== djconfig_select 响应解析结束 ==========
}

async function loadConfigFromOpenApi(query?: ConfigSelectQuery): Promise<DeductionTable> {
    const body = buildConfigSelectRequest(query)
    const json = await cqPost<unknown>(CQ_API_PATH.djconfig_select, body)
    const bills = parseConfigSelectRows(json.data)
    const rows = mapConfigRows(bills)
    return { columns: DEFAULT_CONFIG_COLUMNS, rows }
}

export function fetchConfigItems(options?: { force?: boolean; query?: ConfigSelectQuery }): Promise<DeductionTable> {
    if (!options?.force && lastConfigTable) return Promise.resolve(lastConfigTable)
    if (configTask) return configTask

    lastConfigError = ''
    const task = loadConfigFromOpenApi(options?.query)
        .then((table) => {
            lastConfigTable = table
            return table
        })
        .catch((err: unknown) => {
            lastConfigError = cqErrorMessage(err)
            throw err
        })
        .finally(() => {
            if (configTask === task) configTask = null
        })

    configTask = task
    return task
}

export async function fetchConfigItemsWithToast(options?: { force?: boolean; query?: ConfigSelectQuery }) {
    toast.loading('正在加载配置项…', { id: CONFIG_SELECT_TOAST_ID })
    try {
        const table = await fetchConfigItems(options)
        toast.success('配置项加载成功', {
            id: CONFIG_SELECT_TOAST_ID,
            description: table.rows.length ? `共 ${table.rows.length} 条` : '列表为空',
            closeButton: true,
        })
        return table
    } catch (err) {
        toast.error('配置项加载失败', {
            id: CONFIG_SELECT_TOAST_ID,
            description: cqErrorMessage(err),
            closeButton: true,
        })
        throw err
    }
}

/** 查询后使缓存失效（新增/删除成功后调用） */
export function invalidateConfigCache() {
    lastConfigTable = null
    lastConfigError = ''
}
