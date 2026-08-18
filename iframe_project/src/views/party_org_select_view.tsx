import { useEffect, useMemo, useState } from 'react'

import { DataToolbar } from '@/components/data-toolbar'
import { OrgSelectPanel, default_org_expanded } from '@/components/org-select-panel'
import { ORG_ALL_ID, build_tree, collect_table_rows, fetch_data, find_path, trans_data, type ParseOrgRow } from '@/lib/api/org'
import { NAV_LABEL } from '@/lib/nav'
import { get_err_message, type FetchStatus } from '@/lib/utils'

export function PartyOrgSelectView() {
    const [status, setStatus] = useState<FetchStatus>('idle')
    const [rawRows, setRawRows] = useState<ParseOrgRow[]>([])
    const [error, setError] = useState('')
    const [selectedId, setSelectedId] = useState(ORG_ALL_ID)
    const [includeSelf, setIncludeSelf] = useState(true)
    const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set([ORG_ALL_ID]))

    const roots = useMemo(() => build_tree(rawRows), [rawRows])
    const tableRows = useMemo(() => collect_table_rows(roots, selectedId, includeSelf), [roots, selectedId, includeSelf])

    async function run(force: boolean) {
        setStatus('loading')
        setError('')
        try {
            const data = force ? await fetch_data({ force: true }) : await fetch_data()
            const parsed = trans_data(data)
            const next_roots = build_tree(parsed)
            setRawRows(parsed)
            setSelectedId(ORG_ALL_ID)
            setExpandedIds(default_org_expanded(next_roots))
            setStatus('ready')
        } catch (err) {
            setError(get_err_message(err))
            setStatus('error')
        }
    }

    useEffect(() => {
        void run(false)
    }, [])

    function handleExpandedChange(id: string, open: boolean) {
        setExpandedIds((prev) => {
            const next = new Set(prev)
            if (open) next.add(id)
            else next.delete(id)
            return next
        })
    }

    function select_node(id: string) {
        setSelectedId(id)
        if (id === ORG_ALL_ID) {
            handleExpandedChange(ORG_ALL_ID, true)
            return
        }
        const path = find_path(roots, id)
        setExpandedIds((prev) => {
            const next = new Set(prev)
            next.add(ORG_ALL_ID)
            path.slice(0, -1).forEach((node) => next.add(node.id))
            return next
        })
    }

    const loading = status === 'loading'
    const emptyText = status === 'loading' ? '正在加载党组织…' : status === 'error' ? error || '加载失败' : '暂无党组织'

    return (
        <div className="relative flex min-h-0 flex-1 flex-col">
            <header className="mb-2.5 flex items-center justify-between gap-2">
                <h1 className="text-lg font-semibold tracking-tight">{NAV_LABEL.org}</h1>
                <DataToolbar
                    actions={[{ key: 'refresh', label: status === 'loading' ? '加载中…' : '刷新', variant: 'default', disabled: loading }]}
                    onAction={(key) => {
                        if (key === 'refresh') void run(true)
                    }}
                />
            </header>
            <OrgSelectPanel
                roots={roots}
                tableRows={tableRows}
                selectedId={selectedId}
                includeSelf={includeSelf}
                expandedIds={expandedIds}
                emptyText={emptyText}
                onSelect={select_node}
                onIncludeSelfChange={setIncludeSelf}
                onExpandedChange={handleExpandedChange}
            />
        </div>
    )
}
