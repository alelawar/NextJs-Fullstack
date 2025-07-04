export default function LayoutUser({
    user,
    articleUser,
}: Readonly<{
    user: React.ReactNode;
    articleUser: React.ReactNode
}>) {
    return (
        <main
            className="md:min-h-[80dvh] min-h-[90dvh] max-w-7xl md:px-7 md:py-10 mx-auto md:flex md:justify-between gap-10"
        >
            <section
                className="md:w-1/2 h-fit mb-4 border rounded-lg px-5 py-2 border-white"
            >
                {user}
            </section>
            <section
                className="w-full h-fit border rounded-lg border-white"
            >
                {articleUser}
            </section>
        </main>
    )
}