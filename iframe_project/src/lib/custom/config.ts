/** 配置项 OpenAPI：查询 / 新增 / 删除 */
export {
    buildConfigSelectRequest,
    fetchConfigItems,
    fetchConfigItemsWithToast,
    getCachedConfigError,
    getCachedConfigItems,
    invalidateConfigCache,
    parseConfigSelectRows,
    CONFIG_SELECT_TOAST_ID,
} from '@/lib/custom/config.select'

export {
    addConfigItem,
    addConfigItemWithToast,
    buildConfigAddRequest,
    parseConfigAddResult,
    CONFIG_ADD_TOAST_ID,
} from '@/lib/custom/config.add'

export {
    buildConfigDeleteRequest,
    deleteConfigItem,
    deleteConfigItemWithToast,
    parseConfigDeleteResult,
    CONFIG_DELETE_TOAST_ID,
} from '@/lib/custom/config.delete'

export { mapConfigRows } from '@/lib/custom/config.mapper'

export type {
    ConfigAddInput,
    ConfigAddResult,
    ConfigDeleteInput,
    ConfigDeleteResult,
    ConfigSelectQuery,
    ConfigSelectRaw,
    DeductionTable,
} from '@/lib/custom/config.types'
