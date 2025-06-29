import { IUser } from "@/types/types";
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema<IUser>(
    {
        userId: { type: String, required: true, unique: true },
        name: { type: String },
        email: { type: String },
        imageUrl: { type: String },
        createdAt: { type: Date, default: Date.now },
    },
    {collection: "users"}
);

export const User = 
    mongoose.models.User || mongoose.model<IUser>("User", UserSchema)