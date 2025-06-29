import mongoose, { Schema, Document } from "mongoose";
import { IArticle } from "@/types/types";

const ArticleSchema = new Schema<IArticle>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
        createdAt: { type: Date, default: Date.now },
    },
    { collection: "articles" }
)

// Hindari re-declare model saat dev
export const Article =
    mongoose.models.Article || mongoose.model<IArticle>("Article", ArticleSchema);