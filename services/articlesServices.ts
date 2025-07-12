import { connectDB } from "../lib/mongoose";
import { Article } from "../models/Article";
import "../models/User"
import "../models/Category"
import { Category } from "../models/Category";
import { Types } from "mongoose";
import { notFound } from "next/navigation";
import { User } from "../models/User";
import { ArticleData, FilteredParams } from "@/types/types";

export const getAllArticles = async ({ authorId, userId, search, page = 1, limit = 10 }:
    FilteredParams = {}
) => {
    await connectDB()
    const filter: any = {}

    if (authorId && Types.ObjectId.isValid(authorId)) {
        filter.authorId = new Types.ObjectId(authorId);
    } else if (userId) {
        const user = await User.findOne({ userId })
        if (user) {
            filter.authorId = user._id
        } else {
            return {
                articles: [],
                total: 0,
                page,
                limit,
                totalPages: 0,
            }
        }
    }

    if (search) {
        filter.title = { $regex: search, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const articles = await Article.find(filter)
        .populate("authorId")
        .populate("categoryId")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await Article.countDocuments(filter);

    return {
        articles,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
};

export const lengthArticles = async () => {
    await connectDB()

    const article = await Article.find()
    const length = article.length
    return (length)
}

export const getAllCategories = async () => {
    await connectDB()
    return await Category.find();
}

export const getDetailArticle = async (id: string) => {
    await connectDB()

    if (!Types.ObjectId.isValid(id)) {
        notFound()
    }

    const article = await Article.findById(id).populate('authorId').populate('categoryId'); // atau Article.findOne({ _id: id });
    return article;
}

export const getArticleByCategorySlug = async (slug: string, { page = 1, limit = 4 }: FilteredParams = {}) => {
    await connectDB();

    // Cari category berdasarkan slug
    const category = await Category.findOne({ slug });

    // Jika category tidak ditemukan, return null
    if (!category) {
        return null;
    }

    const skip = (page - 1) * limit;

    // Filter berdasarkan categoryId yang ditemukan
    const filter = { categoryId: category._id };

    const articles = await Article.find(filter)
        .populate("authorId")
        .populate("categoryId")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await Article.countDocuments(filter);

    return {
        articles,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        categoryName: category.name, // Tambahkan nama category untuk display
    };
};


export const getUserDetail = async (id: string) => {
    await connectDB()

    if (!Types.ObjectId.isValid(id)) {
        return notFound()
    }

    const user = await User.findById(id);

    if (!user) return notFound()

    return user
}

export const createArticle = async (data: ArticleData) => {
    await connectDB()

    const {
        userId,
        email,
        title,
        content,
        categorySlug,
        firstName,
        lastName,
        imageUrl,
    } = data;

    if (!userId || !email || !title || !content || !categorySlug) {
        throw new Error("Data tidak lengkap")
    }

    const name = [firstName, lastName].filter(Boolean).join(" ")

    let user = await User.findOne({ userId });
    if (!user) {
        user = await User.create({ userId, name, email, imageUrl })
    }

    const category = await Category.findOne({ slug: categorySlug })
    if (!category) {
        throw new Error("Kategori tidak ditemukan")
    }

    const newArticle = await Article.create({
        title,
        content,
        authorId: user._id,
        categoryId: category._id,
    })

    return newArticle
}

export const deleteArticle = async (id: string, userId?: string, role?: string) => {
    await connectDB()

    if (!Types.ObjectId.isValid(id)) {
        notFound()
    }

    try {
        // Cari article dulu untuk validasi ownership
        const article = await Article.findById(id).populate("authorId")

        if (!article) {
            notFound()
        }

        // Validasi apakah user yang delete adalah pemilik article
        if (role !== "admin" && role !== "moderator" && article.authorId.userId !== userId) {
            throw new Error("Unauthorized: You can only delete your own articles")
        }
        await Article.findByIdAndDelete(id)


        return { success: true, message: "Article Berhasil dihapus" }

    } catch (error) {
        console.error("Error deleting article:", error)
        throw new Error("Gagal Menghapus article")
    }
}

export const dataUser = async (id: string) => {
    await connectDB();

    const user = await User.findOne({ userId: id });

    return user;
}