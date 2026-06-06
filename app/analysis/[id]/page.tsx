import { mockReports, mockPatients } from "@/app/lib/mockData";
import { InteractiveAnalysisView } from "./InteractiveAnalysisView";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function AnalysisPage({ params }: PageProps) {
    const { id } = await params;

    // Find the current report matching the route parameter
    const currentReport = mockReports.find((r) => r.id === id);
    if (!currentReport) {
        notFound();
    }

    // Fetch the corresponding patient profile data 
    const patient = mockPatients.find((p) => p.id === currentReport.patientId);
    if (!patient) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background p-4 md:p-6 text-foreground">
            <InteractiveAnalysisView report={currentReport} patient={patient} />
        </main>
    );
}
