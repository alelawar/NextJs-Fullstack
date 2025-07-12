import { Suspense } from "react";
import AsideDashboardSkeleton from "./@aside/loading";

export default function LayoutDashboard({
    aside,
    sectionDashboard,
}: Readonly<{
    aside: React.ReactNode;
    sectionDashboard: React.ReactNode
}>) {
    return (
        <main
            className="md:min-h-[80dvh] min-h-[90dvh] max-w-7xl md:px-7 md:py-10 mx-auto md:flex justify-between  gap-4"
        >
            <aside
                className="md:w-1/4 h-fit md:h-[60dvh] border border-white px-3 py-1.5"
            >
                <Suspense fallback={<AsideDashboardSkeleton/>}>
                    {aside}
                </Suspense>
            </aside>
            <section
                className="w-full border  border-white px-5 py-3"
            >
                {sectionDashboard}
            </section>
        </main>
    )
}