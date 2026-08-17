import { createColumnHelper } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { type DataTableFeatures } from '@/components/data-table/data-table-features'
import type { QuarterlyRow } from '@/data/quarterly'

const columnHelper = createColumnHelper<DataTableFeatures, QuarterlyRow>()

export const quarterlyColumns = columnHelper.columns([
    columnHelper.accessor('billNo', {
        header: '单据编号',
    }),
    columnHelper.accessor('quarter', {
        header: '评价季度',
    }),
    columnHelper.accessor('orgName', {
        header: '党组织',
    }),
    columnHelper.accessor('partyScore', {
        header: () => <div className="text-right">党群绩效得分</div>,
        cell: ({ getValue }) => <div className="text-right">{getValue()}</div>,
    }),
    columnHelper.accessor('excellenceScore', {
        header: () => <div className="text-right">创先争优得分</div>,
        cell: ({ getValue }) => <div className="text-right">{getValue()}</div>,
    }),
    columnHelper.accessor('totalScore', {
        header: () => <div className="text-right">综合得分</div>,
        cell: ({ getValue }) => <div className="text-right">{getValue()}</div>,
    }),
    columnHelper.accessor('grade', {
        header: '评价等级',
    }),
    columnHelper.accessor('status', {
        header: '单据状态',
        cell: ({ getValue }) => {
            const status = getValue()
            if (status === '暂存') {
                return (
                    <Badge variant="outline" className="border-primary/40 text-primary bg-primary/5">
                        {status}
                    </Badge>
                )
            }
            return <Badge variant="default">{status}</Badge>
        },
    }),
])
