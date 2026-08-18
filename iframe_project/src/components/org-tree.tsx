import { ChevronRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ScrollArea } from '@/components/ui/scroll-area'
import { flatten_tree, ORG_ALL_ID, type OrgTreeNode } from '@/lib/api/org'
import { cn } from '@/lib/utils'

type OrgTreeBase = {
    roots: OrgTreeNode[]
    expandedIds: Set<string>
    onExpandedChange: (id: string, open: boolean) => void
}

type OrgTreeSingle = OrgTreeBase & {
    multiple?: false
    selectedId: string
    onSelect: (id: string) => void
}

type OrgTreeMultiple = OrgTreeBase & {
    multiple: true
    selectedIds: Set<string>
    onSelectedIdsChange: (ids: Set<string>) => void
}

export type OrgTreeProps = OrgTreeSingle | OrgTreeMultiple

type TreeItemShared = {
    node: OrgTreeNode
    depth: number
    expandedIds: Set<string>
    onExpandedChange: (id: string, open: boolean) => void
    multiple: boolean
    isSelected: (id: string) => boolean
    onItemClick: (id: string) => void
}

function TreeItem({ node, depth, expandedIds, onExpandedChange, multiple, isSelected, onItemClick }: TreeItemShared) {
    const hasChildren = node.children.length > 0
    const open = expandedIds.has(node.id)
    const selected = isSelected(node.id)

    const row = (
        <div className="flex min-w-0 items-center" style={{ paddingLeft: depth * 12 }}>
            {hasChildren ? (
                <CollapsibleTrigger render={<Button type="button" variant="ghost" size="icon-xs" className="text-muted-foreground" />}>
                    <ChevronRightIcon className={cn('size-3.5 transition-transform', open && 'rotate-90')} />
                    <span className="sr-only">{open ? '收起' : '展开'}</span>
                </CollapsibleTrigger>
            ) : (
                <span className="size-5 shrink-0" />
            )}
            {multiple ? (
                <Checkbox
                    checked={selected}
                    className="mr-1"
                    onClick={(event) => event.stopPropagation()}
                    onCheckedChange={() => onItemClick(node.id)}
                />
            ) : null}
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className={cn('h-7 min-w-0 flex-1 justify-start px-1.5 font-normal', selected && 'bg-primary/10 text-primary hover:bg-primary/10')}
                onClick={() => onItemClick(node.id)}
            >
                <span className="truncate">{node.name}</span>
            </Button>
        </div>
    )

    if (!hasChildren) return row

    return (
        <Collapsible open={open} onOpenChange={(next) => onExpandedChange(node.id, next)}>
            {row}
            <CollapsibleContent>
                {node.children.map((child) => (
                    <TreeItem
                        key={child.id}
                        node={child}
                        depth={depth + 1}
                        expandedIds={expandedIds}
                        onExpandedChange={onExpandedChange}
                        multiple={multiple}
                        isSelected={isSelected}
                        onItemClick={onItemClick}
                    />
                ))}
            </CollapsibleContent>
        </Collapsible>
    )
}

export function OrgTree(props: OrgTreeProps) {
    const { roots, expandedIds, onExpandedChange } = props
    const allIds = props.multiple === true ? flatten_tree(roots).map((node) => node.id) : []
    const selectedCount = props.multiple === true ? allIds.filter((id) => props.selectedIds.has(id)).length : 0
    const allChecked = props.multiple === true && allIds.length > 0 && selectedCount === allIds.length
    const allOpen = expandedIds.has(ORG_ALL_ID)
    const allSelected = props.multiple === true ? allChecked : props.selectedId === ORG_ALL_ID

    function isSelected(id: string) {
        return props.multiple === true ? props.selectedIds.has(id) : props.selectedId === id
    }

    function onItemClick(id: string) {
        if (props.multiple !== true) {
            props.onSelect(id)
            return
        }
        const next = new Set(props.selectedIds)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        props.onSelectedIdsChange(next)
    }

    function onAllClick() {
        if (props.multiple !== true) {
            props.onSelect(ORG_ALL_ID)
            return
        }
        const next = new Set(props.selectedIds)
        if (allChecked) {
            for (const id of allIds) next.delete(id)
        } else {
            for (const id of allIds) next.add(id)
        }
        props.onSelectedIdsChange(next)
    }

    return (
        <ScrollArea className="h-full">
            <div className="px-1 py-1">
                <Collapsible open={allOpen} onOpenChange={(next) => onExpandedChange(ORG_ALL_ID, next)}>
                    <div className="flex min-w-0 items-center">
                        <CollapsibleTrigger render={<Button type="button" variant="ghost" size="icon-xs" className="text-muted-foreground" />}>
                            <ChevronRightIcon className={cn('size-3.5 transition-transform', allOpen && 'rotate-90')} />
                            <span className="sr-only">{allOpen ? '收起' : '展开'}</span>
                        </CollapsibleTrigger>
                        {props.multiple === true ? (
                            <Checkbox
                                checked={allChecked}
                                className="mr-1"
                                onClick={(event) => event.stopPropagation()}
                                onCheckedChange={() => onAllClick()}
                            />
                        ) : null}
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className={cn(
                                'h-7 min-w-0 flex-1 justify-start px-1.5 font-normal',
                                allSelected && 'bg-primary/10 text-primary hover:bg-primary/10',
                            )}
                            onClick={onAllClick}
                        >
                            全部
                        </Button>
                    </div>
                    <CollapsibleContent>
                        {roots.map((node) => (
                            <TreeItem
                                key={node.id}
                                node={node}
                                depth={1}
                                expandedIds={expandedIds}
                                onExpandedChange={onExpandedChange}
                                multiple={props.multiple === true}
                                isSelected={isSelected}
                                onItemClick={onItemClick}
                            />
                        ))}
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </ScrollArea>
    )
}
