import ArticleList from "@/components/ListArticle";
import { getAllArticles } from "../../../../../services/articlesServices";

export default async function ArticleUser({ params, searchParams }: {
    params: Promise<{ id: string, }>;
    searchParams: {
        search?: string;
        page?: string;
    };
}) {
    // await new Promise(resolve => {
    //     setTimeout(resolve, 1700)
    // })
    const { id } = await params
    const page = parseInt(searchParams.page || "1", 10);
    const search = searchParams.search || "";


    const { articles, totalPages, total } = await getAllArticles({
        authorId: id,
        search: search || undefined,
        page
    })
    return (
        <>
            <p className="mt-3 px-5 md:px-8"><span className="underline">{articles.length}</span> Artikel Telah Dibuat</p>
            <div className="mx-8 mb-6 mt-10">
                <form action="" method="GET" className="flex gap-2">
                    <input
                        type="text"
                        name="search"
                        placeholder="Cari artikel..."
                        defaultValue={search}
                        className="flex-1 px-3 py-2 border rounded"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Cari
                    </button>
                </form>
            </div>
            <ArticleList dataArticles={articles} />
            {/* Pagination UI */}
            <div className="flex gap-2 mt-4 mx-8 mb-10">
                {Array.from({ length: totalPages }, (_, i) => (
                    <a
                        key={i}
                        href={`?page=${i + 1}`}
                        className={`px-3 py-1 border rounded ${i + 1 === page ? "bg-black text-white" : ""}`}
                    >
                        {i + 1}
                    </a>
                ))}
            </div>
        </>
    )
}