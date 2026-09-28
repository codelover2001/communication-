"use client";

import { ProgressProvider } from "@/context/ProgressContext";
import { ThemeProvider } from "@/components/ThemeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ProgressProvider>{children}</ProgressProvider>
    </ThemeProvider>
  );
}
