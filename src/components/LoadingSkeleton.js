export default function LoadingSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-3xl border border-white/10 bg-slate-900/70 p-5"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="h-3 w-24 rounded-full bg-white/10" />
              <div className="h-6 w-32 rounded-full bg-white/10" />
            </div>
            <div className="h-12 w-16 rounded-xl bg-white/10" />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="h-20 rounded-2xl bg-white/10" />
            <div className="h-20 rounded-2xl bg-white/10" />
          </div>

          <div className="mt-4 h-32 rounded-2xl bg-white/10" />
        </div>
      ))}
    </div>
  );
}
