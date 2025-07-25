import { ArticleListProps } from "@/types/types";
import { deleteArticle } from "../../services/articlesServices";
import { revalidatePath } from "next/cache";
import DeleteArticleButton from "./deleteButton";
import Link from "next/link";
import CreateArticle from "@/app/articles/@articles/form";

export default async function ArticleList({
  dataArticles,
  deleteButton = false,
  editButton = false,
  userId
}: ArticleListProps) {

  // Server Action untuk delete
  async function handleDeleteArticle(formData: FormData) {
    "use server"
    const articleId = formData.get("articleId") as string;
    try {
      await deleteArticle(articleId, userId);
      // Redirect atau revalidate setelah delete
      revalidatePath("/profile"); // atau halaman yang sesuai
    } catch (error: unknown) {
      // Cegah error redirect muncul di log
      console.error("Error deleting article:", error);
    }
  }

  if (dataArticles.length === 0) {
    return (
      <div className="px-3 py-5 md:p-8">
        <h1 className="text-lg md:text-2xl font-semibold mb-4">Daftar Artikel</h1>
        <ul className="">
          <p className="text-slate-300">Artikel Masih Kosong / Tidak ditemukan</p>
          <Link href="/articles" className="text-slate-300 underline">Kembali ke halaman artikel</Link>
        </ul>
      </div>
    )
  }

  return (
    <div className="px-3 py-5 md:p-8">
      <h1 className="text-lg md:text-2xl font-semibold mb-4">Daftar Artikel</h1>
      <ul className="space-y-4">
        {dataArticles.map((article) => (
          <li key={article._id} className="border p-4 rounded shadow">
            <div className="flex justify-between">
              <a
                href={`/articles/${article._id}`}
                className="text-xl font-semibold"
              >
                {article.title}
              </a>
              <div className="flex items-center flex-row-reverse">
                {deleteButton && (
                  <DeleteArticleButton
                    articleId={article._id.toString()}
                    articleTitle={article.title}
                    onDelete={handleDeleteArticle}
                  />
                )}
                {editButton && (
                  <CreateArticle
                    articleEdit={{
                      _id: article._id.toString(),
                      title: article.title,
                      content: article.content,
                      categoryId: {
                        _id: article.categoryId._id.toString(),
                        name: article.categoryId.name,
                        slug: article.categoryId.slug
                      }
                    }}
                    mt={false}
                    label="Edit Artikel"
                  />
                )}
              </div>
            </div>
            <div className="mb-1 my-0.5 text-xs flex items-center gap-1">
              <div className="overflow-hidden w-5 h-5 rounded-full object-cover">
                <img
                  src={article.authorId.imageUrl}
                  alt=""
                  className="w-full h-full"
                />
              </div>
              <Link href={`/user/${article.authorId._id}`}>{article.authorId.name}</Link>
            </div>
            <p className="text-gray-600">{article.content.slice(0, 100)}...</p>
            <p className="text-sm text-gray-400">
              Kategori: {article.categoryId.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}