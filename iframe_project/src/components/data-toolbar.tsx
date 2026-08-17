import { Button } from '@/components/ui/button'

type DataToolbarProps = {
    actions: { key: string; label: string; variant?: 'default' | 'outline'; disabled?: boolean }[]
    onAction?: (key: string) => void
}

export function DataToolbar({ actions, onAction }: DataToolbarProps) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            {actions.map((action) => (
                <Button
                    key={action.key}
                    type="button"
                    variant={action.variant ?? 'outline'}
                    size="lg"
                    disabled={action.disabled}
                    onClick={() => onAction?.(action.key)}
                >
                    {action.label}
                </Button>
            ))}
        </div>
    )
}
