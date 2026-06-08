import { AnalysisReport, Patient } from "@/app/types";
import { Dot } from "lucide-react";

interface PatientReportTitleProps {
    report: AnalysisReport;
    patient: Patient;
}

const calculateAge = (dateString: string) => {
    const today = new Date();
    const birthDate = new Date(dateString);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // If the current month is before the birth month, or it's the birth month 
    // but the current day is before the birth day, subtract 1 from the age
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};

export function PatientReportTitle({ report, patient }: PatientReportTitleProps) {

    // Helper calculate the age

    const age = calculateAge(patient.dateOfBirth);
    return (
        <div className="flex flex-col items-start justify-center gap-4">

            {/* Title & Info */}
            <div className="w-full flex flex-col justify-center items-start gap-2 md:flex-row md:justify-between md:items-start">
                <div className="flex flex-col justify-center items-start gap-0">
                    <h2 className="text-2xl font-bold">Patient: {patient.name}</h2>
                    <p className="flex flex-row text-xs md:text-sm text-muted-foreground items-center justify-start">
                        Patient ID: {report.patientId}
                        <Dot className="w-4 h-4 text-muted-foreground/50" />
                        {age} yrs
                        <Dot className="w-4 h-4 text-muted-foreground/50" />
                        {patient.gender}
                    </p>
                </div>
            </div>

        </div>
    );
}