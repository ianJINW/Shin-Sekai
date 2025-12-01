import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>

      <Footer />
    </div>
  );
}
