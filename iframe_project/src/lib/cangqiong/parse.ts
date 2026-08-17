export const STATUS_TEXT: Record<string, string> = { A: '暂存', B: '已提交', C: '已审核' }
export const PERIOD_TEXT: Record<string, string> = { '1': '一季度', '2': '二季度', '3': '三季度', '4': '四季度', '5': '年度' }

export function isRecord(value: unknown): value is Record<string, unknown> {
    return !!value && typeof value === 'object' && !Array.isArray(value)
}

export function walkCq(obj: unknown, fn: (item: Record<string, unknown>) => void, depth: number, seen: object[]) {
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

export function cqCell(val: unknown): unknown {
    if (val == null) return ''
    if (Array.isArray(val)) {
        if (val.length >= 2 && typeof val[1] === 'number') return val[1]
        if (val.length >= 2 && val[1] != null && val[1] !== '') return val[1]
        if (val[0] != null) return val[0]
        return ''
    }
    return val
}

export function fieldRowKey(dataindex: string) {
    return String(dataindex || '')
        .split('.')
        .join('_')
}

export function formatDeductionValue(key: string, raw: unknown) {
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

export function collectCaptions(payload: unknown, pack: Record<string, unknown>) {
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

export function asNumberMap(value: unknown): Record<string, number> {
    if (!isRecord(value)) return {}
    const out: Record<string, number> = {}
    for (const key of Object.keys(value)) {
        const n = Number(value[key])
        if (!Number.isNaN(n)) out[key] = n
    }
    return out
}

export function findBillListPack(payload: unknown): Record<string, unknown> | null {
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

export function cqErrorMessage(err: unknown) {
    if (err instanceof Error && err.message) return err.message
    return String(err || '未知错误')
}
