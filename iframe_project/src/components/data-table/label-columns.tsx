import { createColumnHelper } from '@tanstack/react-table'

import { type DataTableFeatures } from '@/components/data-table/data-table-features'

const columnHelper = createColumnHelper<DataTableFeatures, Record<string, never>>()

export function labelColumns(labels: string[]) {
    return columnHelper.columns(
        labels.map((label) =>
            columnHelper.display({
                id: label,
                header: label,
            }),
        ),
    )
}
