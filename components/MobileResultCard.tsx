import { LabResult } from "@/app/types";
import { StatusBadge } from "./StatusBadge";

interface MobileResultCardProps {
    result: LabResult;
}

export function MobileResultCard({ result }: MobileResultCardProps) {
    return (
        <div className="bg-card rounded-xl p-4 shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-bold text-foreground">{result.analyte}</h4>
                    <p className="text-xs text-muted-foreground">Ref: {result.referenceRange}</p>
                </div>
                {/* Use the reusable badge here! */}
                <StatusBadge status={result.status} />
            </div>

            <div className="mt-2 bg-muted/30 rounded-lg p-3 flex justify-between items-center border border-border/50">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Result Value</span>
                <span className="font-bold text-lg text-foreground">
                    {result.value} <span className="text-sm font-normal text-muted-foreground">{result.unit}</span>
                </span>
            </div>
        </div>
    );
}