import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AnalysisReport, Patient } from "@/app/types";

interface MobileReportCardProps {
  report: AnalysisReport;
  patient?: Patient;
  statusBadge: React.ReactNode;
}

export function MobileReportCard({
  report,
  patient,
  statusBadge,
}: MobileReportCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col gap-3">
      {/* Top Row: Date & Status */}
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-muted-foreground">
          {report.date}
        </span>
        {statusBadge}
      </div>

      {/* Main Info */}
      <h3 className="text-lg font-bold">
        {patient?.name || "Unknown Patient"}
      </h3>
      <p className="text-xs text-muted-foreground">
        {report.patientId} • {report.analysisType}
      </p>
      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
        {report.primaryFindings}
      </p>

      {/* Action Link */}
      <Link
        href={`/analysis/${report.id}`}
        className="text-primary text-sm font-medium flex items-center gap-1 mt-2 hover:underline"
      >
        View Report <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
