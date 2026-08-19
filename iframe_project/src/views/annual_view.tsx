import { useCallback, useEffect, useMemo, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { format } from 'date-fns'

import { AdminEvalCell } from '@/components/admin-eval-cell'
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
import { calculate_annual_cxzy_eval, calculate_annual_party_eval, calculate_annual_party_score, DuplicateOrgConfigError, SubmittedPeriodBillError, type EvalBill } from '@/lib/calc_quarterly_eval'
import { toast } from 'sonner'

type ParseBillEntry = {
    item_name: string
    item_score: number
}

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
    party_score: number
    party_evaluation: string
    administrative_evaluation: string
    cxzy_evaluation: string
}

function is_draft_bill(bill: ParseBillRow) {
    return bill.billstatus_title === '暂存'
}

const columnHelper = createColumnHelper<DataTableFeatures, ParseBillRow>()

function make_annual_columns(onCommitAdmin: (bill: ParseBillRow, next: string) => Promise<void>) {
    return columnHelper.columns([
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
        columnHelper.accessor('party_score', {
            header: () => <div className="text-right">党群绩效得分</div>,
            cell: ({ getValue }) => <div className="text-right">{getValue()}</div>,
        }),
        columnHelper.accessor('party_evaluation', {
            header: '党群绩效评价',
        }),
        columnHelper.accessor('administrative_evaluation', {
            header: '行政绩效评价',
            cell: ({ row }) =>
                is_draft_bill(row.original) ? (
                    <AdminEvalCell value={row.original.administrative_evaluation} onCommit={(next) => onCommitAdmin(row.original, next)} />
                ) : (
                    row.original.administrative_evaluation
                ),
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
}

const PARSE_BILL_COLUMNS = [
    { key: 'billno', label: '单据编号' },
    { key: 'billstatus_title', label: '单据状态' },
    { key: 'party_name', label: '所属党组织' },
    { key: 'year', label: '年份' },
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
    party_score: '',
    party_evaluation: '',
    administrative_evaluation: '',
    cxzy_evaluation: '',
    entry: [],
}

const ANNUAL_BILL_TYPE = 'NDPJ'
const YEARS = Array.from({ length: 2100 - 1970 + 1 }, (_, index) => String(1970 + index))

function next_annual_billno(existing: string[], now = new Date()): string {
    const prefix = `${ANNUAL_BILL_TYPE}-${format(now, 'yyyyMMdd')}-`
    let maxSerial = 0
    for (const billno of existing) {
        if (!billno.startsWith(prefix)) continue
        const serial = Number.parseInt(billno.slice(prefix.length), 10)
        if (Number.isFinite(serial) && serial > maxSerial) maxSerial = serial
    }
    return `${prefix}${String(maxSerial + 1).padStart(4, '0')}`
}

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
        party_score: as_number(form.party_score),
        party_evaluation: form.party_evaluation.trim(),
        administrative_evaluation: form.administrative_evaluation.trim(),
        cxzy_evaluation: form.cxzy_evaluation.trim(),
    }
    const json = JSON.stringify(tag)
    return {
        billno: form.billno.trim(),
        billstatus: 'A',
        crrc_textfield: '年度评价结果',
        crrc_largetextfield: form.party_name.trim() || form.billno.trim(),
        crrc_largetextfield_tag: json,
    }
}

function bill_to_add_row(bill: EvalBill): BillAddRow {
    const tag = {
        entry: bill.entry,
        party_name: bill.party_name,
        year: bill.year,
        party_score: bill.party_score,
        party_evaluation: bill.party_evaluation,
        administrative_evaluation: bill.administrative_evaluation,
        cxzy_evaluation: bill.cxzy_evaluation,
    }
    const json = JSON.stringify(tag)
    return {
        billno: bill.billno,
        billstatus: 'A',
        crrc_textfield: '年度评价结果',
        crrc_largetextfield: bill.party_name.trim() || bill.billno,
        crrc_largetextfield_tag: json,
    }
}

function parse_row_to_add_row(bill: ParseBillRow): BillAddRow {
    const tag = {
        entry: bill.entry,
        party_name: bill.party_name,
        year: bill.year,
        party_score: bill.party_score,
        party_evaluation: bill.party_evaluation,
        administrative_evaluation: bill.administrative_evaluation,
        cxzy_evaluation: bill.cxzy_evaluation,
    }
    return {
        billno: bill.billno,
        billstatus: 'A',
        crrc_textfield: '年度评价结果',
        crrc_largetextfield: bill.party_name.trim() || bill.billno,
        crrc_largetextfield_tag: JSON.stringify(tag),
    }
}

function bill_to_form(bill: ParseBillRow): AddFormValues {
    return {
        billno: bill.billno,
        party_name: bill.party_name,
        year: bill.year,
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

function AnnualBillForm({
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
                billno: next_annual_billno(existingBillnos),
                year: String(new Date().getFullYear()),
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

    function sumEntry() {
        setForm((prev) => ({
            ...prev,
            party_score: String(prev.entry.reduce((sum, item) => sum + as_number(item.item_score), 0)),
        }))
    }

    return (
        <Dialog
            open
            onOpenChange={(open) => {
                if (!open && orgPickerOpen) return
                if (!open && !saving) onClose()
            }}
        >
            <DialogContent className="flex h-[90vh] max-h-[90vh] w-full flex-col gap-3 overflow-hidden sm:max-w-6xl" showCloseButton={!saving}>
                <DialogHeader className="shrink-0">
                    <DialogTitle>{initial ? '修改年度评价结果' : '新增年度评价结果'}</DialogTitle>
                </DialogHeader>
                <FieldGroup className="grid shrink-0 grid-cols-4 gap-x-3 gap-y-2">
                    <Field className="min-w-0 gap-1">
                        <FieldLabel htmlFor="annual-billno">
                            单据编号<span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                            id="annual-billno"
                            required
                            aria-required
                            value={form.billno}
                            onChange={(e) => setForm((prev) => ({ ...prev, billno: e.target.value }))}
                        />
                    </Field>
                    <Field className="min-w-0 gap-1">
                        <FieldLabel htmlFor="annual-party-name">
                            所属党组织<span className="text-destructive">*</span>
                        </FieldLabel>
                        <OrgSelectField
                            id="annual-party-name"
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
                            <Button type="button" variant="outline" size="lg" onClick={sumEntry}>
                                求和
                            </Button>
                        </div>
                    }
                >
                    <div className="min-h-0 flex-1 overflow-hidden">
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
                <DialogFooter className="shrink-0">
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

export function AnnualView() {
    const [status, setStatus] = useState<FetchStatus>('idle')
    const [rows, setRows] = useState<ParseBillRow[]>([])
    const [error, setError] = useState('')
    const [selectedRowIds, setSelectedRowIds] = useState<string[]>([])
    const [editingBill, setEditingBill] = useState<ParseBillRow | null>(null)
    const [formOpen, setFormOpen] = useState(false)
    const [saving, setSaving] = useState(false)
    const [deleteTarget, setDeleteTarget] = useState<ParseBillRow[]>([])
    const [pushTarget, setPushTarget] = useState<ParseBillRow[]>([])
    const [pullTarget, setPullTarget] = useState<ParseBillRow[]>([])
    const [calculating, setCalculating] = useState(false)
    const [calcKind, setCalcKind] = useState<'score' | 'eval' | 'cxzy'>('score')
    const [calcYearOpen, setCalcYearOpen] = useState(false)
    const [calcYear, setCalcYear] = useState('')

    async function run(force: boolean) {
        setStatus('loading')
        setError('')
        try {
            const data = force ? await fetch_data({ force: true }) : await fetch_data()
            const filtered_data = data.filter((row) => row.crrc_textfield === '年度评价结果')
            setRows(trans_data(filtered_data))
            setSelectedRowIds([])
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
        setEditingBill(bill)
        setFormOpen(true)
    }

    const saveAdminEval = useCallback(async (bill: ParseBillRow, next: string) => {
        if (!is_draft_bill(bill)) {
            toast.warning('已提交单据不能修改')
            throw new Error('已提交单据不能修改')
        }
        try {
            await delete_data(bill.billno)
            await add_data(parse_row_to_add_row({ ...bill, administrative_evaluation: next }))
            setRows((prev) => prev.map((row) => (row.billno === bill.billno ? { ...row, administrative_evaluation: next } : row)))
            toast.success('行政绩效评价已保存')
        } catch (err) {
            toast.error('保存行政绩效评价失败', { description: get_err_message(err) })
            throw err
        }
    }, [])

    const annualColumns = useMemo(() => make_annual_columns(saveAdminEval), [saveAdminEval])

    function selected_bills() {
        const ids = new Set(selectedRowIds)
        return rows.filter((row) => ids.has(row.id))
    }

    function bills_label(bills: ParseBillRow[]) {
        if (bills.length === 1) return `单据「${bills[0].billno}」`
        return `选中的 ${bills.length} 张单据`
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
        const targets = selected_bills()
        if (!targets.length) {
            toast.error('请先选择一行')
            return
        }
        setDeleteTarget(targets)
    }

    async function confirmDelete() {
        if (!deleteTarget.length) return
        setSaving(true)
        try {
            for (const target of deleteTarget) {
                await delete_data(target.billno)
            }
            toast.success('删除成功')
            setDeleteTarget([])
            setFormOpen(false)
            setEditingBill(null)
            await run(true)
        } catch (err) {
            toast.error('删除失败', { description: get_err_message(err) })
        } finally {
            setSaving(false)
        }
    }

    function requestPush() {
        const targets = selected_bills()
        if (!targets.length) {
            toast.error('请先选择一行')
            return
        }
        setPushTarget(targets)
    }

    async function confirmPush() {
        if (!pushTarget.length) return
        setSaving(true)
        try {
            for (const target of pushTarget) {
                await push_data(target.billno)
            }
            toast.success('提交成功')
            setPushTarget([])
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
        const targets = selected_bills()
        if (!targets.length) {
            toast.error('请先选择一行')
            return
        }
        setPullTarget(targets)
    }

    async function confirmPull() {
        if (!pullTarget.length) return
        setSaving(true)
        try {
            for (const target of pullTarget) {
                await pull_data(target.billno)
            }
            toast.success('撤销成功')
            setPullTarget([])
            setFormOpen(false)
            setEditingBill(null)
            await run(true)
        } catch (err) {
            toast.error('撤销失败', { description: get_err_message(err) })
        } finally {
            setSaving(false)
        }
    }

    function requestCalcScore() {
        setCalcYear(String(new Date().getFullYear()))
        setFormOpen(false)
        setEditingBill(null)
        setCalcKind('score')
        setCalcYearOpen(true)
    }

    function requestCalcEval() {
        setCalcYear(String(new Date().getFullYear()))
        setFormOpen(false)
        setEditingBill(null)
        setCalcKind('eval')
        setCalcYearOpen(true)
    }

    function requestCalcCxzy() {
        setCalcYear(String(new Date().getFullYear()))
        setFormOpen(false)
        setEditingBill(null)
        setCalcKind('cxzy')
        setCalcYearOpen(true)
    }

    async function confirmCalcScore() {
        if (!calcYear.trim()) {
            toast.warning('请选择年份')
            return
        }
        const year = calcYear.trim()
        setCalcYearOpen(false)
        setCalculating(true)
        const toastId = toast.loading(`正在计算${year}党群绩效得分`)
        try {
            const { bills, delete_billnos } = await calculate_annual_party_score(year)
            if (!bills.length) {
                toast.warning('没有可计算的党组织', { id: toastId })
                return
            }
            for (const billno of delete_billnos) {
                await delete_data(billno)
            }
            await add_data(bills.map(bill_to_add_row))
            toast.success('计算党群绩效得分完成', { id: toastId, description: `更新了 ${bills.length} 行数据` })
            await run(true)
        } catch (err) {
            if (err instanceof DuplicateOrgConfigError) {
                toast.warning(err.message, { id: toastId })
                return
            }
            toast.error('计算党群绩效得分失败', { id: toastId, description: get_err_message(err) })
        } finally {
            setCalculating(false)
        }
    }

    async function confirmCalcEval() {
        if (!calcYear.trim()) {
            toast.warning('请选择年份')
            return
        }
        const year = calcYear.trim()
        setCalcYearOpen(false)
        setCalculating(true)
        const toastId = toast.loading(`正在计算${year}绩效评价结果`)
        try {
            const { bills, delete_billnos, tied_reason } = await calculate_annual_party_eval(year)
            if (!bills.length) {
                toast.warning('没有可计算的党组织', { id: toastId })
                return
            }
            for (const billno of delete_billnos) {
                await delete_data(billno)
            }
            await add_data(bills.map(bill_to_add_row))
            if (tied_reason) {
                toast.warning('无法计算', { id: toastId, description: `${tied_reason} 更新了 ${bills.length} 行数据` })
            } else {
                toast.success('计算绩效评价结果完成', { id: toastId, description: `更新了 ${bills.length} 行数据` })
            }
            await run(true)
        } catch (err) {
            if (err instanceof DuplicateOrgConfigError) {
                toast.warning(err.message, { id: toastId })
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
        const year = calcYear.trim()
        setCalcYearOpen(false)
        setCalculating(true)
        const toastId = toast.loading(`正在计算${year}创先争优结果`)
        try {
            const { bills, delete_billnos } = await calculate_annual_cxzy_eval(year)
            for (const billno of delete_billnos) {
                await delete_data(billno)
            }
            if (bills.length) {
                await add_data(bills.map(bill_to_add_row))
            }
            toast.success('计算创先争优结果完成', { id: toastId, description: `更新了 ${bills.length} 行数据` })
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
    const emptyText = status === 'loading' ? '正在加载年度评价结果…' : status === 'error' ? error || '加载失败' : '暂无年度评价结果'

    return (
        <div className="relative flex min-h-0 flex-1 flex-col gap-2.5">
            <div className="relative flex min-h-0 flex-1 flex-col">
                <DataTable
                    columns={annualColumns}
                    data={rows}
                    emptyText={emptyText}
                    getRowId={(row) => row.id}
                    selectedRowIds={selectedRowIds}
                    onSelectedRowIdsChange={setSelectedRowIds}
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
                                { key: 'calc-score', label: calculating && calcKind === 'score' ? '计算中…' : '计算党群绩效得分', disabled: loading },
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
                                if (key === 'calc-score') requestCalcScore()
                                if (key === 'calc-eval') requestCalcEval()
                                if (key === 'calc-excellence') requestCalcCxzy()
                                if (key !== 'export') return
                                exportTableToExcel({
                                    filename: NAV_LABEL.annual,
                                    columns: PARSE_BILL_COLUMNS.map((col) => ({ key: col.key, label: col.label })),
                                    rows,
                                })
                            }}
                        />
                    }
                />
            </div>
            {formOpen ? (
                <AnnualBillForm
                    key={editingBill?.id ?? 'new'}
                    saving={saving}
                    existingBillnos={rows.map((row) => row.billno)}
                    initial={editingBill}
                    onClose={closeForm}
                    onSubmit={(form) => void handleSave(form)}
                />
            ) : null}
            <AlertDialog
                open={deleteTarget.length > 0}
                onOpenChange={(open) => {
                    if (!open && !saving) setDeleteTarget([])
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>确定删除？</AlertDialogTitle>
                        <AlertDialogDescription>将删除{bills_label(deleteTarget)}，此操作不可撤销。</AlertDialogDescription>
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
                open={calcYearOpen}
                onOpenChange={(open) => {
                    if (!open && !calculating) setCalcYearOpen(false)
                }}
            >
                <DialogContent className="sm:max-w-md" showCloseButton={!calculating}>
                    <DialogHeader>
                        <DialogTitle>
                            {calcKind === 'score' ? '计算党群绩效得分' : calcKind === 'eval' ? '计算绩效评价结果' : '计算创先争优结果'}
                        </DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">请确认要计算的年份。</p>
                    <FieldGroup>
                        <Field className="min-w-0 gap-1">
                            <FieldLabel>
                                年份<span className="text-destructive">*</span>
                            </FieldLabel>
                            <Select value={calcYear} onValueChange={(value) => setCalcYear(value ?? '')}>
                                <SelectTrigger className="h-7 w-full min-w-0" aria-required>
                                    <SelectValue placeholder="请选择年份" />
                                </SelectTrigger>
                                <SelectContent align="start" alignItemWithTrigger={false} className="max-h-60 overflow-y-auto">
                                    {YEARS.map((item) => (
                                        <SelectItem key={item} value={item}>
                                            {item}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <Button type="button" variant="outline" disabled={calculating} onClick={() => setCalcYearOpen(false)}>
                            取消
                        </Button>
                        <Button
                            type="button"
                            disabled={calculating}
                            onClick={() => void (calcKind === 'score' ? confirmCalcScore() : calcKind === 'eval' ? confirmCalcEval() : confirmCalcCxzy())}
                        >
                            {calculating ? '计算中…' : '开始计算'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <AlertDialog
                open={pushTarget.length > 0}
                onOpenChange={(open) => {
                    if (!open && !saving) setPushTarget([])
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>确定提交？</AlertDialogTitle>
                        <AlertDialogDescription>将提交{bills_label(pushTarget)}。</AlertDialogDescription>
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
                open={pullTarget.length > 0}
                onOpenChange={(open) => {
                    if (!open && !saving) setPullTarget([])
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>确定撤销？</AlertDialogTitle>
                        <AlertDialogDescription>将撤销{bills_label(pullTarget)}。</AlertDialogDescription>
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
