"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Dashboard", href: "/" },
        { name: "History", href: "/history" },
    ];

    return (
        <nav className="flex items-center justify-between gap-4 lg:gap-8">
            {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`text-sm lg:text-md pb-1 mt-1 transition-colors ${isActive
                                ? "text-primary font-bold border-b-2 border-primary"
                                : "text-muted-foreground hover:text-primary"
                            }`}
                    >
                        {item.name}
                    </Link>
                );
            })}
        </nav>
    );
}