"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { editArticleProps} from "@/types/types";

type Category = {
    id: string;
    name: string;
    slug: string;
};

export default function CreateArticle({ articleEdit, label = "Buat Artikel", mt = true }:
    { articleEdit?: editArticleProps, label?: string, mt?: boolean }
) {
    const [modal, setModal] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false); // State untuk loading
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categorySlug, setCategorySlug] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { user } = useUser()

    const router = useRouter()

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch("/api/categories");
            const data = await res.json();
            setCategories(data);
            if (data.length > 0) setCategorySlug(data[0].slug); // default pilih pertama
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (articleEdit) {
            setTitle(articleEdit.title);
            setContent(articleEdit.content);
            setCategorySlug(articleEdit.categoryId.slug);
        }
    }, [articleEdit])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setIsSubmitting(true); // Set loading state

        if (!user) {
            setError("User belum login.");
            setIsSubmitting(false);
            return;
        }

        const articleData = {
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.emailAddresses[0].emailAddress,
            imageUrl: user.imageUrl,
            title,
            content,
            categorySlug,
        };

        try {
            const res = await fetch(
                articleEdit ? `/api/articles/${articleEdit._id}` : "/api/articles",
                {
                    method: articleEdit ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(articleData),
                }
            );

            const result = await res.json();

            if (!res.ok) {
                setError(result.error || "Terjadi kesalahan saat membuat artikel.");
                return;
            }

            setSuccess(articleEdit ? "Artikel berhasil diperbarui!" : "Artikel berhasil dibuat!");

            if (!articleEdit) {
                // Reset form fields if creating a new article
                setTitle("");
                setContent("");
                setCategorySlug(categories[0]?.slug || "");
            }

            // Reset form
            setTitle("");
            setContent("");
            setCategorySlug(categories[0]?.slug || "");

            // Optional: tutup modal otomatis setelah 2 detik
            setTimeout(() => {
                setModal(false);
                setSuccess(null);
                router.refresh()
            }, 500);
        } catch (err) {
            console.error("Gagal submit artikel:", err);
            setError("Gagal terhubung ke server.");
        } finally {
            setIsSubmitting(false); // Reset loading state
        }
    };

    return (
        <div className={`${mt ? "mt-10 md:px-8" : ""} px-3`}>
            <button
                onClick={() => setModal(true)}
                className="text-sm md:text-base px-3 py-1 border border-white hover:rounded-md hover:text-blue-600 cursor-pointer"
            >
                {label}
            </button>

            {modal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-black border border-white rounded-xl shadow-lg p-3 md:p-6 w-full max-w-md relative mx-3">
                        <button
                            onClick={() => setModal(false)}
                            className="absolute top-2 right-3 text-white hover:text-white/70 text-2xl font-bold"
                        >
                            &times;
                        </button>

                        <h2 className="text-xl md:text-2xl text-center font-semibold mb-7 md:mb-4">
                            Buat Artikel
                        </h2>

                        <form className="space-y-4 text-sm md:text-base" onSubmit={handleSubmit}>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            {success && <p className="text-green-500 text-sm">{success}</p>}

                            <div>
                                <label className="block text-white mb-1">Judul</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                                    placeholder="Masukkan judul"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div>
                                <label className="block text-white mb-1">Kategori</label>
                                <select
                                    className="w-full border px-3 py-2 rounded bg-slate-950"
                                    value={categorySlug}
                                    onChange={(e) => setCategorySlug(e.target.value)}
                                    disabled={isSubmitting}
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.slug} value={cat.slug}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-white mb-1">Konten</label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300 h-32"
                                    placeholder="Masukkan isi konten"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-blue-600 block w-full text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-600"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Mengirim..." : articleEdit ? "Simpan Perubahan" : "Buat Artikel"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}