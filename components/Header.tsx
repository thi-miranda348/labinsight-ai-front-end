"use client";

import { useAuthStore } from "@/lib/store";
import {
  Bell,
  Search,
  X,
  Settings,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "./Navbar";
import { useState, useTransition } from "react";
import Form from "next/form";
import { mockPatients, mockReports } from "@/app/lib/mockData";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>(""); // Added type safety
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Pull the global user state
  const { user, logout } = useAuthStore();

  // Toggle search bar
  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchQuery("");
  };

  // Search patient by name or patientId and show the suggest patient even with the first character
  const searchPatients =
    searchQuery.trim().length >= 1
      ? mockPatients.filter(
          (patient) =>
            patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.id.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : [];

  const handlePatientSelect = (patientId: string) => {
    const patientReports = mockReports.filter((r) => r.patientId === patientId);

    if (patientReports.length === 0) {
      alert("No reports found for this patient.");
      return;
    }

    const sortedReports = [...patientReports].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
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
            <span className="text-primary font-bold text-sm md:text-md lg:text-xl">
              LabInsight AI
            </span>
          </Link>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex">
          <Navbar />
        </div>

        <div className="flex items-center gap-2 md:gap-4 lg:gap-6 ml-auto">
          {/* Search Toggle Button */}
          <button
            type="button"
            onClick={handleSearchToggle}
            className="p-2 hover:bg-muted rounded-full transition-colors z-50"
            aria-label="Toggle search"
          >
            {isSearchOpen ? (
              <X className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Search className="h-5 w-5 text-muted-foreground" />
            )}
          </button>

          {/* SHADCN NOTIFICATION DROPDOWN */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full border-none"
              >
                <Bell className="w-5 h-5 text-muted-foreground" />
                {/* Notification dot */}
                <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-destructive"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                <span className="font-medium text-sm">
                  Critical Report Alert
                </span>
                <span className="text-xs text-muted-foreground">
                  Patient Arthur J. Thompson requires immediate review.
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                <span className="font-medium text-sm">AI Engine Update</span>
                <span className="text-xs text-muted-foreground">
                  System v4.2 is now online.
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* SHADCN USER DROPDOWN */}
          <div className="border-l pl-2 md:pl-4 flex h-8 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 lg:gap-3 px-2 hover:bg-muted h-12 border-none"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt="Dr. Chen" />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      C
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex md:flex-col items-start text-left">
                    {/* Use the Zustand name, or fallback if they bypassed login */}
                    <p className="text-sm font-medium leading-none">
                      {user?.name || "Dr. Sarah Chen"}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1 tracking-wider uppercase">
                      {user?.role || "Clinical Pathologist"}
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive cursor-pointer hover:text-destructive hover:bg-destructive/10"
                  onClick={() => {
                    logout();
                    router.push("/login");
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
