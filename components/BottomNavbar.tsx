"use client";

import { ChartArea, HistoryIcon, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNavbar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Dashboard", href: "/", icon: LayoutDashboard },
        { name: "Analysis", href: "/analysis", icon: ChartArea },
        { name: "History", href: "/history", icon: HistoryIcon },
    ];

    return (
        <nav className="flex items-center justify-around gap-4">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex flex-col items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-primary text-background' : 'text-muted-foreground hover:text-primary'
                            }`}
                    >
                        <Icon className="w-5 h-5" />
                        <p className="text-sm">{item.name}</p>
                    </Link>
                );
            })}
        </nav>
    );
}