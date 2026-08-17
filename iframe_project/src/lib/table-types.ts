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

export type OrgNode = {
    id: string
    name: string
    parentid?: string
    parentName?: string
    status?: string
    orgType?: string
    foundedAt?: string
    number?: string
    level?: string | number
    longnumber?: string
    enable?: string
    children: OrgNode[]
}
