import { CQ_OPENAPI, CQ_API_PATH } from '@/lib/openapi/config'
import { cqApiUrl, cqFetch, randomNonce } from '@/lib/openapi/runtime'

export type CqPageQuery = {
    data?: Record<string, unknown>
    pageNo?: number
    pageSize?: number
}

export type CqPageData<T = Record<string, unknown>> = {
    rows?: T[]
    pageNo?: number
    pageSize?: number
    totalCount?: number
    lastPage?: boolean
    filter?: unknown
}

export type CqApiResponse<T = unknown> = {
    status?: boolean
    data?: T
    message?: string | null
    errorCode?: string
}

type TokenCache = {
    token: string
    expiresAt: number
}

let tokenCache: TokenCache | null = null
let tokenTask: Promise<string> | null = null

function pad(n: number) {
    return String(n).padStart(2, '0')
}

function formatTimestamp(date: Date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

function parseExpiresIn(value: unknown) {
    const n = Number(value)
    if (!Number.isFinite(n) || n <= 0) return 7200
    return n
}

export function cqErrorMessage(err: unknown) {
    if (err instanceof TypeError && /fetch|network/i.test(err.message)) {
        return '网络请求失败：跨域被拦截或无法连接苍穹 OpenAPI。本地请用 pnpm dev（已配置 /ierp 代理）；苍穹内嵌需服务端开启 CORS（允许 access_token 头）'
    }
    if (err instanceof Error && err.message) return err.message
    return String(err || '未知错误')
}

async function readJson<T>(res: Response): Promise<T> {
    const text = await res.text()
    try {
        return JSON.parse(text) as T
    } catch {
        throw new Error(`响应非 JSON (HTTP ${res.status}): ${text.slice(0, 300)}`)
    }
}

export async function getAccessToken(force = false): Promise<string> {
    if (!force && tokenCache && tokenCache.expiresAt > Date.now() + 60_000) {
        return tokenCache.token
    }
    if (!force && tokenTask) return tokenTask

    const task = (async () => {
        const body = {
            client_id: CQ_OPENAPI.clientId,
            client_secret: CQ_OPENAPI.clientSecret,
            username: CQ_OPENAPI.username,
            accountId: CQ_OPENAPI.accountId,
            language: CQ_OPENAPI.language,
            nonce: randomNonce(),
            timestamp: formatTimestamp(new Date()),
        }

        const res = await cqFetch(cqApiUrl('/kapi/oauth2/getToken'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })

        const json = await readJson<CqApiResponse<{ access_token?: string; expires_in?: string | number }>>(res)
        if (!json.status || !json.data?.access_token) {
            throw new Error(json.message || json.errorCode || '获取 access_token 失败')
        }

        const expiresIn = parseExpiresIn(json.data.expires_in)
        tokenCache = {
            token: json.data.access_token,
            expiresAt: Date.now() + expiresIn * 1000,
        }
        return tokenCache.token
    })()

    tokenTask = task
    try {
        return await task
    } finally {
        if (tokenTask === task) tokenTask = null
    }
}

export async function cqPost<T>(path: string, body: unknown, retry = true): Promise<CqApiResponse<T>> {
    const token = await getAccessToken()
    const res = await cqFetch(cqApiUrl(path), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            access_token: token,
        },
        body: JSON.stringify(body),
    })

    const json = await readJson<CqApiResponse<T>>(res)
    if (!json.status) {
        const code = String(json.errorCode || '')
        const msg = String(json.message || '')
        if (retry && (code === '401' || msg.includes('token') || msg.includes('Token'))) {
            await getAccessToken(true)
            return cqPost(path, body, false)
        }
        throw new Error(msg || code || 'OpenAPI 请求失败')
    }
    return json
}

export async function cqQueryPage<T extends Record<string, unknown> = Record<string, unknown>>(
    path: string,
    query: CqPageQuery = {},
): Promise<CqPageData<T>> {
    const pageNo = query.pageNo || 1
    const pageSize = query.pageSize || CQ_OPENAPI.pageSize
    const json = await cqPost<CqPageData<T>>(path, {
        data: query.data || {},
        pageNo,
        pageSize,
    })
    return json.data || { rows: [], pageNo, pageSize, lastPage: true, totalCount: 0 }
}

export async function cqQueryAll<T extends Record<string, unknown> = Record<string, unknown>>(
    path: string,
    query: Omit<CqPageQuery, 'pageNo'> = {},
): Promise<T[]> {
    const pageSize = query.pageSize || CQ_OPENAPI.pageSize
    const rows: T[] = []
    let pageNo = 1
    let lastPage = false

    while (!lastPage && pageNo <= CQ_OPENAPI.maxPages) {
        const page = await cqQueryPage<T>(path, { ...query, pageNo, pageSize })
        const batch = Array.isArray(page.rows) ? page.rows : []
        rows.push(...batch)
        lastPage = !!page.lastPage || batch.length < pageSize
        if (!batch.length) break
        pageNo += 1
    }

    return rows
}

export { CQ_API_PATH }
