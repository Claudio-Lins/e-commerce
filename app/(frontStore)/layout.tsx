import { Footer } from "@/components/FrontStore/footer";
import { Navbar } from "@/components/FrontStore/navbar";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface FrontStoreLayoutProps {}

export default function FrontStoreLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className={cn("")}>
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
