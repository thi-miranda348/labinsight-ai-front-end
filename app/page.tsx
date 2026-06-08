"use client";

import { Button } from "@/components/ui/button";
import { CircleCheck, FileUp, Filter, Download, ClipboardCheck, Share2, Printer, MessageSquareText, CalendarMinus2, BotMessageSquare } from "lucide-react";
import { mockReports } from "./lib/mockData";
import { TableResultsManager } from "@/components/TableResultManager";

export default function Home() {

  // sort the newest report recently
  const recentReport = [...mockReports].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

  return (
    <main className="w-full flex flex-col bg-background text-foreground gap-8 border-b">
      <div className="">
        <h2 className="">Clinic Dashboard</h2>
        <p className="text-muted-foreground">Welcome back, <span className="">Dr. Chen</span>. Review today's diagnostic insights and pending lab reports.</p>
      </div>

      {/* Upload file */}
      <div className="w-full rounded-md border border-border border-dashed border-2 flex flex-col items-center justify-center gap-2 py-8 px-2 md:px-4">
        <FileUp className="w-16 h-16 text-primary bg-accent/70 px-2 py-2 rounded-md mb-4 " />
        <h3 className="">Drop Lab Reports</h3>
        <p className="text-xs md:text-sm lg:text-base text-center mb-2">Drag and drop PDF, CSV, or Text files here to begin automated analysis.</p>
        <div className="flex items-center justify-between gap-2 mb-8 lg:mb-10">
          <Button className="">Select Files</Button>
          <Button variant={"outline"} className="">Scan via Camera</Button>
        </div>

        <div className="w-full flex justify-center items-center gap-6 text-muted-foreground/80">
          <div className="flex items-center gap-2">
            <CircleCheck className="w-4 h-4 text-muted-foreground/80" />
            <span className="text-[8px] md:text-sm">HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <CircleCheck className="w-4 h-4 text-muted-foreground/80" />
            <span className="text-[8px] md:text-sm">End-to-End Encryption</span>
          </div>
        </div>
      </div>
      {/* Result Table */}
      {/* Table component */}
      {recentReport && <TableResultsManager report={recentReport} />}



      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI clinic summary */}
        <div className="lg:col-span-2 w-full h-full bg-primary/10 border border-ring/10 rounded-lg p-6">
          <h3 className="flex items-center flex-row gap-2 text-primary mb-2 md:mb-4"><BotMessageSquare className="h-5 w-5" /> AI Clinical Summary</h3>
          <p className="text-sm md:text-base text-muted-foreground border border-muted rounded-lg bg-background p-2 md:p-4 mb-2 lg:mb-4">{recentReport?.primaryFindings || "No primary findings recorded for this analysis."}</p>

          <div className="flex items-center gap-3 pt-2">
            <div className="flex -space-x-2">
              <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold border-2 border-background z-10">AI</div>
              <div className="h-7 w-7 rounded-full bg-slate-300 flex items-center justify-center text-slate-700 text-[10px] font-bold border-2 border-background z-0">DR</div>
            </div>
            <span className="text-xs text-muted-foreground font-medium">Verified by AI Model v4.2 and Dr. R. Miller</span>
          </div>
        </div>

        {/* Action */}

        <div className="lg:col-span-1 border border-border rounded-lg shadow-sm p-6">
          <h3 className="flex items-center flex-row gap-2 mb-2 md:mb-4"><ClipboardCheck className=""></ClipboardCheck>Actions</h3>
          <div className="grid grid-cols-2 grid-rows-2 gap-3 lg:gap-6">
            <Button variant={"ghost"} className="shadow-sm flex flex-col items-center justify-center px-4 py-12">
              <Share2 className="text-primary"></Share2>Share Report
            </Button>
            <Button variant={"ghost"} className="shadow-sm flex flex-col items-center justify-center px-4 py-12">
              <Printer className="text-primary"></Printer>Print Summary
            </Button>
            <Button variant={"ghost"} className="shadow-sm flex flex-col items-center justify-center px-4 py-12">
              <MessageSquareText className="text-primary"></MessageSquareText>Ask AI Doctor
            </Button>
            <Button variant={"ghost"} className="shadow-sm flex flex-col items-center justify-center px-4 py-12">
              <CalendarMinus2 className="text-primary"></CalendarMinus2>Book Consult
            </Button>
          </div>

        </div>
      </div>
    </main >
  );
}
