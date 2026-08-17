import { toast } from 'sonner'

import { asNumberMap, collectCaptions, cqErrorMessage, fieldRowKey, findBillListPack, formatDeductionValue } from '@/lib/cangqiong/parse'
import {
    canFetchFromCangqiong,
    clickAppThenParty,
    clog,
    CQ_DEDUCTION,
    cqInvoke,
    DEDUCTION_FRAME_ID,
    ensureFetchSession,
    extractRootSuffix,
    findClickInSession,
    findConsolePageIdFrom,
    fireParentClick,
    getFetchSession,
    hookSessionTree,
    hostWin,
    parseMaybeJson,
    waitFor,
} from '@/lib/cangqiong/session'
import type { CqWindow, DeductionColumn, DeductionRow, DeductionTable } from '@/lib/cangqiong/types'

export const DEDUCTION_TOAST_ID = 'cq-deduction-load'

const DEDUCTION_FIELD_LABEL: Record<string, string> = {
    billno: '单据编号',
    billstatus: '单据状态',
    crrc_datefield: '年份',
    crrc_radiooptgroupfield: '季度',
    crrc_textfield: '扣分事项',
    crrc_textfield1: '扣分依据',
    crrc_decimalfield: '扣分分数',
    crrc_basedatafield: '被扣分组织',
    crrc_basedatafield_name: '被扣分组织',
    'crrc_basedatafield.name': '被扣分组织',
    crrc_orgfield: '输出部门',
    crrc_orgfield_name: '输出部门.名称',
    'crrc_orgfield.name': '输出部门.名称',
}

let deductionTask: Promise<DeductionTable> | null = null
let lastDeductionTable: DeductionTable | null = null
let lastDeductionError = ''

function deductionErrorMessage(err: unknown) {
    return cqErrorMessage(err)
}

function deductionFieldLabel(key: string) {
    if (DEDUCTION_FIELD_LABEL[key]) return DEDUCTION_FIELD_LABEL[key]
    if (key.length > 5 && key.slice(key.length - 5) === '_name') {
        const base = key.slice(0, key.length - 5)
        if (DEDUCTION_FIELD_LABEL[base]) return `${DEDUCTION_FIELD_LABEL[base]}.名称`
    }
    return key
}

function shouldSkipDeductionKey(key: string, idx: Record<string, number>) {
    if (!key) return true
    const low = String(key).toLowerCase()
    if (low === 'rk' || low === 'fseq' || low === 's' || low === 'cprop') return true
    if (low === 'seq' || low === 'rowkey' || low === 'id') return true
    if (key.length >= 3 && key.slice(key.length - 3) === '_id') return true
    if (key.includes('entryentity')) return true
    if (idx[`${key}_name`] != null || idx[`${key}.name`] != null) return true
    return false
}

export function parseDeductionTable(payload: unknown): DeductionTable {
    const pack = findBillListPack(payload)
    if (!pack) return { columns: [], rows: [] }
    const idx = asNumberMap(pack.dataindex)
    const captions = collectCaptions(payload, pack)
    const keys = Object.keys(idx)
    keys.sort((a, b) => Number(idx[a]) - Number(idx[b]))
    const fieldKeys: { dataindex: string; caption: string }[] = []
    const used: Record<string, boolean> = {}
    for (let i = 0; i < keys.length; i += 1) {
        const k = keys[i]
        if (shouldSkipDeductionKey(k, idx)) continue
        const rowKey = fieldRowKey(k)
        if (used[rowKey]) continue
        used[rowKey] = true
        const known = deductionFieldLabel(k)
        fieldKeys.push({ dataindex: k, caption: known !== k ? known : captions[k] || k })
    }
    const columns: DeductionColumn[] = fieldKeys.map((f) => {
        const key = fieldRowKey(f.dataindex)
        const label = f.caption || deductionFieldLabel(f.dataindex)
        const numeric = key.includes('decimal') || label.includes('分数') || label.includes('得分')
        const badge = key.includes('billstatus') || label.includes('状态')
        const compact =
            numeric ||
            badge ||
            key === 'billno' ||
            key.includes('datefield') ||
            key.includes('radioopt') ||
            label === '年份' ||
            label === '季度' ||
            label === '单据编号'
        const wrap = !compact && (key.includes('textfield') || key.includes('largetext') || label.includes('依据') || label.includes('事项'))
        return { key, label, sortable: true, numeric, badge, compact, wrap }
    })
    const packRows: unknown[] = Array.isArray(pack.rows) ? pack.rows : []
    const rows: DeductionRow[] = packRows.map((row, ridx) => {
        const out: DeductionRow = { _rowId: `d${ridx}` }
        const cells = Array.isArray(row) ? row : []
        for (let j = 0; j < fieldKeys.length; j += 1) {
            const f = fieldKeys[j]
            const key = fieldRowKey(f.dataindex)
            const pos = idx[f.dataindex]
            const raw = pos != null ? cells[pos] : ''
            const formatted = formatDeductionValue(f.dataindex, raw)
            if (columns[j] && columns[j].numeric && formatted !== '' && typeof formatted !== 'number') {
                const num = Number(formatted)
                out[key] = Number.isNaN(num) ? String(formatted) : num
            } else if (typeof formatted === 'number') {
                out[key] = formatted
            } else {
                out[key] = formatted == null ? '' : String(formatted)
            }
        }
        return out
    })
    return { columns, rows }
}

function bindDeductionFetchGlobal(fn: () => Promise<DeductionTable>) {
    try {
        ;(hostWin() as CqWindow).__cqFetchDeduction = fn
    } catch {
        /* ignore */
    }
    try {
        ;(window as CqWindow).__cqFetchDeduction = fn
    } catch {
        /* ignore */
    }
}

async function loadDeductionFromCq(): Promise<DeductionTable> {
    if (!canFetchFromCangqiong()) {
        throw new Error('当前不在苍穹环境，无法打开隐藏主控台 iframe')
    }
    const sess = getFetchSession(DEDUCTION_FRAME_ID)
    const trail: { name: string; info: unknown }[] = []
    const step = (name: string, info?: unknown) => {
        trail.push({ name, info: info || null })
        clog('step', name, info || '')
    }

    await ensureFetchSession(sess)
    hookSessionTree(sess)
    const consolePageId = findConsolePageIdFrom(sess.win)
    const suffix = extractRootSuffix(consolePageId)
    step('session', { consolePageId, suffix, frameId: sess.frameId })
    clog('扣分项 consolePageId', consolePageId, 'suffix', suffix)
    if (!consolePageId || !suffix) {
        throw new Error('未找到主控台 pageId。隐藏 iframe 可能未加载到主控台。')
    }

    const menuPageId = CQ_DEDUCTION.menuAppId + suffix
    const listPageId = CQ_DEDUCTION.menuItemId + suffix
    sess.lastList = ''
    sess.lastAppHome = ''

    const treeMenuThenLoad = () => {
        step('treeMenuThenLoad', { menuPageId, listPageId })
        return cqInvoke(sess.win, CQ_DEDUCTION.menuAppId, CQ_DEDUCTION.menuFormId, 'treeMenuClick', menuPageId, [
            {
                key: CQ_DEDUCTION.menuControl,
                methodName: 'treeMenuClick',
                args: [CQ_DEDUCTION.menuRoot, CQ_DEDUCTION.menuItemId],
                postData: [{}, []],
            },
        ]).then(() =>
            cqInvoke(sess.win, CQ_DEDUCTION.dataAppId, CQ_DEDUCTION.dataFormId, 'loadData', listPageId, [
                { key: '', methodName: 'loadData', args: [], postData: [] },
            ]),
        )
    }

    await clickAppThenParty(sess, step)
    const menuHit = findClickInSession(sess, CQ_DEDUCTION.menuText)
    step('find-menu', { hasMenu: !!(menuHit && menuHit.el) })
    let res: unknown
    if (menuHit) {
        clog('点击扣分项台账')
        fireParentClick(menuHit.el, menuHit.win)
        res = await waitFor(() => sess.lastList, 15000, 250, '等待扣分项 loadData').catch(() => {
            clog('点击后未捕获列表 loadData，改请求链')
            step('click-menu-no-payload', {})
            return treeMenuThenLoad()
        })
    } else {
        res = await treeMenuThenLoad()
    }

    const data = parseMaybeJson(sess.lastList || res)
    const parsed = parseDeductionTable(data)
    const rows = parsed.rows || []
    const colLabels = (parsed.columns || []).map((c) => c.label).join(',')
    clog('扣分项 loadData 解析行数', rows.length, '列', colLabels)
    if (!rows.length) {
        let preview = ''
        try {
            preview = JSON.stringify(data).slice(0, 1200)
        } catch {
            preview = String(data).slice(0, 1200)
        }
        clog('扣分项未能解析行，预览', preview, trail)
        if (!parsed.columns.length) {
            throw new Error('loadData 已返回但未能识别行')
        }
    }
    return parsed
}

export function getCachedDeductionItems() {
    return lastDeductionTable
}

export function getCachedDeductionError() {
    return lastDeductionError
}

export function fetchDeductionItems(options?: { force?: boolean }): Promise<DeductionTable> {
    if (!options?.force && lastDeductionTable) return Promise.resolve(lastDeductionTable)
    if (deductionTask) return deductionTask
    lastDeductionError = ''
    const task = loadDeductionFromCq()
        .then((table) => {
            lastDeductionTable = table
            lastDeductionError = ''
            return table
        })
        .catch((err: unknown) => {
            lastDeductionError = deductionErrorMessage(err)
            throw err
        })
        .finally(() => {
            if (deductionTask === task) deductionTask = null
        })
    deductionTask = task
    return task
}

export async function fetchDeductionItemsWithToast(options?: { force?: boolean }) {
    toast.loading('正在从苍穹加载扣分项…', { id: DEDUCTION_TOAST_ID })
    try {
        const table = await fetchDeductionItems(options)
        toast.success('扣分项台账加载成功', {
            id: DEDUCTION_TOAST_ID,
            description: `已加载 ${table.rows.length} 条，${table.columns.length} 列`,
            closeButton: true,
            duration: Infinity,
        })
        return table
    } catch (err) {
        toast.error('扣分项台账加载失败', {
            id: DEDUCTION_TOAST_ID,
            description: deductionErrorMessage(err),
            closeButton: true,
            duration: Infinity,
        })
        throw err
    }
}

export const fetchUnqualifiedItems = fetchDeductionItems

bindDeductionFetchGlobal(fetchDeductionItems)
