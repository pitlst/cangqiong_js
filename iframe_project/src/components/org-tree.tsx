import { ChevronRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ORG_ALL_ID, type OrgTreeNode } from '@/lib/api/org'
import { cn } from '@/lib/utils'

type OrgTreeProps = {
    roots: OrgTreeNode[]
    selectedId: string
    expandedIds: Set<string>
    onSelect: (id: string) => void
    onExpandedChange: (id: string, open: boolean) => void
}

function TreeItem({
    node,
    depth,
    selectedId,
    expandedIds,
    onSelect,
    onExpandedChange,
}: {
    node: OrgTreeNode
    depth: number
} & Omit<OrgTreeProps, 'roots'>) {
    const hasChildren = node.children.length > 0
    const open = expandedIds.has(node.id)
    const selected = selectedId === node.id

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
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className={cn('h-7 min-w-0 flex-1 justify-start px-1.5 font-normal', selected && 'bg-primary/10 text-primary hover:bg-primary/10')}
                onClick={() => onSelect(node.id)}
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
                        selectedId={selectedId}
                        expandedIds={expandedIds}
                        onSelect={onSelect}
                        onExpandedChange={onExpandedChange}
                    />
                ))}
            </CollapsibleContent>
        </Collapsible>
    )
}

export function OrgTree({ roots, selectedId, expandedIds, onSelect, onExpandedChange }: OrgTreeProps) {
    const allOpen = expandedIds.has(ORG_ALL_ID)
    const allSelected = selectedId === ORG_ALL_ID

    return (
        <ScrollArea className="h-full">
            <div className="px-1 py-1">
                <Collapsible open={allOpen} onOpenChange={(next) => onExpandedChange(ORG_ALL_ID, next)}>
                    <div className="flex min-w-0 items-center">
                        <CollapsibleTrigger render={<Button type="button" variant="ghost" size="icon-xs" className="text-muted-foreground" />}>
                            <ChevronRightIcon className={cn('size-3.5 transition-transform', allOpen && 'rotate-90')} />
                            <span className="sr-only">{allOpen ? '收起' : '展开'}</span>
                        </CollapsibleTrigger>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className={cn(
                                'h-7 min-w-0 flex-1 justify-start px-1.5 font-normal',
                                allSelected && 'bg-primary/10 text-primary hover:bg-primary/10',
                            )}
                            onClick={() => onSelect(ORG_ALL_ID)}
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
                                selectedId={selectedId}
                                expandedIds={expandedIds}
                                onSelect={onSelect}
                                onExpandedChange={onExpandedChange}
                            />
                        ))}
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </ScrollArea>
    )
}
