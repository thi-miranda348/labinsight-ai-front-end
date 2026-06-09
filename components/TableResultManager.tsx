"use client";

import { useState, useMemo } from "react";
import { AnalysisReport, LabResult } from "@/app/types";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { MobileResultCard } from "./MobileResultCard";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";

// --- TANSTACK TABLE IMPORTS ---
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

// 1. Add hidePagination to your props
interface TableResultsManagerProps {
  report: AnalysisReport;
  hidePagination?: boolean;
}

export function TableResultsManager({
  report,
  hidePagination = false,
}: TableResultsManagerProps) {
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Out of Range" | "Critical"
  >("All");
  const [sorting, setSorting] = useState<SortingState>([]);

  const filteredResults = useMemo(() => {
    return report.results.filter((result) => {
      if (activeFilter === "All") return true;
      if (activeFilter === "Critical") return result.status === "Critical";
      if (activeFilter === "Out of Range") return result.status !== "Normal";
      return true;
    });
  }, [report.results, activeFilter]);

  const columns = useMemo<ColumnDef<LabResult>[]>(
    () => [
      {
        accessorKey: "analyte",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-xs md:text-sm lg:text-sm font-semibold uppercase tracking-wider p-0 hover:bg-transparent border-none"
          >
            Test Name <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        ),
        cell: ({ row }) => (
          <span className="font-medium text-foreground">
            {row.getValue("analyte")}
          </span>
        ),
      },
      {
        accessorKey: "value",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-xs md:text-sm lg:text-sm font-semibold uppercase tracking-wider p-0 hover:bg-transparent border-none"
          >
            Result <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        ),
        cell: ({ row }) => (
          <span className="text-foreground font-semibold">
            {row.getValue("value")}{" "}
            <span className="text-muted-foreground font-normal text-xs">
              {row.original.unit}
            </span>
          </span>
        ),
      },
      {
        accessorKey: "referenceRange",
        header: "Ref Range",
        cell: ({ row }) => (
          <span className="text-muted-foreground ">
            {row.getValue("referenceRange")}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-xs md:text-sm lg:text-sm font-semibold uppercase tracking-wider p-0 hover:bg-transparent border-none"
          >
            Status <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        ),
        cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
      },
    ],
    [],
  );

  // eslint-disable-next-line
  const table = useReactTable({
    data: filteredResults,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
    initialState: {
      // If it's a preview on the dashboard, only show 5 items. Otherwise, show 10.
      pagination: { pageSize: hidePagination ? 5 : 10 },
    },
  });

  return (
    <div className="space-y-6">
      <div className="border rounded-xl shadow-sm overflow-hidden bg-card">
        {/* Filter Header */}
        <div className="p-4 border-b bg-muted/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h3 className="">{report.analysisType} Diagnostic Panel</h3>
            <span className="text-[11px] font-mono bg-background border border-border text-muted-foreground px-1.5 py-0.5 rounded">
              {report.id}
            </span>
          </div>
          <span className="text-[11px] font-medium text-muted-foreground">
            Last updated: {report.date}
          </span>
        </div>

        {/* Filter Buttons */}
        <div className="px-4 py-3 border-b flex flex-wrap items-center gap-2 bg-background">
          <Button
            variant={activeFilter === "All" ? "default" : "outline"}
            onClick={() => setActiveFilter("All")}
            className={`rounded-full px-4 py-1 h-8 text-xs ${activeFilter !== "All" ? "bg-background" : ""}`}
          >
            All Results
          </Button>
          <Button
            variant={activeFilter === "Out of Range" ? "default" : "outline"}
            onClick={() => setActiveFilter("Out of Range")}
            className={`rounded-full px-4 py-1 h-8 text-xs ${activeFilter !== "Out of Range" ? "bg-background" : ""}`}
          >
            Out of Range
          </Button>
          <Button
            variant={activeFilter === "Critical" ? "default" : "outline"}
            onClick={() => setActiveFilter("Critical")}
            className={`rounded-full px-4 py-1 h-8 text-xs ${activeFilter !== "Critical" ? "bg-background" : ""}`}
          >
            Critical Only
          </Button>
        </div>

        {/* Mobile Card*/}
        <div className="grid grid-cols-1 gap-3 md:hidden">
          {table.getRowModel().rows.map((row) => (
            <MobileResultCard key={row.id} result={row.original} />
          ))}
        </div>

        {/* Desktop table */}
        {/* Table content */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm border-collapse">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-b bg-accent/40 text-muted-foreground uppercase tracking-wider"
                >
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="py-3 px-4 font-semibold">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-border">
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="py-3 px-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No results match this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination controls in a condition */}
          {!hidePagination && (
            <div className="bg-muted/20 px-4 py-3 border-t flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount() || 1}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="h-8 text-xs"
                >
                  <ChevronLeft className="h-3 w-3 mr-1" /> Prev
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="h-8 text-xs"
                >
                  Next <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
