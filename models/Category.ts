import mongoose, { Schema, Document } from 'mongoose';
import { ICategory } from '@/types/types';

const CategorySchema = new Schema<ICategory>(
  {
    // _id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'categories' }
);

export const Category =
  mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
