export default function AuthSkeleton() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-[360px] h-[400px] rounded-lg bg-white shadow-md p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-6"></div>
                <div className="space-y-4">
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                </div>
                <div className="mt-8 h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
    );
}
