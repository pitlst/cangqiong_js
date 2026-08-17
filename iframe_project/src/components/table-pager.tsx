import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type TablePagerProps = {
    page: number
    pageCount: number
    pageSize: number
    onPageChange: (page: number) => void
    onPageSizeChange: (size: number) => void
}

export function TablePager({ page, pageCount, pageSize, onPageChange, onPageSizeChange }: TablePagerProps) {
    return (
        <div className="flex items-center justify-between gap-3 pt-1">
            <p className="text-muted-foreground text-xs">
                第 {page} / {Math.max(pageCount, 1)} 页
            </p>
            <Pagination className="mx-0 w-auto justify-end">
                <PaginationContent>
                    <PaginationItem>
                        <Button type="button" variant="outline" size="icon-sm" aria-label="上一页" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
                            <ChevronLeftIcon />
                        </Button>
                    </PaginationItem>
                    <PaginationItem>
                        <Button
                            type="button"
                            variant="outline"
                            size="icon-sm"
                            aria-label="下一页"
                            disabled={page >= pageCount}
                            onClick={() => onPageChange(page + 1)}
                        >
                            <ChevronRightIcon />
                        </Button>
                    </PaginationItem>
                    <PaginationItem>
                        <Select value={String(pageSize)} onValueChange={(value) => onPageSizeChange(Number(value))}>
                            <SelectTrigger size="sm" className="min-w-24">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent align="end">
                                <SelectItem value="10">10 条/页</SelectItem>
                                <SelectItem value="20">20 条/页</SelectItem>
                                <SelectItem value="50">50 条/页</SelectItem>
                            </SelectContent>
                        </Select>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
