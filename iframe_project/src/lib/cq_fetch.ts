import { format } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'
import { CQ_OPENAPI } from '@/lib/config'

type TokenCache = {
    token: string
    expiresAt: number
}

type CqApiResponse = {
    status?: boolean
    data?: {
        access_token?: string
        expires_in?: string | number
    } | null
    message?: string | null
    errorCode?: string
}

let token_cache: TokenCache | null = null
let token_task: Promise<string> | null = null

function get_expire(value: string | number | undefined): number {
    const n = Number(value)
    const sec = Number.isFinite(n) && n > 0 ? n : 7200
    return Date.now() + sec * 1000
}

/** 断言：校验 token 响应，失败直接抛错，通过则收窄类型 */
function assert_token_response(res: CqApiResponse): asserts res is CqApiResponse & {
    status: true
    data: {
        access_token: string
        expires_in: string | number
    }
} {
    if (res.status !== true) {
        throw new Error(`获取 token 失败: ${res.message || '未知错误'} (errorCode: ${res.errorCode || '无'})`)
    }
    if (!res.data) {
        throw new Error(`获取 token 失败: 响应缺少 data 字段 (errorCode: ${res.errorCode || '无'})`)
    }
    if (!res.data.access_token) {
        throw new Error(`获取 token 失败: 响应缺少 access_token。` + `data: ${JSON.stringify(res.data)}, message: ${res.message}`)
    }
    if (res.data.expires_in == null) {
        throw new Error(`获取 token 失败: 响应缺少 expires_in。` + `data: ${JSON.stringify(res.data)}, message: ${res.message}`)
    }
}

export async function get_access_token(force = false): Promise<string> {
    if (!force && token_cache && token_cache.expiresAt > Date.now() + 60_000) {
        return token_cache.token
    }
    if (!force && token_task) return token_task

    const task = (async () => {
        const body = {
            client_id: CQ_OPENAPI.clientId,
            client_secret: CQ_OPENAPI.clientSecret,
            username: CQ_OPENAPI.username,
            accountId: CQ_OPENAPI.accountId,
            language: CQ_OPENAPI.language,
            nonce: uuidv4(),
            timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        }
        const res = await fetch(CQ_OPENAPI.gateway + '/kapi/oauth2/getToken', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
        const res_json = (await res.json()) as CqApiResponse
        assert_token_response(res_json)
        token_cache = {
            token: res_json.data.access_token,
            expiresAt: get_expire(res_json.data.expires_in),
        }
        return token_cache.token
    })()

    token_task = task
    try {
        return await task
    } finally {
        if (token_task === task) token_task = null
    }
}
