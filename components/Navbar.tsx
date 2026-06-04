import Link from "next/link";

export function Navbar() {
    return (
            <nav className="flex items-center justify-between gap-4 lg:gap-8">
                <Link href="/" className="text-sm lg:text-md text-primary font-bold border-b pb-1 mt-1">Dashboard</Link>
                <Link href="/analysis" className="text-sm lg:text-md hover:text-primary">Analysis</Link>
                <Link href="/history" className="text-sm lg:text-md hover:text-primary">History</Link>
            </nav>

    )
}