import { NavLink, Route, Routes } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AboutPage } from '@/pages/About'
import { HomePage } from '@/pages/Home'

function navClassName({ isActive }: { isActive: boolean }) {
    return cn(buttonVariants({ variant: isActive ? 'default' : 'ghost', size: 'sm' }))
}

export default function App() {
    return (
        <div className="bg-background flex min-h-svh flex-col">
            <header className="border-b">
                <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 py-3">
                    <span className="font-heading text-sm font-medium">iframe_project</span>
                    <nav className="flex items-center gap-1">
                        <NavLink to="/" end className={navClassName}>
                            首页
                        </NavLink>
                        <NavLink to="/about" className={navClassName}>
                            关于
                        </NavLink>
                    </nav>
                </div>
            </header>
            <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-8">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </main>
        </div>
    )
}
