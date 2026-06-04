import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { BottomNavbar } from "@/components/BottomNavbar";
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
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />

        <div className="flex-1 container mx-auto px-4 py-8 pb-24">{children}</div>

        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background px-6 py-4">
          <BottomNavbar />      
        </div>
      </body>
    </html>
  );
}
