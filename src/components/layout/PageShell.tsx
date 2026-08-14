import type { ReactNode } from "react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { FinalCTA } from "@/components/landing/FinalCTA";

type PageShellProps = {
  children: ReactNode;
  showFinalCta?: boolean;
};

export function PageShell({ children, showFinalCta = true }: PageShellProps) {
  return (
    <div className="flex flex-col gap-1.5 overflow-x-clip bg-background pb-1.5 sm:gap-2 sm:pb-2">
      <Nav />
      <main className="flex flex-col gap-1.5 sm:gap-2">
        {children}
        {showFinalCta ? <FinalCTA /> : null}
      </main>
      <Footer />
    </div>
  );
}
