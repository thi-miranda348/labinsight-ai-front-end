"use client";

import { Bell, Search, UserCircle, X } from "lucide-react";
import Link from "next/link";
import { Navbar } from "./Navbar";
import { useState } from "react";
import Form from 'next/form'
export function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // toggle search bar
    const handleSearchToggle = () => {
        setIsSearchOpen(!isSearchOpen);
    }


    return (
        // sticky header
        <header className="sticky top-0 z-50 w-full border-b bg-background">
            <div className="mx-auto h-16 flex items-center justify-between gap-8 px-4">
                {/* Logo */}
                <div className="flex items-center gap-1 md:gap-2 shrink-0">
                    <Link href="/">
                        <span className="text-primary font-bold text-sm md:text-md lg:text-xl">LabInsight AI</span>
                    </Link>
                </div>


                {/* Nav links */}
                <div className="hidden lg:flex">
                    <Navbar />
                </div>

                {/* Notification, User, and Search Toggle Button */}
                <div className="flex items-center gap-2 md:gap-4 lg:gap-6 ml-auto">

                    {/* Search Toggle Button */}
                    <button
                        type="button"
                        onClick={handleSearchToggle}
                        className="p-2 hover:bg-muted rounded-full transition-colorsz-100"
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


            {/* Responsive search container in mobile */}
            {isSearchOpen && (
                <div className="w-full px-4 pb-3 pt-1 lg:pt-0 lg:pb-0 lg:px-0 lg:absolute lg:right-[330px] lg:top-1/2 lg:-translate-y-1/2 lg:w-auto z-50">
                    <div className="relative w-full lg:w-64">
                        <Form action="/search" className="w-full">
                            <input
                                type="search"
                                placeholder="Search patient name or ID..."
                                name="query"
                                // w-full allows it to span the entire screen width on mobile, lg:w-64 snaps it back on desktop
                                className="w-full lg:w-64 h-10 bg-muted rounded-md border border-input px-4 text-sm outline-none focus:border-primary transition-all text-black dark:text-white"
                                autoFocus
                                autoComplete="off"
                            />
                        </Form>
                    </div>
                </div>
            )}
        </header>
    )
}

