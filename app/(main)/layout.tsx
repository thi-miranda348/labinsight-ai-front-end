import { Header } from "@/components/Header";
import { BottomNavbar } from "@/components/BottomNavbar";
import { Footer } from "@/components/Footer";
import { AuthGuard } from "@/components/AuthGuard"; // <-- 1. Import the Guard

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      {/* 2. Wrap the children inside the AuthGuard */}
      <main className="flex-1 px-4 py-4 md:py-8 pb-24 md:pb-0 flex flex-col space-y-6 w-full">
        <AuthGuard>{children}</AuthGuard>
      </main>

      <Footer />

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background px-6 py-3">
        <BottomNavbar />
      </div>
    </>
  );
}
