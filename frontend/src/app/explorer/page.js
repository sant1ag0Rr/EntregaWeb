import { Suspense } from "react";
import ExplorerPageContent from "@/components/ExplorerPageContent";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function ExplorerPage() {
  return (
    <Suspense
      fallback={
        <section className="space-y-8">
          <LoadingSkeleton />
        </section>
      }
    >
      <ExplorerPageContent />
    </Suspense>
  );
}
