export function TripCardSkeleton() {
  return (
    <div className="flex h-full animate-pulse flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="h-48 bg-slate-200" />
      <div className="flex-1 space-y-3 p-4">
        <div className="h-4 w-3/4 rounded bg-slate-200" />
        <div className="h-3 w-full rounded bg-slate-100" />
        <div className="h-3 w-2/3 rounded bg-slate-100" />
        <div className="flex justify-between pt-3">
          <div className="h-6 w-20 rounded bg-slate-200" />
          <div className="h-8 w-24 rounded-lg bg-slate-200" />
        </div>
      </div>
    </div>
  );
}