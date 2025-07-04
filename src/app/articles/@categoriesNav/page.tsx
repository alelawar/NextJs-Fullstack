import Link from "next/link";
import { getAllCategories } from "../../../../services/articlesServices"

export default async function CategoriesNav() {
    
    const categories = await getAllCategories();
    return (
        <nav
            className="w-full py-3 px-2 mt-8 rounded-lg border hidden border-slate-400  md:block"
        >
            <h1
                className="text-lg  font-semibold mb-4 px-3"
            >
                List Kategori :
            </h1>
            <ul className="px-5">
                {categories.map((category) => (
                    <li key={category._id}
                        className="mt-3"

                    >
                        <Link
                            href={`/articles/category/${category.slug}`}
                        >
                            <span className="mr-3">🌏</span>{category.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}