import React, { useState, useMemo, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";
const h = React.createElement;

function SortIcon() {
    return h(
        "span",
        { className: "th-sort-icon", "aria-hidden": "true" },
        h("svg", { className: "sort-up", width: 8, height: 5, viewBox: "0 0 8 5", fill: "currentColor" },
            h("path", { d: "M4 0 8 5H0z" })),
        h("svg", { className: "sort-down", width: 8, height: 5, viewBox: "0 0 8 5", fill: "currentColor" },
            h("path", { d: "M4 5 0 0h8z" }))
    );
}

function buildColumns(defs, selectable) {
    const cols = [];
    if (selectable) {
        cols.push({
            id: "select",
            header: function (ctx) {
                return h("input", {
                    type: "checkbox",
                    className: "chk",
                    checked: ctx.table.getIsAllPageRowsSelected(),
                    ref: function (el) {
                        if (el) el.indeterminate = ctx.table.getIsSomePageRowsSelected() && !ctx.table.getIsAllPageRowsSelected();
                    },
                    onChange: ctx.table.getToggleAllPageRowsSelectedHandler(),
                    "aria-label": "全选当前页",
                });
            },
            cell: function (ctx) {
                return h("input", {
                    type: "checkbox",
                    className: "chk",
                    checked: ctx.row.getIsSelected(),
                    onChange: ctx.row.getToggleSelectedHandler(),
                    "aria-label": "选择行",
                });
            },
            enableSorting: false,
            enableGlobalFilter: false,
        });
    }
    (defs || []).forEach(function (def) {
        cols.push({
            accessorKey: def.key,
            header: def.label,
            enableSorting: def.sortable !== false,
            meta: { badge: def.badge, mono: def.mono, numeric: def.numeric, key: def.key, compact: def.compact },
            cell: function (info) {
                var val = info.getValue();
                var meta = info.column.columnDef.meta || {};
                if (meta.badge) {
                    return h("span", { className: "badge" }, val != null ? String(val) : "");
                }
                if (meta.numeric && val != null && val !== "") {
                    if (meta.key === "weight") return String(val);
                    var num = Number(val);
                    if (num !== num) return String(val);
                    if (Math.abs(num % 1) < 1e-9) return String(Math.round(num));
                    return String(Math.round(num * 100) / 100);
                }
                if (meta.mono) return val != null ? String(val) : "";
                if (def.link) {
                    return h("button", {
                        type: "button",
                        className: "org-name-btn",
                        onClick: def.onLinkClick ? function () { def.onLinkClick(info.row.original); } : undefined,
                    }, val != null ? String(val) : "");
                }
                return val != null ? String(val) : "";
            },
        });
    });
    return cols;
}

function dtDoc() {
    try {
        if (window.__cqDtRoot && typeof window.__cqDtRoot.getElementById === "function") {
            return window.__cqDtRoot;
        }
    } catch (e) { }
    return document;
}

function DataTable(props) {
    var columnDefs = props.columnDefs;
    var data = props.data || [];
    var pageSize = props.pageSize || 10;
    var filterPlaceholder = props.filterPlaceholder || "搜索全部列…";
    var selectable = !!props.selectable;
    var externalSelection = props.selectedIds || {};

    var sortingState = useState([]);
    var sorting = sortingState[0];
    var setSorting = sortingState[1];
    var columnFiltersState = useState([]);
    var columnFilters = columnFiltersState[0];
    var setColumnFilters = columnFiltersState[1];
    var globalFilterState = useState("");
    var globalFilter = globalFilterState[0];
    var setGlobalFilter = globalFilterState[1];
    var rowSelectionState = useState({});
    var rowSelection = rowSelectionState[0];
    var setRowSelection = rowSelectionState[1];
    var paginationState = useState({ pageIndex: 0, pageSize: pageSize });
    var pagination = paginationState[0];
    var setPagination = paginationState[1];

    useEffect(function () {
        if (!selectable) return;
        var next = {};
        Object.keys(externalSelection).forEach(function (id) {
            if (externalSelection[id]) next[id] = true;
        });
        setRowSelection(next);
    }, [externalSelection, selectable]);

    var columns = useMemo(function () {
        return buildColumns(columnDefs, selectable);
    }, [columnDefs, selectable]);

    var table = useReactTable({
        data: data,
        columns: columns,
        state: {
            sorting: sorting,
            columnFilters: columnFilters,
            globalFilter: globalFilter,
            rowSelection: rowSelection,
            pagination: pagination,
        },
        enableRowSelection: selectable,
        getRowId: function (row, index) {
            if (row._rowId != null) return String(row._rowId);
            if (row.id != null) return String(row.id);
            if (row.no != null) return String(row.no);
            if (row.code != null) return String(row.code);
            if (row._idx != null) return String(row._idx);
            return String(index);
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onRowSelectionChange: function (updater) {
            setRowSelection(function (prev) {
                var next = typeof updater === "function" ? updater(prev) : updater;
                if (props.onSelectionChange) props.onSelectionChange(next);
                return next;
            });
        },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        globalFilterFn: "includesString",
    });

    var filterBar = h(React.Fragment, null,
        h("input", {
            className: "dt-filter-input",
            type: "search",
            placeholder: filterPlaceholder,
            value: globalFilter != null ? globalFilter : "",
            onChange: function (e) { setGlobalFilter(e.target.value); },
        }),
        h("span", { className: "dt-meta" },
            "共 " + data.length + " 条 · 筛选后 " + table.getFilteredRowModel().rows.length + " 条")
    );
    var filterHost = null;
    try {
        if (props.filterHostId) filterHost = dtDoc().getElementById(props.filterHostId);
    } catch (e) { }
    var toolbar = filterHost
        ? createPortal(filterBar, filterHost)
        : h("div", { className: "dt-toolbar" }, filterBar);

    return h("div", { className: "data-table" },
        toolbar,
        h("div", { className: "table-wrap dt-table-wrap" },
            h("table", { className: "table" },
                h("thead", null,
                    table.getHeaderGroups().map(function (hg) {
                        return h("tr", { key: hg.id },
                            hg.headers.map(function (header) {
                                var meta = header.column.columnDef.meta || {};
                                var canSort = header.column.getCanSort();
                                var sorted = header.column.getIsSorted();
                                var thClass = (canSort ? "th-sort" : "") + (sorted ? " is-" + sorted : "");
                                if (header.id === "select") thClass = "th-chk";
                                else if (meta.compact || meta.numeric || meta.badge) thClass = (thClass ? thClass + " " : "") + "th-compact";
                                return h("th", {
                                    key: header.id,
                                    className: thClass,
                                    onClick: canSort ? header.column.getToggleSortingHandler() : undefined,
                                }, canSort
                                    ? h("span", { className: "th-sort-inner" },
                                        flexRender(header.column.columnDef.header, header.getContext()),
                                        h(SortIcon, null))
                                    : flexRender(header.column.columnDef.header, header.getContext()));
                            })
                        );
                    })
                ),
                h("tbody", null,
                    table.getRowModel().rows.length
                        ? table.getRowModel().rows.map(function (row) {
                            return h("tr", { key: row.id },
                                row.getVisibleCells().map(function (cell) {
                                    var meta = cell.column.columnDef.meta || {};
                                    var tdClass = "";
                                    if (cell.column.id === "select") tdClass = "td-chk";
                                    else if (meta.mono) tdClass = "cfg";
                                    if (meta.compact || meta.numeric || meta.badge) {
                                        tdClass = tdClass ? tdClass + " td-compact" : "td-compact";
                                    }
                                    return h("td", { key: cell.id, className: tdClass },
                                        flexRender(cell.column.columnDef.cell, cell.getContext()));
                                })
                            );
                        })
                        : h("tr", null,
                            h("td", { colSpan: columns.length, className: "dt-empty" }, "暂无数据"))
                )
            )
        ),
        h("div", { className: "dt-pagination" },
            h("span", { className: "dt-page-info" },
                "第 " + (table.getState().pagination.pageIndex + 1) +
                " / " + Math.max(1, table.getPageCount()) + " 页"),
            h("span", { className: "org-pager" },
                h("button", {
                    className: "icon-btn sm",
                    type: "button",
                    disabled: !table.getCanPreviousPage(),
                    onClick: function () { table.previousPage(); },
                    "aria-label": "上一页",
                }, h("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2 },
                    h("path", { d: "m15 18-6-6 6-6" }))),
                h("select", {
                    className: "dt-page-size",
                    value: String(table.getState().pagination.pageSize),
                    onChange: function (e) { table.setPageSize(Number(e.target.value)); },
                    "aria-label": "每页条数",
                },
                    [10, 20, 50, 100].map(function (n) {
                        return h("option", { key: n, value: String(n) }, n + "条/页");
                    })
                ),
                h("button", {
                    className: "icon-btn sm",
                    type: "button",
                    disabled: !table.getCanNextPage(),
                    onClick: function () { table.nextPage(); },
                    "aria-label": "下一页",
                }, h("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2 },
                    h("path", { d: "m9 18 6-6-6-6" })))
            )
        )
    );
}

var roots = {};

function mount(tableId, mountId, columnDefs, data, options) {
    var el = dtDoc().getElementById(mountId);
    if (!el) return;
    if (roots[tableId]) {
        try { roots[tableId].root.unmount(); } catch (e) { }
        delete roots[tableId];
        try { el.innerHTML = ""; } catch (e2) { }
    }
    var currentData = data || [];
    var currentOpts = options || {};
    var root = createRoot(el);

    function render(nextData, nextOpts) {
        if (nextData) currentData = nextData;
        if (nextOpts) currentOpts = Object.assign({}, currentOpts, nextOpts);
        root.render(h(DataTable, {
            columnDefs: columnDefs,
            data: currentData,
            pageSize: currentOpts.pageSize,
            filterPlaceholder: currentOpts.filterPlaceholder,
            selectable: currentOpts.selectable,
            selectedIds: currentOpts.selectedIds,
            onSelectionChange: currentOpts.onSelectionChange,
            filterHostId: currentOpts.filterHostId,
        }));
    }

    roots[tableId] = { render: render, root: root };
    render(data, options);
}

window.__cqDataTable = {
    mount: mount,
    setData: function (tableId, data, opts) {
        if (roots[tableId]) roots[tableId].render(data, opts);
    },
    unmountAll: function () {
        Object.keys(roots).forEach(function (id) {
            try { roots[id].root.unmount(); } catch (e) { }
            delete roots[id];
        });
    },
};

if (typeof window.__CQ_TABLE_BOOT === "function") {
    window.__CQ_TABLE_BOOT();
}
