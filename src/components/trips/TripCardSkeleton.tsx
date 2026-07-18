export function TripCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="skeleton-shimmer h-48" />
      <div className="flex-1 space-y-3 p-4">
        <div className="skeleton-shimmer h-4 w-3/4 rounded" />
        <div className="skeleton-shimmer h-3 w-full rounded" />
        <div className="skeleton-shimmer h-3 w-2/3 rounded" />
        <div className="flex justify-between pt-3">
          <div className="skeleton-shimmer h-6 w-20 rounded" />
          <div className="skeleton-shimmer h-8 w-24 rounded-lg" />
        </div>
      </div>

      {/* Scoped shimmer keyframes — add once globally if you prefer, this works standalone too */}
      <style jsx>{`
        .skeleton-shimmer {
          background: linear-gradient(
            90deg,
            #e2e8f0 25%,
            #f1f5f9 37%,
            #e2e8f0 63%
          );
          background-size: 400% 100%;
          animation: shimmer 1.6s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}