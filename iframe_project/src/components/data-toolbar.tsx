import { Button } from '@/components/ui/button'

type DataToolbarProps = {
    actions: { key: string; label: string; variant?: 'default' | 'outline' }[]
}

export function DataToolbar({ actions }: DataToolbarProps) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            {actions.map((action) => (
                <Button key={action.key} type="button" variant={action.variant ?? 'outline'} size="lg">
                    {action.label}
                </Button>
            ))}
        </div>
    )
}
