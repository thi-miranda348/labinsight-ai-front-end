"use client"

import { useState } from "react";
import { AnalysisReport } from "@/app/types";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, CheckCircle2 } from "lucide-react";

export function TableResultsManager({ report }: { report: AnalysisReport }) {

    // add state for filtering
    const [activeFilter, setActiveFilter] = useState<'All' | 'Out of Range' | 'Critical'>('All');

    // derive filtered results
    const filteredResults = report.results.filter(result => {
        if (activeFilter === 'All') return true;
        if (activeFilter === 'Critical') return result.status === 'Critical';
        // 'Out of Range' means anything that isn't 'Normal'
        if (activeFilter === 'Out of Range') return result.status !== 'Normal';
        return true;
    });

    // Helper to generate the exact status badges
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Critical':
                return (
                    <span className="inline-flex items-center gap-1.5 bg-destructive/10 text-destructive border border-destructive/20 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase">
                        <AlertTriangle className="h-3 w-3" /> Critical
                    </span>
                );
            case 'Borderline':
                return (
                    <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-600 border border-amber-500/20 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase">
                        <Info className="h-3 w-3" /> Borderline
                    </span>
                );
            case 'Normal':
            default:
                return (
                    <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase">
                        <CheckCircle2 className="h-3 w-3" /> Normal
                    </span>
                );
        }
    };

    return (
        <div className="space-y-6">
            <div className="border rounded-xl shadow-sm overflow-hidden bg-card">

                {/* Filter Header */}
                <div className="p-4 border-b bg-muted/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <h3 className="">
                            {report.analysisType} Diagnostic Panel
                        </h3>
                        <span className="text-[10px] font-mono bg-background border border-border text-muted-foreground px-1.5 py-0.5 rounded">
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
                        variant={activeFilter === 'All' ? "default" : "outline"}
                        onClick={() => setActiveFilter('All')}
                        className={`rounded-full px-4 py-1 h-8 text-xs ${activeFilter !== 'All' ? 'bg-background' : ''}`}
                    >
                        All Results
                    </Button>
                    <Button
                        variant={activeFilter === 'Out of Range' ? "default" : "outline"}
                        onClick={() => setActiveFilter('Out of Range')}
                        className={`rounded-full px-4 py-1 h-8 text-xs ${activeFilter !== 'Out of Range' ? 'bg-background' : ''}`}
                    >
                        Out of Range
                    </Button>
                    <Button
                        variant={activeFilter === 'Critical' ? "default" : "outline"}
                        onClick={() => setActiveFilter('Critical')}
                        className={`rounded-full px-4 py-1 h-8 text-xs ${activeFilter !== 'Critical' ? 'bg-background' : ''}`}
                    >
                        Critical Only
                    </Button>
                </div>

                {/* Table content */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs md:text-sm border-collapse">
                        <thead>
                            <tr className="border-b bg-muted/20 text-muted-foreground uppercase tracking-wider text-[11px]">
                                <th className="py-3 px-4 font-semibold">Test Name</th>
                                <th className="py-3 px-4 font-semibold">Result</th>
                                <th className="py-3 px-4 font-semibold hidden sm:table-cell">Ref Range</th>
                                <th className="py-3 px-4 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {/* MAP OVER THE DYNAMIC DATA */}
                            {filteredResults.map((result, index) => (
                                <tr key={index} className="hover:bg-muted/30 transition-colors">
                                    <td className="py-3 px-4 font-medium text-foreground">{result.analyte}</td>
                                    <td className="py-3 px-4 text-foreground font-semibold">
                                        {result.value} <span className="text-muted-foreground font-normal text-xs">{result.unit}</span>
                                    </td>
                                    <td className="py-3 px-4 text-muted-foreground hidden sm:table-cell">{result.referenceRange}</td>
                                    <td className="py-3 px-4">
                                        {getStatusBadge(result.status)}
                                    </td>
                                </tr>
                            ))}

                            {/* Fallback if filter returns empty */}
                            {filteredResults.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="py-8 text-center text-muted-foreground">
                                        No records found for the "{activeFilter}" status.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}