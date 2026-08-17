import { toast } from 'sonner'

import { DEFAULT_DEDUCTION_COLUMNS } from '@/data/deduction'
import { CQ_API_PATH } from '@/lib/openapi/config'
import { cqErrorMessage, cqQueryAll } from '@/lib/openapi/client'
import { mapDeductionRows } from '@/lib/openapi/mappers'
import type { DeductionTable } from '@/lib/table-types'

export const DEDUCTION_TOAST_ID = 'cq-deduction-load'

let deductionTask: Promise<DeductionTable> | null = null
let lastDeductionTable: DeductionTable | null = null
let lastDeductionError = ''

export function getCachedDeductionItems() {
    return lastDeductionTable
}

export function getCachedDeductionError() {
    return lastDeductionError
}

async function loadDeductionFromOpenApi(): Promise<DeductionTable> {
    const bills = await cqQueryAll<Record<string, unknown>>(CQ_API_PATH.deduction, { data: {} })
    const rows = mapDeductionRows(bills)
    return { columns: DEFAULT_DEDUCTION_COLUMNS, rows }
}

export function fetchDeductionItems(options?: { force?: boolean }): Promise<DeductionTable> {
    if (!options?.force && lastDeductionTable) return Promise.resolve(lastDeductionTable)
    if (deductionTask) return deductionTask

    lastDeductionError = ''
    const task = loadDeductionFromOpenApi()
        .then((table) => {
            lastDeductionTable = table
            return table
        })
        .catch((err: unknown) => {
            lastDeductionError = cqErrorMessage(err)
            throw err
        })
        .finally(() => {
            if (deductionTask === task) deductionTask = null
        })

    deductionTask = task
    return task
}

export async function fetchDeductionItemsWithToast(options?: { force?: boolean }) {
    toast.loading('正在加载扣分项…', { id: DEDUCTION_TOAST_ID })
    try {
        const table = await fetchDeductionItems(options)
        toast.success('扣分项加载成功', {
            id: DEDUCTION_TOAST_ID,
            description: table.rows.length ? `共 ${table.rows.length} 条` : '列表为空',
            closeButton: true,
        })
        return table
    } catch (err) {
        toast.error('扣分项加载失败', {
            id: DEDUCTION_TOAST_ID,
            description: cqErrorMessage(err),
            closeButton: true,
        })
        throw err
    }
}
