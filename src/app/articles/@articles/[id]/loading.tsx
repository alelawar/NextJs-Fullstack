export default function ArticleSkeleton() {
  return (
    <div className="w-full h-fit border border-white rounded-lg py-8 px-5 animate-pulse">
      <div className="text-center mb-8">
        <div className="mx-auto h-10 w-2/3 bg-white rounded" />
      </div>

      <div className="flex items-center gap-4 text-xs md:text-base mb-3">
        <div className="w-7 h-7 bg-white rounded-full" />
        <div className="flex flex-col gap-1">
          <div className="w-24 h-3 bg-white rounded" />
          <div className="w-32 h-2 bg-white rounded" />
        </div>
      </div>

      <div className="mt-10 mb-3 space-y-3">
        <div className="w-full h-4 bg-white rounded" />
        <div className="w-full h-4 bg-white rounded" />
        <div className="w-2/3 h-4 bg-white rounded" />
      </div>
    </div>
  )
}
