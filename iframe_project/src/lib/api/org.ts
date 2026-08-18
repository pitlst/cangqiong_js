import { get_access_token } from '@/lib/cq_fetch'
import { CACHE_TTL_MS, CQ_API_PATH, CQ_OPENAPI, type CqPageResponse } from '@/lib/config'

/** 党组织基础资料行（party_organization_inquiry） */
export type OrgRow = {
    id: string
    number: string
    name: string
    status: string
    status_title: string
    enable: string
    enable_title: string
    createtime: string
    modifytime: string
    masterid: string
    longnumber: string
    level: number
    fullname: string
    isleaf: boolean
    crrc_combofield: string
    crrc_combofield_title: string
    crrc_datefield: string | null
    crrc_datefield1: string | null
    crrc_datefield2: string | null
    crrc_textfield2: string
    crrc_largetextfield: string
    crrc_largetextfield_tag: string
    crrc_stepperfield: number
    crrc_integerfield: number
    crrc_datefield3: string | null
    crrc_textfield_lname: string
    crrc_captamount: string
    crrc_payamount: string
    crrc_captnum: string
    crrc_paynum: string
    crrc_checkboxgroupfield: string
}

export type CrrcOrgPageResponse = CqPageResponse<OrgRow>

/** 转换后的党组织行，字段与 ORG_COLUMNS 一一对应 */
export type ParseOrgRow = {
    id: string
    number: string
    name: string
    status: string
    status_title: string
    enable: string
    enable_title: string
    createtime: string
    modifytime: string
    masterid: string
    longnumber: string
    level: number
    fullname: string
    isleaf: boolean
    crrc_combofield: string
    crrc_combofield_title: string
    crrc_datefield: string
    crrc_datefield1: string
    crrc_datefield2: string
    crrc_textfield2: string
    crrc_largetextfield: string
    crrc_largetextfield_tag: string
    crrc_stepperfield: number
    crrc_integerfield: number
    crrc_datefield3: string
    crrc_textfield_lname: string
    crrc_captamount: string
    crrc_payamount: string
    crrc_captnum: string
    crrc_paynum: string
    crrc_checkboxgroupfield: string
}

function text_of(value: string | null | undefined) {
    if (value == null) return ''
    return value
}

function number_of(value: number | null | undefined) {
    const n = Number(value)
    return Number.isFinite(n) ? n : 0
}

export const ORG_ALL_ID = '__all__'

/** 树节点：在转换行上补上级信息和 children */
export type OrgTreeNode = ParseOrgRow & {
    parent_id: string
    parent_name: string
    children: OrgTreeNode[]
}

function parent_longnumber(longnumber: string) {
    const index = longnumber.lastIndexOf('.')
    return index <= 0 ? '' : longnumber.slice(0, index)
}

function sort_nodes(list: OrgTreeNode[]) {
    list.sort((a, b) => {
        if (a.crrc_stepperfield !== b.crrc_stepperfield) return a.crrc_stepperfield - b.crrc_stepperfield
        return a.longnumber.localeCompare(b.longnumber, 'en')
    })
    list.forEach((node) => sort_nodes(node.children))
}

/** 按长编码组装党组织树 */
export function build_tree(rows: ParseOrgRow[]): OrgTreeNode[] {
    const nodes = new Map<string, OrgTreeNode>()
    const by_longnumber = new Map<string, OrgTreeNode>()

    for (const row of rows) {
        const node: OrgTreeNode = {
            ...row,
            parent_id: '',
            parent_name: '',
            children: [],
        }
        nodes.set(row.id, node)
        if (row.longnumber) by_longnumber.set(row.longnumber, node)
    }

    const roots: OrgTreeNode[] = []
    for (const node of nodes.values()) {
        const parent_key = parent_longnumber(node.longnumber)
        const parent = parent_key ? by_longnumber.get(parent_key) : undefined
        if (parent && parent.id !== node.id) {
            node.parent_id = parent.id
            node.parent_name = parent.name
            parent.children.push(node)
        } else {
            roots.push(node)
        }
    }

    sort_nodes(roots)
    return roots
}

export function flatten_tree(nodes: OrgTreeNode[]): OrgTreeNode[] {
    const out: OrgTreeNode[] = []
    const walk = (list: OrgTreeNode[]) => {
        for (const node of list) {
            out.push(node)
            walk(node.children)
        }
    }
    walk(nodes)
    return out
}

export function find_node(nodes: OrgTreeNode[], id: string): OrgTreeNode | null {
    for (const node of nodes) {
        if (node.id === id) return node
        const found = find_node(node.children, id)
        if (found) return found
    }
    return null
}

export function find_path(nodes: OrgTreeNode[], id: string): OrgTreeNode[] {
    for (const node of nodes) {
        if (node.id === id) return [node]
        const child_path = find_path(node.children, id)
        if (child_path.length) return [node, ...child_path]
    }
    return []
}

/** 右侧表格行：选中「全部」返回整树；否则按「包含本级」取本节点及/或全部下级 */
export function collect_table_rows(roots: OrgTreeNode[], selectedId: string, includeSelf: boolean): OrgTreeNode[] {
    if (!selectedId || selectedId === ORG_ALL_ID) return flatten_tree(roots)
    const node = find_node(roots, selectedId)
    if (!node) return []
    const descendants = flatten_tree(node.children)
    return includeSelf ? [node, ...descendants] : descendants
}

export function trans_data(source_data: OrgRow[]): ParseOrgRow[] {
    return source_data.map((row) => ({
        id: text_of(row.id),
        number: text_of(row.number),
        name: text_of(row.name),
        status: text_of(row.status),
        status_title: text_of(row.status_title),
        enable: text_of(row.enable),
        enable_title: text_of(row.enable_title),
        createtime: text_of(row.createtime),
        modifytime: text_of(row.modifytime),
        masterid: text_of(row.masterid),
        longnumber: text_of(row.longnumber),
        level: number_of(row.level),
        fullname: text_of(row.fullname),
        isleaf: Boolean(row.isleaf),
        crrc_combofield: text_of(row.crrc_combofield),
        crrc_combofield_title: text_of(row.crrc_combofield_title),
        crrc_datefield: text_of(row.crrc_datefield),
        crrc_datefield1: text_of(row.crrc_datefield1),
        crrc_datefield2: text_of(row.crrc_datefield2),
        crrc_textfield2: text_of(row.crrc_textfield2),
        crrc_largetextfield: text_of(row.crrc_largetextfield),
        crrc_largetextfield_tag: text_of(row.crrc_largetextfield_tag),
        crrc_stepperfield: number_of(row.crrc_stepperfield),
        crrc_integerfield: number_of(row.crrc_integerfield),
        crrc_datefield3: text_of(row.crrc_datefield3),
        crrc_textfield_lname: text_of(row.crrc_textfield_lname),
        crrc_captamount: text_of(row.crrc_captamount),
        crrc_payamount: text_of(row.crrc_payamount),
        crrc_captnum: text_of(row.crrc_captnum),
        crrc_paynum: text_of(row.crrc_paynum),
        crrc_checkboxgroupfield: text_of(row.crrc_checkboxgroupfield),
    }))
}

export const ORG_COLUMNS = [
    { key: 'id', label: 'id' },
    { key: 'number', label: '编码' },
    { key: 'name', label: '组织名称' },
    { key: 'status', label: '状态' },
    { key: 'status_title', label: '数据状态' },
    { key: 'enable', label: '使用状态' },
    { key: 'enable_title', label: '使用状态_标题' },
    { key: 'createtime', label: '创建时间' },
    { key: 'modifytime', label: '修改时间' },
    { key: 'masterid', label: '内码' },
    { key: 'longnumber', label: '长编码' },
    { key: 'level', label: '级次' },
    { key: 'fullname', label: '组织长名称' },
    { key: 'isleaf', label: '是否叶子' },
    { key: 'crrc_combofield', label: 'crrc_combofield' },
    { key: 'crrc_combofield_title', label: '党组织类别' },
    { key: 'crrc_datefield', label: '成立时间' },
    { key: 'crrc_datefield1', label: 'crrc_datefield1' },
    { key: 'crrc_datefield2', label: '下次换届选举时间' },
    { key: 'crrc_textfield2', label: 'crrc_textfield2' },
    { key: 'crrc_largetextfield', label: 'crrc_largetextfield' },
    { key: 'crrc_largetextfield_tag', label: 'crrc_largetextfield_tag' },
    { key: 'crrc_stepperfield', label: '排序码' },
    { key: 'crrc_integerfield', label: '任期' },
    { key: 'crrc_datefield3', label: '本届委员会成立时间' },
    { key: 'crrc_textfield_lname', label: 'crrc_textfield_lname' },
    { key: 'crrc_captamount', label: 'crrc_captamount' },
    { key: 'crrc_payamount', label: 'crrc_payamount' },
    { key: 'crrc_captnum', label: 'crrc_captnum' },
    { key: 'crrc_paynum', label: 'crrc_paynum' },
    { key: 'crrc_checkboxgroupfield', label: 'crrc_checkboxgroupfield' },
] as const

let orgTask: Promise<OrgRow[]> | null = null
let lastOrgRows: OrgRow[] | null = null
let lastOrgFetchTime = 0

function is_cache_expired(): boolean {
    return Date.now() - lastOrgFetchTime > CACHE_TTL_MS
}

/**
 * 分页拉取党组织，默认走模块内缓存。
 * 请求体为 `{ data: {}, pageSize, pageNo }`。
 */
export function fetch_data(options?: { force?: boolean }): Promise<OrgRow[]> {
    if (orgTask) return orgTask
    if (!options?.force && lastOrgRows && !is_cache_expired()) {
        return Promise.resolve(lastOrgRows)
    }
    const task = (async () => {
        const token = await get_access_token()
        const allRows: OrgRow[] = []
        let pageNo = 1
        const pageSize = CQ_OPENAPI.pageSize
        while (true) {
            const body = {
                data: {},
                pageSize,
                pageNo,
            }
            const res = await fetch(CQ_OPENAPI.gateway + CQ_API_PATH.org, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    access_token: token,
                },
                body: JSON.stringify(body),
            })
            const json = (await res.json()) as CrrcOrgPageResponse
            if (!json.status) {
                throw new Error(`分页查询失败: ${json.message || '未知错误'} (errorCode: ${json.errorCode || '无'})`)
            }
            if (!json.data) {
                throw new Error('分页查询失败: 响应缺少 data 字段')
            }
            allRows.push(...(json.data.rows ?? []))
            if (json.data.lastPage) {
                break
            }
            pageNo++
            if (pageNo > CQ_OPENAPI.maxPages) {
                throw new Error('分页查询异常: 超出最大页数限制')
            }
        }
        return allRows
    })()
        .then((rows) => {
            lastOrgRows = rows
            lastOrgFetchTime = Date.now()
            return rows
        })
        .finally(() => {
            if (orgTask === task) orgTask = null
        })

    orgTask = task
    return task
}
