import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { BottomNavbar } from "@/components/BottomNavbar";
import { Footer } from "@/components/Footer";
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Labinsight AI | Clinical Dashboard",
  description: "AI-Powered Clinical Lab Summarizer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground text-sm md:text-base lg:text-lg overflow-x-hidden">
        <Header />



        <main className="flex-1 w-full px-2 md:px-4 lg:px-8 py-4 flex flex-col space-y-6">
          {children}

        </main>

        <Footer />


        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background px-6 py-3">
          <BottomNavbar />
        </div>
      </body>
    </html>
  );
}
