import ReusableChart from "@/components/ChartArticles"
import { getDataUsers } from "../../../../../services/dashboardServices"
import Link from "next/link"
import GlobalSearch from "@/components/GlobalSearch"

export default async function DashboardUSer({ searchParams }: {
    searchParams: Promise<{
        page?: string
        limit?: string
        search?: string
    }>
}) {
    const resolvedSearchParams = await searchParams

    const page = parseInt(resolvedSearchParams.page || "1", 10);
    const limit = parseInt(resolvedSearchParams.limit || "5", 10);
    const search = resolvedSearchParams.search || "";
    const { userStats, userContributor, pagination, total } = await getDataUsers(page, limit, search);
    const totalPages = Math.ceil(pagination.total / limit)
    return (
        <>
            <ReusableChart
                data={userStats}
                title="Jumlah user baru (7 Hari Terakhir)"
                barColor="#f59e0b"
                dateFormat={true}
            />

            <h1 className="mb-5 mt-3">Total User Yang sudah terdaftar : {total}</h1>
            <GlobalSearch placeholder="Cari User berdasarkan Nama/Email..." />
            <div className="overflow-x-auto">
                <table className="min-w-full border text-sm text-left text-gray-500">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                        <tr>
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3">Nama</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Bergabung</th>
                            <th className="px-6 py-3">Jumlah Artikel</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-white">
                        {userContributor.map((user, index) => (
                            <tr key={user._id.toString()}>
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4 flex gap-2 whitespace-nowrap">
                                    <div className="overflow-hidden w-5 h-5 rounded-full object-cover">
                                        <img
                                            src={user.imageUrl}
                                            alt=""
                                            className="w-full h-full "
                                        />
                                    </div>
                                    <Link href={`/user/${user._id}`}>{user.name}</Link>
                                </td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.createdAt.toDateString()}</td>
                                <td className="px-6 py-4">{user.articleCount}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
                <div className="mt-6 flex justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Link
                            key={i + 1}
                            href={`?page=${i + 1}&limit=${limit}`}
                            className={`px-3 py-1 rounded ${page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                                }`}
                        >
                            {i + 1}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}