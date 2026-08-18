import { useEffect, useMemo, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { format } from 'date-fns'

import { DetailSection } from '@/components/bill-detail'
import { type DataTableFeatures } from '@/components/data-table-features'
import { DataToolbar } from '@/components/data-toolbar'
import { OrgSelectField } from '@/components/org-select-field'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { exportTableToExcel } from '@/lib/excel'
import { NAV_LABEL } from '@/lib/nav'
import { as_number, as_string, get_err_message, type FetchStatus } from '@/lib/utils'
import { type BillAddRow, type BillRow as DjConfigBillRow } from '@/lib/api/djconfig_type'
import { fetch_data } from '@/lib/api/djconfig_select'
import { add_data } from '@/lib/api/djconfig_add'
import { delete_data } from '@/lib/api/djconfig_delete'
import { push_data } from '@/lib/api/djconfig_push'
import { pull_data } from '@/lib/api/djconfig_pull'
import { calculate_quarterly_cxzy_eval, calculate_quarterly_party_eval, DuplicateOrgConfigError, SubmittedPeriodBillError, TiedScoreEvalError, quarter_key, type EvalBill } from '@/lib/calc_quarterly_eval'
import { toast } from 'sonner'

// 解析后的单据分录
type ParseBillEntry = {
    item_name: string
    item_score: number
}
// 解析后的单据行
type ParseBillRow = {
    id: string
    billno: string
    billstatus_title: string
    auditdate: string | null
    modifytime: string
    createtime: string

    entry: ParseBillEntry[]
    party_name: string
    year: string
    quarter: string
    party_score: number
    party_evaluation: string
    administrative_evaluation: string
    cxzy_evaluation: string
}

const columnHelper = createColumnHelper<DataTableFeatures, ParseBillRow>()
const quarterlyColumns = columnHelper.columns([
    columnHelper.accessor('billno', {
        header: '单据编号',
    }),
    columnHelper.accessor('billstatus_title', {
        header: '单据状态',
        cell: ({ getValue }) => {
            const status = getValue()
            if (status === '暂存') {
                return (
                    <Badge variant="outline" className="border-primary/40 text-primary bg-primary/5">
                        {status}
                    </Badge>
                )
            }
            return <Badge variant="default">{status}</Badge>
        },
    }),
    columnHelper.accessor('party_name', {
        header: '所属党组织',
    }),
    columnHelper.accessor('year', {
        header: '年份',
    }),
    columnHelper.accessor('quarter', {
        header: '季度',
    }),
    columnHelper.accessor('party_score', {
        header: () => <div className="text-right">党群绩效得分</div>,
        cell: ({ getValue }) => <div className="text-right">{getValue()}</div>,
    }),
    columnHelper.accessor('party_evaluation', {
        header: '党群绩效评价',
    }),
    columnHelper.accessor('administrative_evaluation', {
        header: '行政绩效评价',
    }),
    columnHelper.accessor('cxzy_evaluation', {
        header: '创先争优评价',
    }),
    columnHelper.accessor('auditdate', {
        header: '审核日期',
        cell: ({ getValue }) => getValue() || '-',
    }),
    columnHelper.accessor('createtime', {
        header: '创建时间',
    }),
    columnHelper.accessor('modifytime', {
        header: '修改时间',
    }),
])

const PARSE_BILL_COLUMNS = [
    { key: 'billno', label: '单据编号' },
    { key: 'billstatus_title', label: '单据状态' },
    { key: 'party_name', label: '所属党组织' },
    { key: 'year', label: '年份' },
    { key: 'quarter', label: '季度' },
    { key: 'party_score', label: '党群绩效得分' },
    { key: 'party_evaluation', label: '党群绩效评价' },
    { key: 'administrative_evaluation', label: '行政绩效评价' },
    { key: 'cxzy_evaluation', label: '创先争优评价' },
    { key: 'auditdate', label: '审核日期' },
    { key: 'createtime', label: '创建时间' },
    { key: 'modifytime', label: '修改时间' },
] as const

function parse_entry(raw: unknown): ParseBillEntry[] {
    if (!Array.isArray(raw)) return []
    return raw.map((item) => {
        const row = item && typeof item === 'object' ? (item as Record<string, unknown>) : {}
        return {
            item_name: as_string(row.item_name),
            item_score: as_number(row.item_score),
        }
    })
}

function trans_data(source_data: DjConfigBillRow[]): ParseBillRow[] {
    return source_data.map((row) => {
        const tag = JSON.parse(row.crrc_largetextfield_tag) as Record<string, unknown>
        return {
            id: row.id,
            billno: row.billno,
            billstatus_title: row.billstatus_title,
            auditdate: row.auditdate,
            modifytime: row.modifytime,
            createtime: row.createtime,
            entry: parse_entry(tag.entry),
            party_name: as_string(tag.party_name),
            year: as_string(tag.year),
            quarter: as_string(tag.quarter),
            party_score: as_number(tag.party_score),
            party_evaluation: as_string(tag.party_evaluation),
            administrative_evaluation: as_string(tag.administrative_evaluation),
            cxzy_evaluation: as_string(tag.cxzy_evaluation),
        }
    })
}

type AddFormValues = {
    billno: string
    party_name: string
    year: string
    quarter: string
    party_score: string
    party_evaluation: string
    administrative_evaluation: string
    cxzy_evaluation: string
    entry: AddEntryRow[]
}

type AddEntryRow = {
    _rowId: string
    item_name: string
    item_score: string
}

function new_entry_row(): AddEntryRow {
    return { _rowId: `entry-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, item_name: '', item_score: '' }
}

const EMPTY_ADD_FORM: AddFormValues = {
    billno: '',
    party_name: '',
    year: '',
    quarter: '',
    party_score: '',
    party_evaluation: '',
    administrative_evaluation: '',
    cxzy_evaluation: '',
    entry: [],
}

const QUARTERS = ['第一季度', '第二季度', '第三季度', '第四季度'] as const
const QUARTERLY_BILL_TYPE = 'JDPJ'

function current_quarter(now = new Date()): (typeof QUARTERS)[number] {
    return QUARTERS[Math.floor(now.getMonth() / 3)]
}

function next_quarterly_billno(existing: string[], now = new Date()): string {
    const prefix = `${QUARTERLY_BILL_TYPE}-${format(now, 'yyyyMMdd')}-`
    let maxSerial = 0
    for (const billno of existing) {
        if (!billno.startsWith(prefix)) continue
        const serial = Number.parseInt(billno.slice(prefix.length), 10)
        if (Number.isFinite(serial) && serial > maxSerial) maxSerial = serial
    }
    return `${prefix}${String(maxSerial + 1).padStart(4, '0')}`
}

const YEARS = Array.from({ length: 2100 - 1970 + 1 }, (_, index) => String(1970 + index))

function is_number_text(value: string) {
    const text = value.trim()
    if (text === '') return true
    return Number.isFinite(Number(text))
}

function to_add_row(form: AddFormValues): BillAddRow {
    const tag = {
        entry: form.entry
            .filter((item) => item.item_name.trim() !== '' || item.item_score.trim() !== '')
            .map((item) => ({ item_name: item.item_name, item_score: as_number(item.item_score) })),
        party_name: form.party_name.trim(),
        year: form.year.trim(),
        quarter: form.quarter.trim(),
        party_score: as_number(form.party_score),
        party_evaluation: form.party_evaluation.trim(),
        administrative_evaluation: form.administrative_evaluation.trim(),
        cxzy_evaluation: form.cxzy_evaluation.trim(),
    }
    const json = JSON.stringify(tag)
    return {
        billno: form.billno.trim(),
        billstatus: 'A',
        crrc_textfield: '季度评价结果',
        crrc_largetextfield: json,
        crrc_largetextfield_tag: json,
    }
}

function bill_to_add_row(bill: EvalBill): BillAddRow {
    const tag = {
        entry: bill.entry,
        party_name: bill.party_name,
        year: bill.year,
        quarter: bill.quarter,
        party_score: bill.party_score,
        party_evaluation: bill.party_evaluation,
        administrative_evaluation: bill.administrative_evaluation,
        cxzy_evaluation: bill.cxzy_evaluation,
    }
    const json = JSON.stringify(tag)
    return {
        billno: bill.billno,
        billstatus: 'A',
        crrc_textfield: '季度评价结果',
        crrc_largetextfield: json,
        crrc_largetextfield_tag: json,
    }
}

function unique_periods(bills: ParseBillRow[]) {
    const seen = new Map<string, { year: string; quarter: string }>()
    for (const bill of bills) {
        const year = bill.year.trim()
        const quarter = bill.quarter.trim()
        const key = `${year}\0${quarter_key(quarter)}`
        if (!year || !quarter_key(quarter) || seen.has(key)) continue
        seen.set(key, { year, quarter })
    }
    return [...seen.values()]
}

function to_quarter_option(value: string): (typeof QUARTERS)[number] {
    const key = quarter_key(value)
    if (key === '1') return '第一季度'
    if (key === '2') return '第二季度'
    if (key === '3') return '第三季度'
    if (key === '4') return '第四季度'
    return current_quarter()
}

function bill_to_form(bill: ParseBillRow): AddFormValues {
    return {
        billno: bill.billno,
        party_name: bill.party_name,
        year: bill.year,
        quarter: bill.quarter,
        party_score: String(bill.party_score),
        party_evaluation: bill.party_evaluation,
        administrative_evaluation: bill.administrative_evaluation,
        cxzy_evaluation: bill.cxzy_evaluation,
        entry: bill.entry.length
            ? bill.entry.map((item) => ({
                _rowId: `entry-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                item_name: item.item_name,
                item_score: String(item.item_score),
            }))
            : [new_entry_row()],
    }
}

function QuarterlyBillForm({
    saving,
    existingBillnos,
    initial,
    onClose,
    onSubmit,
}: {
    saving: boolean
    existingBillnos: string[]
    initial: ParseBillRow | null
    onClose: () => void
    onSubmit: (form: AddFormValues) => void
}) {
    const [form, setForm] = useState<AddFormValues>(() =>
        initial
            ? bill_to_form(initial)
            : {
                ...EMPTY_ADD_FORM,
                billno: next_quarterly_billno(existingBillnos),
                year: String(new Date().getFullYear()),
                quarter: current_quarter(),
                entry: [new_entry_row()],
            },
    )
    const [selectedEntryId, setSelectedEntryId] = useState('')
    const [orgPickerOpen, setOrgPickerOpen] = useState(false)
    const addEntryHelper = useMemo(() => createColumnHelper<DataTableFeatures, AddEntryRow>(), [])
    const addEntryColumns = useMemo(
        () =>
            addEntryHelper.columns([
                addEntryHelper.accessor('item_name', {
                    header: '项点名称',
                    cell: ({ row }) => (
                        <Input
                            className="min-w-40"
                            placeholder="项点名称"
                            value={row.original.item_name}
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={(e) => e.stopPropagation()}
                            onFocus={() => setSelectedEntryId(row.original._rowId)}
                            onChange={(e) => {
                                const id = row.original._rowId
                                const value = e.target.value
                                setForm((prev) => ({
                                    ...prev,
                                    entry: prev.entry.map((item) => (item._rowId === id ? { ...item, item_name: value } : item)),
                                }))
                            }}
                        />
                    ),
                }),
                addEntryHelper.accessor('item_score', {
                    header: () => <div className="text-right">分数</div>,
                    cell: ({ row }) => (
                        <Input
                            className="ml-auto w-28 text-right"
                            placeholder="分数"
                            value={row.original.item_score}
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={(e) => e.stopPropagation()}
                            onFocus={() => setSelectedEntryId(row.original._rowId)}
                            onChange={(e) => {
                                const id = row.original._rowId
                                const value = e.target.value
                                setForm((prev) => ({
                                    ...prev,
                                    entry: prev.entry.map((item) => (item._rowId === id ? { ...item, item_score: value } : item)),
                                }))
                            }}
                        />
                    ),
                }),
            ]),
        [addEntryHelper],
    )

    function addEntry() {
        const row = new_entry_row()
        setForm((prev) => ({ ...prev, entry: [...prev.entry, row] }))
        setSelectedEntryId(row._rowId)
    }

    function removeEntry() {
        if (!selectedEntryId) {
            toast.error('请先选择一行项点')
            return
        }
        setForm((prev) => ({ ...prev, entry: prev.entry.filter((item) => item._rowId !== selectedEntryId) }))
        setSelectedEntryId('')
    }

    return (
        <Dialog
            open
            onOpenChange={(open) => {
                if (!open && orgPickerOpen) return
                if (!open && !saving) onClose()
            }}
        >
            <DialogContent className="flex max-h-[90vh] w-full flex-col gap-3 overflow-hidden sm:max-w-6xl" showCloseButton={!saving}>
                <DialogHeader>
                    <DialogTitle>{initial ? '修改季度评价结果' : '新增季度评价结果'}</DialogTitle>
                </DialogHeader>
                <FieldGroup className="grid grid-cols-4 gap-x-3 gap-y-2">
                    <Field className="min-w-0 gap-1">
                        <FieldLabel htmlFor="quarterly-billno">
                            单据编号<span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                            id="quarterly-billno"
                            required
                            aria-required
                            value={form.billno}
                            onChange={(e) => setForm((prev) => ({ ...prev, billno: e.target.value }))}
                        />
                    </Field>
                    <Field className="min-w-0 gap-1">
                        <FieldLabel htmlFor="quarterly-party-name">
                            所属党组织<span className="text-destructive">*</span>
                        </FieldLabel>
                        <OrgSelectField
                            id="quarterly-party-name"
                            value={form.party_name}
                            disabled={saving}
                            onChange={(name) => setForm((prev) => ({ ...prev, party_name: name }))}
                            onOpenChange={setOrgPickerOpen}
                        />
                    </Field>
                    <Field className="min-w-0 gap-1">
                        <FieldLabel>
                            年份<span className="text-destructive">*</span>
                        </FieldLabel>
                        <Select value={form.year} onValueChange={(value) => setForm((prev) => ({ ...prev, year: value ?? '' }))}>
                            <SelectTrigger className="h-7 w-full min-w-0" aria-required>
                                <SelectValue placeholder="请选择年份" />
                            </SelectTrigger>
                            <SelectContent align="start" alignItemWithTrigger={false}>
                                {YEARS.map((item) => (
                                    <SelectItem key={item} value={item}>
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Field>
                    <Field className="min-w-0 gap-1">
                        <FieldLabel>
                            季度<span className="text-destructive">*</span>
                        </FieldLabel>
                        <Select value={form.quarter} onValueChange={(value) => setForm((prev) => ({ ...prev, quarter: value ?? '' }))}>
                            <SelectTrigger className="h-7 w-full min-w-0" aria-required>
                                <SelectValue placeholder="请选择季度" />
                            </SelectTrigger>
                            <SelectContent align="start" alignItemWithTrigger={false}>
                                {QUARTERS.map((item) => (
                                    <SelectItem key={item} value={item}>
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Field>
                    <Field className="min-w-0 gap-1">
                        <FieldLabel>党群绩效得分</FieldLabel>
                        <Input value={form.party_score} onChange={(e) => setForm((prev) => ({ ...prev, party_score: e.target.value }))} />
                    </Field>
                    <Field className="min-w-0 gap-1">
                        <FieldLabel>党群绩效评价</FieldLabel>
                        <Input value={form.party_evaluation} onChange={(e) => setForm((prev) => ({ ...prev, party_evaluation: e.target.value }))} />
                    </Field>
                    <Field className="min-w-0 gap-1">
                        <FieldLabel>行政绩效评价</FieldLabel>
                        <Input value={form.administrative_evaluation} onChange={(e) => setForm((prev) => ({ ...prev, administrative_evaluation: e.target.value }))} />
                    </Field>
                    <Field className="min-w-0 gap-1">
                        <FieldLabel>创先争优评价</FieldLabel>
                        <Input value={form.cxzy_evaluation} onChange={(e) => setForm((prev) => ({ ...prev, cxzy_evaluation: e.target.value }))} />
                    </Field>
                </FieldGroup>
                <DetailSection
                    title="评价项点"
                    className="min-h-0 flex-1"
                    extra={
                        <div className="flex items-center gap-2">
                            <Button type="button" variant="outline" size="lg" onClick={addEntry}>
                                增行
                            </Button>
                            <Button type="button" variant="outline" size="lg" disabled={!selectedEntryId} onClick={removeEntry}>
                                删行
                            </Button>
                        </div>
                    }
                >
                    <div className="min-h-56">
                        <DataTable
                            columns={addEntryColumns}
                            data={form.entry}
                            emptyText="暂无分录项点，请点击增行"
                            getRowId={(row) => row._rowId}
                            selectedRowId={selectedEntryId}
                            onRowSelect={(row) => setSelectedEntryId(row._rowId)}
                            selectTone="muted"
                        />
                    </div>
                </DetailSection>
                <DialogFooter>
                    <Button type="button" variant="outline" disabled={saving} onClick={onClose}>
                        取消
                    </Button>
                    <Button type="button" disabled={saving} onClick={() => onSubmit(form)}>
                        {saving ? '保存中…' : '保存'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export function QuarterlyView() {
    const [status, setStatus] = useState<FetchStatus>('idle')
    const [rows, setRows] = useState<ParseBillRow[]>([])
    const [error, setError] = useState('')
    const [selectedRowId, setSelectedRowId] = useState('')
    const [editingBill, setEditingBill] = useState<ParseBillRow | null>(null)
    const [formOpen, setFormOpen] = useState(false)
    const [saving, setSaving] = useState(false)
    const [calculating, setCalculating] = useState(false)
    const [deleteTarget, setDeleteTarget] = useState<ParseBillRow | null>(null)
    const [pushTarget, setPushTarget] = useState<ParseBillRow | null>(null)
    const [pullTarget, setPullTarget] = useState<ParseBillRow | null>(null)
    const [calcPeriodOpen, setCalcPeriodOpen] = useState(false)
    const [calcKind, setCalcKind] = useState<'eval' | 'cxzy'>('eval')
    const [calcYear, setCalcYear] = useState('')
    const [calcQuarter, setCalcQuarter] = useState('')

    async function run(force: boolean) {
        setStatus('loading')
        setError('')
        try {
            const data = force ? await fetch_data({ force: true }) : await fetch_data()
            const filtered_data = data.filter((row) => row.crrc_textfield === '季度评价结果')
            setRows(trans_data(filtered_data))
            setStatus('ready')
        } catch (err) {
            setError(get_err_message(err))
            setStatus('error')
        }
    }

    useEffect(() => {
        void run(false)
    }, [])

    function openAddForm() {
        setEditingBill(null)
        setFormOpen(true)
    }

    function openEditForm(bill: ParseBillRow) {
        setSelectedRowId(bill.id)
        setEditingBill(bill)
        setFormOpen(true)
    }

    function closeForm() {
        if (saving) return
        setFormOpen(false)
        setEditingBill(null)
    }

    async function handleSave(form: AddFormValues) {
        if (!form.billno.trim()) {
            toast.warning('必填项没填写', { description: '单据编号' })
            return
        }
        if (!form.party_name.trim()) {
            toast.warning('必填项没填写', { description: '所属党组织' })
            return
        }
        if (!form.year.trim()) {
            toast.warning('必填项没填写', { description: '年份' })
            return
        }
        if (!form.quarter.trim()) {
            toast.warning('必填项没填写', { description: '季度' })
            return
        }
        if (!is_number_text(form.party_score)) {
            toast.warning('数据格式不正确', { description: '党群绩效得分必须是数字' })
            return
        }
        if (form.entry.some((item) => !is_number_text(item.item_score))) {
            toast.warning('数据格式不正确', { description: '项点分数必须是数字' })
            return
        }
        const isEdit = !!editingBill
        setSaving(true)
        try {
            if (editingBill) {
                await delete_data(editingBill.billno)
            }
            await add_data(to_add_row(form))
            toast.success(isEdit ? '修改成功' : '新增成功')
            setFormOpen(false)
            setEditingBill(null)
            await run(true)
        } catch (err) {
            toast.error(isEdit ? '修改失败' : '新增失败', { description: get_err_message(err) })
        } finally {
            setSaving(false)
        }
    }

    function requestDelete() {
        const target = rows.find((row) => row.id === selectedRowId)
        if (!target) {
            toast.error('请先选择一行')
            return
        }
        setDeleteTarget(target)
    }

    async function confirmDelete() {
        if (!deleteTarget) return
        setSaving(true)
        try {
            await delete_data(deleteTarget.billno)
            toast.success('删除成功')
            setDeleteTarget(null)
            setFormOpen(false)
            setEditingBill(null)
            setSelectedRowId('')
            await run(true)
        } catch (err) {
            toast.error('删除失败', { description: get_err_message(err) })
        } finally {
            setSaving(false)
        }
    }

    function requestPush() {
        const target = rows.find((row) => row.id === selectedRowId)
        if (!target) {
            toast.error('请先选择一行')
            return
        }
        setPushTarget(target)
    }

    async function confirmPush() {
        if (!pushTarget) return
        setSaving(true)
        try {
            await push_data(pushTarget.billno)
            toast.success('提交成功')
            setPushTarget(null)
            setFormOpen(false)
            setEditingBill(null)
            await run(true)
        } catch (err) {
            toast.error('提交失败', { description: get_err_message(err) })
        } finally {
            setSaving(false)
        }
    }

    function requestPull() {
        const target = rows.find((row) => row.id === selectedRowId)
        if (!target) {
            toast.error('请先选择一行')
            return
        }
        setPullTarget(target)
    }

    async function confirmPull() {
        if (!pullTarget) return
        setSaving(true)
        try {
            await pull_data(pullTarget.billno)
            toast.success('撤销成功')
            setPullTarget(null)
            setFormOpen(false)
            setEditingBill(null)
            await run(true)
        } catch (err) {
            toast.error('撤销失败', { description: get_err_message(err) })
        } finally {
            setSaving(false)
        }
    }

    function requestCalcEval() {
        const drafts = rows.filter((row) => row.billstatus_title === '暂存')
        const periods = unique_periods(drafts)
        const period = periods.length === 1 ? periods[0] : null
        setCalcYear(period?.year || String(new Date().getFullYear()))
        setCalcQuarter(period ? to_quarter_option(period.quarter) : current_quarter())
        setFormOpen(false)
        setEditingBill(null)
        setCalcKind('eval')
        setCalcPeriodOpen(true)
    }

    function requestCalcCxzy() {
        setCalcYear(String(new Date().getFullYear()))
        setCalcQuarter(current_quarter())
        setFormOpen(false)
        setEditingBill(null)
        setCalcKind('cxzy')
        setCalcPeriodOpen(true)
    }

    async function confirmCalcEval() {
        if (!calcYear.trim()) {
            toast.warning('请选择年份')
            return
        }
        if (!calcQuarter.trim()) {
            toast.warning('请选择季度')
            return
        }
        const year = calcYear.trim()
        const quarter = calcQuarter.trim()
        setCalcPeriodOpen(false)
        setCalculating(true)
        const toastId = toast.loading(`正在计算${year}${quarter}绩效评价结果`)
        try {
            const { bills, delete_billnos } = await calculate_quarterly_party_eval(year, quarter)
            if (!bills.length) {
                toast.warning('没有可计算的党组织', { id: toastId })
                return
            }
            for (const billno of delete_billnos) {
                await delete_data(billno)
            }
            await add_data(bills.map(bill_to_add_row))
            toast.success('计算绩效评价结果完成', { id: toastId })
            await run(true)
        } catch (err) {
            if (err instanceof DuplicateOrgConfigError) {
                toast.warning(err.message, { id: toastId })
                return
            }
            if (err instanceof TiedScoreEvalError) {
                toast.warning('无法计算', { id: toastId })
                return
            }
            toast.error('计算绩效评价结果失败', { id: toastId, description: get_err_message(err) })
        } finally {
            setCalculating(false)
        }
    }

    async function confirmCalcCxzy() {
        if (!calcYear.trim()) {
            toast.warning('请选择年份')
            return
        }
        if (!calcQuarter.trim()) {
            toast.warning('请选择季度')
            return
        }
        const year = calcYear.trim()
        const quarter = calcQuarter.trim()
        setCalcPeriodOpen(false)
        setCalculating(true)
        const toastId = toast.loading(`正在计算${year}${quarter}创先争优结果`)
        try {
            const { bills, delete_billnos } = await calculate_quarterly_cxzy_eval(year, quarter)
            for (const billno of delete_billnos) {
                await delete_data(billno)
            }
            if (bills.length) {
                await add_data(bills.map(bill_to_add_row))
            }
            toast.success('计算创先争优结果完成', { id: toastId })
            await run(true)
        } catch (err) {
            if (err instanceof SubmittedPeriodBillError) {
                toast.error(err.message, { id: toastId })
                return
            }
            toast.error('计算创先争优结果失败', { id: toastId, description: get_err_message(err) })
        } finally {
            setCalculating(false)
        }
    }

    const loading = status === 'loading' || saving || calculating
    const emptyText = status === 'loading' ? '正在加载季度评价结果…' : status === 'error' ? error || '加载失败' : '暂无季度评价结果'

    return (
        <div className="relative flex min-h-0 flex-1 flex-col gap-2.5">
            <div className="relative flex min-h-0 flex-1 flex-col">
                <DataTable
                    columns={quarterlyColumns}
                    data={rows}
                    emptyText={emptyText}
                    getRowId={(row) => row.id}
                    selectedRowId={selectedRowId}
                    onRowSelect={(row) => setSelectedRowId(row.id)}
                    onRowOpen={(row) => openEditForm(row)}
                    enableSelectColumn
                    enableSearch
                    toolbar={
                        <DataToolbar
                            actions={[
                                { key: 'refresh', label: status === 'loading' ? '加载中…' : '刷新', variant: 'default', disabled: loading },
                                { key: 'new', label: '新增', variant: 'default' as const, disabled: loading },
                                { key: 'del', label: saving ? '删除中…' : '删除', disabled: loading },
                                { key: 'push', label: saving ? '提交中…' : '提交', disabled: loading },
                                { key: 'pull', label: saving ? '撤销中…' : '撤销', disabled: loading },
                                { key: 'calc-eval', label: calculating && calcKind === 'eval' ? '计算中…' : '计算绩效评价结果', disabled: loading },
                                { key: 'calc-excellence', label: calculating && calcKind === 'cxzy' ? '计算中…' : '计算创先争优结果', disabled: loading },
                                { key: 'export', label: '导出', disabled: loading },
                            ]}
                            onAction={(key) => {
                                if (key === 'refresh') void run(true)
                                if (key === 'new') openAddForm()
                                if (key === 'del') requestDelete()
                                if (key === 'push') requestPush()
                                if (key === 'pull') requestPull()
                                if (key === 'calc-eval') requestCalcEval()
                                if (key === 'calc-excellence') requestCalcCxzy()
                                if (key !== 'export') return
                                exportTableToExcel({
                                    filename: NAV_LABEL.quarterly,
                                    columns: PARSE_BILL_COLUMNS.map((col) => ({ key: col.key, label: col.label })),
                                    rows,
                                })
                            }}
                        />
                    }
                />
            </div>
            {formOpen ? (
                <QuarterlyBillForm
                    key={editingBill?.id ?? 'new'}
                    saving={saving}
                    existingBillnos={rows.map((row) => row.billno)}
                    initial={editingBill}
                    onClose={closeForm}
                    onSubmit={(form) => void handleSave(form)}
                />
            ) : null}
            <AlertDialog
                open={!!deleteTarget}
                onOpenChange={(open) => {
                    if (!open && !saving) setDeleteTarget(null)
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>确定删除？</AlertDialogTitle>
                        <AlertDialogDescription>将删除单据「{deleteTarget?.billno || '-'}」，此操作不可撤销。</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={saving}>取消</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" disabled={saving} onClick={() => void confirmDelete()}>
                            {saving ? '删除中…' : '删除'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Dialog
                open={calcPeriodOpen}
                onOpenChange={(open) => {
                    if (!open && !calculating) setCalcPeriodOpen(false)
                }}
            >
                <DialogContent className="sm:max-w-md" showCloseButton={!calculating}>
                    <DialogHeader>
                        <DialogTitle>{calcKind === 'cxzy' ? '计算创先争优结果' : '计算绩效评价结果'}</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">请确认要计算的年份和季度。</p>
                    <FieldGroup className="grid grid-cols-2 gap-3">
                        <Field className="min-w-0 gap-1">
                            <FieldLabel>
                                年份<span className="text-destructive">*</span>
                            </FieldLabel>
                            <Select value={calcYear} onValueChange={(value) => setCalcYear(value ?? '')}>
                                <SelectTrigger className="h-7 w-full min-w-0" aria-required>
                                    <SelectValue placeholder="请选择年份" />
                                </SelectTrigger>
                                <SelectContent align="start" alignItemWithTrigger={false}>
                                    {YEARS.map((item) => (
                                        <SelectItem key={item} value={item}>
                                            {item}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field className="min-w-0 gap-1">
                            <FieldLabel>
                                季度<span className="text-destructive">*</span>
                            </FieldLabel>
                            <Select value={calcQuarter} onValueChange={(value) => setCalcQuarter(value ?? '')}>
                                <SelectTrigger className="h-7 w-full min-w-0" aria-required>
                                    <SelectValue placeholder="请选择季度" />
                                </SelectTrigger>
                                <SelectContent align="start" alignItemWithTrigger={false}>
                                    {QUARTERS.map((item) => (
                                        <SelectItem key={item} value={item}>
                                            {item}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <Button type="button" variant="outline" disabled={calculating} onClick={() => setCalcPeriodOpen(false)}>
                            取消
                        </Button>
                        <Button type="button" disabled={calculating} onClick={() => void (calcKind === 'cxzy' ? confirmCalcCxzy() : confirmCalcEval())}>
                            {calculating ? '计算中…' : '开始计算'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <AlertDialog
                open={!!pushTarget}
                onOpenChange={(open) => {
                    if (!open && !saving) setPushTarget(null)
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>确定提交？</AlertDialogTitle>
                        <AlertDialogDescription>将提交单据「{pushTarget?.billno || '-'}」。</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={saving}>取消</AlertDialogCancel>
                        <AlertDialogAction disabled={saving} onClick={() => void confirmPush()}>
                            {saving ? '提交中…' : '提交'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog
                open={!!pullTarget}
                onOpenChange={(open) => {
                    if (!open && !saving) setPullTarget(null)
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>确定撤销？</AlertDialogTitle>
                        <AlertDialogDescription>将撤销单据「{pullTarget?.billno || '-'}」。</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={saving}>取消</AlertDialogCancel>
                        <AlertDialogAction disabled={saving} onClick={() => void confirmPull()}>
                            {saving ? '撤销中…' : '撤销'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
