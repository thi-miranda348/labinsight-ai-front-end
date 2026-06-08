import { Patient, AnalysisReport } from "../types";

export const mockPatients: Patient[] = [
  {
    id: "49201-B",
    name: "Arthur J. Thompson",
    dateOfBirth: "1968-04-12",
    gender: "Male",
  },
  {
    id: "4429-X",
    name: "Elena Rodriguez",
    dateOfBirth: "1985-09-23",
    gender: "Female",
  }
];

export const mockReports: AnalysisReport[] = [
  {
    id: "59829-X",
    patientId: "49201-B",
    date: "2023-10-24",
    analysisType: "Blood",
    primaryFindings: "Automated analysis suggests a profile consistent with early-stage microcytic anemia, potentially secondary to iron deficiency. Significant deviations observed in MCV and Ferritin levels relative to 6-month historical trends.",
    overallStatus: "Critical",
    results: [
      {
        analyte: "White Blood Cells (WBC)",
        value: 8.4,
        unit: "x10^3/µL",
        referenceRange: "4.5 - 11.0",
        status: "Normal"
      },
      {
        analyte: "Hemoglobin (Hgb)",
        value: 11.2,
        unit: "g/dL",
        referenceRange: "13.5 - 17.5",
        status: "Critical"
      },
      {
        analyte: "MCV",
        value: 78.0,
        unit: "fL",
        referenceRange: "80.0 - 100.0",
        status: "Borderline"
      },
      {
        analyte: "Glucose (Fasting)",
        value: 92,
        unit: "mg/dL",
        referenceRange: "70 - 99",
        status: "Normal"
      },
      {
        analyte: "Creatinine",
        value: 0.94,
        unit: "mg/dL",
        referenceRange: "0.70 - 1.30",
        status: "Normal"
      }
    ]
  },
  {
    id: "60112-A",
    patientId: "4429-X",
    date: "2023-10-25",
    analysisType: "Metabolics",
    primaryFindings: "Patient exhibits significant elevations in fasting glucose and HbA1c, consistent with poorly controlled Type 2 Diabetes Mellitus. Renal function parameters remain within normal physiological range.",
    overallStatus: "Borderline",
    results: [
      {
        analyte: "Glucose (Fasting)",
        value: 142,
        unit: "mg/dL",
        referenceRange: "70 - 99",
        status: "Critical"
      },
      {
        analyte: "Hemoglobin A1c",
        value: 6.8,
        unit: "%",
        referenceRange: "4.0 - 5.6",
        status: "Borderline"
      },
      {
        analyte: "Potassium",
        value: 4.2,
        unit: "mmol/L",
        referenceRange: "3.5 - 5.2",
        status: "Normal"
      }
    ]
  }
];