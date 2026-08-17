export const UI_FRAME_ID = '__iframe_project_root__'

function removeElement(el: Element | null) {
    if (!el || !el.parentNode) return false
    try {
        el.parentNode.removeChild(el)
        return true
    } catch {
        return false
    }
}

function hostDocument() {
    try {
        return window.parent.document
    } catch {
        return document
    }
}

export function closeOverlay() {
    const candidates: Element[] = []
    try {
        if (window.frameElement) candidates.push(window.frameElement)
    } catch {
        /* ignore */
    }
    try {
        const byId = hostDocument().getElementById(UI_FRAME_ID)
        if (byId) candidates.push(byId)
    } catch {
        /* ignore */
    }
    try {
        if (window.parent && window.parent !== window) {
            const byId = window.parent.document.getElementById(UI_FRAME_ID)
            if (byId) candidates.push(byId)
        }
    } catch {
        /* ignore */
    }
    const seen: Element[] = []
    let removed = false
    for (const el of candidates) {
        if (seen.includes(el)) continue
        seen.push(el)
        if (removeElement(el)) removed = true
    }
    if (removed) return
    try {
        const root = document.getElementById('root')
        if (root) root.replaceChildren()
    } catch {
        /* ignore */
    }
}
