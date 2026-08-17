import { toast } from 'sonner'

import { cqCell, cqErrorMessage, isRecord, STATUS_TEXT } from '@/lib/cangqiong/parse'
import {
    canFetchFromCangqiong,
    clickAppThenParty,
    clog,
    CQ_DEDUCTION,
    CQ_ORG,
    cqInvoke,
    ensureFetchSession,
    extractRootSuffix,
    findClickInSession,
    findConsolePageIdFrom,
    fireParentClick,
    getFetchSession,
    hasTimeoutText,
    hookSessionTree,
    hostWin,
    ORG_FRAME_ID,
    parseMaybeJson,
    waitForSessReq,
} from '@/lib/cangqiong/session'
import type { CqSessReq, CqWindow, FetchSession, OrgNode } from '@/lib/cangqiong/types'

export const ORG_TOAST_ID = 'cq-org-load'

const ORG_TYPE_TEXT: Record<string, string> = { '1': '党委', '2': '党总支', '3': '党支部', '4': '党小组' }
const ORG_ENABLE_TEXT: Record<string, string> = { '0': '禁用', '1': '可用' }

let orgTask: Promise<OrgNode> | null = null
let lastOrgTree: OrgNode | null = null
let lastOrgError = ''
let lastOrgMeta = { treeCount: 0, listCount: 0, usedFallback: false }

type OrgListExtra = {
    name: string
    status: string
    parent_name: string
    orgType: string
    foundedAt: string
    number: string
    level: string | number
    longnumber: string
    enable: string
}

function formatOrgValue(key: string, raw: unknown) {
    if (raw == null || raw === '') return ''
    const v = cqCell(raw)
    if (key === 'status' || key === 'billstatus') {
        const st = String(v)
        return STATUS_TEXT[st] || st
    }
    if (key === 'crrc_combofield') {
        const t = String(v)
        return ORG_TYPE_TEXT[t] || t
    }
    if (key === 'enable') {
        const en = String(v)
        return ORG_ENABLE_TEXT[en] || en
    }
    if (v && typeof v === 'object') return ''
    return v == null ? '' : v
}

function looksLikeOrgTreeNode(obj: unknown): obj is Record<string, unknown> {
    if (!isRecord(obj)) return false
    const id = obj.id != null ? String(obj.id) : ''
    const name = obj.text || obj.name
    return !!(id && name)
}

function orgTreeArgsOf(obj: Record<string, unknown>) {
    const args = obj.args
    if (!Array.isArray(args) || !args.length) return null
    const first = args[0]
    if (Array.isArray(first) && first.length && looksLikeOrgTreeNode(first[0])) return first as Record<string, unknown>[]
    if (looksLikeOrgTreeNode(first)) return [first]
    return null
}

function countOrgTree(nodes: unknown): number {
    if (!nodes) return 0
    const arr = Array.isArray(nodes) ? nodes : [nodes]
    let n = 0
    for (let i = 0; i < arr.length; i += 1) {
        n += 1
        n += countOrgTree((arr[i] as OrgNode | undefined)?.children)
    }
    return n
}

function walkOrg(obj: unknown, fn: (item: Record<string, unknown>) => boolean | void, depth: number, seen: object[]) {
    if (!obj || typeof obj !== 'object' || depth > 16) return
    if (seen.includes(obj)) return
    seen.push(obj)
    if (!Array.isArray(obj)) {
        if (fn(obj as Record<string, unknown>)) return
    }
    if (Array.isArray(obj)) {
        const n = Math.min(obj.length, 80)
        for (let i = 0; i < n; i += 1) walkOrg(obj[i], fn, depth + 1, seen)
        return
    }
    const keys = Object.keys(obj)
    for (let k = 0; k < keys.length && k < 80; k += 1) {
        if (keys[k] === 'args') continue
        walkOrg((obj as Record<string, unknown>)[keys[k]], fn, depth + 1, seen)
    }
}

function findOrgAddNodes(payload: unknown): Record<string, unknown>[] | null {
    let best: Record<string, unknown>[] | null = null
    let bestCount = -1
    let bestMethod = ''
    walkOrg(
        parseMaybeJson(payload),
        (obj) => {
            const mn = String(obj.methodname || obj.methodName || '')
            if (mn !== 'addNodes' && mn !== 'updateNodes') return
            const arr = orgTreeArgsOf(obj)
            if (arr && arr.length) {
                const c = countOrgTree(arr)
                if (c > bestCount || (c === bestCount && mn === 'addNodes' && bestMethod !== 'addNodes')) {
                    best = arr
                    bestCount = c
                    bestMethod = mn
                }
            }
            return true
        },
        0,
        [],
    )
    return best
}

function findOrgBillListPack(payload: unknown): Record<string, unknown> | null {
    let pack: Record<string, unknown> | null = null
    walkOrg(
        parseMaybeJson(payload),
        (obj) => {
            const mn = String(obj.methodname || obj.methodName || '')
            if (mn === 'addNodes' || mn === 'updateNodes') return true
            const data = obj.data
            const nested = obj.p
            if (obj.k === 'billlistap' && isRecord(data) && Array.isArray(data.rows)) pack = data
            else if (!pack && obj.c === 'billlistap' && isRecord(nested) && Array.isArray(nested.rows)) pack = nested
            else if (!pack && Array.isArray(obj.rows) && isRecord(obj.dataindex) && !Array.isArray(obj.dataindex)) pack = obj
        },
        0,
        [],
    )
    return pack
}

function mapOrgListRows(pack: Record<string, unknown> | null) {
    const map: Record<string, OrgListExtra> = {}
    if (!pack || !Array.isArray(pack.rows)) return map
    const idx = isRecord(pack.dataindex) ? pack.dataindex : {}
    for (let i = 0; i < pack.rows.length; i += 1) {
        const row: unknown = pack.rows[i]
        const cells: unknown[] = Array.isArray(row) ? row : []
        const cell = (key: string): string => {
            const pos = Number(idx[key])
            if (Number.isNaN(pos) || idx[key] == null) return ''
            return String(formatOrgValue(key, cells[pos]) ?? '')
        }
        const id = String(cell('crrc_dj_org_tree_ext_id') || '')
        if (!id) continue
        map[id] = {
            name: cell('name'),
            status: cell('status'),
            parent_name: cell('parent_name'),
            orgType: cell('crrc_combofield'),
            foundedAt: cell('crrc_datefield'),
            number: cell('number'),
            level: cell('level'),
            longnumber: cell('longnumber'),
            enable: cell('enable'),
        }
    }
    return map
}

function mapCqOrgNode(n: Record<string, unknown>, parentName: string, listMap: Record<string, OrgListExtra>): OrgNode {
    const rawId = n && n.id != null ? String(n.id) : ''
    const name = n && (n.text || n.name) ? String(n.text || n.name) : ''
    const parentid = n && n.parentid != null ? String(n.parentid) : ''
    let id = rawId
    if (name === '全部' && !parentid) id = 'all'
    const extra = listMap[rawId] || ({} as Partial<OrgListExtra>)
    const node: OrgNode = {
        id,
        name,
        parentid,
        parentName: extra.parent_name || parentName || '',
        status: extra.status || '',
        orgType: extra.orgType || '',
        foundedAt: extra.foundedAt || '',
        number: extra.number || '',
        level: extra.level == null || extra.level === '' ? '' : extra.level,
        longnumber: extra.longnumber || String(n.longNumber || n.longnumber || ''),
        enable: extra.enable || '',
        children: [],
    }
    const kids = Array.isArray(n.children) ? n.children : []
    for (let ki = 0; ki < kids.length; ki += 1) {
        if (isRecord(kids[ki])) node.children.push(mapCqOrgNode(kids[ki], name, listMap))
    }
    return node
}

function buildOrgRoot(nodes: Record<string, unknown>[], listMap: Record<string, OrgListExtra>): OrgNode | null {
    if (!nodes || !nodes.length) return null
    if (nodes.length === 1) return mapCqOrgNode(nodes[0], '', listMap)
    const wrap: OrgNode = { id: 'all', name: '全部', status: '', children: [] }
    for (let wi = 0; wi < nodes.length; wi += 1) wrap.children.push(mapCqOrgNode(nodes[wi], '', listMap))
    return wrap
}

function buildOrgRootFromList(listMap: Record<string, OrgListExtra>): OrgNode {
    const ids = Object.keys(listMap)
    const children: OrgNode[] = []
    for (let li = 0; li < ids.length; li += 1) {
        const extra = listMap[ids[li]]
        children.push({
            id: ids[li],
            name: extra.name,
            status: extra.status,
            parentName: extra.parent_name,
            orgType: extra.orgType,
            foundedAt: extra.foundedAt,
            number: extra.number,
            level: extra.level,
            longnumber: extra.longnumber,
            enable: extra.enable,
            children: [],
        })
    }
    const companyName = children.length && children[0].parentName ? children[0].parentName : '中车株洲电力机车有限公司党委'
    return {
        id: 'all',
        name: '全部',
        status: '',
        children: [
            {
                id: 'crrc-dw',
                name: companyName,
                status: '',
                children,
            },
        ],
    }
}

function isReservedForm(formId: string) {
    return formId === CQ_DEDUCTION.consoleForm || formId === CQ_DEDUCTION.myAppForm || formId === CQ_DEDUCTION.menuFormId || formId === CQ_ORG.menuFormId
}

function isOrgListLoad(r: CqSessReq, sess: FetchSession) {
    if (!r || !r.query || r.query.ac !== 'loadData') return false
    if (!r.response || r.response.length <= 8 || hasTimeoutText(r.response)) return false
    const f = r.query.f
    if (!f || isReservedForm(f)) return false
    if (sess && sess.listPageId && r.pageId === sess.listPageId) return true
    if (f === CQ_ORG.dataFormId) return true
    const s = String(r.response)
    return s.includes('addNodes') && s.includes('crrc_dj_org_tree_ext')
}

function findOrgMenu(sess: FetchSession) {
    for (const text of CQ_ORG.menuTexts) {
        const hit = findClickInSession(sess, text)
        if (hit) return { hit, text }
    }
    return null
}

function pickOrgPayload(sess: FetchSession, res: unknown) {
    if (isRecord(res) && !res.query) return res
    const last = sess && sess.lastList
    if (last && String(last).includes('addNodes')) return last
    if (isRecord(res) && typeof res.response === 'string' && String(res.response).includes('addNodes')) return res.response
    if (last) return last
    if (isRecord(res) && res.response) return res.response
    return res
}

async function loadOrgFromCq(): Promise<OrgNode> {
    if (!canFetchFromCangqiong()) {
        throw new Error('当前不在苍穹环境，无法打开隐藏主控台 iframe')
    }
    const sess = getFetchSession(ORG_FRAME_ID)
    const trail: { name: string; info: unknown }[] = []
    const step = (name: string, info?: unknown) => {
        trail.push({ name, info: info || null })
        clog('org-step', name, info || '')
    }

    await ensureFetchSession(sess)
    hookSessionTree(sess)
    const consolePageId = findConsolePageIdFrom(sess.win)
    const suffix = extractRootSuffix(consolePageId)
    step('session', { consolePageId, suffix, frameId: sess.frameId })
    if (!consolePageId || !suffix) {
        throw new Error('未找到主控台 pageId。隐藏 iframe 可能未加载到主控台。')
    }

    const menuPageId = CQ_ORG.menuAppId + suffix
    const listPageId = CQ_ORG.menuItemId + suffix
    sess.listPageId = listPageId
    sess.dataFormId = CQ_ORG.dataFormId
    sess.dataAppId = CQ_ORG.dataAppId
    sess.lastList = ''
    sess.lastBill = ''
    sess.lastAppHome = ''
    sess.requests = []

    const treeMenuThenLoad = () => {
        step('treeMenuThenLoad', { menuPageId, listPageId })
        return cqInvoke(sess.win, CQ_ORG.menuAppId, CQ_ORG.menuFormId, 'treeMenuClick', menuPageId, [
            {
                key: CQ_ORG.menuControl,
                methodName: 'treeMenuClick',
                args: [CQ_ORG.menuRoot, CQ_ORG.menuItemId],
                postData: [{}, []],
            },
        ]).then(() =>
            cqInvoke(sess.win, CQ_ORG.dataAppId, CQ_ORG.dataFormId, 'loadData', listPageId, [{ key: '', methodName: 'loadData', args: [], postData: [] }]),
        )
    }

    await clickAppThenParty(sess, step)
    const hit = findOrgMenu(sess)
    step('find-menu', { hasMenu: !!(hit && hit.hit), text: hit ? hit.text : '' })
    let res: unknown
    if (hit && hit.hit) {
        clog('点击', hit.text)
        fireParentClick(hit.hit.el, hit.hit.win)
        res = await waitForSessReq(sess, (r) => isOrgListLoad(r, sess), 25000, '等待党组织查询 loadData').catch(() => {
            clog('点击后未捕获党组织 loadData，改请求链')
            step('click-menu-no-payload', {})
            return treeMenuThenLoad()
        })
    } else {
        res = await treeMenuThenLoad()
    }

    let payload = pickOrgPayload(sess, res)
    let nodes = findOrgAddNodes(payload)
    let pack = findOrgBillListPack(payload)
    if (!nodes) {
        for (let ri = sess.requests.length - 1; ri >= 0; ri -= 1) {
            if (!isOrgListLoad(sess.requests[ri], sess)) continue
            const cand = sess.requests[ri].response
            nodes = findOrgAddNodes(cand)
            if (!pack) pack = findOrgBillListPack(cand)
            if (nodes) {
                payload = cand
                break
            }
        }
    }
    const listMap = mapOrgListRows(pack)
    const listCount = Object.keys(listMap).length
    let root = nodes && nodes.length ? buildOrgRoot(nodes, listMap) : null
    let usedFallback = false
    if (!root && listCount) {
        root = buildOrgRootFromList(listMap)
        usedFallback = true
    }
    clog('党组织树', nodes ? countOrgTree(nodes) : 0, '列表', listCount, usedFallback ? 'fallback' : '', trail)
    if (!root) {
        lastOrgMeta = { treeCount: 0, listCount, usedFallback }
        return { id: 'all', name: '全部', status: '', children: [] }
    }
    lastOrgMeta = { treeCount: countOrgTree(root), listCount, usedFallback }
    return root
}

export function getCachedOrgTree() {
    return lastOrgTree
}

export function getCachedOrgError() {
    return lastOrgError
}

export function getLastOrgMeta() {
    return lastOrgMeta
}

export function fetchOrgTree(options?: { force?: boolean }): Promise<OrgNode> {
    if (!options?.force && lastOrgTree) return Promise.resolve(lastOrgTree)
    if (orgTask) return orgTask
    lastOrgError = ''
    const task = loadOrgFromCq()
        .then((root) => {
            lastOrgTree = root
            lastOrgError = ''
            return root
        })
        .catch((err: unknown) => {
            lastOrgError = cqErrorMessage(err)
            throw err
        })
        .finally(() => {
            if (orgTask === task) orgTask = null
        })
    orgTask = task
    return task
}

export async function fetchOrgTreeWithToast(options?: { force?: boolean }) {
    toast.loading('正在从苍穹加载党组织…', { id: ORG_TOAST_ID })
    try {
        const root = await fetchOrgTree(options)
        const meta = getLastOrgMeta()
        const description = meta.usedFallback
            ? `列表 ${meta.listCount} 行（树未解析，仅一级）`
            : meta.treeCount || meta.listCount
              ? `树节点 ${meta.treeCount}，列表 ${meta.listCount} 行`
              : '列表为空'
        toast.success('党组织加载成功', {
            id: ORG_TOAST_ID,
            description,
            closeButton: true,
            duration: Infinity,
        })
        return root
    } catch (err) {
        toast.error('党组织加载失败', {
            id: ORG_TOAST_ID,
            description: cqErrorMessage(err),
            closeButton: true,
            duration: Infinity,
        })
        throw err
    }
}

try {
    ;(hostWin() as CqWindow).__cqFetchOrg = fetchOrgTree
} catch {
    /* ignore */
}
try {
    ;(window as CqWindow).__cqFetchOrg = fetchOrgTree
} catch {
    /* ignore */
}
