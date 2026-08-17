import type { DeductionRow, OrgNode } from '@/lib/table-types'

function isRecord(value: unknown): value is Record<string, unknown> {
    return !!value && typeof value === 'object' && !Array.isArray(value)
}

function displayField(obj: Record<string, unknown>, key: string) {
    const titleKey = `${key}_title`
    if (obj[titleKey] != null && obj[titleKey] !== '') return String(obj[titleKey])
    const raw = obj[key]
    if (raw == null || raw === '') return ''
    if (isRecord(raw)) return String(raw.name || raw.number || raw.id || '')
    return String(raw)
}

function yearOf(value: unknown) {
    if (value == null || value === '') return ''
    const text = String(value)
    return text.length >= 4 ? text.slice(0, 4) : text
}

function flattenBillEntries<T extends Record<string, unknown>>(
    bills: T[],
    mapRow: (bill: T, entry: Record<string, unknown> | null, index: number) => DeductionRow,
) {
    const rows: DeductionRow[] = []
    let seq = 0
    for (const bill of bills) {
        const entries = Array.isArray(bill.entryentity) ? (bill.entryentity as Record<string, unknown>[]) : []
        if (!entries.length) {
            rows.push(mapRow(bill, null, seq))
            seq += 1
            continue
        }
        for (const entry of entries) {
            rows.push(mapRow(bill, entry, seq))
            seq += 1
        }
    }
    return rows
}

export function mapDeductionRows(bills: Record<string, unknown>[]): DeductionRow[] {
    return flattenBillEntries(bills, (bill, entry, index) => {
        const entryId = entry?.id != null ? String(entry.id) : ''
        const billId = bill.id != null ? String(bill.id) : ''
        return {
            _rowId: entryId || `${billId}-${index}`,
            billno: displayField(bill, 'billno'),
            billstatus: displayField(bill, 'billstatus'),
            crrc_datefield: yearOf(bill.crrc_datefield),
            crrc_radiooptgroupfield: displayField(bill, 'crrc_radiooptgroupfield'),
            crrc_textfield: entry ? displayField(entry, 'crrc_textfield') : '',
            crrc_textfield1: entry ? displayField(entry, 'crrc_textfield1') : '',
            crrc_decimalfield: entry && entry.crrc_decimalfield != null && entry.crrc_decimalfield !== '' ? Number(entry.crrc_decimalfield) : '',
            crrc_basedatafield: displayField(bill, 'crrc_basedatafield') || (entry ? displayField(entry, 'crrc_basedatafield') : ''),
            crrc_orgfield_name: displayField(bill, 'crrc_orgfield') || displayField(bill, 'crrc_orgfield_name'),
        }
    })
}

export function mapPartyQuarterlyRows(bills: Record<string, unknown>[]): DeductionRow[] {
    return flattenBillEntries(bills, (bill, entry, index) => {
        const merged = { ...bill, ...(entry || {}) }
        const entryId = entry?.id != null ? String(entry.id) : ''
        const billId = bill.id != null ? String(bill.id) : ''
        return {
            _rowId: entryId || `${billId}-${index}`,
            crrc_basedatafield1: displayField(merged, 'crrc_basedatafield1') || displayField(merged, 'crrc_basedatafield'),
            crrc_combofield: displayField(merged, 'crrc_combofield'),
            crrc_datetimefield: yearOf(merged.crrc_datetimefield) || displayField(merged, 'crrc_datetimefield'),
            billno: displayField(bill, 'billno'),
            billstatus: displayField(bill, 'billstatus'),
        }
    })
}

function orgNodeId(raw: Record<string, unknown>) {
    return String(raw.id || raw.crrc_dj_org_tree_ext_id || raw.key || raw.nodeid || raw.number || raw.longnumber || '')
}

function orgNodeName(raw: Record<string, unknown>) {
    return String(raw.name || raw.text || raw.orgname || raw.caption || '')
}

function orgNodeParentId(raw: Record<string, unknown>) {
    if (raw.parentid != null && raw.parentid !== '') return String(raw.parentid)
    if (raw.parentId != null && raw.parentId !== '') return String(raw.parentId)
    if (isRecord(raw.parent) && raw.parent.id != null) return String(raw.parent.id)
    return ''
}

function mapOrgNode(raw: Record<string, unknown>): OrgNode {
    const id = orgNodeId(raw)
    return {
        id,
        name: orgNodeName(raw) || id,
        parentid: orgNodeParentId(raw),
        parentName: displayField(raw, 'parent') || displayField(raw, 'parentname') || displayField(raw, 'parent_name'),
        status: displayField(raw, 'status') || displayField(raw, 'billstatus') || displayField(raw, 'enable'),
        orgType: displayField(raw, 'crrc_combofield') || displayField(raw, 'orgtype') || displayField(raw, 'orgType'),
        foundedAt: displayField(raw, 'crrc_datefield') || displayField(raw, 'foundedAt') || displayField(raw, 'foundeddate'),
        number: String(raw.number || raw.longnumber || raw.longNumber || ''),
        level: raw.level == null || raw.level === '' ? '' : (raw.level as string | number),
        longnumber: String(raw.longnumber || raw.longNumber || ''),
        enable: displayField(raw, 'enable'),
        children: [],
    }
}

function attachOrgChildren(node: OrgNode, map: Map<string, OrgNode>) {
    const kids: OrgNode[] = []
    for (const item of map.values()) {
        if (item.parentid === node.id) kids.push(item)
    }
    kids.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
    node.children = kids
    for (const child of kids) attachOrgChildren(child, map)
}

export function mapOrgTree(rows: Record<string, unknown>[]): OrgNode {
    const root: OrgNode = { id: 'all', name: '全部组织', children: [] }
    const map = new Map<string, OrgNode>()

    for (const raw of rows) {
        const node = mapOrgNode(raw)
        if (!node.id) continue
        map.set(node.id, node)
    }

    const topLevel: OrgNode[] = []
    for (const node of map.values()) {
        if (!node.parentid || node.parentid === '0' || !map.has(node.parentid)) {
            topLevel.push(node)
            continue
        }
    }

    topLevel.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
    for (const node of topLevel) attachOrgChildren(node, map)
    root.children = topLevel
    return root
}
