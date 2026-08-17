import { CQ_OPENAPI } from '@/lib/openapi/config'

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '0.0.0.0'])

/** 本地 dev / preview 走 Vite 代理（同源）；其它环境走配置的苍穹网关（跨域 + mode:cors） */
export function resolveApiBase(): string {
    if (import.meta.env.DEV) return '/ierp'
    try {
        const host = window.location.hostname
        if (LOCAL_HOSTS.has(host)) return '/ierp'
    } catch {
        /* ignore */
    }
    return CQ_OPENAPI.gateway.replace(/\/$/, '')
}

export function cqApiUrl(path: string): string {
    const base = resolveApiBase()
    const suffix = path.startsWith('/') ? path : `/${path}`
    if (base.startsWith('http')) return `${base}${suffix}`
    return `${base}${suffix}`
}

export function cqFetch(input: string, init?: RequestInit): Promise<Response> {
    const useCors = resolveApiBase().startsWith('http')
    return fetch(input, {
        ...init,
        mode: useCors ? 'cors' : init?.mode,
        credentials: init?.credentials ?? 'omit',
    })
}

export function randomNonce(): string {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()
    return `n${Date.now()}-${Math.random().toString(16).slice(2)}`
}
