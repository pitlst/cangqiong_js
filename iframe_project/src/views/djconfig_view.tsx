import { useEffect, useMemo, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { format } from 'date-fns'
import { toast } from 'sonner'

import { type DataTableFeatures } from '@/components/data-table-features'
import { DataToolbar } from '@/components/data-toolbar'
import { OrgTree } from '@/components/org-tree'
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
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { add_data } from '@/lib/api/djconfig_add'
import { delete_data } from '@/lib/api/djconfig_delete'
import { push_data } from '@/lib/api/djconfig_push'
import { fetch_data } from '@/lib/api/djconfig_select'
import { type BillAddRow, type BillRow as DjConfigBillRow } from '@/lib/api/djconfig_type'
import {
    ORG_ALL_ID,
    build_tree,
    fetch_data as fetch_org_data,
    filter_tree,
    find_path,
    flatten_tree,
    trans_data as trans_org_data,
    type OrgTreeNode,
} from '@/lib/api/org'
import { CONFIG_TYPE_NAME } from '@/lib/config'
import { exportTableToExcel } from '@/lib/excel'
import { NAV_LABEL } from '@/lib/nav'
import { as_number, as_string, get_err_message, type FetchStatus } from '@/lib/utils'

const CONFIG_TYPE_SET = new Set<string>(CONFIG_TYPE_NAME)
const CONFIG_BILL_TYPE = 'PZGL'
const PARTY_PERF_TYPES = new Set(['季度党群绩效评价规则', '年度党群绩效评价规则'])
const CXZY_TYPES = new Set(['季度创先争优评价规则', '年度创先争优评价规则'])
const GRASSROOTS_TYPES = new Set(['季度基层党组织创先争优评价项点', '年度基层党组织创先争优评价项点'])

function is_party_perf_type(type: string) {
    return PARTY_PERF_TYPES.has(type)
}

function is_cxzy_type(type: string) {
    return CXZY_TYPES.has(type)
}

function is_grassroots_type(type: string) {
    return GRASSROOTS_TYPES.has(type)
}

function party_eval_label(type: string) {
    return type.startsWith('年度') ? '年度党群评价' : '季度党群评价'
}

type ParseBillRow = {
    id: string
    billno: string
    billstatus: string
    billstatus_title: string
    auditdate: string | null
    modifytime: string
    createtime: string
    data_type: string
    config_name: string
    org_ids: string[]
    tag: Record<string, unknown>
}

type RuleItemRow = {
    _rowId: string
    name: string
    value: string
}

type CxzyRuleRow = {
    _rowId: string
    party_evaluation: string
    administrative_evaluation: string
    cxzy_evaluation: string
}

type EntryItemRow = {
    _rowId: string
    item_name: string
    item_score: string
}

type FormValues = {
    billno: string
    data_type: string
    config_name: string
    org_ids: string[]
    items: RuleItemRow[]
    cxzy_items: CxzyRuleRow[]
    entry_items: EntryItemRow[]
}

const columnHelper = createColumnHelper<DataTableFeatures, ParseBillRow>()

const configColumns = columnHelper.columns([
    columnHelper.accessor('billno', {
        header: '单据编号',
    }),
    columnHelper.accessor('billstatus_title', {
        header: '单据状态',
        cell: ({ getValue }) => {
            const status = getValue()
            if (status === '暂存') {
                return (
                    <Badge variant="outline" className="border-primary/40 bg-primary/5 text-primary">
                        {status}
                    </Badge>
                )
            }
            return <Badge variant="default">{status}</Badge>
        },
    }),
    columnHelper.accessor('data_type', {
        header: '数据类型',
    }),
    columnHelper.accessor('config_name', {
        header: '配置名称',
        cell: ({ getValue }) => getValue() || '-',
    }),
    columnHelper.accessor('createtime', {
        header: '创建时间',
    }),
    columnHelper.accessor('modifytime', {
        header: '修改时间',
    }),
    columnHelper.accessor('auditdate', {
        header: '审核时间',
        cell: ({ getValue }) => getValue() || '-',
    }),
])

const PARSE_BILL_COLUMNS = [
    { key: 'billno', label: '单据编号' },
    { key: 'billstatus_title', label: '单据状态' },
    { key: 'data_type', label: '数据类型' },
    { key: 'config_name', label: '配置名称' },
    { key: 'createtime', label: '创建时间' },
    { key: 'modifytime', label: '修改时间' },
    { key: 'auditdate', label: '审核时间' },
] as const

const EXPORT_TAG_SKIP_KEYS = new Set(['config_name'])

function extra_config_json(tag: Record<string, unknown>) {
    const extra: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(tag)) {
        if (EXPORT_TAG_SKIP_KEYS.has(key)) continue
        extra[key] = value
    }
    return JSON.stringify(extra)
}

function parse_tag(raw: string): Record<string, unknown> {
    try {
        const value = JSON.parse(raw) as unknown
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            return value as Record<string, unknown>
        }
    } catch {
        /* ignore */
    }
    return {}
}

function parse_org_ids(raw: unknown): string[] {
    if (!Array.isArray(raw)) return []
    return raw.map((item) => as_string(item)).filter(Boolean)
}

function new_rule_row(name = '', value = ''): RuleItemRow {
    return {
        _rowId: `rule-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name,
        value,
    }
}

function default_party_rule_items(): RuleItemRow[] {
    return [new_rule_row('A', '0.4'), new_rule_row('B', '0.4'), new_rule_row('C', '0.2'), new_rule_row('不评价', '0.0')]
}

function format_rule_value(value: number) {
    if (Number.isInteger(value)) return String(value)
    return String(Math.round(value * 1000) / 1000)
}

function parse_rule_items(raw: unknown): RuleItemRow[] {
    if (!Array.isArray(raw)) return []
    return raw.map((item) => {
        const row = item && typeof item === 'object' ? (item as Record<string, unknown>) : {}
        const name = as_string(row.name || row.label)
        let numeric: number | null = null
        if (row.value != null && row.value !== '') numeric = as_number(row.value)
        else if (row.percent != null && row.percent !== '') {
            const percent = as_number(row.percent)
            numeric = percent > 1 ? percent / 100 : percent
        }
        return new_rule_row(name, numeric == null ? '' : format_rule_value(numeric))
    })
}

function rule_items_sum(items: RuleItemRow[]) {
    return items.reduce((sum, item) => {
        const value = Number(item.value)
        return sum + (Number.isFinite(value) ? value : 0)
    }, 0)
}

function is_hundred_percent(sum: number) {
    return Math.abs(sum - 1) < 1e-6 || Math.abs(sum - 100) < 1e-6
}

function to_saved_rule_items(items: RuleItemRow[]) {
    const parsed = items.map((item) => ({ name: item.name.trim(), value: Number(item.value) }))
    const sum = parsed.reduce((total, item) => total + item.value, 0)
    if (Math.abs(sum - 100) < 1e-6) {
        return parsed.map((item) => ({ name: item.name, value: item.value / 100 }))
    }
    return parsed
}

function new_cxzy_row(party_evaluation = '', administrative_evaluation = '', cxzy_evaluation = ''): CxzyRuleRow {
    return {
        _rowId: `cxzy-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        party_evaluation,
        administrative_evaluation,
        cxzy_evaluation,
    }
}

function default_cxzy_rule_items(): CxzyRuleRow[] {
    return [new_cxzy_row('A', 'B', 'A')]
}

function parse_cxzy_items(raw: unknown): CxzyRuleRow[] {
    if (!Array.isArray(raw)) return []
    return raw.map((item) => {
        const row = item && typeof item === 'object' ? (item as Record<string, unknown>) : {}
        return new_cxzy_row(as_string(row.party_evaluation), as_string(row.administrative_evaluation), as_string(row.cxzy_evaluation))
    })
}

function to_saved_cxzy_items(items: CxzyRuleRow[]) {
    return items.map((item) => ({
        party_evaluation: item.party_evaluation.trim(),
        administrative_evaluation: item.administrative_evaluation.trim(),
        cxzy_evaluation: item.cxzy_evaluation.trim(),
    }))
}

function has_duplicate_cxzy_pair(items: CxzyRuleRow[]) {
    const seen = new Set<string>()
    for (const item of items) {
        const key = `${item.party_evaluation.trim()}\0${item.administrative_evaluation.trim()}`
        if (seen.has(key)) return true
        seen.add(key)
    }
    return false
}

function new_entry_row(item_name = '', item_score = ''): EntryItemRow {
    return {
        _rowId: `entry-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        item_name,
        item_score,
    }
}

function default_entry_items(): EntryItemRow[] {
    return [new_entry_row()]
}

function parse_entry_items(raw: unknown): EntryItemRow[] {
    if (!Array.isArray(raw)) return []
    return raw.map((item) => {
        const row = item && typeof item === 'object' ? (item as Record<string, unknown>) : {}
        const name = as_string(row.item_name || row.name)
        const score = row.item_score != null && row.item_score !== '' ? as_string(row.item_score) : as_string(row.score)
        return new_entry_row(name, score)
    })
}

function to_saved_entry_items(items: EntryItemRow[]) {
    return items.map((item) => {
        const raw = item.item_score.trim()
        const numeric = Number(raw)
        return {
            item_name: item.item_name,
            item_score: raw === '' || !Number.isFinite(numeric) ? raw : numeric,
        }
    })
}

function trans_data(source_data: DjConfigBillRow[]): ParseBillRow[] {
    return source_data.map((row) => {
        const tag = parse_tag(row.crrc_largetextfield_tag)
        return {
            id: row.id,
            billno: row.billno,
            billstatus: row.billstatus,
            billstatus_title: row.billstatus_title,
            auditdate: row.auditdate,
            modifytime: row.modifytime,
            createtime: row.createtime,
            data_type: row.crrc_textfield,
            config_name: as_string(tag.config_name),
            org_ids: parse_org_ids(tag.org_ids),
            tag,
        }
    })
}

function is_submitted_bill(row: ParseBillRow) {
    return row.billstatus !== 'A' && row.billstatus_title !== '暂存'
}

function orgs_overlap(left: string[], right: string[]) {
    if (!left.length || !right.length) return false
    const set = new Set(left)
    return right.some((id) => set.has(id))
}

function find_submitted_type_org_conflict(target: ParseBillRow, rows: ParseBillRow[]) {
    const other = rows.find(
        (row) =>
            row.id !== target.id &&
            row.data_type === target.data_type &&
            is_submitted_bill(row) &&
            orgs_overlap(row.org_ids, target.org_ids),
    )
    return other ?? null
}

function party_rule_ratios(tag: Record<string, unknown>) {
    const values = parse_rule_items(tag.items)
        .map((item) => Number(item.value))
        .filter((value) => Number.isFinite(value))
    const sum = values.reduce((total, value) => total + value, 0)
    if (Math.abs(sum - 100) < 1e-6) return values.map((value) => value / 100)
    return values
}

function org_percent_divides(orgCount: number, ratios: number[]) {
    if (!ratios.length) return false
    return ratios.every((ratio) => {
        const assigned = orgCount * ratio
        return Number.isFinite(assigned) && Math.abs(assigned - Math.round(assigned)) < 1e-6
    })
}

function next_config_billno(existing: string[], now = new Date()): string {
    const prefix = `${CONFIG_BILL_TYPE}-${format(now, 'yyyyMMdd')}-`
    let maxSerial = 0
    for (const billno of existing) {
        if (!billno.startsWith(prefix)) continue
        const serial = Number.parseInt(billno.slice(prefix.length), 10)
        if (Number.isFinite(serial) && serial > maxSerial) maxSerial = serial
    }
    return `${prefix}${String(maxSerial + 1).padStart(4, '0')}`
}

function to_add_row(form: FormValues, tag: Record<string, unknown>): BillAddRow {
    const next: Record<string, unknown> = {
        ...tag,
        config_name: form.config_name.trim(),
        org_ids: form.org_ids,
    }
    delete next.items
    delete next.cxzy_rules
    delete next.entry
    if (is_party_perf_type(form.data_type)) {
        next.items = to_saved_rule_items(form.items)
    } else if (is_cxzy_type(form.data_type)) {
        next.cxzy_rules = to_saved_cxzy_items(form.cxzy_items)
    } else if (is_grassroots_type(form.data_type)) {
        next.entry = to_saved_entry_items(form.entry_items)
    }
    const json = JSON.stringify(next)
    return {
        billno: form.billno.trim(),
        billstatus: 'A',
        crrc_textfield: form.data_type.trim(),
        crrc_largetextfield: form.config_name.trim(),
        crrc_largetextfield_tag: json,
    }
}

function bill_to_form(bill: ParseBillRow): FormValues {
    const items = parse_rule_items(bill.tag.items)
    const cxzy_items = parse_cxzy_items(bill.tag.cxzy_rules)
    const entry_items = parse_entry_items(bill.tag.entry)
    return {
        billno: bill.billno,
        data_type: bill.data_type,
        config_name: bill.config_name,
        org_ids: bill.org_ids,
        items: is_party_perf_type(bill.data_type) && items.length === 0 ? default_party_rule_items() : items,
        cxzy_items: is_cxzy_type(bill.data_type) && cxzy_items.length === 0 ? default_cxzy_rule_items() : cxzy_items,
        entry_items: is_grassroots_type(bill.data_type) && entry_items.length === 0 ? default_entry_items() : entry_items,
    }
}

function default_expanded(roots: OrgTreeNode[]) {
    return new Set([ORG_ALL_ID, ...roots.map((node) => node.id)])
}

function expanded_for_selection(roots: OrgTreeNode[], selectedIds: string[]) {
    const ids = default_expanded(roots)
    for (const id of selectedIds) {
        const path = find_path(roots, id)
        path.slice(0, -1).forEach((node) => ids.add(node.id))
        ids.add(ORG_ALL_ID)
    }
    return ids
}

function ConfigPanelToolbar({
    title,
    selectedId,
    onAdd,
    onRemove,
}: {
    title: string
    selectedId: string
    onAdd: () => void
    onRemove: () => void
}) {
    return (
        <div className="flex shrink-0 items-center justify-between gap-2 px-2 pt-2">
            <CardTitle className="min-w-0 truncate">{title}</CardTitle>
            <div className="flex shrink-0 items-center gap-2">
                <Button type="button" variant="outline" size="lg" onClick={onAdd}>
                    增行
                </Button>
                <Button type="button" variant="outline" size="lg" disabled={!selectedId} onClick={onRemove}>
                    删行
                </Button>
            </div>
        </div>
    )
}

function PartyPerfRuleTable({
    title,
    items,
    selectedId,
    onSelect,
    onChange,
    onAdd,
    onRemove,
}: {
    title: string
    items: RuleItemRow[]
    selectedId: string
    onSelect: (id: string) => void
    onChange: (id: string, patch: Partial<Pick<RuleItemRow, 'name' | 'value'>>) => void
    onAdd: () => void
    onRemove: () => void
}) {
    const sum = rule_items_sum(items)
    const percent = Math.abs(sum) <= 1.0001 ? sum * 100 : sum

    return (
        <div className="flex h-full min-h-0 flex-col">
            <ConfigPanelToolbar title={title} selectedId={selectedId} onAdd={onAdd} onRemove={onRemove} />
            <div className="min-h-0 flex-1 overflow-auto px-2 pb-2">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="w-14">序号</TableHead>
                            <TableHead>名称</TableHead>
                            <TableHead className="w-28 text-right">值</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.length === 0 ? (
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={3} className="text-muted-foreground text-center">
                                    暂无评价规则，请点击增行
                                </TableCell>
                            </TableRow>
                        ) : (
                            items.map((item, index) => (
                                <TableRow
                                    key={item._rowId}
                                    data-state={selectedId === item._rowId ? 'selected' : undefined}
                                    onClick={() => onSelect(item._rowId)}
                                >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <Input
                                            value={item.name}
                                            onMouseDown={(event) => event.stopPropagation()}
                                            onClick={(event) => event.stopPropagation()}
                                            onFocus={() => onSelect(item._rowId)}
                                            onChange={(event) => onChange(item._rowId, { name: event.target.value })}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            className="text-right"
                                            inputMode="decimal"
                                            value={item.value}
                                            onMouseDown={(event) => event.stopPropagation()}
                                            onClick={(event) => event.stopPropagation()}
                                            onFocus={() => onSelect(item._rowId)}
                                            onChange={(event) => onChange(item._rowId, { value: event.target.value })}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={2}>合计</TableCell>
                            <TableCell className="text-right">{`${format_rule_value(percent)}%`}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    )
}

function CxzyRuleTable({
    title,
    partyEvalLabel,
    items,
    selectedId,
    onSelect,
    onChange,
    onAdd,
    onRemove,
}: {
    title: string
    partyEvalLabel: string
    items: CxzyRuleRow[]
    selectedId: string
    onSelect: (id: string) => void
    onChange: (id: string, patch: Partial<Pick<CxzyRuleRow, 'party_evaluation' | 'administrative_evaluation' | 'cxzy_evaluation'>>) => void
    onAdd: () => void
    onRemove: () => void
}) {
    return (
        <div className="flex h-full min-h-0 flex-col">
            <ConfigPanelToolbar title={title} selectedId={selectedId} onAdd={onAdd} onRemove={onRemove} />
            <div className="min-h-0 flex-1 overflow-auto px-2 pb-2">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="w-14">序号</TableHead>
                            <TableHead>{partyEvalLabel}</TableHead>
                            <TableHead>行政绩效</TableHead>
                            <TableHead>创先争优评价</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.length === 0 ? (
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={4} className="text-muted-foreground text-center">
                                    暂无评价规则，请点击增行
                                </TableCell>
                            </TableRow>
                        ) : (
                            items.map((item, index) => (
                                <TableRow
                                    key={item._rowId}
                                    data-state={selectedId === item._rowId ? 'selected' : undefined}
                                    onClick={() => onSelect(item._rowId)}
                                >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <Input
                                            value={item.party_evaluation}
                                            onMouseDown={(event) => event.stopPropagation()}
                                            onClick={(event) => event.stopPropagation()}
                                            onFocus={() => onSelect(item._rowId)}
                                            onChange={(event) => onChange(item._rowId, { party_evaluation: event.target.value })}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            value={item.administrative_evaluation}
                                            onMouseDown={(event) => event.stopPropagation()}
                                            onClick={(event) => event.stopPropagation()}
                                            onFocus={() => onSelect(item._rowId)}
                                            onChange={(event) => onChange(item._rowId, { administrative_evaluation: event.target.value })}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            value={item.cxzy_evaluation}
                                            onMouseDown={(event) => event.stopPropagation()}
                                            onClick={(event) => event.stopPropagation()}
                                            onFocus={() => onSelect(item._rowId)}
                                            onChange={(event) => onChange(item._rowId, { cxzy_evaluation: event.target.value })}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

function GrassrootsEntryTable({
    title,
    items,
    selectedId,
    onSelect,
    onChange,
    onAdd,
    onRemove,
}: {
    title: string
    items: EntryItemRow[]
    selectedId: string
    onSelect: (id: string) => void
    onChange: (id: string, patch: Partial<Pick<EntryItemRow, 'item_name' | 'item_score'>>) => void
    onAdd: () => void
    onRemove: () => void
}) {
    return (
        <div className="flex h-full min-h-0 flex-col">
            <ConfigPanelToolbar title={title} selectedId={selectedId} onAdd={onAdd} onRemove={onRemove} />
            <div className="min-h-0 flex-1 overflow-auto px-2 pb-2">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="w-14">序号</TableHead>
                            <TableHead>评价项点</TableHead>
                            <TableHead className="w-28 text-right">分数</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.length === 0 ? (
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={3} className="text-muted-foreground text-center">
                                    暂无评价项点，请点击增行
                                </TableCell>
                            </TableRow>
                        ) : (
                            items.map((item, index) => (
                                <TableRow
                                    key={item._rowId}
                                    data-state={selectedId === item._rowId ? 'selected' : undefined}
                                    onClick={() => onSelect(item._rowId)}
                                >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <Input
                                            value={item.item_name}
                                            onMouseDown={(event) => event.stopPropagation()}
                                            onClick={(event) => event.stopPropagation()}
                                            onFocus={() => onSelect(item._rowId)}
                                            onChange={(event) => onChange(item._rowId, { item_name: event.target.value })}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            className="text-right"
                                            inputMode="decimal"
                                            value={item.item_score}
                                            onMouseDown={(event) => event.stopPropagation()}
                                            onClick={(event) => event.stopPropagation()}
                                            onFocus={() => onSelect(item._rowId)}
                                            onChange={(event) => onChange(item._rowId, { item_score: event.target.value })}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

function ConfigBillForm({
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
    onSubmit: (form: FormValues) => void
}) {
    const [form, setForm] = useState<FormValues>(() =>
        initial
            ? bill_to_form(initial)
            : {
                  billno: next_config_billno(existingBillnos),
                  data_type: '',
                  config_name: '',
                  org_ids: [],
                  items: [],
                  cxzy_items: [],
                  entry_items: [],
              },
    )
    const [selectedItemId, setSelectedItemId] = useState('')
    const [orgRoots, setOrgRoots] = useState<OrgTreeNode[]>([])
    const [orgError, setOrgError] = useState('')
    const [orgQuery, setOrgQuery] = useState('')
    const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set([ORG_ALL_ID]))
    const orgTree = useMemo(() => filter_tree(orgRoots, orgQuery), [orgRoots, orgQuery])

    useEffect(() => {
        let cancelled = false
        void (async () => {
            try {
                const data = await fetch_org_data()
                if (cancelled) return
                const roots = build_tree(trans_org_data(data))
                setOrgRoots(roots)
                setExpandedIds(expanded_for_selection(roots, initial?.org_ids ?? []))
                setOrgError('')
            } catch (err) {
                if (cancelled) return
                setOrgError(get_err_message(err))
            }
        })()
        return () => {
            cancelled = true
        }
    }, [initial])

    useEffect(() => {
        if (!orgQuery.trim()) {
            setExpandedIds(expanded_for_selection(orgRoots, form.org_ids))
            return
        }
        setExpandedIds(new Set([ORG_ALL_ID, ...flatten_tree(orgTree).map((node) => node.id)]))
    }, [orgQuery, orgRoots, orgTree])

    function handleExpandedChange(id: string, open: boolean) {
        setExpandedIds((prev) => {
            const next = new Set(prev)
            if (open) next.add(id)
            else next.delete(id)
            return next
        })
    }

    return (
        <Dialog
            open
            onOpenChange={(open) => {
                if (!open && !saving) onClose()
            }}
        >
            <DialogContent className="flex h-[90vh] max-h-[90vh] w-full flex-col gap-3 overflow-hidden sm:max-w-[96vw]" showCloseButton={!saving}>
                <DialogHeader className="shrink-0">
                    <DialogTitle>{initial ? '修改配置项' : '新增配置项'}</DialogTitle>
                </DialogHeader>
                <FieldGroup className="grid shrink-0 grid-cols-4 gap-x-3 gap-y-2">
                    <Field className="min-w-0 gap-1">
                        <FieldLabel htmlFor="config-billno">
                            单据编号<span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                            id="config-billno"
                            required
                            aria-required
                            value={form.billno}
                            onChange={(event) => setForm((prev) => ({ ...prev, billno: event.target.value }))}
                        />
                    </Field>
                    <Field className="min-w-0 gap-1">
                        <FieldLabel>单据状态</FieldLabel>
                        <Input disabled readOnly value={initial?.billstatus_title || '暂存'} />
                    </Field>
                    <Field className="min-w-0 gap-1">
                        <FieldLabel>
                            数据类型<span className="text-destructive">*</span>
                        </FieldLabel>
                        <Select
                            value={form.data_type}
                            onValueChange={(value) => {
                                const data_type = value ?? ''
                                setSelectedItemId('')
                                setForm((prev) => ({
                                    ...prev,
                                    data_type,
                                    items:
                                        is_party_perf_type(data_type) && prev.items.length === 0 ? default_party_rule_items() : prev.items,
                                    cxzy_items:
                                        is_cxzy_type(data_type) && prev.cxzy_items.length === 0 ? default_cxzy_rule_items() : prev.cxzy_items,
                                    entry_items:
                                        is_grassroots_type(data_type) && prev.entry_items.length === 0 ? default_entry_items() : prev.entry_items,
                                }))
                            }}
                        >
                            <SelectTrigger className="h-7 w-full min-w-0" aria-required>
                                <SelectValue placeholder="请选择数据类型" />
                            </SelectTrigger>
                            <SelectContent align="start" alignItemWithTrigger={false}>
                                {CONFIG_TYPE_NAME.map((item) => (
                                    <SelectItem key={item} value={item}>
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Field>
                    <Field className="min-w-0 gap-1">
                        <FieldLabel htmlFor="config-name">
                            配置名称<span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                            id="config-name"
                            required
                            aria-required
                            value={form.config_name}
                            onChange={(event) => setForm((prev) => ({ ...prev, config_name: event.target.value }))}
                        />
                    </Field>
                </FieldGroup>
                <ResizablePanelGroup orientation="horizontal" className="min-h-0 flex-1">
                    <ResizablePanel defaultSize="18rem" minSize="12rem" maxSize="50%" className="min-h-0">
                        <Card className="flex h-full min-h-0 flex-col gap-0 overflow-hidden py-0">
                            <div className="shrink-0 space-y-2 px-2 pt-2">
                                <CardTitle>应用的党组织</CardTitle>
                                <Input
                                    value={orgQuery}
                                    placeholder="搜索党组织"
                                    onChange={(event) => setOrgQuery(event.target.value)}
                                />
                            </div>
                            <CardContent className="min-h-0 flex-1 px-0">
                                {orgError ? (
                                    <div className="text-muted-foreground flex h-full items-center justify-center px-3 text-center">{orgError}</div>
                                ) : orgQuery.trim() && orgTree.length === 0 ? (
                                    <div className="text-muted-foreground flex h-full items-center justify-center px-3 text-center">无匹配党组织</div>
                                ) : (
                                    <OrgTree
                                        multiple
                                        roots={orgTree}
                                        selectedIds={new Set(form.org_ids)}
                                        expandedIds={expandedIds}
                                        onSelectedIdsChange={(ids) => setForm((prev) => ({ ...prev, org_ids: [...ids] }))}
                                        onExpandedChange={handleExpandedChange}
                                    />
                                )}
                            </CardContent>
                        </Card>
                    </ResizablePanel>
                    <ResizableHandle withHandle className="mx-1" />
                    <ResizablePanel minSize="20rem" className="min-h-0 min-w-0">
                        <Card className="flex h-full min-h-0 flex-col overflow-hidden py-0">
                            <CardContent className="min-h-0 flex-1 px-0">
                                {is_party_perf_type(form.data_type) ? (
                                    <PartyPerfRuleTable
                                        title={form.data_type}
                                        items={form.items}
                                        selectedId={selectedItemId}
                                        onSelect={setSelectedItemId}
                                        onChange={(id, patch) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                items: prev.items.map((item) => (item._rowId === id ? { ...item, ...patch } : item)),
                                            }))
                                        }
                                        onAdd={() => {
                                            const row = new_rule_row()
                                            setForm((prev) => ({ ...prev, items: [...prev.items, row] }))
                                            setSelectedItemId(row._rowId)
                                        }}
                                        onRemove={() => {
                                            if (!selectedItemId) {
                                                toast.error('请先选择一行')
                                                return
                                            }
                                            setForm((prev) => ({ ...prev, items: prev.items.filter((item) => item._rowId !== selectedItemId) }))
                                            setSelectedItemId('')
                                        }}
                                    />
                                ) : is_cxzy_type(form.data_type) ? (
                                    <CxzyRuleTable
                                        title={form.data_type}
                                        partyEvalLabel={party_eval_label(form.data_type)}
                                        items={form.cxzy_items}
                                        selectedId={selectedItemId}
                                        onSelect={setSelectedItemId}
                                        onChange={(id, patch) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                cxzy_items: prev.cxzy_items.map((item) => (item._rowId === id ? { ...item, ...patch } : item)),
                                            }))
                                        }
                                        onAdd={() => {
                                            const row = new_cxzy_row()
                                            setForm((prev) => ({ ...prev, cxzy_items: [...prev.cxzy_items, row] }))
                                            setSelectedItemId(row._rowId)
                                        }}
                                        onRemove={() => {
                                            if (!selectedItemId) {
                                                toast.error('请先选择一行')
                                                return
                                            }
                                            setForm((prev) => ({
                                                ...prev,
                                                cxzy_items: prev.cxzy_items.filter((item) => item._rowId !== selectedItemId),
                                            }))
                                            setSelectedItemId('')
                                        }}
                                    />
                                ) : is_grassroots_type(form.data_type) ? (
                                    <GrassrootsEntryTable
                                        title={form.data_type}
                                        items={form.entry_items}
                                        selectedId={selectedItemId}
                                        onSelect={setSelectedItemId}
                                        onChange={(id, patch) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                entry_items: prev.entry_items.map((item) => (item._rowId === id ? { ...item, ...patch } : item)),
                                            }))
                                        }
                                        onAdd={() => {
                                            const row = new_entry_row()
                                            setForm((prev) => ({ ...prev, entry_items: [...prev.entry_items, row] }))
                                            setSelectedItemId(row._rowId)
                                        }}
                                        onRemove={() => {
                                            if (!selectedItemId) {
                                                toast.error('请先选择一行')
                                                return
                                            }
                                            setForm((prev) => ({
                                                ...prev,
                                                entry_items: prev.entry_items.filter((item) => item._rowId !== selectedItemId),
                                            }))
                                            setSelectedItemId('')
                                        }}
                                    />
                                ) : null}
                            </CardContent>
                        </Card>
                    </ResizablePanel>
                </ResizablePanelGroup>
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

export function DjconfigView() {
    const [status, setStatus] = useState<FetchStatus>('idle')
    const [rows, setRows] = useState<ParseBillRow[]>([])
    const [error, setError] = useState('')
    const [selectedRowId, setSelectedRowId] = useState('')
    const [editingBill, setEditingBill] = useState<ParseBillRow | null>(null)
    const [formOpen, setFormOpen] = useState(false)
    const [saving, setSaving] = useState(false)
    const [deleteTarget, setDeleteTarget] = useState<ParseBillRow | null>(null)
    const [pushTarget, setPushTarget] = useState<ParseBillRow | null>(null)

    async function run(force: boolean) {
        setStatus('loading')
        setError('')
        try {
            const data = force ? await fetch_data({ force: true }) : await fetch_data()
            const filtered = data.filter((row) => CONFIG_TYPE_SET.has(row.crrc_textfield))
            setRows(trans_data(filtered))
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

    async function handleSave(form: FormValues) {
        if (!form.billno.trim()) {
            toast.warning('必填项没填写', { description: '单据编号' })
            return
        }
        if (!form.data_type.trim()) {
            toast.warning('必填项没填写', { description: '数据类型' })
            return
        }
        if (!CONFIG_TYPE_SET.has(form.data_type.trim())) {
            toast.warning('数据格式不正确', { description: '数据类型不在允许范围内' })
            return
        }
        if (!form.config_name.trim()) {
            toast.warning('必填项没填写', { description: '配置名称' })
            return
        }
        if (is_party_perf_type(form.data_type)) {
            if (!form.items.length) {
                toast.warning('必填项没填写', { description: '评价名称' })
                return
            }
            if (form.items.some((item) => !item.name.trim())) {
                toast.warning('必填项没填写', { description: '评价名称' })
                return
            }
            if (form.items.some((item) => item.value.trim() === '' || !Number.isFinite(Number(item.value)))) {
                toast.warning('数据格式不正确', { description: '值必须是数字' })
                return
            }
            if (!is_hundred_percent(rule_items_sum(form.items))) {
                toast.warning('数据格式不正确', { description: '所有值加起来必须为100%' })
                return
            }
        }
        if (is_cxzy_type(form.data_type)) {
            const partyLabel = party_eval_label(form.data_type)
            if (!form.cxzy_items.length) {
                toast.warning('必填项没填写', { description: partyLabel })
                return
            }
            if (form.cxzy_items.some((item) => !item.party_evaluation.trim())) {
                toast.warning('必填项没填写', { description: partyLabel })
                return
            }
            if (form.cxzy_items.some((item) => !item.administrative_evaluation.trim())) {
                toast.warning('必填项没填写', { description: '行政绩效' })
                return
            }
            if (form.cxzy_items.some((item) => !item.cxzy_evaluation.trim())) {
                toast.warning('必填项没填写', { description: '创先争优评价' })
                return
            }
            if (has_duplicate_cxzy_pair(form.cxzy_items)) {
                toast.warning('数据格式不正确', { description: `${partyLabel}和行政绩效不能有重复项` })
                return
            }
        }
        const isEdit = !!editingBill
        setSaving(true)
        try {
            if (editingBill) {
                await delete_data(editingBill.billno)
            }
            await add_data(to_add_row(form, editingBill?.tag ?? {}))
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
        const conflict = find_submitted_type_org_conflict(target, rows)
        if (conflict) {
            toast.warning('数据格式不正确', {
                description: `相同党组织的相同数据类型已有已提交规则：${target.billno}、${conflict.billno}`,
            })
            return
        }
        if (is_party_perf_type(target.data_type) && !org_percent_divides(target.org_ids.length, party_rule_ratios(target.tag))) {
            toast.warning('数据格式不正确', { description: '党组织数量和百分比不能整除' })
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

    const loading = status === 'loading' || saving
    const emptyText = status === 'loading' ? '正在加载配置项…' : status === 'error' ? error || '加载失败' : '暂无配置项'

    return (
        <div className="relative flex min-h-0 flex-1 flex-col gap-2.5">
            <div className="relative flex min-h-0 flex-1 flex-col">
                <DataTable
                    columns={configColumns}
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
                                { key: 'export', label: '导出', disabled: loading },
                            ]}
                            onAction={(key) => {
                                if (key === 'refresh') void run(true)
                                if (key === 'new') openAddForm()
                                if (key === 'del') requestDelete()
                                if (key === 'push') requestPush()
                                if (key !== 'export') return
                                exportTableToExcel({
                                    filename: NAV_LABEL.config,
                                    columns: [
                                        ...PARSE_BILL_COLUMNS.map((col) => ({ key: col.key, label: col.label })),
                                        { key: 'config_json', label: '配置' },
                                    ],
                                    rows: rows.map((row) => ({
                                        ...row,
                                        config_json: extra_config_json(row.tag),
                                    })),
                                })
                            }}
                        />
                    }
                />
            </div>
            {formOpen ? (
                <ConfigBillForm
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
        </div>
    )
}
