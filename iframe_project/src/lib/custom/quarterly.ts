import { toast } from 'sonner'

import type { QuarterlyRow } from '@/data/quarterly'
import { CQ_API_PATH } from '@/lib/openapi/config'
import { cqErrorMessage, cqQueryAll } from '@/lib/openapi/client'
import { mapQuarterlyRows } from '@/lib/custom/quarterly.mapper'

export const QUARTERLY_TOAST_ID = 'cq-quarterly-load'

let quarterlyTask: Promise<QuarterlyRow[]> | null = null
let lastQuarterlyRows: QuarterlyRow[] | null = null
let lastQuarterlyError = ''

export function getCachedQuarterly() {
    return lastQuarterlyRows
}

export function getCachedQuarterlyError() {
    return lastQuarterlyError
}

async function loadQuarterlyFromOpenApi(): Promise<QuarterlyRow[]> {
    const bills = await cqQueryAll<Record<string, unknown>>(CQ_API_PATH.djconfig_select, { data: {} })
    return mapQuarterlyRows(bills)
}

export function fetchQuarterly(options?: { force?: boolean }): Promise<QuarterlyRow[]> {
    if (!options?.force && lastQuarterlyRows) return Promise.resolve(lastQuarterlyRows)
    if (quarterlyTask) return quarterlyTask

    lastQuarterlyError = ''
    const task = loadQuarterlyFromOpenApi()
        .then((rows) => {
            lastQuarterlyRows = rows
            return rows
        })
        .catch((err: unknown) => {
            lastQuarterlyError = cqErrorMessage(err)
            throw err
        })
        .finally(() => {
            if (quarterlyTask === task) quarterlyTask = null
        })

    quarterlyTask = task
    return task
}

export async function fetchQuarterlyWithToast(options?: { force?: boolean }) {
    toast.loading('正在加载季度评价结果…', { id: QUARTERLY_TOAST_ID })
    try {
        const rows = await fetchQuarterly(options)
        toast.success('季度评价结果加载成功', {
            id: QUARTERLY_TOAST_ID,
            description: rows.length ? `共 ${rows.length} 条` : '列表为空',
            closeButton: true,
        })
        return rows
    } catch (err) {
        toast.error('季度评价结果加载失败', {
            id: QUARTERLY_TOAST_ID,
            description: cqErrorMessage(err),
            closeButton: true,
        })
        throw err
    }
}
