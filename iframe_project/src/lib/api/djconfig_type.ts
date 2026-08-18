import { type CqPageResponse } from '@/lib/config'

/** 查询返回的完整单据行 */
export type BillRow = {
    id: string
    billno: string
    billstatus: string
    billstatus_title: string
    auditdate: string | null
    modifytime: string
    createtime: string
    crrc_largetextfield: string
    crrc_largetextfield_tag: string
    crrc_textfield: string
}

/** 新增必填字段，比查询行少 id / 状态标题 / 时间等 */
export type BillAddRow = {
    billno: string
    billstatus: string
    crrc_largetextfield: string
    crrc_largetextfield_tag: string
    crrc_textfield: string
}

export type BillAddRequest = {
    data: BillAddRow[]
}

export type BillAddError = {
    entityKey: string
    entryRowIndex: number | null
    keys: {
        billno: string | null
    }
    rowMsg: string[]
    subEntryRowIndex: number | null
}

export type BillAddResult = {
    billIndex: number
    billStatus: boolean
    errors: BillAddError[]
    id: string | null
    keys: {
        billno: string | null
    }
    number: string | null
    type: string | null
}

export type BillAddResponse = {
    status: boolean
    errorCode: string
    message: string | null
    data: {
        failCount: string
        successCount: string
        result: BillAddResult[]
    } | null
}

export type BillDeleteRow = {
    billno: string
}

export type BillDeleteRequest = {
    data: BillDeleteRow
}

export type BillDeleteResult = {
    billStatus: boolean
    errors: unknown[]
    id: string
    number: string
}

export type BillDeleteResponse = {
    status: boolean
    errorCode: string
    message: string | null
    data: {
        failCount: string
        filter: string
        successCount: string
        totalCount: string
        result: BillDeleteResult[]
    } | null
}

export type CrrcBillPageResponse = CqPageResponse<BillRow>

export const BILL_COLUMNS = [
    { key: 'id', label: 'id' },
    { key: 'billno', label: '单据编号' },
    { key: 'billstatus', label: '单据状态' },
    { key: 'billstatus_title', label: '单据状态_标题' },
    { key: 'auditdate', label: '审核日期' },
    { key: 'modifytime', label: '修改时间' },
    { key: 'createtime', label: '创建时间' },
    { key: 'crrc_largetextfield', label: '配置' },
    { key: 'crrc_largetextfield_tag', label: '配置_详情' },
    { key: 'crrc_textfield', label: '数据类型' },
] as const
