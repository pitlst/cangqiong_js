import { useEffect, useRef, useState } from 'react'

import { Input } from '@/components/ui/input'

export function AdminEvalCell({
    value,
    disabled,
    onCommit,
}: {
    value: string
    disabled?: boolean
    onCommit: (next: string) => void | Promise<void>
}) {
    const [draft, setDraft] = useState(value)
    const [busy, setBusy] = useState(false)
    const skip_commit = useRef(false)

    useEffect(() => {
        setDraft(value)
    }, [value])

    async function commit() {
        if (skip_commit.current) {
            skip_commit.current = false
            setDraft(value)
            return
        }
        if (disabled || busy) return
        const next = draft.trim()
        if (next === value.trim()) {
            setDraft(value)
            return
        }
        setBusy(true)
        try {
            await onCommit(next)
        } catch {
            setDraft(value)
        } finally {
            setBusy(false)
        }
    }

    return (
        <Input
            className="h-7 min-w-20"
            value={draft}
            disabled={disabled || busy}
            title={disabled ? '已提交单据不能修改' : '失焦后自动保存'}
            onMouseDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
            onChange={(event) => setDraft(event.target.value)}
            onBlur={() => void commit()}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    event.preventDefault()
                    event.currentTarget.blur()
                }
                if (event.key === 'Escape') {
                    skip_commit.current = true
                    setDraft(value)
                    event.currentTarget.blur()
                }
            }}
        />
    )
}
