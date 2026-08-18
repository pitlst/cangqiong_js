import { format } from 'date-fns'

import { fetch_data as fetch_contribution, trans_data as trans_contribution, type ParseBillEntry as ContributionEntry } from '@/lib/api/contribution_degree'
import { fetch_data as fetch_deduction, trans_data as trans_deduction } from '@/lib/api/deduction'
import { fetch_data as fetch_djconfig } from '@/lib/api/djconfig_select'
import { type BillRow as DjConfigBillRow } from '@/lib/api/djconfig_type'
import { fetch_data as fetch_org, trans_data as trans_org, type ParseOrgRow } from '@/lib/api/org'
import { as_number, as_string } from '@/lib/utils'

const QUARTERLY_BILL_TYPE = 'JDPJ'
const QUARTERLY_RESULT_TYPE = '季度评价结果'

export const QUARTERLY_GRASSROOTS_TYPE = '季度基层党组织创先争优评价项点'
export const QUARTERLY_PARTY_RULE_TYPE = '季度党群绩效评价规则'

export type EvalEntry = {
    item_name: string
    item_score: number
}

export type EvalBill = {
    billno: string
    billstatus_title: string
    party_name: string
    year: string
    quarter: string
    party_score: number
    party_evaluation: string
    administrative_evaluation: string
    cxzy_evaluation: string
    entry: EvalEntry[]
}

export type CalcQuarterlyEvalResult = {
    bills: EvalBill[]
    delete_billnos: string[]
}

export class DuplicateOrgConfigError extends Error {
    readonly org_names: string[]

    constructor(org_names: string[]) {
        super(`党组织「${org_names.join('、')}」的配置项被重复设定`)
        this.name = 'DuplicateOrgConfigError'
        this.org_names = org_names
    }
}

export class TiedScoreEvalError extends Error {
    constructor() {
        super('无法计算')
        this.name = 'TiedScoreEvalError'
    }
}

type ConfigBill = {
    billno: string
    data_type: string
    submitted: boolean
    org_ids: string[]
    items: { name: string; value: number }[]
    entry: EvalEntry[]
}

const CONTRIB_ITEM_PAIRS = [
    { item: 'crrc_largetextfield_tag', score: 'crrc_decimalfield' },
    { item: 'crrc_largetextfield1_tag', score: 'crrc_decimalfield1' },
    { item: 'crrc_largetextfield2_tag', score: 'crrc_decimalfield2' },
    { item: 'crrc_largetextfield3_tag', score: 'crrc_decimalfield3' },
    { item: 'crrc_largetextfield4_tag', score: 'crrc_decimalfield5' },
    { item: 'crrc_largetextfield5_tag', score: 'crrc_decimalfield7' },
] as const

const CONTRIB_SCORE_ONLY = [
    { name: '基层工会季度贡献度评价', score: 'crrc_decimalfield9' },
    { name: '基层团组织贡献度评价', score: 'crrc_decimalfield11' },
] as const

function parse_tag(raw: string): Record<string, unknown> {
    try {
        const value = JSON.parse(raw) as unknown
        if (value && typeof value === 'object' && !Array.isArray(value)) return value as Record<string, unknown>
    } catch {
        /* ignore */
    }
    return {}
}

function parse_org_ids(raw: unknown): string[] {
    if (!Array.isArray(raw)) return []
    return raw.map((item) => as_string(item)).filter(Boolean)
}

function parse_config_entry(raw: unknown): EvalEntry[] {
    if (!Array.isArray(raw)) return []
    return raw.map((item) => {
        const row = item && typeof item === 'object' ? (item as Record<string, unknown>) : {}
        return {
            item_name: as_string(row.item_name || row.name),
            item_score: as_number(row.item_score ?? row.score),
        }
    })
}

function parse_rule_items(raw: unknown): { name: string; value: number }[] {
    if (!Array.isArray(raw)) return []
    return raw.map((item) => {
        const row = item && typeof item === 'object' ? (item as Record<string, unknown>) : {}
        let value = as_number(row.value)
        if ((row.value == null || row.value === '') && row.percent != null && row.percent !== '') {
            const percent = as_number(row.percent)
            value = percent > 1 ? percent / 100 : percent
        }
        return { name: as_string(row.name || row.label), value }
    })
}

function is_submitted(row: DjConfigBillRow) {
    return row.billstatus !== 'A' && row.billstatus_title !== '暂存'
}

function trans_config(row: DjConfigBillRow): ConfigBill {
    const tag = parse_tag(row.crrc_largetextfield_tag)
    return {
        billno: row.billno,
        data_type: row.crrc_textfield,
        submitted: is_submitted(row),
        org_ids: parse_org_ids(tag.org_ids),
        items: parse_rule_items(tag.items),
        entry: parse_config_entry(tag.entry),
    }
}

export function quarter_key(value: string) {
    const text = value.replace(/\s+/g, '')
    if (!text) return ''
    if (text.includes('四') || text.includes('4')) return '4'
    if (text.includes('三') || text.includes('3')) return '3'
    if (text.includes('二') || text.includes('2')) return '2'
    if (text.includes('一') || text.includes('1')) return '1'
    return text
}

function same_period(year_a: string, quarter_a: string, year_b: string, quarter_b: string) {
    const key_a = quarter_key(quarter_a)
    const key_b = quarter_key(quarter_b)
    return year_a.trim() === year_b.trim() && !!key_a && key_a === key_b
}

function names_match(party_name: string, ...candidates: string[]) {
    const party = party_name.trim()
    if (!party) return false
    return candidates.some((item) => item.trim() === party)
}

function org_name_set(org_ids: string[], orgs: ParseOrgRow[]) {
    const by_id = new Map(orgs.map((org) => [org.id, org]))
    const names = new Set<string>()
    for (const id of org_ids) {
        const org = by_id.get(id)
        if (!org) continue
        if (org.name.trim()) names.add(org.name.trim())
        if (org.fullname.trim()) names.add(org.fullname.trim())
    }
    return names
}

function covers_party(org_ids: string[], party_name: string, orgs: ParseOrgRow[]) {
    const party = party_name.trim()
    if (!party || !org_ids.length) return false
    return org_name_set(org_ids, orgs).has(party)
}

function ratio_of(value: number, sum: number) {
    if (Math.abs(sum - 100) < 1e-6) return value / 100
    return value
}

function assign_counts(total: number, ratios: number[]) {
    const counts = ratios.map((ratio) => Math.round(total * ratio))
    let diff = total - counts.reduce((sum, count) => sum + count, 0)
    for (let index = counts.length - 1; index >= 0 && diff !== 0; index--) {
        if (counts[index] <= 0 && diff < 0) continue
        const next = counts[index] + diff
        if (next < 0) continue
        counts[index] = next
        diff = 0
    }
    return counts
}

function contribution_entries(entry: ContributionEntry): EvalEntry[] {
    const rows: EvalEntry[] = []
    for (const pair of CONTRIB_ITEM_PAIRS) {
        const item_name = as_string(entry[pair.item]).trim()
        if (!item_name) continue
        rows.push({ item_name, item_score: as_number(entry[pair.score]) })
    }
    for (const item of CONTRIB_SCORE_ONLY) {
        rows.push({ item_name: item.name, item_score: as_number(entry[item.score]) })
    }
    return rows
}

function alloc_quarterly_billno(used: Set<string>, now = new Date()) {
    const prefix = `${QUARTERLY_BILL_TYPE}-${format(now, 'yyyyMMdd')}-`
    let serial = 0
    for (const billno of used) {
        if (!billno.startsWith(prefix)) continue
        const value = Number.parseInt(billno.slice(prefix.length), 10)
        if (Number.isFinite(value) && value > serial) serial = value
    }
    let next = ''
    do {
        serial += 1
        next = `${prefix}${String(serial).padStart(4, '0')}`
    } while (used.has(next))
    used.add(next)
    return next
}

function trans_quarterly(row: DjConfigBillRow): EvalBill {
    const tag = parse_tag(row.crrc_largetextfield_tag)
    return {
        billno: row.billno,
        billstatus_title: row.billstatus_title,
        party_name: as_string(tag.party_name),
        year: as_string(tag.year),
        quarter: as_string(tag.quarter),
        party_score: as_number(tag.party_score),
        party_evaluation: as_string(tag.party_evaluation),
        administrative_evaluation: as_string(tag.administrative_evaluation),
        cxzy_evaluation: as_string(tag.cxzy_evaluation),
        entry: parse_config_entry(tag.entry),
    }
}

function is_draft(bill: EvalBill) {
    return bill.billstatus_title === '暂存'
}

function is_reusable_existing(bill: EvalBill, year: string, quarter: string) {
    return same_period(bill.year, bill.quarter, year, quarter) || is_draft(bill)
}

function bill_matches_org(bill: EvalBill, org: ParseOrgRow) {
    return names_match(bill.party_name, org.name, org.fullname)
}

function has_tied_score_across_evals(group: EvalBill[]) {
    const eval_by_score = new Map<number, string>()
    for (const bill of group) {
        if (!bill.party_evaluation) continue
        const existing = eval_by_score.get(bill.party_score)
        if (existing && existing !== bill.party_evaluation) return true
        eval_by_score.set(bill.party_score, bill.party_evaluation)
    }
    return false
}

function collect_duplicate_org_names(configs: ConfigBill[], orgs: ParseOrgRow[]) {
    const owners = new Map<string, string[]>()
    for (const config of configs) {
        for (const org_id of config.org_ids) {
            const list = owners.get(org_id) ?? []
            list.push(config.billno)
            owners.set(org_id, list)
        }
    }
    const by_id = new Map(orgs.map((org) => [org.id, org]))
    const names: string[] = []
    for (const [org_id, billnos] of owners) {
        if (new Set(billnos).size < 2) continue
        const org = by_id.get(org_id)
        names.push(org?.name || org?.fullname || org_id)
    }
    return names
}

function build_scored_bill(party_name: string, year: string, quarter: string, billno: string, grassroots: ConfigBill[], deductions: ReturnType<typeof trans_deduction>, contributions: ReturnType<typeof trans_contribution>, orgs: ParseOrgRow[]): EvalBill {
    const entry: EvalEntry[] = []
    for (const config of grassroots) {
        if (!covers_party(config.org_ids, party_name, orgs)) continue
        entry.push(...config.entry)
    }
    for (const deduction of deductions) {
        for (const item of deduction.entry) {
            const item_year = item.year || deduction.year
            const item_quarter = item.quarter || deduction.quarter
            if (!same_period(year, quarter, item_year, item_quarter)) continue
            if (!names_match(party_name, item.org_name, item.org_fullname)) continue
            entry.push({ item_name: item.item, item_score: -item.score })
        }
    }
    for (const contribution of contributions) {
        if (!same_period(year, quarter, contribution.year, contribution.quarter)) continue
        for (const item of contribution.entry) {
            if (!names_match(party_name, item.crrc_basedatafield1_name, item.crrc_basedatafield1_fullname)) continue
            entry.push(...contribution_entries(item))
        }
    }
    return {
        billno,
        billstatus_title: '暂存',
        party_name,
        year,
        quarter,
        party_score: entry.reduce((sum, item) => sum + item.item_score, 0),
        party_evaluation: '',
        administrative_evaluation: '',
        cxzy_evaluation: '',
        entry,
    }
}

export async function calculate_quarterly_party_eval(year: string, quarter: string): Promise<CalcQuarterlyEvalResult> {
    const [config_raw, deduction_raw, contribution_raw, org_raw] = await Promise.all([
        fetch_djconfig({ force: true }),
        fetch_deduction({ force: true }),
        fetch_contribution({ force: true }),
        fetch_org({ force: true }),
    ])
    const configs = config_raw.map(trans_config)
    const deductions = trans_deduction(deduction_raw)
    const contributions = trans_contribution(contribution_raw)
    const orgs = trans_org(org_raw)
    const existing = config_raw.filter((row) => row.crrc_textfield === QUARTERLY_RESULT_TYPE).map(trans_quarterly)

    const grassroots = configs.filter((row) => row.submitted && row.data_type === QUARTERLY_GRASSROOTS_TYPE)
    const party_rules = configs.filter((row) => row.submitted && row.data_type === QUARTERLY_PARTY_RULE_TYPE)

    const consumed = new Set<string>()
    const delete_billnos: string[] = []
    const drafts: EvalBill[] = []
    const used_billnos = new Set(config_raw.map((row) => row.billno).filter(Boolean))

    for (const org of orgs) {
        const party_name = org.name.trim()
        if (!party_name) continue
        const matches = existing.filter((bill) => !consumed.has(bill.billno) && bill_matches_org(bill, org) && is_reusable_existing(bill, year, quarter))
        for (const bill of matches) {
            consumed.add(bill.billno)
            delete_billnos.push(bill.billno)
        }
        drafts.push(build_scored_bill(party_name, year, quarter, alloc_quarterly_billno(used_billnos), grassroots, deductions, contributions, orgs))
    }

    const duplicate_orgs = collect_duplicate_org_names(party_rules, orgs)
    if (duplicate_orgs.length) {
        throw new DuplicateOrgConfigError(duplicate_orgs)
    }

    const assigned = drafts.map((bill) => ({ ...bill }))
    const used = new Set<string>()
    for (const config of party_rules) {
        const group = assigned
            .filter((bill) => !used.has(bill.billno) && covers_party(config.org_ids, bill.party_name, orgs))
            .sort((left, right) => right.party_score - left.party_score)
        if (!group.length) continue
        const sum = config.items.reduce((total, row) => total + row.value, 0)
        const ratios = config.items.map((item) => ratio_of(item.value, sum))
        const counts = assign_counts(group.length, ratios)
        let offset = 0
        config.items.forEach((item, index) => {
            const count = counts[index] ?? 0
            const slice = group.slice(offset, offset + count)
            offset += count
            for (const bill of slice) {
                bill.party_evaluation = item.name
                used.add(bill.billno)
            }
        })
        if (has_tied_score_across_evals(group)) {
            throw new TiedScoreEvalError()
        }
    }

    const unique_billnos = new Set(assigned.map((bill) => bill.billno))
    if (unique_billnos.size !== assigned.length) {
        throw new Error('生成的单据编号存在重复')
    }
    return { bills: assigned, delete_billnos: [...new Set(delete_billnos)] }
}
