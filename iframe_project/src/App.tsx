import { useEffect, useState } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { closeOverlay } from '@/lib/shell'
import { NAV_LABEL, type NavId } from '@/lib/nav'
import { QuarterlyView } from '@/views/quarterly_view'
import { AnnualView } from '@/views/annual_view'
import { DjconfigView } from '@/views/djconfig_view'
import { DeductionView } from '@/views/deduction_view'
import { ContributionDegreeView } from '@/views/contribution_degree_view'
import { PartyOrgSelectView } from './views/party_org_select_view'

export default function App() {
    const [active, setActive] = useState<NavId>('quarterly')
    const [dark, setDark] = useState(false)

    useEffect(() => {
        function onKeydown(event: KeyboardEvent) {
            if (event.key === 'Escape') closeOverlay()
        }
        document.addEventListener('keydown', onKeydown)
        return () => document.removeEventListener('keydown', onKeydown)
    }, [])

    function toggleTheme() {
        const next = !dark
        setDark(next)
        document.documentElement.classList.toggle('dark', next)
    }

    return (
        <div className="bg-background flex h-svh overflow-hidden">
            <AppSidebar active={active} dark={dark} onNavigate={setActive} onToggleTheme={toggleTheme} onClose={closeOverlay} />
            <div className="flex min-w-0 flex-1 flex-col px-5.5 py-4.5 pb-3.5">
                {active !== 'org' ? (
                    <header className="mb-2.5 flex items-center">
                        <h1 className="text-lg font-semibold tracking-tight">{NAV_LABEL[active]}</h1>
                    </header>
                ) : null}
                {active === 'quarterly' ? <QuarterlyView /> : null}
                {active === 'annual' ? <AnnualView /> : null}
                {active === 'config' ? <DjconfigView /> : null}
                {active === 'deduction' ? <DeductionView /> : null}
                {active === 'contribution_degree' ? <ContributionDegreeView /> : null}
                {active === 'org' ? <PartyOrgSelectView /> : null}
            </div>
        </div>
    )
}