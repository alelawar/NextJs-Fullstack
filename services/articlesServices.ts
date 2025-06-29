import { connectDB } from "../lib/mongoose";
import { Article } from "../models/Article";
import "../models/User"
import "../models/Category"
import { Category } from "../models/Category";
import { Types } from "mongoose";

export const getAllArticles = async () => {
    await connectDB()
    return await Article.find().populate('authorId').populate('categoryId');
};

export const getAllCategories = async () => {
    await connectDB()
    return await Category.find();
}

export const getDetailArticle = async (id: string) => {
    await connectDB()

    if (!Types.ObjectId.isValid(id)) {
        return null
    }

    const article = await Article.findById(id).populate('authorId').populate('categoryId'); // atau Article.findOne({ _id: id });
    return article;
}