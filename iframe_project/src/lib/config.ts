export const CQ_OPENAPI = {
    // 本地走 Vite `/ierp` 代理，避免浏览器直连远程网关触发 CORS
    gateway: import.meta.env.DEV ? '/ierp' : 'https://cangqiongtestzelc.crrcgc.cc:6888/ierp',
    clientId: 'shengchanfuzhuxitong',
    clientSecret: 'Sunwenqi8855830.',
    username: '010200003204',
    accountId: '956599844649042944',
    language: 'zh_CN',
    pageSize: 100,
    maxPages: 50,
}

export const CQ_API_PATH = {
    deduction: '/kapi/v2/crrc/crrc_dj/crrc_deduction_log/point_deduction_ledger',
    quarterly_performance: '/kapi/v2/crrc/crrc_dj/crrc_dj_cb_count/quarterly_performance',
    org: '/kapi/v2/crrc/crrc_dj/crrc_dj_org_tree_ext/party_organization_inquiry',
    djconfig_add: '/kapi/v2/crrc/crrc_dj/crrc_dj_config_new/djconfig_add',
    djconfig_delete: '/kapi/v2/crrc/crrc_dj/crrc_dj_config_new/djconfig_delete',
    djconfig_select: '/kapi/v2/crrc/crrc_dj/crrc_dj_config_new/djconfig_select',
    djconfig_push: '/kapi/v2/crrc/crrc_dj/crrc_dj_config_new/djconfig_push',
    djconfig_pull: '/kapi/v2/crrc/crrc_dj/crrc_dj_config_new/djconfig_pull',
}

// 通用：苍穹分页响应壳
export type CqPageResponse<T> = {
    status: boolean
    errorCode: string
    message: string | null
    data: {
        filter: string
        lastPage: boolean
        pageNo: number
        pageSize: number
        totalCount: number
        rows: T[]
    }
}

export const CONFIG_TYPE_NAME = [
    '季度党群绩效评价规则',
    '季度创先争优评价规则',
    '季度基层党组织创先争优评价项点',
    '年度党群绩效评价规则',
    '年度创先争优评价规则',
    '年度基层党组织创先争优评价项点',
]

export const CACHE_TTL_MS = 10 * 60 * 1000 // 10分钟

