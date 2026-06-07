"use client"

import { AnalysisReport, Patient } from "@/app/types"
import { ChevronRight, Dot, DownloadIcon, BadgeCheck, BotMessageSquare, TriangleAlert, FlaskConicalIcon } from "lucide-react";
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
                <div className="lg:col-span-2">
                    {/* AI summary */}
                    <div className="w-full h-full bg-primary/10 border border-ring/10 rounded-lg pt-6 px-6 mb-4">
                        <div className="flex items-center justify-start flex-row gap-2 lg:gap-4 mb-2 md:mb-3 lg:mb-4">
                            <div className="bg-primary text-background w-12 h-12 flex items-center justify-center rounded-lg">
                                <BotMessageSquare className="h-8 w-8" />
                            </div>
                            <h3 className="text-primary">
                                AI Critical Diagnostic Findings</h3>
                        </div>
                        <p className="text-sm md:text-base text-muted-foreground p-2 md:p-4 mb-2 lg:mb-4">{report.primaryFindings}</p>

                        <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-3">
                            <div className="w-full h-full bg-background rounded-lg px-4 py-4 lg:px-6 lg:py-6 border border-border shadow-sm">
                                <h4 className="">Primary Concern</h4>
                                <div className="text-destructive flex items-center justify-start gap-2">
                                    <TriangleAlert className="w-5 h-5" />
                                    <span className="font-bold">{ }</span>
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


                    {/* Dynamic Lab Panels Data Grid Display with Filter Bar */}
                    <TableResultsManager report={report} />

                </div>

                {/* AI chat */}
                <div className="lg:col-span-1">

                </div>
            </div>
        </div >)
}