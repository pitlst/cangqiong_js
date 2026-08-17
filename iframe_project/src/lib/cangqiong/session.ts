import type { ClickHit, CqSessReq, CqWindow, FetchSession } from '@/lib/cangqiong/types'

export const UI_FRAME_ID = '__iframe_project_root__'
export const DEDUCTION_FRAME_ID = 'cq-fetch-frame-deduction'
export const PARTY_FRAME_ID = 'cq-fetch-frame-party'
export const ORG_FRAME_ID = 'cq-fetch-frame-org'

export const CQ_DEDUCTION = {
    partyAppName: '党费',
    menuAppId: 'crrc_party_dues',
    menuFormId: 'crrc_party_dues_apphome',
    menuControl: 'navigationbar',
    menuRoot: 'root',
    menuItemId: '2524686743156851712',
    dataAppId: 'crrc_dj',
    dataFormId: 'crrc_deduction_log',
    menuText: '扣分项台账',
    consoleForm: 'pc_main_console',
    myAppForm: 'tenant_myapp',
}

export const CQ_PARTY = {
    menuAppId: 'crrc_party_dues',
    menuFormId: 'crrc_party_dues_apphome',
    menuControl: 'navigationbar',
    menuRoot: 'root',
    menuItemId: '2546583953733611520',
    dataAppId: 'crrc_dj',
    dataFormId: 'crrc_dj_cb_count',
    listControl: 'billlistap',
    pkField: 'crrc_dj_cb_count_id',
    menuTexts: ['季度党群绩效贡献度', '季度党群绩效'],
    maxBills: 40,
}

export const CQ_ORG = {
    menuAppId: 'crrc_party_dues',
    menuFormId: 'crrc_party_dues_apphome',
    menuControl: 'navigationbar',
    menuRoot: 'root',
    menuItemId: '2546603181119401984',
    dataAppId: 'crrc_dj',
    dataFormId: 'crrc_dj_org_tree_ext',
    menuTexts: ['党组织查询', '党组织'],
}

const SKIP_CLICK_ROOTS = ['#shadcn-hello-inject-root', `#${UI_FRAME_ID}`]
const cqFetchSessions: Record<string, FetchSession> = {}
let cqDisposed = false

export function clog(...args: unknown[]) {
    try {
        const host = window.parent as unknown as { console?: { log: (...messages: unknown[]) => void } }
        const log = host.console?.log?.bind(host.console) || console.log.bind(console)
        log('[iframe_project]', ...args)
    } catch {
        try {
            console.log('[iframe_project]', ...args)
        } catch {
            /* ignore */
        }
    }
}

export function hostWin(): Window {
    try {
        return window.parent
    } catch {
        return window
    }
}

export function parentWin(): Window {
    const start = hostWin()
    let best = start
    try {
        let cur: Window | null = start
        let n = 0
        while (cur && n < 8) {
            n += 1
            try {
                const w = cur as CqWindow
                if (w.$ && typeof w.$.ajax === 'function') best = cur
            } catch {
                /* ignore */
            }
            let next: Window | null = null
            try {
                if (cur.top && cur !== cur.top) next = cur.parent
                else break
            } catch {
                break
            }
            if (!next || next === cur) break
            cur = next
        }
        return best || start
    } catch {
        return start || window
    }
}

export function cqOrigin(): string {
    const origins = [parentWin, hostWin, () => window]
    for (const getWin of origins) {
        try {
            const origin = getWin().location.origin
            if (origin && origin !== 'null') return origin
        } catch {
            /* ignore */
        }
    }
    return ''
}

export function canFetchFromCangqiong(): boolean {
    try {
        const hrefs = [location.href]
        try {
            hrefs.push(hostWin().location.href)
        } catch {
            /* ignore */
        }
        try {
            hrefs.push(parentWin().location.href)
        } catch {
            /* ignore */
        }
        if (hrefs.some((href) => href.includes('/ierp/'))) return true
    } catch {
        /* ignore */
    }
    try {
        const w = parentWin() as CqWindow
        return !!(w.$ && typeof w.$.ajax === 'function')
    } catch {
        return false
    }
}

function pageDoc(): Document {
    try {
        return hostWin().document
    } catch {
        return document
    }
}

export function hasTimeoutText(s: string) {
    const text = String(s || '')
    return text.includes('pagetimeout') || text.includes('会话超时')
}

export function collapseWs(s: string) {
    return String(s || '')
        .replace(/[\s\u00a0]+/g, ' ')
        .trim()
}

export function takeQueryParam(url: string, name: string) {
    const u = String(url || '')
    const needle = `${name}=`
    let i = u.indexOf(`?${needle}`)
    if (i < 0) i = u.indexOf(`&${needle}`)
    if (i < 0) return ''
    const start = i + 1 + needle.length
    let end = u.indexOf('&', start)
    if (end < 0) end = u.length
    try {
        return decodeURIComponent(u.slice(start, end))
    } catch {
        return u.slice(start, end)
    }
}

function findRootToken(pageId: string) {
    const raw = String(pageId || '')
    const s = raw.toLowerCase()
    const i = s.indexOf('root')
    if (i < 0) return ''
    const hex = '0123456789abcdef'
    let j = i + 4
    while (j < s.length && hex.includes(s.charAt(j))) j += 1
    if (j - (i + 4) < 16) return ''
    return raw.slice(i, j)
}

export function extractRootSuffix(pageId: string) {
    return findRootToken(pageId)
}

function isConsoleRootPageId(id: string) {
    const s = String(id || '')
    return s.indexOf('root') === 0 && findRootToken(s) === s
}

function collectPageIds(win: Window | null, depth: number, out: string[], seen: Window[]) {
    if (!win || depth > 8) return out
    if (seen.includes(win)) return out
    seen.push(win)
    try {
        const href = win.location.href
        const u = new URL(href)
        const pid = u.searchParams.get('pageId') || u.searchParams.get('byPageId')
        if (pid) out.push(pid)
    } catch {
        /* ignore */
    }
    try {
        const doc = win.document
        if (doc) {
            const roots = doc.querySelectorAll("[id^='root']")
            for (let r = 0; r < roots.length; r += 1) {
                if (isConsoleRootPageId(roots[r].id)) out.push(roots[r].id)
            }
            const nodes = doc.querySelectorAll('iframe[src], [pageid], [data-pageid]')
            for (let i = 0; i < nodes.length; i += 1) {
                const el = nodes[i]
                const src = el.getAttribute('src') || ''
                const pidFromSrc = takeQueryParam(src, 'pageId')
                if (pidFromSrc) out.push(pidFromSrc)
                const attr = el.getAttribute('pageid') || el.getAttribute('data-pageid')
                if (attr) out.push(attr)
            }
        }
    } catch {
        /* ignore */
    }
    try {
        const frames = win.frames
        for (let f = 0; f < frames.length; f += 1) collectPageIds(frames[f], depth + 1, out, seen)
    } catch {
        /* ignore */
    }
    return out
}

export function findConsolePageIdFrom(win: Window | null) {
    const ids = collectPageIds(win, 0, [], [])
    for (let i = 0; i < ids.length; i += 1) {
        if (isConsoleRootPageId(ids[i])) return ids[i]
    }
    return ''
}

function consoleHomeUrl() {
    return `${cqOrigin()}/ierp/`
}

function makeFetchSession(frameId: string): FetchSession {
    return {
        frameId,
        win: null,
        lastAppHome: '',
        lastList: '',
        lastBill: '',
        requests: [],
        timer: 0,
        listPageId: '',
        dataFormId: '',
        dataAppId: '',
        billFormId: '',
        pkField: '',
        postcols: null,
    }
}

export function getFetchSession(frameId: string) {
    if (!cqFetchSessions[frameId]) cqFetchSessions[frameId] = makeFetchSession(frameId)
    return cqFetchSessions[frameId]
}

function requestUrl(input: RequestInfo | URL) {
    if (typeof input === 'string') return input
    if (typeof URL !== 'undefined' && input instanceof URL) return String(input)
    try {
        const req = input as Request
        return String(req.url || '')
    } catch {
        return ''
    }
}

export function isCqDisposed() {
    return cqDisposed
}

function isPartyBillPageId(pageId: string, listPageId: string, formId: string) {
    const pid = String(pageId || '')
    if (!pid) return false
    if (listPageId && pid.indexOf(`${listPageId}_`) === 0) return true
    if (formId && pid.indexOf(`_${formId}_`) >= 0) return true
    return false
}

function pushSessReq(sess: FetchSession | undefined, url: string, text: string) {
    if (!sess) return
    const u = String(url || '')
    const pageId = takeQueryParam(u, 'pageId')
    const formId = takeQueryParam(u, 'f')
    const ac = takeQueryParam(u, 'ac')
    const appId = takeQueryParam(u, 'appId')
    const entry: CqSessReq = {
        t: Date.now(),
        url: u.slice(0, 500),
        pageId,
        appId,
        query: { ac, f: formId, appId },
        response: text,
    }
    sess.requests.push(entry)
    if (sess.requests.length > 240) sess.requests.splice(0, sess.requests.length - 240)
    if (ac !== 'loadData' || !text || hasTimeoutText(text)) return
    if (formId === CQ_DEDUCTION.menuFormId) sess.lastAppHome = text
    if (formId === CQ_DEDUCTION.dataFormId) sess.lastList = text
    if (formId === CQ_ORG.dataFormId) sess.lastList = text
    if (formId === CQ_PARTY.dataFormId) {
        if (isPartyBillPageId(pageId, sess.listPageId, formId)) sess.lastBill = text
        else sess.lastList = text
    }
}

function hookFetchOn(win: CqWindow | null, sess: FetchSession) {
    if (!win || cqDisposed || !sess) return
    if (typeof win.fetch !== 'function') return
    if (win.__cqOurFetch && win.fetch === win.__cqOurFetch) {
        win.__cqFetchSess = sess
        return
    }
    const orig = win.fetch.bind(win)
    win.__cqOrigFetch = orig
    win.__cqTenantHooked = true
    win.__cqFetchSess = sess
    win.fetch = function cqHookedFetch(input, init) {
        if (cqDisposed) return orig(input, init)
        const url = requestUrl(input)
        return orig(input, init).then((res) => {
            if (cqDisposed) return res
            try {
                if (String(url).includes('ac=loadData')) {
                    res.clone()
                        .text()
                        .then((text) => {
                            if (cqDisposed) return
                            pushSessReq((win.__cqFetchSess || sess) as FetchSession, url, text)
                        })
                        .catch(() => undefined)
                }
            } catch {
                /* ignore */
            }
            return res
        })
    }
    win.__cqOurFetch = win.fetch
}

export function hookSessionTree(sess: FetchSession) {
    if (!sess || !sess.win) return
    const seen: Window[] = []
    function walk(win: Window | null, depth: number) {
        if (!win || depth > 8) return
        if (seen.includes(win)) return
        seen.push(win)
        try {
            hookFetchOn(win as CqWindow, sess)
        } catch {
            /* ignore */
        }
        try {
            const frames = win.frames
            for (let f = 0; f < frames.length; f += 1) walk(frames[f], depth + 1)
        } catch {
            /* ignore */
        }
    }
    walk(sess.win, 0)
}

export function findParentClickTarget(doc: Document | null, text: string, selector?: string) {
    if (!doc) return null
    let nodes: NodeListOf<Element>
    try {
        nodes = doc.querySelectorAll(selector || 'div, span, a, li, button, p, td, label')
    } catch {
        return null
    }
    let fallback: HTMLElement | null = null
    let best: HTMLElement | null = null
    let bestLen = Infinity
    for (let i = 0; i < nodes.length; i += 1) {
        const el = nodes[i] as HTMLElement
        try {
            if (el.closest && SKIP_CLICK_ROOTS.some((sel) => el.closest(sel))) continue
        } catch {
            /* ignore */
        }
        const raw = collapseWs(el.innerText || el.textContent || '')
        if (raw !== text) continue
        if (!fallback) fallback = el
        if (el.offsetWidth === 0 && el.offsetHeight === 0) continue
        const len = (el.innerHTML || '').length
        if (len < bestLen) {
            bestLen = len
            best = el
        }
    }
    if (best || fallback) return best || fallback
    try {
        const labeled = doc.querySelectorAll('[title], [aria-label]')
        for (let i = 0; i < labeled.length; i += 1) {
            const lab = labeled[i] as HTMLElement
            const t = collapseWs(lab.getAttribute('title') || lab.getAttribute('aria-label') || '')
            if (t === text) return lab
        }
    } catch {
        /* ignore */
    }
    return null
}

function findClickInTree(win: Window | null, text: string, selector: string | undefined, depth: number, seen: Window[]): ClickHit | null {
    if (!win || depth > 8) return null
    if (seen.includes(win)) return null
    seen.push(win)
    try {
        const el = findParentClickTarget(win.document, text, selector)
        if (el) return { win, el }
    } catch {
        /* ignore */
    }
    try {
        const frames = win.frames
        for (let f = 0; f < frames.length; f += 1) {
            const hit = findClickInTree(frames[f], text, selector, depth + 1, seen)
            if (hit) return hit
        }
    } catch {
        /* ignore */
    }
    return null
}

export function findClickInSession(sess: FetchSession | null, text: string, selector?: string) {
    if (!sess || !sess.win) return null
    return findClickInTree(sess.win, text, selector, 0, [])
}

export function fireParentClick(el: HTMLElement | null, win?: Window | null) {
    if (!el) return false
    try {
        el.scrollIntoView({ block: 'center', inline: 'nearest' })
    } catch {
        /* ignore */
    }
    let view: Window | null | undefined = win
    try {
        if (!view) view = el.ownerDocument.defaultView
    } catch {
        /* ignore */
    }
    if (!view) view = parentWin()
    try {
        const opts = { bubbles: true, cancelable: true, view }
        el.dispatchEvent(new MouseEvent('pointerdown', opts))
        el.dispatchEvent(new MouseEvent('mousedown', opts))
        el.dispatchEvent(new MouseEvent('pointerup', opts))
        el.dispatchEvent(new MouseEvent('mouseup', opts))
        el.dispatchEvent(new MouseEvent('click', opts))
    } catch {
        try {
            el.click()
        } catch {
            return false
        }
    }
    return true
}

export function waitMs(ms: number) {
    return new Promise<void>((resolve) => {
        setTimeout(resolve, ms)
    })
}

export function waitFor<T>(fn: () => T | null | undefined | false | '', timeout: number, step: number, label: string): Promise<T> {
    const t0 = Date.now()
    return new Promise((resolve, reject) => {
        function tick() {
            if (cqDisposed) {
                reject(new Error('aborted'))
                return
            }
            const value = fn()
            if (value) {
                resolve(value)
                return
            }
            if (Date.now() - t0 > (timeout || 8000)) {
                reject(new Error(label || '等待超时'))
                return
            }
            setTimeout(tick, step || 250)
        }
        tick()
    })
}

export function waitForSessReq(sess: FetchSession, pred: (r: CqSessReq) => boolean, timeout: number, label: string) {
    return waitFor(
        () => {
            const arr = sess.requests || []
            for (let i = arr.length - 1; i >= 0; i -= 1) {
                if (pred(arr[i])) return arr[i]
            }
            return null
        },
        timeout || 15000,
        200,
        label || '等待苍穹请求',
    )
}

function removeFetchFrameById(frameId: string) {
    const nodes: HTMLElement[] = []
    try {
        const byId = hostWin().document.getElementById(frameId)
        if (byId) nodes.push(byId)
    } catch {
        /* ignore */
    }
    for (const el of nodes) {
        try {
            el.onload = null
        } catch {
            /* ignore */
        }
        try {
            ;(el as HTMLIFrameElement).src = 'about:blank'
        } catch {
            /* ignore */
        }
        try {
            if (el.parentNode) el.parentNode.removeChild(el)
        } catch {
            /* ignore */
        }
    }
}

function openFetchFrame(sess: FetchSession) {
    return new Promise<Window>((resolve, reject) => {
        if (cqDisposed) {
            reject(new Error('aborted'))
            return
        }
        removeFetchFrameById(sess.frameId)
        const hostDoc = pageDoc()
        const iframe = hostDoc.createElement('iframe')
        iframe.id = sess.frameId
        iframe.setAttribute('data-cq-fetch', '1')
        iframe.title = sess.frameId
        let leftPx = '0'
        if (sess.frameId.includes('party')) leftPx = '8px'
        if (sess.frameId.includes('-org')) leftPx = '16px'
        iframe.setAttribute('style', `position:fixed;left:${leftPx};top:0;width:1400px;height:900px;opacity:0;pointer-events:none;border:0;z-index:1;`)
        const url = consoleHomeUrl()
        iframe.src = url
        let settled = false
        let startedWait = false
        sess.timer = setTimeout(() => {
            if (settled || cqDisposed) return
            settled = true
            reject(new Error(`主控台 iframe 加载超时 ${url}`))
        }, 30000)
        iframe.onload = () => {
            if (startedWait || settled || cqDisposed) return
            startedWait = true
            try {
                sess.win = iframe.contentWindow
            } catch {
                /* ignore */
            }
            hookSessionTree(sess)
            waitFor(
                () => findClickInSession(sess, CQ_DEDUCTION.partyAppName) || findClickInSession(sess, '应用'),
                22000,
                400,
                '主控台 iframe 中等待「应用/党费」',
            ).then(
                (hit) => {
                    if (settled || cqDisposed) return
                    settled = true
                    if (sess.timer) clearTimeout(sess.timer)
                    sess.timer = 0
                    resolve(hit && hit.win ? hit.win : (sess.win as Window))
                },
                (err: unknown) => {
                    if (settled || cqDisposed) return
                    settled = true
                    if (sess.timer) clearTimeout(sess.timer)
                    sess.timer = 0
                    reject(err)
                },
            )
        }
        ;(hostDoc.body || hostDoc.documentElement).appendChild(iframe)
    })
}

export function ensureFetchSession(sess: FetchSession) {
    if (cqDisposed) return Promise.reject(new Error('aborted'))
    if (sess.win && (findClickInSession(sess, CQ_DEDUCTION.partyAppName) || findClickInSession(sess, '应用'))) {
        hookSessionTree(sess)
        clog('复用隐藏主控台 iframe', sess.frameId)
        return Promise.resolve(sess.win as Window)
    }
    clog('打开隐藏主控台 iframe', sess.frameId, consoleHomeUrl())
    return openFetchFrame(sess)
}

export function clickAppThenParty(sess: FetchSession, step?: (name: string, info?: unknown) => void) {
    return Promise.resolve()
        .then(() => {
            hookSessionTree(sess)
            const alreadyParty = findClickInSession(sess, CQ_DEDUCTION.partyAppName)
            const appHit = findClickInSession(sess, '应用', '.kd-cq-homepage-tab-item-text') || findClickInSession(sess, '应用')
            if (step) step('before-click-app', { alreadyParty: !!alreadyParty, hasApp: !!appHit, frameId: sess.frameId })
            if (alreadyParty) return
            if (appHit) {
                clog('点击应用', sess.frameId)
                fireParentClick(appHit.el, appHit.win)
            }
        })
        .then(() => waitFor(() => findClickInSession(sess, CQ_DEDUCTION.partyAppName), 15000, 250, '等待出现「党费」入口'))
        .then((partyHit) => {
            hookSessionTree(sess)
            clog('点击党费', sess.frameId)
            if (step) step('click-party', { ok: !!(partyHit && partyHit.el) })
            fireParentClick(partyHit.el, partyHit.win)
            return waitFor(() => sess.lastAppHome, 15000, 250, '等待党费首页 loadData').catch(() => {
                clog('未捕获到党费首页 loadData，仍继续', sess.frameId)
                if (step) step('app-home-payload-miss', { lastAppHomeLen: String(sess.lastAppHome || '').length })
                return waitMs(1500)
            })
        })
        .then(() => {
            hookSessionTree(sess)
            return waitMs(400)
        })
}

export function cqInvoke(win: Window | null, appId: string, formId: string, action: string, pageId: string, params: unknown) {
    const w = win || parentWin()
    let origin = ''
    try {
        origin = w.location.origin
    } catch {
        origin = cqOrigin()
    }
    const url =
        `${origin}/ierp/form/batchInvokeAction.do?appId=${encodeURIComponent(appId)}` + `&f=${encodeURIComponent(formId)}&ac=${encodeURIComponent(action)}`
    const body = `pageId=${encodeURIComponent(pageId)}&appId=${encodeURIComponent(appId)}&params=${encodeURIComponent(JSON.stringify(params))}`
    const fetchFn = w.fetch ? w.fetch.bind(w) : fetch
    return fetchFn(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
            ajax: 'true',
            cqappid: appId,
        },
        body,
    }).then((res) =>
        res.text().then((text) => {
            if (!res.ok) throw new Error(`HTTP ${res.status} ${text.slice(0, 400)}`)
            if (hasTimeoutText(text)) throw new Error('表单会话超时')
            try {
                return JSON.parse(text) as unknown
            } catch {
                return text
            }
        }),
    )
}

export function parseMaybeJson(data: unknown) {
    if (typeof data !== 'string') return data
    let text = data
    if (text.indexOf(")]}',") === 0) text = text.slice(5)
    else if (text.indexOf(")]}'") === 0) text = text.slice(4)
    const brace = text.indexOf('{')
    const bracket = text.indexOf('[')
    const start = brace < 0 ? bracket : bracket < 0 ? brace : Math.min(brace, bracket)
    if (start > 0) text = text.slice(start)
    try {
        return JSON.parse(text) as unknown
    } catch {
        return data
    }
}

export function disposeCqFetchResources() {
    cqDisposed = true
    const ids = Object.keys(cqFetchSessions)
    for (const id of ids) {
        const sess = cqFetchSessions[id]
        if (sess && sess.timer) clearTimeout(sess.timer)
        if (sess && sess.win) {
            walkWinTree(sess.win, (win) => unhookFetchOn(win as CqWindow))
        }
        removeFetchFrameById(id)
        delete cqFetchSessions[id]
    }
    try {
        const list = pageDoc().querySelectorAll("iframe[data-cq-fetch='1']")
        for (let i = 0; i < list.length; i += 1) {
            const el = list[i] as HTMLIFrameElement
            try {
                el.onload = null
            } catch {
                /* ignore */
            }
            try {
                el.src = 'about:blank'
            } catch {
                /* ignore */
            }
            try {
                if (el.parentNode) el.parentNode.removeChild(el)
            } catch {
                /* ignore */
            }
        }
    } catch {
        /* ignore */
    }
    try {
        ;(hostWin() as CqWindow).__cqFetchDeduction = undefined
        ;(hostWin() as CqWindow).__cqFetchPartyQuarterly = undefined
        ;(hostWin() as CqWindow).__cqFetchOrg = undefined
    } catch {
        /* ignore */
    }
    try {
        ;(window as CqWindow).__cqFetchDeduction = undefined
        ;(window as CqWindow).__cqFetchPartyQuarterly = undefined
        ;(window as CqWindow).__cqFetchOrg = undefined
    } catch {
        /* ignore */
    }
}

function unhookFetchOn(win: CqWindow | null) {
    if (!win) return
    try {
        if (win.__cqOrigFetch) win.fetch = win.__cqOrigFetch
        try {
            delete win.__cqOrigFetch
        } catch {
            win.__cqOrigFetch = undefined
        }
        try {
            delete win.__cqTenantHooked
        } catch {
            win.__cqTenantHooked = false
        }
        try {
            delete win.__cqOurFetch
        } catch {
            win.__cqOurFetch = undefined
        }
        try {
            delete win.__cqFetchSess
        } catch {
            win.__cqFetchSess = undefined
        }
    } catch {
        /* ignore */
    }
}

function walkWinTree(win: Window | null, fn: (w: Window) => void, depth = 0, seen: Window[] = []) {
    if (!win || depth > 8 || seen.includes(win)) return
    seen.push(win)
    try {
        fn(win)
    } catch {
        /* ignore */
    }
    try {
        const frames = win.frames
        for (let f = 0; f < frames.length; f += 1) walkWinTree(frames[f], fn, depth + 1, seen)
    } catch {
        /* ignore */
    }
}

function removeElement(el: Element | null) {
    if (!el || !el.parentNode) return false
    try {
        el.parentNode.removeChild(el)
        return true
    } catch {
        return false
    }
}

export function closeIframeProject() {
    try {
        disposeCqFetchResources()
    } catch {
        /* ignore */
    }
    const candidates: Element[] = []
    try {
        if (window.frameElement) candidates.push(window.frameElement)
    } catch {
        /* ignore */
    }
    try {
        const byId = hostWin().document.getElementById(UI_FRAME_ID)
        if (byId) candidates.push(byId)
    } catch {
        /* ignore */
    }
    try {
        if (window.parent && window.parent !== window) {
            const byId = window.parent.document.getElementById(UI_FRAME_ID)
            if (byId) candidates.push(byId)
        }
    } catch {
        /* ignore */
    }
    const seen: Element[] = []
    let removed = false
    for (const el of candidates) {
        if (seen.includes(el)) continue
        seen.push(el)
        if (removeElement(el)) removed = true
    }
    if (removed) return
    try {
        const root = document.getElementById('root')
        if (root) root.replaceChildren()
    } catch {
        /* ignore */
    }
}
