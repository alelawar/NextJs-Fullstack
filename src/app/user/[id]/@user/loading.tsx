export default function Loading() {
    return <>
        <div className="flex items-center gap-4 animate-pulse">
            <div className="relative size-10 rounded-full overflow-hidden bg-white" />

            <div className="flex flex-col gap-2">
                <div className="h-4 w-32 bg-white rounded" /> {/* Nama */}
                <div className="h-3 w-48 bg-white rounded" /> {/* Email */}
                <div className="h-3 w-40 bg-white rounded" /> {/* Created At */}
            </div>
        </div>

        <div className="mt-8 h-4 w-64 bg-white rounded animate-pulse" />
    </>

}