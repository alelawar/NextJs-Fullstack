"use server"
import ArticleList from "@/components/ListArticle";
import { getAllArticles } from "../../../../services/articlesServices";
import GlobalSearch from "@/components/GlobalSearch";
import { currentUser } from "@clerk/nextjs/server";


export default async function ArticleUserProfile({ searchParams }: {
    searchParams: Promise<{
        search?: string;
        page?: string;
    }>;
}) {
    // await new Promise(resolve => {
    //     setTimeout(resolve, 1700)
    // })
    const userObj = await currentUser()
    const user = {
        email: userObj?.emailAddresses?.[0]?.emailAddress ?? "-",
        id: userObj?.id
    };

    const resolvedSearchParams = await searchParams

    const page = parseInt(resolvedSearchParams.page || "1", 10);
    const search = resolvedSearchParams.search || "";

    const { articles, totalPages } = await getAllArticles({
        userId: user.id,
        search: search || undefined,
        page
    })
    return (
        <>
            <GlobalSearch
                placeholder="Cari artikel..."
                preserveParams={true}
            />
            <ArticleList
                dataArticles={articles}
                deleteButton={true}
                editButton={true}
                userId={user.id}
            />
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