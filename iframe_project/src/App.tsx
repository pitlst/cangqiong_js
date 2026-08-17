import { useEffect, useState } from 'react'

import { AppSidebar } from '@/components/app-sidebar'
import { fetchDeductionItemsWithToast } from '@/lib/custom/deduction'
import { fetchOrgTreeWithToast } from '@/lib/custom/org'
import { fetchPartyQuarterlyWithToast } from '@/lib/custom/party'
import { fetchQuarterlyWithToast } from '@/lib/custom/quarterly'
import { closeOverlay } from '@/lib/shell'
import { NAV_LABEL, type NavId } from '@/lib/nav'
import { DeductionView, ConfigView, OrgView, PartyQuarterlyView, QuarterlyView, SimpleTableView } from '@/views/pages'

const ANNUAL_ACTIONS = [
    { key: 'new', label: '新增', variant: 'default' as const },
    { key: 'edit', label: '修改' },
    { key: 'del', label: '删除' },
    { key: 'calc-score', label: '计算绩效得分' },
    { key: 'calc-eval', label: '计算绩效评价结果' },
    { key: 'calc-excellence', label: '计算创先争优结果' },
    { key: 'export', label: '导出' },
]

export default function App() {
    const [active, setActive] = useState<NavId>('quarterly')
    const [dark, setDark] = useState(false)

    useEffect(() => {
        void Promise.all([
            fetchQuarterlyWithToast().catch(() => undefined),
            fetchDeductionItemsWithToast().catch(() => undefined),
            fetchPartyQuarterlyWithToast().catch(() => undefined),
            fetchOrgTreeWithToast().catch(() => undefined),
        ])
    }, [])

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
                <header className="mb-2.5 flex items-center">
                    <h1 className="text-lg font-semibold tracking-tight">{NAV_LABEL[active]}</h1>
                </header>
                {active === 'quarterly' ? <QuarterlyView /> : null}
                {active === 'annual' ? (
                    <SimpleTableView
                        exportName={NAV_LABEL.annual}
                        actions={ANNUAL_ACTIONS}
                        columns={['单据编号', '评价年度', '党组织', '党群绩效得分', '创先争优得分', '综合得分', '评价等级', '单据状态']}
                    />
                ) : null}
                {active === 'config' ? <ConfigView /> : null}
                {active === 'deduction' ? <DeductionView /> : null}
                {active === 'partyQuarterly' ? <PartyQuarterlyView /> : null}
                {active === 'org' ? <OrgView /> : null}
            </div>
        </div>
    )
}
