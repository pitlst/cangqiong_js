import { toast } from 'sonner'
import * as XLSX from 'xlsx'

export type ExcelColumn = {
    key: string
    label: string
}

function sheetNameOf(name: string) {
    const cleaned = name
        .replace(/[\\/?*[\]:]/g, '')
        .slice(0, 31)
        .trim()
    return cleaned || 'Sheet1'
}

function safeFileName(name: string) {
    const cleaned = name
        .replace(/[\\/:*?"<>|]/g, '_')
        .replace(/\s+/g, ' ')
        .trim()
    return `${cleaned || '导出'}.xlsx`
}

function cellValue(row: object, key: string) {
    const value = (row as Record<string, unknown>)[key]
    if (value == null) return ''
    if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'string') return value
    return String(value)
}

export function downloadExcel(options: { filename: string; sheetName?: string; columns: ExcelColumn[]; rows: readonly object[] }) {
    const columns = options.columns.filter((col) => col && col.key)
    if (!columns.length) throw new Error('当前表格没有可导出的列')
    const header = columns.map((col) => col.label)
    const body = (options.rows || []).map((row) => columns.map((col) => cellValue(row, col.key)))
    const sheet = XLSX.utils.aoa_to_sheet([header, ...body])
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, sheet, sheetNameOf(options.sheetName || options.filename))
    XLSX.writeFile(workbook, safeFileName(options.filename), { bookType: 'xlsx' })
}

export function exportTableToExcel(options: { filename: string; sheetName?: string; columns: ExcelColumn[]; rows: readonly object[] }) {
    try {
        downloadExcel(options)
        toast.success('已导出 Excel', { description: `${options.rows.length} 条` })
    } catch (err) {
        toast.error('导出失败', { description: err instanceof Error && err.message ? err.message : String(err || '未知错误') })
    }
}
