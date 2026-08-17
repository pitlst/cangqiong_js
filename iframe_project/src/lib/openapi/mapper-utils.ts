export function isRecord(value: unknown): value is Record<string, unknown> {
    return !!value && typeof value === 'object' && !Array.isArray(value)
}

/** 读取苍穹字段：优先 _title 展示值，基础资料取 name/number */
export function displayField(obj: Record<string, unknown>, key: string) {
    const titleKey = `${key}_title`
    if (obj[titleKey] != null && obj[titleKey] !== '') return String(obj[titleKey])
    const raw = obj[key]
    if (raw == null || raw === '') return ''
    if (isRecord(raw)) return String(raw.name || raw.number || raw.id || '')
    return String(raw)
}

/** 从日期/日期时间字段取年份（前 4 位） */
export function yearOf(value: unknown) {
    if (value == null || value === '') return ''
    const text = String(value)
    return text.length >= 4 ? text.slice(0, 4) : text
}

/** 按单据分录展平：无分录时仍回调一次（entry=null） */
export function flattenBillEntries<T extends Record<string, unknown>, R>(
    bills: T[],
    mapRow: (bill: T, entry: Record<string, unknown> | null, index: number) => R,
) {
    const rows: R[] = []
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

/** 依次尝试多个数值字段，取第一个有效数字 */
export function numberField(obj: Record<string, unknown>, ...keys: string[]) {
    for (const key of keys) {
        const raw = obj[key]
        if (raw == null || raw === '') continue
        const n = Number(raw)
        if (Number.isFinite(n)) return n
    }
    return 0
}
