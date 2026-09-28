import { Suspense } from "react";
import { DayPageContent } from "./DayPageContent";

export default function DayPage() {
  return (
    <Suspense fallback={<p className="text-zinc-500">Loading…</p>}>
      <DayPageContent />
    </Suspense>
  );
}
