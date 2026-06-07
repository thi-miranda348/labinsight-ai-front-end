"use client"

import { AnalysisReport } from "@/app/types";
import { Button } from "@/components/ui/button";
import { FlaskConical } from "lucide-react";

export function TableResultsManager({ report }: { report: AnalysisReport }) {
    return (
        <div className="space-y-6">
            <div className="border rounded-xl shadow-2xs overflow-hidden">

                {/* filter */}
                <div className="p-4 border-b bg-slate-50/50 dark:bg-zinc-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <FlaskConical className="w-4 h-4 text-blue-600" />
                        <span className="font-bold text-sm text-slate-800 dark:text-zinc-100">
                            {report.analysisType} Diagnostic Panel
                        </span>
                        <span className="text-[10px] font-mono bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 px-1.5 py-0.5 rounded">
                            Ref: {report.id}
                        </span>
                    </div>
                    <span className="text-[11px] font-medium text-muted-foreground">
                        Last updated: {report.date}
                    </span>
                </div>

                <div className="px-4 py-3 border-b flex flex-wrap items-center gap-2">
                    <Button variant={"outline"} className="rounded-full border border-primary/50 px-2 py-1">All Results</Button>
                    <Button variant={"outline"} className="rounded-full border border-primary/50 px-2 py-1">Out of Range</Button>
                    <Button variant={"outline"} className="rounded-full border border-primary/50 px-2 py-1">Critical Only</Button>
                </div>

                {/* Table content */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs md:text-sm border-collapse">
                        <thead>
                            <tr className="border-b bg-primary/10 font-medium uppercase tracking-wider">
                                <th className="py-3 px-2 font-semibold">Test Name</th>
                                <th className="py-3 px-2 font-semibold">Result</th>
                                <th className="py-3 px-2 font-semibold hidden sm:table-cell">Ref Range</th>
                                <th className="py-3 px-2 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">

                            <tr className="hover:bg-muted/30 transition-colors">
                                <td className="py-3 px-2 font-medium text-foreground">{ } jajsdjhsafds</td>
                                <td className="py-3 px-2 text-foreground">{ } { }   dfdfds</td>
                                <td className="py-3 px-2 text-muted-foreground hidden sm:table-cell">{ }fdfsfs</td>
                                <td className="py-3 px-2">
                                    { }fsdfs
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>)
}