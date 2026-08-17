import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function AboutPage() {
    return (
        <Card className="max-w-lg">
            <CardHeader>
                <CardTitle>关于</CardTitle>
                <CardDescription>使用 HashRouter，可直接用 file:// 或 iframe 打开，不依赖服务端路由。</CardDescription>
            </CardHeader>
            <CardContent>
                <Button variant="secondary" render={<Link to="/" />}>
                    返回首页
                </Button>
            </CardContent>
        </Card>
    )
}
