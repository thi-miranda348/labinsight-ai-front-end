import { mockReports, mockPatients } from "./mockData";

// A simple helper to simulate network delay (e.g., 1.5 seconds)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
    // Fetch all reports
    getReports: async () => {
        await delay(1500); // Simulate a slow network
        return mockReports;
    },

    // Fetch all patients
    getPatients: async () => {
        await delay(1000);
        return mockPatients;
    },

    // Fetch a single report by ID
    getReportById: async (id: string) => {
        await delay(1000);
        const report = mockReports.find(r => r.id === id);
        if (!report) throw new Error("Report not found");
        return report;
    }
};