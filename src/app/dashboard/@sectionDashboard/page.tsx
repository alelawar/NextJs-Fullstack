import { getDataArticles, getDataUsers } from "../../../../services/dashboardServices";
import CategoryChart from "@/components/ChartCategories";
import ReusableChart from "@/components/ChartArticles";
import Link from "next/link";

export default async function DashboardPage() {
    const { dailyStats, categoryStats } = await getDataArticles()
    const { userStats, userContributor } = await getDataUsers()
    return (
        <>
            <div className="grid md:grid-cols-2 gap-5">
                <ReusableChart
                    data={dailyStats}
                    title="Artikel Per Hari (7 Hari Terakhir)"
                    linkText="Lihat Selengkapnya"
                    linkHref="/dashboard/article"
                    barColor="#3b82f6"
                    dateFormat={true}
                />
                <CategoryChart data={categoryStats} />
                <ReusableChart
                    data={userStats}
                    title="Jumlah user baru (7 Hari Terakhir)"
                    linkText="Lihat Selengkapnya"
                    linkHref="/dashboard/user"
                    barColor="#f59e0b"
                    dateFormat={true}
                />
            </div>
            <div className="mt-10">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold mb-4">Kontributor Artikel</h2>
                    <Link href="/dashboard/user" className=" hover:underline mb-4">Selengkapnya</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full border text-sm text-left text-gray-500">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                            <tr>
                                <th className="px-6 py-3">#</th>
                                <th className="px-6 py-3">Nama</th>
                                <th className="px-6 py-3">Email</th>
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
                                    <td className="px-6 py-4">{user.articleCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}