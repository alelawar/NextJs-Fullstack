import React, { Suspense } from "react";

export default function LayoutArticles({
    children,
    articles,
    categoriesNav,
}: Readonly<{
    children: React.ReactNode
    articles?: React.ReactNode
    categoriesNav?: React.ReactNode
}>) {
    return (
        <main
            className="md:min-h-[80dvh] min-h-[90dvh] max-w-7xl md:px-7 md:py-10 mx-auto md:flex md:justify-between gap-10"
        >
            <section className="w-full">
                {articles ?? children}
            </section>
            <aside className="w-1/3 sticky">{categoriesNav}</aside>
        </main>
    )
}