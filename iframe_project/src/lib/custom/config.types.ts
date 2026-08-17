import type { DeductionTable } from '@/lib/table-types'

/** djconfig_select 查询条件（请按苍穹 API 文档填写） */
export type ConfigSelectQuery = Record<string, unknown>

/** djconfig_select 原始响应 data 结构（映射前，请按实际响应调整） */
export type ConfigSelectRaw = unknown

/** djconfig_add / 修改 请求体（请按苍穹 API 文档填写） */
export type ConfigAddInput = Record<string, unknown>

/** djconfig_add 响应 data（请按苍穹 API 文档填写） */
export type ConfigAddResult = Record<string, unknown>

/** djconfig_delete 请求体（请按苍穹 API 文档填写，通常含 id 或 billno） */
export type ConfigDeleteInput = Record<string, unknown>

/** djconfig_delete 响应 data（请按苍穹 API 文档填写） */
export type ConfigDeleteResult = Record<string, unknown>

export type { DeductionTable }
