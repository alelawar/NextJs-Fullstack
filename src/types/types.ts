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
  userId?: string;
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

export type ArticleListProps = {
  dataArticles: Article[];
  deleteButton?: boolean;
  editButton?: boolean;
  userId?: string
  handleDelete?: (id: string) => void;
};

export type DeleteArticleButtonProps = {
  articleId: string;
  articleTitle: string;
  onDelete: (formData: FormData) => void;
}

interface ArticleDataChart {
  _id: string;
  count: number;
}

interface ChartProps {
  data: ArticleDataChart[];
}

export interface ReusableChartProps extends ChartProps {
  title?: string;
  linkText?: string;
  linkHref?: string;
  barColor?: string;
  height?: number;
  dateFormat?: boolean; // apakah data perlu diformat tanggal atau engga
  dataKeyX?: string; // field yang dipake buat X axis
  dataKeyY?: string; // field yang dipake buat Y axis
  tooltipLabel?: string; // label buat tooltip
}


interface CategoryData {
  _id: string;
  count: number;
}

export interface CategoryChartProps {
  data: CategoryData[];
}

export interface ButtonAdminProps {
  label: string;
  sending?: string;
}

export interface editArticleProps {
  _id: string;
  title: string;
  content: string;
  categoryId: {
    _id: string;
    name: string;
    slug: string;
  };
}

export type Roles = "admin" | "moderator"
