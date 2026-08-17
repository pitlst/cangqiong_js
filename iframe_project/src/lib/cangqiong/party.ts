import { toast } from 'sonner'

import {
    asNumberMap,
    collectCaptions,
    cqCell,
    cqErrorMessage,
    fieldRowKey,
    findBillListPack,
    formatDeductionValue,
    isRecord,
    walkCq,
} from '@/lib/cangqiong/parse'
import {
    canFetchFromCangqiong,
    clickAppThenParty,
    clog,
    collapseWs,
    CQ_DEDUCTION,
    CQ_PARTY,
    cqInvoke,
    ensureFetchSession,
    extractRootSuffix,
    findClickInSession,
    findConsolePageIdFrom,
    findParentClickTarget,
    fireParentClick,
    getFetchSession,
    hasTimeoutText,
    hookSessionTree,
    hostWin,
    isCqDisposed,
    parseMaybeJson,
    PARTY_FRAME_ID,
    waitFor,
    waitForSessReq,
    waitMs,
} from '@/lib/cangqiong/session'
import type { CqSessReq, CqWindow, DeductionColumn, DeductionRow, DeductionTable, FetchSession } from '@/lib/cangqiong/types'

export const PARTY_TOAST_ID = 'cq-party-load'

type FieldKey = { dataindex: string; caption: string; part?: string }
type PartyListBill = Record<string, unknown> & {
    _pkId: string
    _billno: string
    _billstatus: string
    _rowIndex: number
}
type PartyBillParsed = {
    header: Record<string, unknown>
    headerColumns: FieldKey[]
    entries: Record<string, unknown>[]
    entryColumns: FieldKey[]
    columns: FieldKey[]
    rows: Record<string, unknown>[]
}

let partyTask: Promise<DeductionTable> | null = null
let lastPartyTable: DeductionTable | null = null
let lastPartyError = ''
let lastPartyMeta = { opened: 0, failed: 0, entryCount: 0 }

const PARTY_FIELD_LABEL: Record<string, string> = {
    billno: '编号',
    billstatus: '数据状态',
    crrc_datetimefield: '统计年',
    crrc_combofield: '季度',
    crrc_basedatafield: '组织类型',
    crrc_basedatafield1: '党组织',
    crrc_decimalfield13: '合计得分',
    seq: '分录序号',
    fseq: '分录序号',
}

function partyFieldLabel(key: string) {
    let raw = String(key || '')
    if (raw.indexOf('entry_') === 0) raw = raw.slice(6)
    if (PARTY_FIELD_LABEL[raw]) return PARTY_FIELD_LABEL[raw]
    if (raw.length > 5 && raw.slice(raw.length - 5) === '_name') {
        const base = raw.slice(0, raw.length - 5)
        if (PARTY_FIELD_LABEL[base]) return `${PARTY_FIELD_LABEL[base]}.名称`
    }
    return key
}

function isReservedForm(formId: string) {
    return formId === CQ_DEDUCTION.consoleForm || formId === CQ_DEDUCTION.myAppForm || formId === CQ_DEDUCTION.menuFormId || formId === CQ_PARTY.menuFormId
}

function isPartyBillPageId(pageId: string, listPageId: string, formId: string) {
    const pid = String(pageId || '')
    if (!pid) return false
    if (listPageId && pid.indexOf(`${listPageId}_`) === 0) return true
    if (formId && pid.indexOf(`_${formId}_`) >= 0) return true
    return false
}

function isPartyListLoad(r: CqSessReq, sess: FetchSession) {
    if (!r || !r.query || r.query.ac !== 'loadData') return false
    if (!r.response || r.response.length <= 8 || hasTimeoutText(r.response)) return false
    if (isPartyBillPageId(r.pageId, sess.listPageId, CQ_PARTY.dataFormId)) return false
    const f = r.query.f
    if (!f || isReservedForm(f)) return false
    if (sess.listPageId && r.pageId === sess.listPageId) return true
    return f === CQ_PARTY.dataFormId && String(r.response).includes('billlistap')
}

function isPartyBillLoad(r: CqSessReq, sess: FetchSession, minTs: number) {
    if (!r || !r.query || r.query.ac !== 'loadData') return false
    if (!r.response || r.response.length <= 8 || hasTimeoutText(r.response)) return false
    if (minTs && r.t && r.t < minTs - 300) return false
    if (isPartyBillPageId(r.pageId, sess.listPageId, CQ_PARTY.dataFormId)) return true
    return String(r.response).includes('entryentity')
}

function shouldSkipPartyKey(key: string, idx: Record<string, number>, opts?: { keepSeq?: boolean; keepEntryKey?: boolean }) {
    if (!key) return true
    const keepSeq = opts?.keepSeq
    const keepEntryKey = opts?.keepEntryKey
    const low = String(key).toLowerCase()
    if (low === 'rk' || low === 's' || low === 'cprop' || low === 'l' || low === 'vi' || low === 'u') return true
    if (!keepSeq && (low === 'fseq' || low === 'seq')) return true
    if (low === 'rowkey' || low === 'id') return true
    if (key.length >= 3 && key.slice(key.length - 3) === '_id') return true
    if (!keepEntryKey && key.includes('entryentity')) return true
    if (idx && (idx[`${key}_name`] != null || idx[`${key}.name`] != null)) return true
    return false
}

function mapPartyPack(pack: Record<string, unknown>, payload: unknown, opts?: { keepSeq?: boolean }) {
    const idx = asNumberMap(pack.dataindex)
    const captions = collectCaptions(payload || pack, pack)
    const keys = Object.keys(idx)
    keys.sort((a, b) => Number(idx[a]) - Number(idx[b]))
    const fieldKeys: FieldKey[] = []
    const used: Record<string, boolean> = {}
    for (let i = 0; i < keys.length; i += 1) {
        const k = keys[i]
        if (shouldSkipPartyKey(k, idx, opts) || used[k]) continue
        used[k] = true
        fieldKeys.push({ dataindex: k, caption: captions[k] || partyFieldLabel(k) })
    }
    const packRows = Array.isArray(pack.rows) ? pack.rows : []
    const rows = packRows.map((row) => {
        const out: Record<string, unknown> = {}
        const cells = Array.isArray(row) ? row : []
        for (let j = 0; j < fieldKeys.length; j += 1) {
            const f = fieldKeys[j]
            const pos = idx[f.dataindex]
            const raw = pos != null ? cells[pos] : ''
            out[f.dataindex] = formatDeductionValue(f.dataindex, raw)
        }
        return out
    })
    return { columns: fieldKeys, rows }
}

function packCellAt(pack: Record<string, unknown>, row: unknown, key: string) {
    const idx = asNumberMap(pack.dataindex)
    if (idx[key] == null) return ''
    const cells = Array.isArray(row) ? row : []
    return cqCell(cells[idx[key]])
}

function findPkField(pack: Record<string, unknown>, payload: unknown) {
    const idx = asNumberMap(pack.dataindex)
    if (idx[CQ_PARTY.pkField] != null) return CQ_PARTY.pkField
    if (idx.id != null) return 'id'
    let found = ''
    walkCq(
        parseMaybeJson(payload),
        (obj) => {
            if (found) return
            const pk = obj.pkFieldName || obj.pkfieldname
            if (typeof pk !== 'string' || !pk) return
            const short = pk.split('.').pop() || ''
            if (idx[pk] != null) found = pk
            else if (idx[short] != null) found = short
        },
        0,
        [],
    )
    if (found) return found
    const keys = Object.keys(idx)
    for (let i = 0; i < keys.length; i += 1) {
        if (keys[i].length > 3 && keys[i].slice(keys[i].length - 3) === '_id') return keys[i]
    }
    return CQ_PARTY.pkField
}

function extractPartyListBills(payload: unknown, sess: FetchSession) {
    const parsedPayload = parseMaybeJson(payload)
    const pack = findBillListPack(parsedPayload)
    if (!pack) return { columns: [] as FieldKey[], rows: [] as PartyListBill[] }
    const table = mapPartyPack(pack, parsedPayload, {})
    const pkField = findPkField(pack, parsedPayload)
    sess.pkField = pkField
    if (Array.isArray(pack.postcols) && pack.postcols.length) sess.postcols = pack.postcols.slice()
    const packRows = Array.isArray(pack.rows) ? pack.rows : []
    const rows = packRows.map((row, i) => {
        const mapped: PartyListBill = {
            ...(table.rows[i] || {}),
            _pkId: String(packCellAt(pack, row, pkField) || packCellAt(pack, row, 'id') || ''),
            _billno: '',
            _billstatus: String(packCellAt(pack, row, 'billstatus') || ''),
            _rowIndex: i,
        }
        mapped._billno = String(mapped.billno || packCellAt(pack, row, 'billno') || '')
        return mapped
    })
    return { columns: table.columns, rows }
}

function isEntryName(name: string) {
    const s = String(name || '').toLowerCase()
    return !!s && (s.includes('entry') || s.includes('billentry'))
}

function packFromObj(obj: unknown): Record<string, unknown> | null {
    if (!isRecord(obj)) return null
    if (Array.isArray(obj.rows) && isRecord(obj.dataindex) && !Array.isArray(obj.dataindex)) return obj
    if (isRecord(obj.data) && Array.isArray(obj.data.rows) && obj.data.dataindex) return obj.data
    if (isRecord(obj.p) && Array.isArray(obj.p.rows) && obj.p.dataindex) return obj.p
    return null
}

function findEntryPacks(payload: unknown) {
    const packs: { key: string; data: Record<string, unknown> }[] = []
    function add(key: string, data: Record<string, unknown> | null) {
        if (!data || !Array.isArray(data.rows)) return
        if (packs.some((p) => p.data === data)) return
        packs.push({ key: String(key || 'entry'), data })
    }
    walkCq(
        parseMaybeJson(payload),
        (obj) => {
            const k = String(obj.k || obj.c || obj.key || '')
            if (isEntryName(k)) add(k, packFromObj(obj))
            const keys = Object.keys(obj)
            for (let i = 0; i < keys.length; i += 1) {
                if (!isEntryName(keys[i])) continue
                add(keys[i], packFromObj(obj[keys[i]]))
            }
        },
        0,
        [],
    )
    return packs
}

function pickBestEntryPack(packs: { key: string; data: Record<string, unknown> }[]) {
    if (!packs.length) return null
    const named = packs.filter((p) => isEntryName(p.key))
    const list = named.length ? named : packs
    let best = list[0]
    for (let j = 1; j < list.length; j += 1) {
        const aRows = list[j].data.rows
        const bRows = best.data.rows
        const a = Array.isArray(aRows) ? aRows.length : 0
        const b = Array.isArray(bRows) ? bRows.length : 0
        if (a > b) best = list[j]
    }
    return best
}

function isSkipHeaderKey(key: string) {
    if (!key || key.charAt(0) === '_') return true
    const skip: Record<string, number> = {
        k: 1,
        c: 1,
        a: 1,
        p: 1,
        u: 1,
        l: 1,
        vi: 1,
        data: 1,
        dataindex: 1,
        rows: 1,
        cols: 1,
        columns: 1,
        pageId: 1,
        appId: 1,
        params: 1,
    }
    if (skip[key]) return true
    const low = String(key).toLowerCase()
    if (low.includes('entry')) return true
    if (low === 'billlistap' || (low.length >= 2 && low.slice(low.length - 2) === 'ap')) return true
    return false
}

function headerFromListBill(bill: PartyListBill | null) {
    const header: Record<string, unknown> = {}
    if (!bill) return header
    for (const key of Object.keys(bill)) {
        if (key.charAt(0) === '_') continue
        header[key] = bill[key]
    }
    return header
}

function setHeaderVal(header: Record<string, unknown>, key: string, raw: unknown) {
    if (isSkipHeaderKey(key)) return
    if (raw && typeof raw === 'object' && !Array.isArray(raw) && isRecord(raw) && (raw.rows || raw.dataindex)) return
    const val = formatDeductionValue(key, raw)
    if (val == null || val === '') return
    if (typeof val === 'object') return
    if (header[key] == null || header[key] === '') header[key] = val
}

function extractBillHeader(payload: unknown, listBill: PartyListBill | null) {
    const header: Record<string, unknown> = {}
    walkCq(
        parseMaybeJson(payload),
        (obj) => {
            const k = obj.k || obj.c
            if (typeof k === 'string' && k && obj.v !== undefined && !isSkipHeaderKey(k)) {
                setHeaderVal(header, k, obj.v)
            }
        },
        0,
        [],
    )
    const listHeader = headerFromListBill(listBill)
    for (const key of Object.keys(listHeader)) {
        if (header[key] == null || header[key] === '') header[key] = listHeader[key]
    }
    return header
}

function flattenPartyBill(header: Record<string, unknown>, entry: Record<string, unknown> | null, meta: { pk: string; seq: number }) {
    const out: Record<string, unknown> = {}
    for (const key of Object.keys(header || {})) {
        if (key.charAt(0) === '_') continue
        out[key] = header[key]
    }
    if (entry) {
        for (const k of Object.keys(entry)) {
            if (k.charAt(0) === '_') continue
            out[Object.prototype.hasOwnProperty.call(out, k) ? `entry_${k}` : k] = entry[k]
        }
    }
    out._billPkId = (meta && meta.pk) || ''
    out._entrySeq = meta && meta.seq != null ? meta.seq : ''
    return out
}

function combinePartyColumns(headerCols: FieldKey[], entryCols: FieldKey[], header: Record<string, unknown>) {
    const cols = (headerCols || []).slice()
    const seen: Record<string, boolean> = {}
    for (let i = 0; i < cols.length; i += 1) seen[cols[i].dataindex] = true
    for (let j = 0; j < (entryCols || []).length; j += 1) {
        const c = entryCols[j]
        const key = header && Object.prototype.hasOwnProperty.call(header, c.dataindex) ? `entry_${c.dataindex}` : c.dataindex
        if (seen[key]) continue
        seen[key] = true
        cols.push({ dataindex: key, caption: c.caption || partyFieldLabel(c.dataindex), part: 'entry' })
    }
    return cols
}

function extractPartyBillData(payload: unknown, listBill: PartyListBill | null): PartyBillParsed {
    const parsedPayload = parseMaybeJson(payload)
    const header = extractBillHeader(parsedPayload, listBill)
    const pack = pickBestEntryPack(findEntryPacks(parsedPayload))
    const mapped = pack ? mapPartyPack(pack.data, parsedPayload, { keepSeq: true }) : { columns: [] as FieldKey[], rows: [] as Record<string, unknown>[] }
    const entries = mapped.rows || []
    const headerCols: FieldKey[] = []
    const captions = collectCaptions(parsedPayload, pack && pack.data ? pack.data : {})
    for (const hk of Object.keys(header)) {
        if (hk.charAt(0) === '_') continue
        headerCols.push({ dataindex: hk, caption: captions[hk] || partyFieldLabel(hk), part: 'header' })
    }
    const pk = (listBill && listBill._pkId) || String(header[CQ_PARTY.pkField] || '')
    const flat: Record<string, unknown>[] = []
    if (!entries.length) {
        flat.push(flattenPartyBill(header, null, { pk, seq: -1 }))
    } else {
        for (let ei = 0; ei < entries.length; ei += 1) {
            flat.push(flattenPartyBill(header, entries[ei], { pk, seq: ei }))
        }
    }
    return {
        header,
        headerColumns: headerCols,
        entries,
        entryColumns: mapped.columns || [],
        columns: combinePartyColumns(headerCols, mapped.columns || [], header),
        rows: flat,
    }
}

function partyColsToTable(columns: FieldKey[], rows: Record<string, unknown>[]): DeductionTable {
    const defs: DeductionColumn[] = []
    const used: Record<string, boolean> = {}
    const numericKeys: Record<string, boolean> = {}
    for (let i = 0; i < (columns || []).length; i += 1) {
        const di = columns[i].dataindex
        const key = fieldRowKey(di)
        if (used[key]) continue
        used[key] = true
        let label = columns[i].caption || partyFieldLabel(di)
        if (!label || label === di) label = partyFieldLabel(di)
        const numeric = key.includes('decimal') || label.includes('分数') || label.includes('得分')
        const badge = key.includes('billstatus') || label.includes('状态')
        const compact =
            numeric ||
            badge ||
            key === 'billno' ||
            key.includes('datetimefield') ||
            key.includes('combofield') ||
            label === '统计年' ||
            label === '季度' ||
            label === '编号'
        const wrap = !compact && (key.includes('largetext') || key.includes('textfield') || label.includes('说明') || label.includes('备注'))
        if (numeric) numericKeys[key] = true
        defs.push({ key, label, sortable: true, numeric, badge, compact, wrap })
    }
    const outRows: DeductionRow[] = (rows || []).map((row, ridx) => {
        const o: DeductionRow = { _rowId: `p${ridx}` }
        for (let j = 0; j < (columns || []).length; j += 1) {
            const k = fieldRowKey(columns[j].dataindex)
            const val = row[columns[j].dataindex]
            if (numericKeys[k] && val !== '' && typeof val !== 'number') {
                const num = Number(val)
                o[k] = Number.isNaN(num) ? String(val ?? '') : num
            } else if (typeof val === 'number') {
                o[k] = val
            } else {
                o[k] = val == null ? '' : String(val)
            }
        }
        return o
    })
    return { columns: defs, rows: outRows }
}

function findPartyMenu(sess: FetchSession) {
    for (const text of CQ_PARTY.menuTexts) {
        const hit = findClickInSession(sess, text)
        if (hit) return { hit, text }
    }
    return null
}

function findBillLinkInSession(sess: FetchSession, bill: PartyListBill) {
    const no = bill && (bill._billno || bill.billno)
    if (!no || !sess.win) return null
    const doc = sess.win.document
    const el = findParentClickTarget(doc, String(no), 'span.link-cell-content, span.link-color, a, span') || findParentClickTarget(doc, String(no))
    if (!el) return null
    return { el, win: sess.win }
}

function closeBillInSession(sess: FetchSession, bill: PartyListBill) {
    const no = bill && (bill._billno || bill.billno)
    const doc = sess.win && sess.win.document
    if (!doc) return waitMs(200)
    if (no) {
        let tabs: NodeListOf<Element>
        try {
            tabs = doc.querySelectorAll(".kd-cq-tab-item, .kd-cq-homepage-tab-item, [role='tab']")
        } catch {
            tabs = doc.querySelectorAll('[role="tab"]')
        }
        for (let i = 0; i < tabs.length; i += 1) {
            const title = collapseWs((tabs[i] as HTMLElement).innerText || tabs[i].textContent || '')
            if (title.indexOf(String(no)) < 0) continue
            const closeBtn = tabs[i].querySelector('.close, .kd-cq-tab-close, [class*="close"]') as HTMLElement | null
            if (closeBtn) {
                fireParentClick(closeBtn, sess.win)
                return waitMs(400)
            }
        }
    }
    const btn = findClickInSession(sess, '关闭') || findClickInSession(sess, '取消')
    if (btn) {
        fireParentClick(btn.el, btn.win)
        return waitMs(400)
    }
    return waitMs(200)
}

function partyListSelData(sess: FetchSession, bill: PartyListBill) {
    let postcols = sess.postcols
    if (!Array.isArray(postcols) || !postcols.length) {
        postcols = [sess.pkField || CQ_PARTY.pkField, 'billstatus', 'billno']
    }
    return postcols.map((col) => {
        const key = String(col)
        if (key === 'billno') return String(bill._billno || bill.billno || '')
        if (key === 'billstatus') return String(bill._billstatus || '')
        if (key === (sess.pkField || CQ_PARTY.pkField) || key.slice(-3) === '_id') return String(bill._pkId || '')
        if (bill[key] != null && bill[key] !== '') return String(bill[key])
        return ''
    })
}

function invokePartyBillOpen(sess: FetchSession, rowIndex: number, bill: PartyListBill) {
    const appId = sess.dataAppId || CQ_PARTY.dataAppId
    const formId = sess.dataFormId || CQ_PARTY.dataFormId
    const pageId = sess.listPageId
    const field = 'billno'
    const ctrl = CQ_PARTY.listControl
    const sel = partyListSelData(sess, bill)
    return cqInvoke(sess.win, appId, formId, 'entryRowClick', pageId, [
        {
            key: ctrl,
            methodName: 'entryRowClick',
            args: [rowIndex, field],
            postData: [
                {
                    billlistap: {
                        fieldKey: field,
                        row: rowIndex,
                        selRows: [rowIndex],
                        selDatas: [sel],
                        isClientNewRow: false,
                        clientNewRows: '',
                    },
                },
                [],
            ],
        },
        {
            key: ctrl,
            methodName: 'hyperLinkClick',
            args: [field, rowIndex],
            postData: [{}, []],
        },
    ])
}

function openOnePartyBill(sess: FetchSession, bill: PartyListBill, rowIndex: number) {
    const started = Date.now()
    const waitBill = (ms: number) => waitForSessReq(sess, (r) => isPartyBillLoad(r, sess, started), ms || 20000, '等待单据 loadData')
    return waitFor(() => findBillLinkInSession(sess, bill), 8000, 200, '等待单据编号链接')
        .then((link) => {
            clog('点击编号打开单据', bill._billno || bill.billno || '')
            fireParentClick(link.el, link.win)
            return waitBill(12000)
        })
        .catch(() => {
            clog('改用 entryRowClick 打开单据', bill._billno || '')
            return invokePartyBillOpen(sess, rowIndex, bill).then(() => waitBill(20000))
        })
        .then((billReq) => {
            if (!billReq) throw new Error('未等到单据 loadData')
            sess.dataFormId = (billReq.query && billReq.query.f) || sess.dataFormId || CQ_PARTY.dataFormId
            sess.dataAppId = billReq.appId || sess.dataAppId || CQ_PARTY.dataAppId
            const parsed = extractPartyBillData(billReq.response, bill)
            if (!parsed.entries.length && String(billReq.response || '').indexOf('entryentity') < 0) {
                throw new Error('单据已开但未解析到分录 entryentity')
            }
            return closeBillInSession(sess, bill).then(() => parsed)
        })
}

function collectPartyEntries(sess: FetchSession, bills: PartyListBill[]) {
    const allRows: Record<string, unknown>[] = []
    const headerCols: FieldKey[] = []
    const entryCols: FieldKey[] = []
    const allHeader: Record<string, unknown> = {}
    let opened = 0
    let failed = 0
    let entryCount = 0
    const n = Math.min(bills.length, CQ_PARTY.maxBills || 40)

    function mergeCols(into: FieldKey[], add: FieldKey[] | null | undefined) {
        const seen: Record<string, boolean> = {}
        for (let i = 0; i < into.length; i += 1) seen[into[i].dataindex] = true
        for (let i = 0; i < (add || []).length; i += 1) {
            if (!add || !add[i] || seen[add[i].dataindex]) continue
            seen[add[i].dataindex] = true
            into.push(add[i])
        }
    }

    function pushParsed(bill: PartyListBill, parsed: PartyBillParsed | null) {
        const header = (parsed && parsed.header) || headerFromListBill(bill)
        let rows = (parsed && parsed.rows) || []
        if (!rows.length) rows = [flattenPartyBill(header, null, { pk: bill._pkId || '', seq: -1 })]
        entryCount += parsed && parsed.entries ? parsed.entries.length : 0
        mergeCols(headerCols, parsed && parsed.headerColumns)
        mergeCols(entryCols, parsed && parsed.entryColumns)
        for (const hk of Object.keys(header)) allHeader[hk] = header[hk]
        for (let r = 0; r < rows.length; r += 1) allRows.push(rows[r])
    }

    function step(i: number): Promise<{
        rows: Record<string, unknown>[]
        headerCols: FieldKey[]
        entryCols: FieldKey[]
        allHeader: Record<string, unknown>
        opened: number
        failed: number
        entryCount: number
    }> {
        if (isCqDisposed() || i >= n) {
            return Promise.resolve({ rows: allRows, headerCols, entryCols, allHeader, opened, failed, entryCount })
        }
        const bill = bills[i]
        const idx = bill._rowIndex != null ? bill._rowIndex : i
        clog('打开单据', `${i + 1}/${n}`, bill._billno || bill.billno || '')
        hookSessionTree(sess)
        return openOnePartyBill(sess, bill, idx).then(
            (parsed) => {
                opened += 1
                pushParsed(bill, parsed)
                return waitMs(350).then(() => step(i + 1))
            },
            (err: unknown) => {
                failed += 1
                clog('打开单据失败，保留列表头', bill._billno || bill._pkId, cqErrorMessage(err))
                pushParsed(bill, {
                    header: headerFromListBill(bill),
                    headerColumns: [],
                    entries: [],
                    entryColumns: [],
                    columns: [],
                    rows: [flattenPartyBill(headerFromListBill(bill), null, { pk: bill._pkId || '', seq: -1 })],
                })
                return waitMs(250).then(() => step(i + 1))
            },
        )
    }

    return step(0)
}

async function loadPartyQuarterlyFromCq(): Promise<DeductionTable> {
    if (!canFetchFromCangqiong()) {
        throw new Error('当前不在苍穹环境，无法打开隐藏主控台 iframe')
    }
    const sess = getFetchSession(PARTY_FRAME_ID)
    const trail: { name: string; info: unknown }[] = []
    const step = (name: string, info?: unknown) => {
        trail.push({ name, info: info || null })
        clog('pq-step', name, info || '')
    }

    await ensureFetchSession(sess)
    hookSessionTree(sess)
    const consolePageId = findConsolePageIdFrom(sess.win)
    const suffix = extractRootSuffix(consolePageId)
    step('session', { consolePageId, suffix, frameId: sess.frameId })
    clog('季度党群绩效 consolePageId', consolePageId, 'suffix', suffix)
    if (!consolePageId || !suffix) {
        throw new Error('未找到主控台 pageId。隐藏 iframe 可能未加载到主控台。')
    }

    const menuPageId = CQ_PARTY.menuAppId + suffix
    const listPageId = CQ_PARTY.menuItemId + suffix
    sess.listPageId = listPageId
    sess.dataFormId = CQ_PARTY.dataFormId
    sess.dataAppId = CQ_PARTY.dataAppId
    sess.lastList = ''
    sess.lastBill = ''
    sess.lastAppHome = ''
    sess.requests = []

    const treeMenuThenLoad = () => {
        step('treeMenuThenLoad', { menuPageId, listPageId })
        return cqInvoke(sess.win, CQ_PARTY.menuAppId, CQ_PARTY.menuFormId, 'treeMenuClick', menuPageId, [
            {
                key: CQ_PARTY.menuControl,
                methodName: 'treeMenuClick',
                args: [CQ_PARTY.menuRoot, CQ_PARTY.menuItemId],
                postData: [{}, []],
            },
        ]).then(() =>
            cqInvoke(sess.win, CQ_PARTY.dataAppId, CQ_PARTY.dataFormId, 'loadData', listPageId, [{ key: '', methodName: 'loadData', args: [], postData: [] }]),
        )
    }

    await clickAppThenParty(sess, step)
    const hit = findPartyMenu(sess)
    step('find-menu', { hasMenu: !!(hit && hit.hit), text: hit ? hit.text : '' })
    let res: unknown
    if (hit && hit.hit) {
        clog('点击', hit.text)
        fireParentClick(hit.hit.el, hit.hit.win)
        res = await waitForSessReq(sess, (r) => isPartyListLoad(r, sess), 15000, '等待季度党群绩效列表 loadData').catch(() => {
            clog('点击后未捕获列表 loadData，改请求链')
            step('click-menu-no-payload', {})
            return treeMenuThenLoad()
        })
    } else {
        res = await treeMenuThenLoad()
    }

    let payload: unknown = sess.lastList
    if (!payload && isRecord(res) && res.query) payload = res.response
    if (!payload) payload = res
    let list = extractPartyListBills(payload, sess)
    if (!list.rows.length) {
        for (let ri = sess.requests.length - 1; ri >= 0; ri -= 1) {
            if (!isPartyListLoad(sess.requests[ri], sess)) continue
            list = extractPartyListBills(sess.requests[ri].response, sess)
            payload = sess.requests[ri].response
            if (list.rows.length) break
        }
    }
    clog('季度党群绩效列表单据', list.rows.length, trail)
    if (!list.rows.length) {
        lastPartyMeta = { opened: 0, failed: 0, entryCount: 0 }
        return { columns: [], rows: [] }
    }
    sess.dataFormId = CQ_PARTY.dataFormId
    await waitFor(() => findBillLinkInSession(sess, list.rows[0]), 8000, 200, '等待列表编号').catch(() => null)
    const got = await collectPartyEntries(sess, list.rows)
    const cols = combinePartyColumns(got.headerCols, got.entryCols, got.allHeader)
    const table = partyColsToTable(cols, got.rows)
    clog('季度党群绩效摊平', '单据', got.opened, '失败', got.failed, '分录', got.entryCount, '行', table.rows.length)
    lastPartyMeta = { opened: got.opened, failed: got.failed, entryCount: got.entryCount }
    return table
}

export function getCachedPartyQuarterly() {
    return lastPartyTable
}

export function getCachedPartyError() {
    return lastPartyError
}

export function getLastPartyMeta() {
    return lastPartyMeta
}

export function fetchPartyQuarterly(options?: { force?: boolean }): Promise<DeductionTable> {
    if (!options?.force && lastPartyTable) return Promise.resolve(lastPartyTable)
    if (partyTask) return partyTask
    lastPartyError = ''
    const task = loadPartyQuarterlyFromCq()
        .then((table) => {
            lastPartyTable = table
            lastPartyError = ''
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
    toast.loading('正在从苍穹加载季度党群绩效…', { id: PARTY_TOAST_ID })
    try {
        const table = await fetchPartyQuarterly(options)
        const meta = getLastPartyMeta()
        const description = table.rows.length
            ? `单据 ${meta.opened} 张，分录 ${meta.entryCount} 行，列表 ${table.rows.length} 条`
            : '列表为空，无单据可打开分录'
        toast.success('季度党群绩效加载成功', {
            id: PARTY_TOAST_ID,
            description,
            closeButton: true,
            duration: Infinity,
        })
        return table
    } catch (err) {
        toast.error('季度党群绩效加载失败', {
            id: PARTY_TOAST_ID,
            description: cqErrorMessage(err),
            closeButton: true,
            duration: Infinity,
        })
        throw err
    }
}

try {
    ;(hostWin() as CqWindow).__cqFetchPartyQuarterly = fetchPartyQuarterly
} catch {
    /* ignore */
}
try {
    ;(window as CqWindow).__cqFetchPartyQuarterly = fetchPartyQuarterly
} catch {
    /* ignore */
}
