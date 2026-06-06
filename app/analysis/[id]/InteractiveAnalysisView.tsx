"use client"

import { AnalysisReport, Patient } from "@/app/types"
import { FileText, ShieldAlert, FlaskConical, Send, MoreVertical, CheckCircle, Download, ChevronRight, Dot, DownloadIcon, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
interface viewProps {
    report: AnalysisReport;
    patient: Patient;
}

export function InteractiveAnalysisView({ report, patient }: viewProps) {


    return (
        <div className="max-w-full mx-auto space-y-6">

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
        </div>)
}