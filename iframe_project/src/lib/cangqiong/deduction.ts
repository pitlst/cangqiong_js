import { toast } from 'sonner'

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

const STATUS_TEXT: Record<string, string> = { A: '暂存', B: '已提交', C: '已审核' }
const PERIOD_TEXT: Record<string, string> = { '1': '一季度', '2': '二季度', '3': '三季度', '4': '四季度', '5': '年度' }

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
    if (err instanceof Error && err.message) return err.message
    return String(err || '未知错误')
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return !!value && typeof value === 'object' && !Array.isArray(value)
}

function walkCq(obj: unknown, fn: (item: Record<string, unknown>) => void, depth: number, seen: object[]) {
    if (!obj || typeof obj !== 'object' || depth > 14) return
    if (seen.includes(obj)) return
    seen.push(obj)
    if (!Array.isArray(obj)) fn(obj as Record<string, unknown>)
    if (!Array.isArray(obj)) {
        const rec = obj as Record<string, unknown>
        const mnSkip = String(rec.methodname || rec.methodName || '')
        if (mnSkip === 'addNodes' || mnSkip === 'updateNodes') return
    }
    if (Array.isArray(obj)) {
        const n = Math.min(obj.length, 400)
        for (let i = 0; i < n; i += 1) walkCq(obj[i], fn, depth + 1, seen)
        return
    }
    const keys = Object.keys(obj)
    for (let k = 0; k < keys.length && k < 400; k += 1) walkCq((obj as Record<string, unknown>)[keys[k]], fn, depth + 1, seen)
}

function cqCell(val: unknown): unknown {
    if (val == null) return ''
    if (Array.isArray(val)) {
        if (val.length >= 2 && typeof val[1] === 'number') return val[1]
        if (val.length >= 2 && val[1] != null && val[1] !== '') return val[1]
        if (val[0] != null) return val[0]
        return ''
    }
    return val
}

function deductionFieldLabel(key: string) {
    if (DEDUCTION_FIELD_LABEL[key]) return DEDUCTION_FIELD_LABEL[key]
    if (key.length > 5 && key.slice(key.length - 5) === '_name') {
        const base = key.slice(0, key.length - 5)
        if (DEDUCTION_FIELD_LABEL[base]) return `${DEDUCTION_FIELD_LABEL[base]}.名称`
    }
    return key
}

function deductionRowKey(dataindex: string) {
    return String(dataindex || '')
        .split('.')
        .join('_')
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

function formatDeductionValue(key: string, raw: unknown) {
    if (raw == null || raw === '') return ''
    if (key === 'billstatus' || key.includes('billstatus')) {
        const st = String(cqCell(raw))
        return STATUS_TEXT[st] || st
    }
    if (key === 'crrc_radiooptgroupfield' || key.includes('radioopt') || key === 'crrc_combofield' || key.includes('combofield')) {
        const pd = String(cqCell(raw))
        return PERIOD_TEXT[pd] || pd
    }
    if (key === 'crrc_datefield' || key === 'crrc_datetimefield') {
        if (Array.isArray(raw)) {
            const y0 = raw[0]
            if (y0 != null && String(y0) !== '') {
                const ys = String(y0)
                if (ys.length >= 4) return ys.slice(0, 4)
            }
            if (raw[1] != null) return String(raw[1]).slice(0, 4)
        }
        const ds = String(cqCell(raw))
        return ds.length >= 4 ? ds.slice(0, 4) : ds
    }
    const v = cqCell(raw)
    if (v && typeof v === 'object') return ''
    return v == null ? '' : v
}

function captionText(cap: unknown) {
    if (cap == null) return ''
    if (typeof cap === 'string') return cap
    if (isRecord(cap)) return String(cap.zh_CN || cap.en_US || cap.zh_TW || '')
    return String(cap)
}

function collectDeductionCaptions(payload: unknown, pack: Record<string, unknown>) {
    const map: Record<string, string> = {}
    walkCq(
        payload,
        (obj) => {
            const di = obj.dataindex != null ? obj.dataindex : obj.dataIndex != null ? obj.dataIndex : obj.fieldId
            const cap = obj.caption != null ? obj.caption : obj.title != null ? obj.title : obj.header
            const text = captionText(cap)
            if (typeof di === 'string' && di && text && !map[di]) map[di] = text
        },
        0,
        [],
    )
    const packCols = pack.columns || pack.cols || pack.columnMetas
    if (Array.isArray(packCols)) {
        for (let i = 0; i < packCols.length; i += 1) {
            const col = packCols[i]
            if (!isRecord(col)) continue
            const cdi = col.dataindex || col.dataIndex || col.fieldId
            const ccap = captionText(col.caption || col.title || col.header)
            if (typeof cdi === 'string' && cdi && ccap) map[cdi] = ccap
        }
    }
    return map
}

function asNumberMap(value: unknown): Record<string, number> {
    if (!isRecord(value)) return {}
    const out: Record<string, number> = {}
    for (const key of Object.keys(value)) {
        const n = Number(value[key])
        if (!Number.isNaN(n)) out[key] = n
    }
    return out
}

function findBillListPack(payload: unknown): Record<string, unknown> | null {
    let found: Record<string, unknown> | null = null
    walkCq(
        payload,
        (obj) => {
            const data = obj.data
            const nested = obj.p
            if (obj.k === 'billlistap' && isRecord(data) && Array.isArray(data.rows)) found = data
            else if (!found && obj.c === 'billlistap' && isRecord(nested) && Array.isArray(nested.rows)) found = nested
            else if (!found && Array.isArray(obj.rows) && isRecord(obj.dataindex) && !Array.isArray(obj.dataindex)) found = obj
        },
        0,
        [],
    )
    return found
}

export function parseDeductionTable(payload: unknown): DeductionTable {
    const pack = findBillListPack(payload)
    if (!pack) return { columns: [], rows: [] }
    const idx = asNumberMap(pack.dataindex)
    const captions = collectDeductionCaptions(payload, pack)
    const keys = Object.keys(idx)
    keys.sort((a, b) => Number(idx[a]) - Number(idx[b]))
    const fieldKeys: { dataindex: string; caption: string }[] = []
    const used: Record<string, boolean> = {}
    for (let i = 0; i < keys.length; i += 1) {
        const k = keys[i]
        if (shouldSkipDeductionKey(k, idx)) continue
        const rowKey = deductionRowKey(k)
        if (used[rowKey]) continue
        used[rowKey] = true
        const known = deductionFieldLabel(k)
        fieldKeys.push({ dataindex: k, caption: known !== k ? known : captions[k] || k })
    }
    const columns: DeductionColumn[] = fieldKeys.map((f) => {
        const key = deductionRowKey(f.dataindex)
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
            const key = deductionRowKey(f.dataindex)
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
