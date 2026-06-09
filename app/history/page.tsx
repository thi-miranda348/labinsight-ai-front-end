"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Download, Search, ArrowRight, Sparkles, ShieldCheck, Calendar, Microscope, User } from "lucide-react";
import { mockPatients, mockReports } from "../lib/mockData";
import { Button } from "@/components/ui/button";
import { MobileReportCard } from "@/components/MobileReportCard";

export default function HistoryPage() {

    const [dateRange, setDateRange] = useState("All Time");
    const [analysisType, setAnalysisType] = useState("All Analyses");
    const [searchQuery, setSearchQuery] = useState("");
    const [abnormalOnly, setAbnormalOnly] = useState(false);

    // Filter Logic
    const filteredReports = useMemo(() => {
        return mockReports.filter((report) => {
            // Find the patient object to get their name
            const patient = mockPatients.find(p => p.id === report.patientId);
            const patientName = patient ? patient.name.toLowerCase() : "";

            const matchesSearch =
                report.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                patientName.includes(searchQuery.toLowerCase());

            const matchesType = analysisType === "All Analyses" || report.analysisType === analysisType;
            const matchesAbnormal = !abnormalOnly || report.overallStatus !== 'Normal';

            return matchesSearch && matchesType && matchesAbnormal;
        });
    }, [searchQuery, analysisType, abnormalOnly]);

    const clearFilters = () => {
        setDateRange("All Time");
        setAnalysisType("All Analyses");
        setSearchQuery("");
        setAbnormalOnly(false);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Critical': return <span className="bg-destructive/10 text-destructive border border-destructive/20 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">Critical</span>;
            case 'Borderline': return <span className="bg-amber-500/10 text-amber-600 border border-amber-500/20 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">Borderline</span>;
            case 'Normal':
            default: return <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">Normal</span>;
        }
    };

    return (
        <div className="w-full flex flex-col bg-background text-foreground gap-8 border-b">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Report History Archive</h2>
                    <p className="text-sm text-muted-foreground mt-1">Review records from the past 24 months.</p>
                </div>
                <Button className="gap-2"><Download className="h-4 w-4" /> Export Archive</Button>
            </div>

            {/* Filter Bar */}
            <div className="border border-border rounded-xl bg-card shadow-sm p-4 flex flex-col lg:flex-row items-start lg:items-end gap-4">

                <div className="w-full lg:w-48 space-y-1.5">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase flex items-center gap-1"><Calendar className="w-4 h-4" /> Date Range</label>
                    <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="w-full h-10 bg-background border rounded-md px-3 text-sm outline-none">
                        <option>Last 30 Days</option><option>Last 3 Months</option><option>Last 6 Months</option><option>All Time</option>
                    </select>
                </div>

                {/* Analysis Type */}
                <div className="w-full lg:w-48 space-y-1.5">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase flex items-center gap-1"><Microscope className="w-4 h-4" /> Analysis Type</label>
                    <select value={analysisType} onChange={(e) => setAnalysisType(e.target.value)} className="w-full h-10 bg-background border rounded-md px-3 text-sm outline-none">
                        <option>All Analyses</option>
                        <option>Hematology</option>
                        <option>Metabolics</option>
                    </select>
                </div>

                {/* Patient Search */}
                <div className="w-full lg:w-64 space-y-1.5">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase flex items-center gap-1"><User className="w-4 h-4" /> Patient Search</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="ID or Name"
                            className="w-full h-10 bg-background border rounded-md pl-9 pr-4 text-sm outline-none"
                        />
                    </div>
                </div>

                {/* Toggle */}
                <div className="flex items-center gap-3 h-10 lg:ml-auto">
                    <button onClick={() => setAbnormalOnly(!abnormalOnly)} className={`w-11 h-6 rounded-full relative transition-colors border border-border ${abnormalOnly ? 'bg-primary' : 'bg-muted'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${abnormalOnly ? 'left-6 bg-background' : 'left-1 bg-muted-foreground'}`}></div>
                    </button>
                    <span className="text-sm font-medium">Abnormalities Only</span>
                </div>

                <Button variant="ghost" onClick={clearFilters} className="px-4 rounded-full">Clear All</Button>
            </div>

            {/* data table card - mobile  */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {filteredReports.map((report) => {
                    const patient = mockPatients.find(p => p.id === report.patientId);
                    return (
                        <MobileReportCard
                            key={report.id}
                            report={report}
                            patient={patient}
                            statusBadge={getStatusBadge(report.overallStatus)}
                        />
                    );
                })}
            </div>


            {/* Data Table - desktop */}
            <div className="hidden md:block border border-border rounded-xl bg-card shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="text-[11px] text-muted-foreground uppercase border-b bg-muted/20">
                        <tr>
                            <th className="py-4 px-6">Date</th>
                            <th className="py-4 px-6">Patient ID</th>
                            <th className="py-4 px-6">Analysis Type</th>
                            <th className="py-4 px-6">Primary Findings</th>
                            <th className="py-4 px-6">Status</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {filteredReports.map((report) => {
                            const patient = mockPatients.find(p => p.id === report.patientId);
                            return (
                                <tr key={report.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="py-4 px-6">{report.date}</td>
                                    <td className="py-4 px-6 text-muted-foreground flex flex-col">
                                        <span className="font-semibold">{patient?.name || "Unknown"}</span>
                                        <span>{report.patientId}</span>

                                    </td>
                                    <td className="py-4 px-6">{report.analysisType}</td>
                                    <td className="py-4 px-6 text-muted-foreground max-w-xs">{report.primaryFindings}</td>
                                    <td className="py-4 px-6">{getStatusBadge(report.overallStatus)}</td>
                                    <td className="py-4 px-6 text-right">
                                        <Link href={`/analysis/${report.id}`} className="text-primary text-xs font-semibold flex items-center justify-end gap-1">
                                            View Details <ArrowRight className="h-3 w-3" />
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {filteredReports.length === 0 && (
                    <div className="p-12 text-center text-muted-foreground">No records found matching your filters.</div>
                )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Trend Insight (Spans 2 columns) */}
                <div className="lg:col-span-2 border border-primary/20 bg-primary/5 rounded-xl p-6 shadow-sm flex gap-5 items-start">
                    <div className="bg-primary p-3 rounded-xl text-primary-foreground shadow-sm shrink-0 mt-1">
                        <Sparkles className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-primary mb-2">Archive Trend Insight</h3>
                        <p className="text-sm text-foreground/80 leading-relaxed">
                            Based on your current filters, there has been a <strong className="text-foreground">12% increase</strong> in Metabolic Screening volume compared to the previous quarter. AI confidence scores for &quot;Acute Risk&quot; detection have improved by 4.2% following the latest diagnostic engine update.
                        </p>
                    </div>
                </div>

                {/* Integrity Widget */}
                <div className="border border-border rounded-xl bg-card p-6 shadow-sm flex flex-col justify-center">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <ShieldCheck className="h-4 w-4 text-emerald-500" /> Archive Integrity
                    </p>
                    <div className="flex items-baseline gap-2 mb-4">
                        <h3 className="text-4xl font-bold text-foreground tracking-tighter">99.9%</h3>
                        <span className="text-sm text-muted-foreground font-medium">Data uptime</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden mb-3">
                        <div className="h-full bg-primary w-[99.9%] rounded-full"></div>
                    </div>
                    <p className="text-[10px] text-muted-foreground italic">Last integrity sweep: 42 minutes ago</p>
                </div>

            </div>
        </div>
    );
}
