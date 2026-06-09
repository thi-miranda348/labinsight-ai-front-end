import { AlertTriangle, Info, CheckCircle2 } from "lucide-react";

interface StatusBadgeProps {
    status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
    switch (status) {
        case 'Critical':
            return (
                <span className="inline-flex items-center gap-1.5 bg-destructive/10 text-destructive border border-destructive/20 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase">
                    <AlertTriangle className="h-3 w-3" /> Critical
                </span>
            );
        case 'Borderline':
            return (
                <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-600 border border-amber-500/20 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase">
                    <Info className="h-3 w-3" /> Borderline
                </span>
            );
        case 'Normal':
        default:
            return (
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase">
                    <CheckCircle2 className="h-3 w-3" /> Normal
                </span>
            );
    }
}