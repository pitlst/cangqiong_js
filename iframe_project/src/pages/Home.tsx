import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function HomePage() {
    return (
        <Card className="max-w-lg">
            <CardHeader>
                <CardTitle>单文件前端已就绪</CardTitle>
                <CardDescription>Vite + React + React Router + shadcn/ui。构建产物只有一个 HTML，无需后端。</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                <Button render={<Link to="/about" />}>查看关于</Button>
                <Button variant="outline" type="button">
                    主题 preset b4hZZQzHk
                </Button>
            </CardContent>
        </Card>
    )
}
