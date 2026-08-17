import { useEffect, useState } from 'react'
import { ClockIcon } from 'lucide-react'
import { toast } from 'sonner'

import { AppSidebar } from '@/components/app-sidebar'
import { fetchDeductionItemsWithToast } from '@/lib/cangqiong/deduction'
import { canFetchFromCangqiong } from '@/lib/cangqiong/session'
import { NAV_LABEL, type NavId } from '@/lib/nav'
import { DeductionView, OrgView, QuarterlyView, SimpleTableView } from '@/views/pages'

const ANNUAL_ACTIONS = [
    { key: 'new', label: '新增', variant: 'default' as const },
    { key: 'edit', label: '修改' },
    { key: 'del', label: '删除' },
    { key: 'calc-score', label: '计算绩效得分' },
    { key: 'calc-eval', label: '计算绩效评价结果' },
    { key: 'calc-excellence', label: '计算创先争优结果' },
    { key: 'export', label: '导出' },
]

const CONFIG_ACTIONS = [
    { key: 'new', label: '新增', variant: 'default' as const },
    { key: 'edit', label: '修改' },
    { key: 'del', label: '删除' },
    { key: 'export', label: '导出' },
]

export default function App() {
    const [active, setActive] = useState<NavId>('quarterly')
    const [dark, setDark] = useState(false)

    useEffect(() => {
        toast('配置项已加载', {
            description: '当前没有配置项',
            icon: <ClockIcon className="size-4" />,
            closeButton: true,
            duration: Infinity,
        })
        if (!canFetchFromCangqiong()) return
        void fetchDeductionItemsWithToast().catch(() => undefined)
    }, [])

    function toggleTheme() {
        const next = !dark
        setDark(next)
        document.documentElement.classList.toggle('dark', next)
    }

    return (
        <div className="bg-background flex h-svh overflow-hidden">
            <AppSidebar active={active} dark={dark} onNavigate={setActive} onToggleTheme={toggleTheme} onClose={() => undefined} />
            <div className="flex min-w-0 flex-1 flex-col px-5.5 py-4.5 pb-3.5">
                <header className="mb-2.5 flex items-center">
                    <h1 className="text-lg font-semibold tracking-tight">{NAV_LABEL[active]}</h1>
                </header>
                {active === 'quarterly' ? <QuarterlyView /> : null}
                {active === 'annual' ? (
                    <SimpleTableView
                        actions={ANNUAL_ACTIONS}
                        columns={['单据编号', '评价年度', '党组织', '党群绩效得分', '创先争优得分', '综合得分', '评价等级', '单据状态']}
                    />
                ) : null}
                {active === 'config' ? <SimpleTableView actions={CONFIG_ACTIONS} columns={['编码', '名称', '说明', '更新时间']} /> : null}
                {active === 'deduction' ? <DeductionView /> : null}
                {active === 'partyQuarterly' ? (
                    <SimpleTableView actions={[{ key: 'export', label: '导出' }]} columns={['单据编号', '评价季度', '党组织', '绩效得分', '单据状态']} />
                ) : null}
                {active === 'org' ? <OrgView /> : null}
            </div>
        </div>
    )
}
