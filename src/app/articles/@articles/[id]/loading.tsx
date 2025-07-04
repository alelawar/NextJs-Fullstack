export default function ArticleDetailSkeleton() {
  return (
    <div className="md:w-full h-fit border border-white rounded-lg py-5 px-2 md:py-8 md:px-5 mx-5 animate-pulse mt-10">
      <h1 className="text-center mb-3 md:mb-8 font-bold text-2xl md:text-4xl bg-gray-300 h-8 w-3/4 mx-auto rounded"></h1>

      <div className="mb-1 my-0.5 text-xs md:text-base flex items-center gap-4">
        <div className="relative size-7 rounded-full overflow-hidden bg-gray-300"></div>

        <div className="flex flex-col gap-1">
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
          <div className="w-16 h-3 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="mt-10 mb-3 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-[90%]"></div>
        <div className="h-4 bg-gray-300 rounded w-[85%]"></div>
        <div className="h-4 bg-gray-200 rounded w-[95%]"></div>
        <div className="h-4 bg-gray-200 rounded w-[70%]"></div>
      </div>
    </div>
  )
}
