import { Article } from "@/types/types";

export default function ArticleList({ dataArticles }: { dataArticles: Article[] }) {
  if(dataArticles.length === 0) {
    return (
       <div className="px-3 py-5 md:p-8">
      <h1 className="text-lg md:text-2xl font-semibold mb-4">Daftar Artikel</h1>
      <ul className="">
        <p className="text-slate-300">Artikel Masih Kosong / Tidak ditemukan</p>
        <a href="/articles" className="text-slate-300 underline">Kembali ke halaman artikel</a>
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
            <a
              href={`/articles/${article._id}`}
              className="text-xl font-semibold"
            > 
              {article.title}
            </a>
            <div className="mb-1 my-0.5 text-xs flex items-center gap-1">
              <div className="overflow-hidden w-5 h-5 rounded-full object-cover">
                <img
                  src={article.authorId.imageUrl}
                  alt=""
                  className="w-full h-full"
                />
              </div>
              <a href={`/user/${article.authorId._id}`}>{article.authorId.name}</a>
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
