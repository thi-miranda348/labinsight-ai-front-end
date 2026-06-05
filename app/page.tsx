import { Button } from "@/components/ui/button";
import { CircleCheck, FileUp, AlertTriangle, Info, CheckCircle2, Filter, Download } from "lucide-react";
import { mockReports } from "./lib/mockData";

export default function Home() {

  // sort the newest report recently
  const recentReport = [...mockReports].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

  // Helper to generate the exact status badges from your design
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1.5 bg-destructive/10 text-destructive border border-destructive/20 px-2.5 py-1 rounded-md text-[8px] font-bold tracking-wider uppercase">
            <AlertTriangle className="h-3 w-3" /> Critical
          </span>
        );
      case 'Borderline':
        return (
          <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-600 border border-amber-500/20 px-2.5 py-1 rounded-md text-[8px] font-bold tracking-wider uppercase">
            <Info className="h-3 w-3" /> Borderline
          </span>
        );
      case 'Normal':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2.5 py-1 rounded-md text-[8px] font-bold tracking-wider uppercase">
            <CheckCircle2 className="h-3 w-3" /> Normal
          </span>
        );
    }
  };


  return (
    <main className="w-full flex flex-col bg-background text-forefround gap-8">
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
      <div className="border border-border rounded-xl bg-card shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="">Recent Analysis: Patient ID {recentReport?.patientId}</h2>
          <div className="flex items-center gap-2 md:gap-3">
            <Button variant={"secondary"}>
              <Filter className=""></Filter>
              <span className="">Filter</span>
            </Button>
            <Button variant={"secondary"}>
              <Download className=""></Download>
              <span className="">Export</span>
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase border-b border-border bg-muted/30">
              <tr>
                <th className="py-3 px-2 font-semibold">Test Name</th>
                <th className="py-3 px-2 font-semibold">Result</th>
                <th className="py-3 px-2 font-semibold hidden sm:table-cell">Ref Range</th>
                <th className="py-3 px-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentReport?.results.map((result, index) => (
                <tr key={index} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-2 font-medium text-foreground">{result.analyte}</td>
                  <td className="py-3 px-2 text-foreground">{result.value} {result.unit}</td>
                  <td className="py-3 px-2 text-muted-foreground hidden sm:table-cell">{result.referenceRange}</td>
                  <td className="py-3 px-2">
                    {getStatusBadge(result.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI clinic summary */}


      {/* Action */}

    </main >
  );
}
