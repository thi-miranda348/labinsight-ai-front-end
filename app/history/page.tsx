import Link from "next/link";
import {
    Download,
    Search,
    ChevronDown,
    ArrowRight,
    Sparkles,
    ShieldCheck,
    ChevronLeft,
    ChevronRight,
    Calendar,
    Microscope,
    User,
    Bot
} from "lucide-react";
import { mockReports } from "../lib/mockData";
import { Button } from "@/components/ui/button";

export default function HistoryPage() {

    // Helper for the exact wireframe badges
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Critical':
                return <span className="bg-destructive/10 text-destructive border border-destructive/20 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">Critical</span>;
            case 'Borderline':
                return <span className="bg-amber-500/10 text-amber-600 border border-amber-500/20 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">Borderline</span>;
            case 'Normal':
            default:
                return <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">Normal</span>;
        }
    };

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500 w-full">

            {/* 1. HEADER SECTION */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">Report History Archive</h2>
                    <p className="text-sm text-muted-foreground mt-1">Review and manage clinical diagnostic records from the past 24 months.</p>
                </div>
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-5 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm">
                    <Download className="h-4 w-4" /> Export Archive
                </button>
            </div>

            {/* 2. FILTER BAR */}
            <div className="border border-border rounded-xl bg-card shadow-sm p-4 flex flex-col lg:flex-row items-start lg:items-end gap-4 lg:gap-6">

                {/* Date Range */}
                <div className="flex flex-col gap-1.5 w-full lg:w-48">
                    <label className="flex flex-row items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                        <Calendar className="w-4 h-4" /> Date Range
                    </label>
                    <div className="relative">
                        <select className="w-full h-10 bg-background border border-input rounded-md pl-3 pr-8 text-sm outline-none focus:border-primary appearance-none cursor-pointer">
                            <option>Last 30 Days</option>
                            <option>Last 3 Months</option>
                            <option>Last 6 Months</option>
                            <option>All Time</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                </div>

                {/* Analysis Type */}
                <div className="flex flex-col gap-1.5 w-full lg:w-48">
                    <label className="flex flex-row items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                        <Microscope className="w-4 h-4" /> Analysis Type
                    </label>
                    <div className="relative">
                        <select className="w-full h-10 bg-background border border-input rounded-md pl-3 pr-8 text-sm outline-none focus:border-primary appearance-none cursor-pointer">
                            <option>All Analyses</option>
                            <option>Hematology</option>
                            <option>Metabolic</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                </div>

                {/* Patient Search */}
                <div className="flex flex-col gap-1.5 w-full lg:w-64">
                    <label className="flex flex-row items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                        <User className="w-4 h-4" /> Patient Search
                    </label>
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="ID or Last Name"
                            className="w-full h-10 bg-background border border-input rounded-md pl-9 pr-4 text-sm outline-none focus:border-primary"
                        />
                    </div>
                </div>

                {/* Toggle Switch UI */}
                <div className="flex items-center gap-3 h-10 lg:ml-auto">
                    <button className="w-11 h-6 bg-muted border border-border rounded-full relative transition-colors hover:bg-slate-200">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-background rounded-full shadow-sm"></div>
                    </button>
                    <span className="text-sm font-medium text-foreground">Abnormalities Only</span>
                </div>

                <button className="text-sm font-semibold text-primary hover:underline h-10 px-2 lg:ml-4">
                    Clear All
                </button>
            </div>

            {/* 3. DATA VIEW AREA */}
            <div className="border border-border rounded-xl bg-card shadow-sm flex flex-col overflow-hidden">

                {/* --- MOBILE VIEW: CARD GRID (Hidden on Medium+ screens) --- */}
                <div className="grid grid-cols-1 gap-4 p-4 md:hidden bg-muted/10">
                    {mockReports.map((report) => (
                        <div key={report.id} className="bg-background border border-border rounded-xl p-4 shadow-sm flex flex-col gap-3">

                            {/* Top Row: Date & Status */}
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-medium text-muted-foreground">
                                    {report.date} • 09:12 AM
                                </span>
                                {getStatusBadge(report.overallStatus)}
                            </div>

                            {/* ID */}
                            <h3 className="text-xl font-bold text-foreground">
                                {report.id}
                            </h3>

                            {/* Analysis Type */}
                            <p className="text-sm font-bold text-primary uppercase tracking-wide">
                                {report.analysisType} PANEL
                            </p>

                            {/* Findings (Truncated to 2 lines using line-clamp-2) */}
                            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                {report.primaryFindings}
                            </p>

                            {/* Divider Line */}
                            <div className="h-px w-full bg-border my-1"></div>

                            {/* Bottom Row: AI Icons & Link */}


                            <Link href={`/analysis/${report.id}`} className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
                                View Report <ChevronRight className="w-4 h-4" />
                            </Link>

                        </div>
                    ))}
                </div>

                {/* --- DESKTOP VIEW: TABLE (Hidden on Small screens) --- */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-[11px] text-muted-foreground uppercase tracking-wider border-b border-border bg-muted/20">
                            <tr>
                                <th className="py-4 px-6 font-semibold">Date</th>
                                <th className="py-4 px-6 font-semibold">Patient ID</th>
                                <th className="py-4 px-6 font-semibold">Analysis Type</th>
                                <th className="py-4 px-6 font-semibold">Primary Findings</th>
                                <th className="py-4 px-6 font-semibold">Status</th>
                                <th className="py-4 px-6 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {mockReports.map((report) => (
                                <tr key={report.id} className="hover:bg-muted/30 transition-colors group">
                                    <td className="py-4 px-6 text-foreground whitespace-nowrap">{report.date}</td>
                                    <td className="py-4 px-6 text-muted-foreground font-medium">{report.patientId}</td>
                                    <td className="py-4 px-6 text-foreground">{report.analysisType}</td>
                                    <td className="py-4 px-6 text-muted-foreground max-w-md truncate">
                                        {report.primaryFindings}
                                    </td>
                                    <td className="py-4 px-6">
                                        {getStatusBadge(report.overallStatus)}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <Link href={`/analysis/${report.id}`} className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold hover:underline opacity-80 group-hover:opacity-100 transition-opacity">
                                            View Details <ArrowRight className="h-3 w-3" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="bg-muted/20 px-6 py-3 border-t border-border flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">Showing 1 to {mockReports.length} of 1,284 reports</p>
                    <div className="flex items-center gap-1 text-sm">
                        <Button variant="ghost" className="h-8 w-8 p-0 text-muted-foreground border-none"><ChevronLeft className="h-4 w-4" /></Button>
                        <Button className="h-8 w-8 p-0 bg-primary shadow-sm border-none">1</Button>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-muted-foreground border-none">2</Button>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-muted-foreground border-none">3</Button>
                        <span className="px-2 text-muted-foreground">...</span>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-muted-foreground border-none">128</Button>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-muted-foreground border-none"><ChevronRight className="h-4 w-4" /></Button>
                    </div>
                </div>
            </div>

            {/* 4. BOTTOM WIDGETS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Trend Insight (Spans 2 columns) */}
                <div className="lg:col-span-2 border border-primary/20 bg-primary/5 rounded-xl p-6 shadow-sm flex gap-5 items-start">
                    <div className="bg-primary p-3 rounded-xl text-primary-foreground shadow-sm shrink-0 mt-1">
                        <Sparkles className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-primary mb-2">Archive Trend Insight</h3>
                        <p className="text-sm text-foreground/80 leading-relaxed">
                            Based on your current filters, there has been a <strong className="text-foreground">12% increase</strong> in Metabolic Screening volume compared to the previous quarter. AI confidence scores for "Acute Risk" detection have improved by 4.2% following the latest diagnostic engine update.
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