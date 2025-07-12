export default function AsideDashboardSkeleton() {
  return (
    <nav className="space-y-4 animate-pulse">
      {/* Mobile Button Skeleton */}
      <div className="md:hidden px-2">
        <div className="w-8 h-8 bg-gray-300 rounded" />
      </div>

      {/* Mobile Nav Skeleton */}
      <ul className="md:hidden flex flex-col gap-2 p-4">
        {[...Array(2)].map((_, i) => (
          <li key={i}>
            <div className="h-5 w-32 bg-gray-300 rounded" />
          </li>
        ))}
      </ul>

      {/* Desktop Nav Skeleton */}
      <ul className="hidden md:flex flex-col gap-3 p-2">
        {[...Array(2)].map((_, i) => (
          <li key={i}>
            <div className="h-5 w-32 bg-gray-300 rounded" />
          </li>
        ))}
      </ul>
    </nav>
  );
}
