import { getAllArticles } from "../../../../services/articlesServices"
import ArticleList from "@/components/ListArticle";
import CreateArticle from "./form";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/Button";
import GlobalSearch from "@/components/GlobalSearch";

export default async function ArticlesPage({ searchParams }: {
    searchParams: Promise<{
        page?: string
        search?: string
    }>
}) {
    const resolvedSearchParams = await searchParams

    const page = parseInt(resolvedSearchParams.page || "1", 10);
    const search = resolvedSearchParams.search || "";

    const { articles, totalPages } = await getAllArticles({ page, search: search || undefined });
    return (
        <>
            <GlobalSearch
                placeholder="Cari artikel..."
                preserveParams={true}
            />
            <div className="md:mx-5">
                <SignedIn>
                    <CreateArticle />
                </SignedIn>
                <SignedOut>
                    <Button
                        href="/sign-in"
                        label="Buat Artikel"
                        icon="bi bi-person"
                    />
                </SignedOut>
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
    );
}