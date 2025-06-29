import mongoose, {  Types } from "mongoose";
export type ButtonProps = {
    href: string;
    label: string;
    icon: string;
}

export interface IArticle extends Document {
    title: string;
    content: string;
    authorId: mongoose.Types.ObjectId;
    categoryId: Types.ObjectId;
    createdAt: Date;
}


export interface ICategory extends Document {
    _id: Types.ObjectId;
    name: string;
    slug: string;
    createdAt: Date;
}

export interface IUser extends Document {
  userId: string; // ID dari Clerk (contoh: 'user_abc123')
  name?: string;
  email?: string;
  imageUrl?: string;
  createdAt: Date;
}


export type Roles = "admin" | "moderator"
