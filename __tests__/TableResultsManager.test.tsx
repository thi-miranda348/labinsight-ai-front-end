import { render, screen, fireEvent } from "@testing-library/react";
import { TableResultsManager } from "@/components/TableResultManager";
import { AnalysisReport } from "@/app/types";

// 1. Create fake data to feed the table
const mockReport: AnalysisReport = {
  id: "REP-123",
  patientId: "PAT-001",
  date: "2026-06-09",
  analysisType: "Metabolics",
  overallStatus: "Critical",
  primaryFindings: "Test findings",
  results: [
    {
      analyte: "Sodium",
      value: 140,
      unit: "mmol/L",
      referenceRange: "135-145",
      status: "Normal",
    },
    {
      analyte: "Potassium",
      value: 6.5,
      unit: "mmol/L",
      referenceRange: "3.5-5.0",
      status: "Critical",
    },
    {
      analyte: "Calcium",
      value: 10.8,
      unit: "mg/dL",
      referenceRange: "8.5-10.5",
      status: "Borderline",
    },
  ],
};

describe("TableResultsManager", () => {
  it("renders the diagnostic panel header and ID", () => {
    render(<TableResultsManager report={mockReport} />);

    // Check that the title and ID render correctly based on props
    expect(screen.getByText("Metabolics Diagnostic Panel")).toBeInTheDocument();
    expect(screen.getByText("REP-123")).toBeInTheDocument();
  });

  it("renders all results by default", () => {
    render(<TableResultsManager report={mockReport} />);

    // Use getAllByText because it renders in both the mobile and desktop HTML
    expect(screen.getAllByText("Sodium").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Potassium").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Calcium").length).toBeGreaterThan(0);
  });

  it("filters out normal results when the 'Critical Only' button is clicked", () => {
    render(<TableResultsManager report={mockReport} />);

    const criticalButton = screen.getByText("Critical Only");
    fireEvent.click(criticalButton);

    // Potassium (Critical) should still be in the document
    expect(screen.getAllByText("Potassium").length).toBeGreaterThan(0);

    // queryAllByText returns an empty array if it successfully filtered them out!
    expect(screen.queryAllByText("Sodium")).toHaveLength(0);
    expect(screen.queryAllByText("Calcium")).toHaveLength(0);
  });

  it("filters correctly when the 'Out of Range' button is clicked", () => {
    render(<TableResultsManager report={mockReport} />);

    const outOfRangeButton = screen.getByText("Out of Range");
    fireEvent.click(outOfRangeButton);

    // Potassium and Calcium should be visible (they are not "Normal")
    expect(screen.getAllByText("Potassium").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Calcium").length).toBeGreaterThan(0);

    // Sodium should be hidden
    expect(screen.queryAllByText("Sodium")).toHaveLength(0);
  });
});
