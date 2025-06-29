export default function LoadingCategories() {
  return (
    <div className="p-4 border rounded animate-pulse space-y-4 hidden md:block">
      <div className="h-6 w-2/3 bg-gray-300 rounded" />
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-4 w-full bg-gray-200 rounded" />
      ))}
    </div>
  )
}
