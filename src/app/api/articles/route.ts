// app/api/articles/route.ts
// import { connectDB } from '@/lib/mongoose';
import { connectDB } from '../../../../lib/mongoose';
import { Article } from '../../../../models/Article';
import { NextResponse } from 'next/server';
import { User } from '../../../../models/User';
import { Category } from '../../../../models/Category';


export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { userId, firstName, lastName, email, imageUrl, title, content, categorySlug } = body;

    if (!userId || !email || !title || !content || !categorySlug) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    // Gabungkan nama
    const name = [firstName, lastName].filter(Boolean).join(" ");

    // Cari atau buat user
    let user = await User.findOne({ userId });
    if (!user) {
      user = await User.create({ userId, name, email, imageUrl });
    }

    // Cari kategori
    const category = await Category.findOne({ slug: categorySlug });
    if (!category) {
      return NextResponse.json({ error: "Kategori tidak ditemukan" }, { status: 404 });
    }

    // Buat artikel
    const newArticle = await Article.create({
      title,
      content,
      authorId: user._id,
      categoryId: category._id,
    });

    return NextResponse.json({ message: "Artikel berhasil dibuat", article: newArticle });
  } catch (err) {
    console.error("Error saat membuat artikel:", err);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}