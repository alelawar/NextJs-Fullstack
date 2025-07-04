import React from "react"

interface ArticlesLayoutProps {
    articles: React.ReactNode
    categoriesNav: React.ReactNode
}

export default function LayoutArticles({
    articles,
    categoriesNav,
}: ArticlesLayoutProps) {
    return (
        <>
            <main className="md:min-h-[80dvh] min-h-[90dvh] max-w-7xl md:px-7 md:py-10 mx-auto md:flex md:justify-between gap-10">
                <section className="w-full">
                    {articles}
                </section>
                <aside className="w-1/3 sticky">{categoriesNav}</aside>
            </main>
        </>
    )
}