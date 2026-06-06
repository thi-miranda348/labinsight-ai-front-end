"use client";

import { Bell, Search, UserCircle, X } from "lucide-react";
import Link from "next/link";
import { Navbar } from "./Navbar";
import { useState, useTransition } from "react";
import Form from 'next/form';
import { mockPatients, mockReports } from "@/app/lib/mockData";
import { useRouter } from "next/navigation";

export function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>(""); // Added type safety
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    // Toggle search bar
    const handleSearchToggle = () => {
        setIsSearchOpen(!isSearchOpen);
        setSearchQuery("");
    };

    // Search patient by name or patientId and show the suggest patient even with the first character
    const searchPatients = searchQuery.trim().length >= 1
        ? mockPatients.filter(patient =>
            patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.id.toLowerCase().includes(searchQuery.toLowerCase())
        ) : [];

    const handlePatientSelect = (patientId: string) => {
        const patientReports = mockReports.filter(r => r.patientId === patientId);

        if (patientReports.length === 0) {
            alert("No reports found for this patient.");
            return;
        }

        const sortedReports = [...patientReports].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        const latestReportId = sortedReports[0].id;

        setIsSearchOpen(false);
        setSearchQuery("");

        startTransition(() => {
            router.push(`/analysis/${latestReportId}`);
        });
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background">
            <div className="mx-auto h-16 flex items-center justify-between gap-8 px-4">
                {/* Logo */}
                <div className="flex items-center gap-1 md:gap-2 shrink-0">
                    <Link href="/">
                        <span className="text-primary font-bold text-sm md:text-md lg:text-xl">LabInsight AI</span>
                    </Link>
                </div>

                {/* Nav links */}
                <div className="hidden md:flex">
                    <Navbar />
                </div>

                {/* Notification, User, and Search Toggle Button */}
                <div className="flex items-center gap-2 md:gap-4 lg:gap-6 ml-auto">
                    {/* Search Toggle Button */}
                    <button
                        type="button"
                        onClick={handleSearchToggle}
                        className="p-2 hover:bg-muted rounded-full transition-colors z-50"
                        aria-label="Toggle search"
                    >
                        {isSearchOpen ? <X className="h-5 w-5 text-muted-foreground" /> : <Search className="h-5 w-5 text-muted-foreground" />}
                    </button>

                    {/* Notification */}
                    <button className="p-2 hover:bg-muted rounded-full">
                        <Bell className="w-5 h-5" />
                    </button>

                    {/* User Profile */}
                    <div className="flex items-center gap-2 lg:gap-4 border-l pl-2 md:pl-4">
                        <UserCircle className="w-5 h-5" />
                        <div className="hidden md:flex md:flex-col">
                            <p className="text-sm font-medium">Dr. Sarah Chen</p>
                            <p className="text-xs text-muted-foreground">CLINICAL PATHOLOGIST</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Responsive search container */}
            {isSearchOpen && (
                <div className="w-full px-4 pb-3 pt-1 lg:pt-0 lg:pb-0 lg:px-0 lg:absolute lg:right-[330px] lg:top-1/2 lg:-translate-y-1/2 lg:w-auto z-50">
                    <div className="relative w-full lg:w-64">
                        <Form action="/search" className="w-full">
                            <input
                                type="search"
                                placeholder="Search patient name or ID..."
                                name="query"
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                className="w-full lg:w-64 h-10 bg-muted rounded-md border border-input px-4 text-sm outline-none focus:border-primary transition-all text-black dark:text-white"
                                autoFocus
                                autoComplete="off"
                            />
                        </Form>

                        {/* Search Dropdown Panel */}
                        {searchQuery.trim().length >= 1 && (
                            <div className="absolute left-0 mt-1 w-full lg:w-64 bg-white dark:bg-zinc-900 border rounded-md shadow-lg max-h-60 overflow-y-auto z-50 p-1">
                                {searchPatients.length > 0 ? (
                                    <ul className="space-y-0.5">
                                        {searchPatients.map((patient) => (
                                            <li key={patient.id}>
                                                <button
                                                    type="button"
                                                    onClick={() => handlePatientSelect(patient.id)}
                                                    className="w-full text-left px-3 py-2 text-sm text-black dark:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-sm transition-colors flex flex-col"
                                                >
                                                    <span className="font-medium">{patient.name}</span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="px-3 py-3 text-left text-sm text-muted-foreground">
                                        No record found
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
