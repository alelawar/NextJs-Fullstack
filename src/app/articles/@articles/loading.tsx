export default function LoadingArticles() {
  return (
    <div className="px-3 py-5 md:p-8">
      <h1 className="text-lg md:text-2xl font-semibold mb-4">Loading Artikel...</h1>
      <ul className="space-y-4">
        {[...Array(3)].map((_, idx) => (
          <li
            key={idx}
            className="border p-4 rounded shadow animate-pulse h-28"
          >
            <div className="h-6 bg-white rounded w-1/2 mb-2" />
            <div className="h-4 bg-white rounded w-full mb-2" />
            <div className="h-4 bg-white rounded w-1/3" />
          </li>
        ))}
      </ul>
    </div>
  );
}
