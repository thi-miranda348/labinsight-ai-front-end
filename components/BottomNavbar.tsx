import { ChartArea, History, HistoryIcon, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export function BottomNavbar() {
    return (
        <nav className="flex items-center justify-around gap-4 lg:gap-8">
            <Link href="/" className="flex flex-col items-center justify-center gap-2 bg-primary text-background px-4 py-4 rounded-md">
                <LayoutDashboard className="" />
                <p className="text-sm lg:text-md hover:text-primary">Dashboard</p>
            </Link>
            <Link href="/analysis" className="flex flex-col items-center justify-center gap-2">
                <ChartArea className="" />
                <p className="text-sm lg:text-md hover:text-primary">Analysis</p>
            </Link>
            <Link href="/history" className="flex flex-col items-center justify-center gap-2">
                <HistoryIcon className="" />
                <p className="text-sm lg:text-md hover:text-primary">History</p>
            </Link>
        </nav>

    )
}