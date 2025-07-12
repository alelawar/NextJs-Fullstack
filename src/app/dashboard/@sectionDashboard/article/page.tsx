import ReusableChart from "@/components/ChartArticles";
import { getDataArticles } from "../../../../../services/dashboardServices";
import { deleteArticle, getAllArticles, lengthArticles } from "../../../../../services/articlesServices";
import Link from "next/link";
import DeleteArticleButton from "@/components/deleteButton";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";
import GlobalSearch from "@/components/GlobalSearch";

export default async function DashboardArticles({ searchParams }: {
    searchParams: Promise<{
        page?: string
        search?: string
    }>
}) {
    const userObj = await currentUser()

    const resolvedSearchParams = await searchParams

    const page = parseInt(resolvedSearchParams.page || "1", 10);
    const search = resolvedSearchParams.search || "";

    const { monthlyData } = await getDataArticles()
    const { articles } = await getAllArticles({ page, search: search || undefined });
    const length = await lengthArticles()
    // log(articles)

    async function handleDeleteArticle(formData: FormData) {
        "use server"
        const role = userObj?.publicMetadata?.role as string | undefined;
        const articleId = formData.get("articleId") as string;
        const userId = userObj?.id;
        try {
            await deleteArticle(articleId, userId, role);
            // Redirect atau revalidate setelah delete
            revalidatePath("/dashboard/article"); // atau halaman yang sesuai
        } catch (error: unknown) {
            // Cegah error redirect muncul di log
            console.error("Error deleting article:", error);
        }
    }
    return (
        <>
            <ReusableChart
                data={monthlyData}
                title="Data Selama 1 Bulan Terakhir"
            />
            <h1 className="mb-5">Total Artikel Yang sudah dibuat : {length}</h1>
        <GlobalSearch/>
            <table className="min-w-full border text-sm text-left text-gray-500">
                <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                    <tr>
                        <th className="px-6 py-3">#</th>
                        <th className="px-6 py-3">Nama</th>
                        <th className="px-6 py-3">Judul</th>
                        <th className="px-6 py-3">Konten</th>
                        <th className="px-6 py-3">Category</th>
                        <th className="px-6 py-3">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-white">
                    {articles.map((article, index) => (
                        <tr key={article._id.toString()}>
                            <td className="px-6 py-4">{index + 1}</td>
                            <td className="px-6 py-4 flex gap-2">
                                <div className="overflow-hidden w-5 h-5 rounded-full object-cover">
                                    <img
                                        src={article.authorId.imageUrl}
                                        alt=""
                                        className="w-full h-full md:block hidden"
                                    />
                                </div>
                                <Link href={`/user/${article._id}`}>{article.authorId.name}</Link>
                            </td>
                            <td className="px-6 py-4">{article.title}</td>
                            <td className="px-6 py-4">{article.content}</td>
                            <td className="px-6 py-4">{article.categoryId.name}</td>
                            <td className="px-6 py-4">
                                <DeleteArticleButton
                                    articleId={article._id.toString()}
                                    articleTitle={article.title}
                                    onDelete={handleDeleteArticle}
                                    key={article._id}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}