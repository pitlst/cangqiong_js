import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

import { DataToolbar } from '@/components/data-toolbar'
import { OrgSelectPanel, default_org_expanded } from '@/components/org-select-panel'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
    ORG_ALL_ID,
    build_tree,
    collect_table_rows,
    fetch_data,
    find_node,
    find_node_by_name,
    find_path,
    trans_data,
    type OrgTreeNode,
    type ParseOrgRow,
} from '@/lib/api/org'
import { NAV_LABEL } from '@/lib/nav'
import { get_err_message, type FetchStatus } from '@/lib/utils'

function expanded_for_id(roots: OrgTreeNode[], id: string) {
    const ids = default_org_expanded(roots)
    if (!id || id === ORG_ALL_ID) return ids
    const path = find_path(roots, id)
    path.slice(0, -1).forEach((node) => ids.add(node.id))
    ids.add(ORG_ALL_ID)
    return ids
}

function OrgSelectDialog({
    open,
    selectedName,
    onOpenChange,
    onConfirm,
}: {
    open: boolean
    selectedName: string
    onOpenChange: (open: boolean) => void
    onConfirm: (name: string) => void
}) {
    const [status, setStatus] = useState<FetchStatus>('idle')
    const [rawRows, setRawRows] = useState<ParseOrgRow[]>([])
    const [error, setError] = useState('')
    const [selectedId, setSelectedId] = useState(ORG_ALL_ID)
    const [includeSelf, setIncludeSelf] = useState(true)
    const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set([ORG_ALL_ID]))

    const roots = useMemo(() => build_tree(rawRows), [rawRows])
    const tableRows = useMemo(() => collect_table_rows(roots, selectedId, includeSelf), [roots, selectedId, includeSelf])
    const selectedNode = selectedId === ORG_ALL_ID ? null : find_node(roots, selectedId)

    async function run(force: boolean) {
        setStatus('loading')
        setError('')
        try {
            const data = force ? await fetch_data({ force: true }) : await fetch_data()
            const parsed = trans_data(data)
            const next_roots = build_tree(parsed)
            const matched = selectedName ? find_node_by_name(next_roots, selectedName) : null
            setRawRows(parsed)
            setSelectedId(matched?.id ?? ORG_ALL_ID)
            setExpandedIds(matched ? expanded_for_id(next_roots, matched.id) : default_org_expanded(next_roots))
            setStatus('ready')
        } catch (err) {
            setError(get_err_message(err))
            setStatus('error')
        }
    }

    useEffect(() => {
        if (!open) return
        void run(false)
    }, [open])

    function handleExpandedChange(id: string, nextOpen: boolean) {
        setExpandedIds((prev) => {
            const next = new Set(prev)
            if (nextOpen) next.add(id)
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

    function confirm() {
        if (!selectedNode) {
            toast.error('请先选择党组织')
            return
        }
        onConfirm(selectedNode.name)
    }

    const loading = status === 'loading'
    const emptyText = status === 'loading' ? '正在加载党组织…' : status === 'error' ? error || '加载失败' : '暂无党组织'

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="z-[70] flex h-[90vh] max-h-[90vh] w-full flex-col gap-3 overflow-hidden sm:max-w-[96vw]"
                overlayClassName="z-[60]"
            >
                <DialogHeader className="flex shrink-0 flex-row items-center justify-between gap-2 pr-8">
                    <DialogTitle>{NAV_LABEL.org}</DialogTitle>
                    <DataToolbar
                        actions={[{ key: 'refresh', label: status === 'loading' ? '加载中…' : '刷新', variant: 'default', disabled: loading }]}
                        onAction={(key) => {
                            if (key === 'refresh') void run(true)
                        }}
                    />
                </DialogHeader>
                <OrgSelectPanel
                    roots={roots}
                    tableRows={tableRows}
                    selectedId={selectedId}
                    includeSelf={includeSelf}
                    expandedIds={expandedIds}
                    emptyText={emptyText}
                    includeSelfId="org-picker-include-self"
                    onSelect={select_node}
                    onIncludeSelfChange={setIncludeSelf}
                    onExpandedChange={handleExpandedChange}
                />
                <DialogFooter className="shrink-0">
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                        取消
                    </Button>
                    <Button type="button" disabled={!selectedNode} onClick={confirm}>
                        确定
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export function OrgSelectField({
    id,
    value,
    disabled,
    onChange,
    onOpenChange,
}: {
    id?: string
    value: string
    disabled?: boolean
    onChange: (name: string) => void
    onOpenChange?: (open: boolean) => void
}) {
    const [open, setOpen] = useState(false)

    function setPickerOpen(next: boolean) {
        setOpen(next)
        onOpenChange?.(next)
    }

    return (
        <>
            <Input
                id={id}
                readOnly
                required
                aria-required
                aria-haspopup="dialog"
                placeholder="请选择党组织"
                className="cursor-pointer"
                value={value}
                disabled={disabled}
                onClick={() => {
                    if (!disabled) setPickerOpen(true)
                }}
                onKeyDown={(event) => {
                    if (disabled) return
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        setPickerOpen(true)
                    }
                }}
            />
            <OrgSelectDialog
                open={open}
                selectedName={value}
                onOpenChange={setPickerOpen}
                onConfirm={(name) => {
                    onChange(name)
                    setPickerOpen(false)
                }}
            />
        </>
    )
}
