import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongoose";
import { Category } from "../../../../../models/Category";
import { Article } from "../../../../../models/Article";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await req.json();

        const { title, content, categorySlug } = body;

        if (!title || !content || !categorySlug) {
            return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
        }

        const category = await Category.findOne({ slug: categorySlug });
        if (!category) {
            return NextResponse.json({ error: "Kategori tidak ditemukan" }, { status: 404 });
        }

        const updated = await Article.findByIdAndUpdate(
            id,
            {
                title,
                content,
                categoryId: category._id,
            },
            { new: true }
        );

        if (!updated) {
            return NextResponse.json({ error: "Artikel tidak ditemukan" }, { status: 404 });
        }

        return NextResponse.json({ message: "Artikel berhasil diperbarui", article: updated });
    } catch (err) {
        console.error("Error saat mengedit artikel:", err);
        return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
    }
}