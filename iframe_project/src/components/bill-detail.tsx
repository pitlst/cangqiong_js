import { type ReactNode } from 'react'
import { ChevronDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Field, FieldContent, FieldLabel } from '@/components/ui/field'
import { cn } from '@/lib/utils'

export function InfoField({ label, children }: { label: string; children: ReactNode }) {
    return (
        <Field orientation="horizontal" className="min-h-8 items-start gap-3">
            <FieldLabel className="text-muted-foreground w-20 shrink-0 pt-0.5 font-normal">{label}</FieldLabel>
            <FieldContent className="min-w-0 text-sm">{children}</FieldContent>
        </Field>
    )
}

export function DetailSection({
    title,
    extra,
    defaultOpen = true,
    className,
    children,
}: {
    title: string
    extra?: ReactNode
    defaultOpen?: boolean
    className?: string
    children: ReactNode
}) {
    return (
        <Collapsible defaultOpen={defaultOpen} className={cn('flex min-h-0 flex-col overflow-hidden', className)}>
            <div className="flex shrink-0 items-center gap-2 py-2">
                <CollapsibleTrigger
                    render={
                        <Button type="button" variant="ghost" className="h-auto min-w-0 flex-1 justify-start gap-2 px-1.5 text-left" />
                    }
                >
                    <span className="bg-primary h-4 w-0.75 shrink-0 rounded-sm" />
                    <span className="text-sm font-medium">{title}</span>
                    <ChevronDownIcon className="text-muted-foreground size-4 -rotate-90 transition-transform in-data-panel-open:rotate-0" />
                </CollapsibleTrigger>
                {extra}
            </div>
            <CollapsibleContent className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</CollapsibleContent>
        </Collapsible>
    )
}
