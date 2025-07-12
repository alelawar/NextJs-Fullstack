// components/FilteredArticles.tsx
import ArticleList from "@/components/ListArticle";
import { getArticleByCategorySlug } from "../../../../../../services/articlesServices";
import GlobalSearch from "@/components/GlobalSearch";

export default async function FilteredArticles({ params, searchParams }: {
    params: Promise<{ slug: string }>,
    searchParams: Promise<{
        page?: string
    }>
}) {
    const { slug } = await params
    const resolvedSearchParams = await searchParams
    const page = parseInt(resolvedSearchParams.page || "1", 10);

    const result = await getArticleByCategorySlug(slug, { page });

    // Handling berbagai kondisi kosong
    if (!result) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-center text-gray-600">
                    Category {slug} tidak ditemukan
                </h1>
                <p className="text-center text-gray-500 mt-2">
                    Silakan coba category lain atau kembali ke halaman utama
                </p>
            </div>
        );
    }

    if (result.articles.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <GlobalSearch
                    placeholder="Cari articles..."
                    searchAction={`/articles`}
                />
                <div className="text-center mt-8">
                    <h1 className="text-2xl font-bold text-gray-600">
                        Category : {result.categoryName}  masih kosong
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Belum ada artikel dalam category ini. Silakan coba category lain.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <GlobalSearch
                placeholder="Cari articles..."
                searchAction={`/articles`}
            />
            <ArticleList dataArticles={result.articles} />
            {/* Pagination UI */}
            <div className="flex gap-2 mt-4 mx-8 mb-10">
                {Array.from({ length: result.totalPages }, (_, i) => (
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
    );
}