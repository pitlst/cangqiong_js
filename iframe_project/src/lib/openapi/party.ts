import { toast } from 'sonner'

import { DEFAULT_PARTY_COLUMNS } from '@/data/party'
import { CQ_API_PATH } from '@/lib/openapi/config'
import { cqErrorMessage, cqQueryAll } from '@/lib/openapi/client'
import { mapPartyQuarterlyRows } from '@/lib/openapi/mappers'
import type { DeductionTable } from '@/lib/table-types'

export const PARTY_TOAST_ID = 'cq-party-load'

let partyTask: Promise<DeductionTable> | null = null
let lastPartyTable: DeductionTable | null = null
let lastPartyError = ''

export function getCachedPartyQuarterly() {
    return lastPartyTable
}

export function getCachedPartyError() {
    return lastPartyError
}

async function loadPartyQuarterlyFromOpenApi(): Promise<DeductionTable> {
    const bills = await cqQueryAll<Record<string, unknown>>(CQ_API_PATH.partyQuarterly, { data: {} })
    const rows = mapPartyQuarterlyRows(bills)
    return { columns: DEFAULT_PARTY_COLUMNS, rows }
}

export function fetchPartyQuarterly(options?: { force?: boolean }): Promise<DeductionTable> {
    if (!options?.force && lastPartyTable) return Promise.resolve(lastPartyTable)
    if (partyTask) return partyTask

    lastPartyError = ''
    const task = loadPartyQuarterlyFromOpenApi()
        .then((table) => {
            lastPartyTable = table
            return table
        })
        .catch((err: unknown) => {
            lastPartyError = cqErrorMessage(err)
            throw err
        })
        .finally(() => {
            if (partyTask === task) partyTask = null
        })

    partyTask = task
    return task
}

export async function fetchPartyQuarterlyWithToast(options?: { force?: boolean }) {
    toast.loading('正在加载季度党群绩效…', { id: PARTY_TOAST_ID })
    try {
        const table = await fetchPartyQuarterly(options)
        toast.success('季度党群绩效加载成功', {
            id: PARTY_TOAST_ID,
            description: table.rows.length ? `共 ${table.rows.length} 条` : '列表为空',
            closeButton: true,
        })
        return table
    } catch (err) {
        toast.error('季度党群绩效加载失败', {
            id: PARTY_TOAST_ID,
            description: cqErrorMessage(err),
            closeButton: true,
        })
        throw err
    }
}
