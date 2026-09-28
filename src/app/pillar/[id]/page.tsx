import { Suspense } from "react";
import { PillarPageContent } from "./PillarPageContent";

export default function PillarPage() {
  return (
    <Suspense fallback={<p className="text-zinc-500">Loading…</p>}>
      <PillarPageContent />
    </Suspense>
  );
}
