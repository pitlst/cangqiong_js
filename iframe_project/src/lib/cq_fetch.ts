import { CQ_OPENAPI } from '@/lib/config'

type CqQueryValue = string | number | boolean | undefined | null
type CqQuery = Record<string, CqQueryValue>

/** 在 kapi 请求 URL 上追加 openApiSign 及其他 Query 参数 */
export function build_cq_url(path: string, query: CqQuery = {}): string {
    const params = new URLSearchParams()
    for (const [key, value] of Object.entries(query)) {
        if (value != null && value !== '') {
            params.set(key, String(value))
        }
    }
    params.set('openApiSign', CQ_OPENAPI.openApiSign)
    return `${CQ_OPENAPI.gateway}${path}?${params.toString()}`
}

/** 带基本认证（openApiSign）的 fetch 封装 */
export function cq_fetch(path: string, init: RequestInit & { query?: CqQuery } = {}): Promise<Response> {
    const { query, headers, ...rest } = init
    return fetch(build_cq_url(path, query), {
        mode: 'cors',
        ...rest,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    })
}
