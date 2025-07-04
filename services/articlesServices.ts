import { connectDB } from "../lib/mongoose";
import { Article } from "../models/Article";
import "../models/User"
import "../models/Category"
import { Category } from "../models/Category";
import { Types } from "mongoose";
import { notFound } from "next/navigation";
import { User } from "../models/User";
import { ArticleData, FilteredParams } from "@/types/types";

export const getAllArticles = async ({ authorId, search, page = 1, limit = 10 }:
    FilteredParams  = {}
) => {
    await connectDB()
    const filter: any = {}

    if (authorId && Types.ObjectId.isValid(authorId)) {
        filter.authorId = new Types.ObjectId(authorId);
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

export const getArticleByCategorySlug = async (slug: string) => {
    await connectDB();

    const category = await Category.findOne({ slug });

    if (!category) return; // atau bisa juga throw error

    const articles = await Article.find({ categoryId: category._id }).populate("categoryId").populate("authorId");

    return articles;
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