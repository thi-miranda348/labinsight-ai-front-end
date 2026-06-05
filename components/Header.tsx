"use client";

import { Bell, Search, UserCircle } from "lucide-react";
import Link from "next/link";
import { Navbar } from "./Navbar";
import { useState } from "react";

export function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        // sticky header
        <header className="sticky top-0 z-50 w-full border-b bg-background">
            <div className="mx-auto flex h-16 items-center justify-between gap-8 px-4">
                {/* Logo */}
                <div className="flex items-center gap-1 md:gap-2">
                    <Link href="/" className="">
                        <span className="text-primary font-bold text-sm md:text-md lg:text-xl">LabInsight AI</span>
                    </Link>
                </div>


                {/* Nav links */}
                <div className="hidden lg:flex">
                    <Navbar />
                </div>

                {/* Notification and User */}
                <div className="flex items-center justify-between gap-4 lg:gap-6">
                    {/* Search */}
                    <div className="relative flex items-center">
                        <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="z-10">
                            <Search className={`h-5 w-5 text-muted-foreground ${isSearchOpen ? 'absolute left-2 top-2' : ''}`} />
                        </button>

                        {isSearchOpen && (
                            <input
                                type="search"
                                placeholder="Search patient or record"
                                className="w-64 h-10 bg-muted rounded-md border border-input pl-10 pr-4 text-sm outline-none focus:border-primary transition-all"
                                autoFocus
                            />
                        )}
                    </div>

                    {/* Notification */}
                    <button className="">
                        <Bell className="w-5 h-5"></Bell>
                    </button>

                    {/* User */}
                    <div className="flex items-center gap-2 lg:gap-4 border-l pl-4 ml-2">
                        <UserCircle className="w-5 h-5"></UserCircle>

                        <div className="hidden md:flex md:flex-col">
                            <p className="text-sm ">Dr. Sarah Chen</p>
                            <p className="text-xs text-muted-foreground ">CLINICAL PATHOLOGIST</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

