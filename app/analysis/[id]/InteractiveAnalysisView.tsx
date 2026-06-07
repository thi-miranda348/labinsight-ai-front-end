"use client"

import { AnalysisReport, Patient } from "@/app/types"
import { ChevronRight, Dot, DownloadIcon, BadgeCheck, BotMessageSquare, TriangleAlert, FlaskConicalIcon, Send, MoreVertical, DotIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableResultsManager } from "./TableResultManager";
interface viewProps {
    report: AnalysisReport;
    patient: Patient;
}



export function InteractiveAnalysisView({ report, patient }: viewProps) {


    return (
        <div className="w-full mx-auto space-y-6">

            <div className="flex flex-col items-start justify-center gap-4">
                {/* Breadcrumb */}
                <div className="flex flex-row items-center gap-2 text-xs md:text-sm text-muted-foreground">
                    <span className="">Analysis</span>
                    <span className=""><ChevronRight className="w-4 h-4"></ChevronRight></span>
                    <span>Report #{report.id}</span>
                </div>
                {/* title */}
                <div className="w-full flex flex-col justify-center items-start gap-2 md:flex-row md:justify-between md:items-start">
                    <div className="flex flex-col justify-center items-start gap-0">
                        <h2 className="">Patient: {patient.name}</h2>
                        <p className="flex flex-row text-xs md:text-sm text-muted-foreground items-center justify-start">Patient ID: {report.patientId} <Dot className=""></Dot>{ } {patient.gender}</p>
                    </div>

                    {/* buttons container */}
                    <div className="flex flex-row justify-between items-center gap-2 md:gap-3 lg:gap-4">
                        <Button variant={"outline"} className="flex flex-row items-center justify-center gap-1 lg:gap-3">
                            <DownloadIcon className="w-5 h-5"></DownloadIcon>
                            Export PDF
                        </Button>

                        <Button className="flex flex-row items-center justify-center gap-1 lg:gap-2">
                            <BadgeCheck className="w-5 h-5"></BadgeCheck>
                            Validate Analysis
                        </Button>
                    </div>
                </div>
            </div>

            {/* Two Column Dashboard Grid Structure */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 space-y-6">

                {/* AI summary and Report Table */}
                <div className="lg:col-span-2 space-y-6">
                    {/* AI summary */}
                    <div className="lg:col-span-2 border border-primary/20 bg-primary/10 rounded-xl p-2 md:p-4 lg:p-6 shadow-sm flex flex-col md:flex-row gap-5 items-start">
                        <div className="bg-primary p-3 rounded-xl text-primary-foreground shadow-sm shrink-0 mt-1">
                            <BotMessageSquare className="h-8 w-8" />
                        </div>
                        <div>
                            <h3 className="text-primary">AI Critical Diagnostic Findings</h3>
                            <p className="text-sm md:text-base text-muted-foreground my-2 lg:my-4">
                                {report.primaryFindings}
                            </p>

                            <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-3">
                                <div className="w-full h-full bg-background rounded-lg px-4 py-4 lg:px-6 lg:py-6 border border-border shadow-sm">
                                    <h4 className="">Primary Concern</h4>
                                    <div className="text-destructive flex items-center justify-start gap-2">
                                        <TriangleAlert className="w-5 h-5" />
                                        <span className="font-bold">{report.overallStatus} Alert</span>
                                    </div>
                                </div>
                                <div className="w-full h-full bg-background rounded-lg px-4 py-4 lg:px-6 lg:py-6 border border-border shadow-sm">
                                    <h4 className="">Recommended Action</h4>
                                    <div className="text-primary  flex items-center justify-start gap-2">
                                        <FlaskConicalIcon className="w-5 h-5 " />
                                        <span className="font-bold">Add Serum Iron & TIBC</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Dynamic Lab Panels Data Grid Display with Filter Bar */}
                    <TableResultsManager report={report} />

                </div>

                {/* AI chat */}
                <div className="bg-background border rounded-xl shadow-sm overflow-hidden sticky top-20 flex flex-col h-full">

                    {/* Assistant Header Section */}
                    <div className="p-4 border-b flex items-center justify-between bg-slate-50/50 dark:bg-zinc-900/50">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <span className="font-bold text-sm text-slate-800 dark:text-zinc-200">
                                LabInsight AI Assistant
                            </span>
                        </div>
                        <button className="text-muted-foreground p-1 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded">
                            <MoreVertical className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Messages Flow Area Container */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs md:text-sm">

                        {/* Agent Message Block */}
                        <div className="space-y-1.5">
                            <span className="text-[10px] lg:text-xs font-bold text-primary uppercase flex flex-row items-center justify-start gap-0">
                                LABINSIGHT AGENT <DotIcon className="" /> 09:12 AM
                            </span>
                            <div className="bg-muted p-3.5 rounded-xl rounded-tl-none text-muted-foreground leading-relaxed shadow-3xs max-w-[80%]">
                                I have analyzed Mr. Thompson&apos;s current hematology results. The drop in Hemoglobin from 12.8 to 11.2 g/dL over 4 months is clinically significant. Would you like me to cross-reference his medication history for potential interactions?
                            </div>
                        </div>

                        {/* Doctor Message Block */}
                        <div className="space-y-1.5 flex flex-col items-end">
                            <span className="text-[10px] lg:text-xs font-bold text-muted-foreground uppercase block text-right flex flex-row items-center justify-start gap-0">
                                09:14 AM <DotIcon className="" /> DR. SARAH CHEN
                            </span>
                            <div className="bg-primary p-3.5 rounded-xl rounded-tr-none text-white leading-relaxed shadow-3xs max-w-[80%]">
                                Yes, please cross-reference. Also, what is the probability of malabsorption based on the low MCV?
                            </div>
                        </div>

                        {/* Agent Typeloader Status */}
                        <div className="space-y-1">
                            <span className="text-[10px] lg:text-xs font-bold text-primary uppercase flex flex-row items-center justify-start gap-0">
                                LABINSIGHT AGENT
                            </span>
                            <div className="flex items-center gap-1 bg-muted px-4 py-2.5 rounded-full w-16 justify-center">
                                <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" />
                            </div>
                        </div>
                    </div>

                    {/* Interactive Suggestions Actions Hub */}
                    <div className="px-4 py-2 border-t flex flex-wrap gap-1">
                        <Button variant={"ghost"} className="text-muted-foreground text-[8px] lg:text-xs px-1.5 py-1.5 rounded-full shadow-3xs">
                            &ldquo;Show Ferritin History&rdquo;
                        </Button>
                        <Button variant={"ghost"} className="text-muted-foreground text-[8px] lg:text-xs px-1.5 py-1.5 rounded-full shadow-3xs">
                            &ldquo;Check Drug Interactions&rdquo;
                        </Button>
                    </div>

                    {/* Input Box Prompt Bar */}
                    <div className="p-3 border-t">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                placeholder="Ask me something..."
                                className="w-full h-10 pl-3 pr-10 border rounded-lg text-xs outline-none bg-muted focus:border-ring transition-all"
                            />
                            <Button className="absolute right-1 p-1.5 rounded-md shadow-sm">
                                <Send className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
