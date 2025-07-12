import CategoryChart from "@/components/ChartCategories";
import { createCategory, deleteCategory, getDataArticles } from "../../../../../services/dashboardServices";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { ButtonAdmin, ButtonCreate } from "@/components/Button";

export default async function DashboardCategory() {
    const { categoryStats, categoryData } = await getDataArticles()
    const userObj = await currentUser()

    async function handleAction(formData: FormData) {
        "use server"
        const name = formData.get("name") as string;
        const role = userObj?.publicMetadata?.role as string
        createCategory(name, role)
        revalidatePath("/dashboard/category")
    }

    async function handleDelete(formData: FormData) {
        "use server"

        const id = formData.get("id") as string;
        const role = userObj?.publicMetadata?.role as string
        deleteCategory(id, role)
        revalidatePath("/dashboard/category")
    }
    return (
        <>
            <CategoryChart data={categoryStats} />
            <form action={handleAction} className="flex gap-2 mt-10">
                <input
                    type="text"
                    name="name"
                    placeholder="Buat Category"
                    className="w-full px-3 py-2 border rounded pr-8"
                />
                <ButtonCreate />
            </form>
            <div className="overflow-x-auto mt-5">
                <table className="min-w-full border text-sm text-left text-gray-500">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                        <tr>
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3">Nama</th>
                            <th className="px-6 py-3">Jumlah Artikel</th>
                            <th className="px-6 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-white">
                        {categoryData.map((category, index) => (
                            <tr key={category._id.toString()}>
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4 flex gap-2 whitespace-nowrap">
                                    <Link href={`/category/${category._id}`}>{category.name}</Link>
                                </td>
                                <td className="px-6 py-4">{category.totalArticles}</td>
                                <td className="px-6 py-4">
                                    <form action={handleDelete}>
                                    <input type="hidden" name="id" value={category._id.toString()} />
                                        <ButtonAdmin label="Hapus" />
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}