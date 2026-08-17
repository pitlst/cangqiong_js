export type ClickHit = {
    win: Window
    el: HTMLElement
}

export type CqSessReq = {
    t: number
    url: string
    pageId: string
    appId: string
    query: { ac: string; f: string; appId: string }
    response: string
}

export type FetchSession = {
    frameId: string
    win: Window | null
    lastAppHome: string
    lastList: string
    lastBill: string
    requests: CqSessReq[]
    timer: ReturnType<typeof setTimeout> | 0
    listPageId: string
    dataFormId: string
    dataAppId: string
    billFormId: string
    pkField: string
    postcols: unknown[] | null
}

export type CqWindow = Window & {
    $?: { ajax?: unknown }
    __cqOrigFetch?: typeof fetch
    __cqOurFetch?: typeof fetch
    __cqTenantHooked?: boolean
    __cqFetchSess?: FetchSession
    __cqFetchDeduction?: () => Promise<unknown>
}

export type DeductionColumn = {
    key: string
    label: string
    sortable?: boolean
    numeric?: boolean
    badge?: boolean
    compact?: boolean
    wrap?: boolean
}

export type DeductionRow = {
    _rowId: string
    [key: string]: string | number
}

export type DeductionTable = {
    columns: DeductionColumn[]
    rows: DeductionRow[]
}
