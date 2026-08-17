import { toast } from 'sonner'

import { CQ_API_PATH } from '@/lib/openapi/config'
import { cqErrorMessage, cqQueryAll } from '@/lib/openapi/client'
import { mapOrgTree } from '@/lib/custom/org.mapper'
import type { OrgNode } from '@/lib/table-types'

export const ORG_TOAST_ID = 'cq-org-load'

let orgTask: Promise<OrgNode> | null = null
let lastOrgTree: OrgNode | null = null
let lastOrgError = ''

export function getCachedOrgTree() {
    return lastOrgTree
}

export function getCachedOrgError() {
    return lastOrgError
}

async function loadOrgTreeFromOpenApi(): Promise<OrgNode> {
    const rows = await cqQueryAll<Record<string, unknown>>(CQ_API_PATH.org, { data: {} })
    return mapOrgTree(rows)
}

export function fetchOrgTree(options?: { force?: boolean }): Promise<OrgNode> {
    if (!options?.force && lastOrgTree) return Promise.resolve(lastOrgTree)
    if (orgTask) return orgTask

    lastOrgError = ''
    const task = loadOrgTreeFromOpenApi()
        .then((tree) => {
            lastOrgTree = tree
            return tree
        })
        .catch((err: unknown) => {
            lastOrgError = cqErrorMessage(err)
            throw err
        })
        .finally(() => {
            if (orgTask === task) orgTask = null
        })

    orgTask = task
    return task
}

export async function fetchOrgTreeWithToast(options?: { force?: boolean }) {
    toast.loading('正在加载党组织…', { id: ORG_TOAST_ID })
    try {
        const tree = await fetchOrgTree(options)
        const count = countOrgNodes(tree)
        toast.success('党组织加载成功', {
            id: ORG_TOAST_ID,
            description: count ? `共 ${count} 个节点` : '组织树为空',
            closeButton: true,
        })
        return tree
    } catch (err) {
        toast.error('党组织加载失败', {
            id: ORG_TOAST_ID,
            description: cqErrorMessage(err),
            closeButton: true,
        })
        throw err
    }
}

function countOrgNodes(node: OrgNode | null): number {
    if (!node) return 0
    let n = node.id === 'all' ? 0 : 1
    for (const child of node.children || []) n += countOrgNodes(child)
    return n
}
