import { useEffect, useMemo, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { format } from 'date-fns'

import { DetailSection } from '@/components/bill-detail'
import { type DataTableFeatures } from '@/components/data-table-features'
import { DataToolbar } from '@/components/data-toolbar'
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

const columnHelper = createColumnHelper<DataTableFeatures, ParseBillRow>()
const annualColumns = columnHelper.columns([
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
        crrc_largetextfield: json,
        crrc_largetextfield_tag: json,
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
                if (!open && !saving) onClose()
            }}
        >
            <DialogContent className="flex max-h-[90vh] w-full flex-col gap-3 overflow-hidden sm:max-w-6xl" showCloseButton={!saving}>
                <DialogHeader>
                    <DialogTitle>{initial ? '修改年度评价结果' : '新增年度评价结果'}</DialogTitle>
                </DialogHeader>
                <FieldGroup className="grid grid-cols-4 gap-x-3 gap-y-2">
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
                        <Input
                            id="annual-party-name"
                            required
                            aria-required
                            value={form.party_name}
                            onChange={(e) => setForm((prev) => ({ ...prev, party_name: e.target.value }))}
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

export function AnnualView() {
    const [status, setStatus] = useState<FetchStatus>('idle')
    const [rows, setRows] = useState<ParseBillRow[]>([])
    const [error, setError] = useState('')
    const [selectedRowId, setSelectedRowId] = useState('')
    const [editingBill, setEditingBill] = useState<ParseBillRow | null>(null)
    const [formOpen, setFormOpen] = useState(false)
    const [saving, setSaving] = useState(false)
    const [deleteTarget, setDeleteTarget] = useState<ParseBillRow | null>(null)

    async function run(force: boolean) {
        setStatus('loading')
        setError('')
        try {
            const data = force ? await fetch_data({ force: true }) : await fetch_data()
            const filtered_data = data.filter((row) => row.crrc_textfield === '年度评价结果')
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

    const loading = status === 'loading' || saving
    const emptyText = status === 'loading' ? '正在加载年度评价结果…' : status === 'error' ? error || '加载失败' : '暂无年度评价结果'

    return (
        <div className="relative flex min-h-0 flex-1 flex-col gap-2.5">
            <DataToolbar
                actions={[
                    { key: 'refresh', label: status === 'loading' ? '加载中…' : '刷新', variant: 'default', disabled: loading },
                    { key: 'new', label: '新增', variant: 'default' as const, disabled: loading },
                    { key: 'del', label: saving ? '删除中…' : '删除', disabled: loading },
                    { key: 'calc-score', label: '计算绩效得分', disabled: loading },
                    { key: 'calc-eval', label: '计算绩效评价结果', disabled: loading },
                    { key: 'calc-excellence', label: '计算创先争优结果', disabled: loading },
                    { key: 'export', label: '导出', disabled: loading },
                ]}
                onAction={(key) => {
                    if (key === 'refresh') void run(true)
                    if (key === 'new') openAddForm()
                    if (key === 'del') requestDelete()
                    if (key !== 'export') return
                    exportTableToExcel({
                        filename: NAV_LABEL.annual,
                        columns: PARSE_BILL_COLUMNS.map((col) => ({ key: col.key, label: col.label })),
                        rows,
                    })
                }}
            />
            <div className="relative flex min-h-0 flex-1 flex-col">
                <DataTable
                    columns={annualColumns}
                    data={rows}
                    emptyText={emptyText}
                    getRowId={(row) => row.id}
                    selectedRowId={selectedRowId}
                    onRowSelect={(row) => openEditForm(row)}
                    enableSearch
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
        </div>
    )
}
