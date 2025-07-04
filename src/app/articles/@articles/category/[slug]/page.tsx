import ArticleList from "@/components/ListArticle";
import { getArticleByCategorySlug } from "../../../../../../services/articlesServices";

export default async function FilteredArticles({ params }: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const filteredArticles = await getArticleByCategorySlug(slug)
    if (!filteredArticles) return (
        <h1 className="mt-5 mx-5 text-center">Category Artikel untuk {slug}, tidak ditemukan</h1>
    )
    if (filteredArticles.length === 0) return (
        <h1 className="mt-5 mx-5 text-center">Category Artikel untuk {slug}, masih kosong</h1>
    )
    return <ArticleList dataArticles={filteredArticles} />
}