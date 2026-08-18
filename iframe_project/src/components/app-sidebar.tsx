import { MoonIcon, SunIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { NAV_LABEL, PRIMARY_NAV, SOURCE_NAV, type NavId } from '@/lib/nav'
import { cn } from '@/lib/utils'

type AppSidebarProps = {
    active: NavId
    dark: boolean
    onNavigate: (id: NavId) => void
    onToggleTheme: () => void
    onClose: () => void
}

function NavButton({ id, active, onNavigate }: { id: NavId; active: NavId; onNavigate: (id: NavId) => void }) {
    const isActive = id === active
    return (
        <Button
            type="button"
            variant="ghost"
            role="tab"
            aria-selected={isActive}
            onClick={() => onNavigate(id)}
            className={cn(
                'relative h-auto min-h-9.5 w-full justify-start rounded-md px-3.5 text-left text-sm font-medium',
                isActive
                    ? 'bg-primary/12 text-foreground hover:bg-primary/12'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            )}
        >
            <span
                className={cn(
                    'bg-sidebar-primary absolute top-1/2 left-0 h-4.5 w-0.75 -translate-y-1/2 rounded-r-sm transition-opacity',
                    isActive ? 'opacity-100' : 'opacity-0',
                )}
            />
            {NAV_LABEL[id]}
        </Button>
    )
}

export function AppSidebar({ active, dark, onNavigate, onToggleTheme, onClose }: AppSidebarProps) {
    return (
        <aside className="bg-sidebar/92 border-sidebar-border flex w-55 shrink-0 flex-col border-r backdrop-blur-md">
            <div className="border-sidebar-border border-b px-4 pt-5 pb-3.5">
                <span className="text-sidebar-foreground block text-base leading-snug font-semibold tracking-tight">党群绩效与创先争优评价</span>
                <span className="text-muted-foreground mt-0.5 block text-xs">党委组织部绩效输出管理</span>
            </div>
            <ScrollArea className="min-h-0 flex-1">
                <nav className="flex flex-col gap-1 px-2.5 py-3" role="tablist" aria-label="主导航">
                    {PRIMARY_NAV.map((item) => (
                        <NavButton key={item.id} id={item.id} active={active} onNavigate={onNavigate} />
                    ))}
                    <span className="text-muted-foreground px-3.5 pt-2.5 pb-1 text-xs font-semibold tracking-wider select-none">来源数据</span>
                    {SOURCE_NAV.map((item) => (
                        <NavButton key={item.id} id={item.id} active={active} onNavigate={onNavigate} />
                    ))}
                </nav>
            </ScrollArea>
            <div className="border-sidebar-border flex items-center gap-2 border-t px-3.5 py-3">
                <Tooltip>
                    <TooltipTrigger
                        render={
                            <Button variant="outline" size="icon-sm" type="button" aria-label="切换暗色模式" onClick={onToggleTheme}>
                                {dark ? <SunIcon /> : <MoonIcon />}
                            </Button>
                        }
                    />
                    <TooltipContent>切换暗色模式</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger
                        render={
                            <Button variant="outline" size="icon-sm" type="button" aria-label="关闭" onClick={onClose}>
                                <XIcon />
                            </Button>
                        }
                    />
                    <TooltipContent>关闭 (Esc)</TooltipContent>
                </Tooltip>
            </div>
        </aside>
    )
}
