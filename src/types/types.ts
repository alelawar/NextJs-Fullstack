import mongoose, { Types } from "mongoose";
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


export interface FilteredParams {
  authorId?: string;
  search?: string;
  page?: number; 
  limit?: number
}

export type ArticleData = {
  title: string
  categorySlug: string
  content: string
  userId?: string
  firstName?: string
  lastName?: string
  email?: string
  imageUrl?: string
}

export interface Article {
  _id: string;
  title: string;
  content: string;
  authorId: {
    _id: string;
    name: string;
    imageUrl: string;
  };
  categoryId: {
    _id: string;
    name: string;
    slug: string;
  };
  createdAt: string;
}

export interface LayoutProps {
  articles?: React.ReactNode;
  categoriesNav?: React.ReactNode;
}



export type Roles = "admin" | "moderator"
