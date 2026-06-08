"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleCheck, FileUp, Filter, Download, ClipboardCheck, Share2, Printer, MessageSquareText, CalendarMinus2, BotMessageSquare, ArrowRight } from "lucide-react";
import { mockPatients, mockReports } from "./lib/mockData";
import { TableResultsManager } from "@/components/TableResultManager";
import { PatientReportTitle } from "@/components/PatientReportTitle";
import Link from "next/link";

export default function Home() {

  // upload file state
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState("");

  // sort the newest report recently
  const recentReport = [...mockReports].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

  const recentPatient = mockPatients.find(p => p.id === recentReport?.patientId);

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Stops browser from opening the file in a new tab
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    // Grab the file they dropped
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      startSimulatedUpload(e.dataTransfer.files[0].name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Grab the file they selected via the click menu
    if (e.target.files && e.target.files.length > 0) {
      startSimulatedUpload(e.target.files[0].name);
    }
  };

  // fake async upload simulation
  const startSimulatedUpload = (name: string) => {
    setFileName(name);
    setIsUploading(true);
    setUploadProgress(0);

    // Fake a loading bar that goes up by 20% every 400 milliseconds
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Wait half a second at 100% before "completing"
          setTimeout(() => {
            setIsUploading(false);
            alert(`Successfully analyzed ${name}!`); // Temporary alert for feedback
          }, 500);
          return 100;
        }
        return prev + 20;
      });
    }, 400);
  };


  return (
    <main className="w-full flex flex-col bg-background text-foreground gap-8 border-b">
      <div className="">
        <h2 className="">Clinic Dashboard</h2>
        <p className="text-muted-foreground">Welcome back, <span className="">Dr. Chen</span>. Review today's diagnostic insights and pending lab reports.</p>
      </div>

      {/* Upload file */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-full rounded-md border-dashed border-2 flex flex-col items-center justify-center gap-2 py-8 px-2 md:px-4 transition-all duration-200 ${isDragging ? "border-primary bg-primary/10 scale-[1.01]" : "border-border"
          }`}
      >
        <FileUp className={`w-16 h-16 px-2 py-2 rounded-md mb-4 transition-colors ${isDragging ? "text-primary bg-primary/20" : "text-primary bg-accent/70"}`} />

        {isUploading ? (
          // show progress bar when uploading
          <div className="w-full max-w-sm flex flex-col gap-3 mt-2">
            <div className="flex justify-between text-sm font-medium text-muted-foreground">
              <span className="truncate pr-4">Analyzing {fileName}...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        ) : (
          // show standard upload UUI when not uploading
          <>
            <h3 className="">Drop Lab Reports</h3>
            <p className="text-xs md:text-sm lg:text-base text-center mb-2">
              {isDragging ? "Drop it to start analysis!" : "Drag and drop PDF, CSV, or Text files here to begin automated analysis."}
            </p>
            <div className="flex items-center justify-between gap-2 mb-8 lg:mb-10 mt-2">
              {/* Wrapping Button in a label to trigger file input */}
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.csv,.txt"
                  onChange={handleFileSelect}
                />
                <div className="bg-primary text-primary-foreground hover:bg-primary/80 h-8 gap-1.5 px-6 py-5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs lg:text-base font-medium ring-offset-background transition-colors">
                  Select Files
                </div>
              </label>
              <Button variant={"outline"} className="">Scan via Camera</Button>
            </div>
          </>
        )}

        {/* HIPAA Badges */}
        <div className="w-full flex justify-center items-center gap-6 text-muted-foreground/80 mt-4">
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

      {recentReport && recentPatient && (
        <>
          {/* Result Table */}
          <div className="flex flex-col md:flex-row justify-between gap-1">
            <PatientReportTitle report={recentReport} patient={recentPatient} />

            <Link href={`/analysis/${recentReport.id}`} className="mr-7 text-sm md:text-base text-primary font-semibold flex items-center justify-end gap-1">
              View Details <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          {/* Table component */}
          <TableResultsManager report={recentReport} />
        </>
      )}


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
