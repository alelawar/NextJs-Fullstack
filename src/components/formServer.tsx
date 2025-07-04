"use server";
import { getAllCategories, createArticle } from "../../services/articlesServices";

interface Props {
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
  };
}

export default async function FormServer({ user }: Props) {
  const categories = await getAllCategories();

  async function handleAction(formData: FormData) {
    const title = formData.get("title") as string;
    const categorySlug = formData.get("categorySlug") as string;
    const content = formData.get("content") as string;

    await createArticle({
      title,
      categorySlug,
      content,
      userId: user.id,
      email: user.email,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      imageUrl: user.imageUrl,
    });
  }

  return (
    <form className="space-y-4 text-sm md:text-base" action={handleAction}>
      <div>
        <label className="block text-white mb-1">Judul</label>
        <input
          type="text"
          name="title"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Masukkan judul"
          required
        />
      </div>

      <div>
        <label className="block text-white mb-1">Kategori</label>
        <select
          name="categorySlug"
          className="w-full border px-3 py-2 rounded bg-slate-950"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-white mb-1">Konten</label>
        <textarea
          name="content"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300 h-32"
          placeholder="Masukkan isi konten"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 block w-full text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
