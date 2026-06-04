export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: 'Male' | 'Female' | 'Other';
}

export interface LabResult {
    analyte: string;
    value: number;
    unit: string;
    referenceRange: string;
    status: 'Normal' | 'Borderline' | 'Critical';
}

export interface AnalysisReport {
    id: string;
    patientId: string;
    date: string;
    analysisType: 
        | 'Autoimmunity' 
        | 'Biology Age' 
        | 'Blood' 
        | 'Electrolytes' 
        | 'Environment Toxin' 
        | 'Heart' 
        | 'Immune Regulation' 
        | 'Kidney' 
        | 'Liver' 
        | 'Metabolics' 
        | 'Nutrients' 
        | 'Pancreas' 
        | 'Stress & Aging' 
        | 'Thyroid' 
        | 'Urine';
    primaryFindings: string;
    overallStatus: 'Normal' | 'Borderline' | 'Critical';
    results: LabResult[];
}