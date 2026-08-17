import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function get_err_message(err: unknown) {
    if (err instanceof Error && err.message) {
        return err.message
    }
    return String(err || '未知错误')
}

export type FetchStatus = 'idle' | 'loading' | 'ready' | 'error'
