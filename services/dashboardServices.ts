"use server"

import { clerkClient } from "@clerk/nextjs/server"
import { connectDB } from "../lib/mongoose"
import { Article } from "../models/Article"
import { Category } from "../models/Category"
import { User } from "../models/User"
import { Roles } from "@/types/types"
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache"
import { Types } from "mongoose"
import { notFound } from "next/navigation"


export async function getDataArticles() {
    await connectDB()

    // Daily stats
    const dailyStats = await Article.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                count: { $sum: 1 }
            }
        },
        { $sort: { "_id": 1 } },
        { $limit: 7 }
    ])

    const monthlyData = await Article.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                count: { $sum: 1 }
            }
        },
        { $sort: { "_id": 1 } },
        { $limit: 30 }
    ])

    // Category stats
    const categoryStats = await Article.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: "$category"
        },
        {
            $group: {
                _id: "$category.name",
                count: { $sum: 1 }
            }
        },
        {
            $sort: { count: -1 } // Urutkan dari yang paling banyak
        },
        {
            $limit: 5 // Ambil maksimal 5 data
        }
    ]);

    const categoryData = await Category.aggregate([
        {
            $lookup: {
                from: "articles",
                localField: "_id",
                foreignField: "categoryId",
                as: "articleCount",
                pipeline: [
                    { $count: "total" } // Langsung count tanpa load semua data
                ]
            }
        },
        {
            $project: {
                name: 1,
                description: 1,
                totalArticles: {
                    $ifNull: [
                        { $arrayElemAt: ["$articleCount.total", 0] },
                        0
                    ]
                }
            }
        },
        {
            $sort: { totalArticles: -1 }
        }
    ])

    return { dailyStats, categoryStats, monthlyData, categoryData }
}

export async function getDataUsers(page = 1, limit = 7, search?: string) {
    await connectDB();

    const userStats = await User.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                count: { $sum: 1 }
            }
        },
        { $sort: { "_id": 1 } },
        { $limit: 7 }
    ]);

    const skip = (page - 1) * limit;

    // Build match stage untuk search
    const matchStage: any = {};
    if (search) {
        matchStage.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } }
        ];
    }

    const userContributor = await User.aggregate([
        // Tambahkan match stage di awal jika ada search
        ...(search ? [{ $match: matchStage }] : []),
        {
            $lookup: {
                from: "articles",
                localField: "_id",
                foreignField: "authorId",
                as: "articles"
            }
        },
        {
            $addFields: {
                articleCount: { $size: "$articles" }
            }
        },
        {
            $sort: { articleCount: -1 }
        },
        {
            $skip: skip
        },
        {
            $limit: limit
        },
        {
            $project: {
                _id: 1,
                name: 1,
                email: 1,
                imageUrl: 1,
                createdAt: 1,
                articleCount: 1
            }
        }
    ]);

    // Hitung total user contributor dengan search filter
    const totalContributors = await User.aggregate([
        // Tambahkan match stage di awal jika ada search
        ...(search ? [{ $match: matchStage }] : []),
        {
            $lookup: {
                from: "articles",
                localField: "_id",
                foreignField: "authorId",
                as: "articles"
            }
        },
        {
            $addFields: {
                articleCount: { $size: "$articles" }
            }
        },
        {
            $count: "total"
        }
    ]);

    const totalUsers = await User.find()
    const total = totalUsers.length

    return {
        userStats,
        userContributor,
        pagination: {
            total: totalContributors[0]?.total || 0,
            page,
            limit,
            search // Tambahkan search ke pagination info
        },
        total
    };
}

export async function createCategory(name: string, role: string) {
    await connectDB()


    if (!role) {
        throw new Error("User Tidak Diizinkan");
    }

    const existing = await Category.findOne({ name });

    if (existing) {
        throw new Error("Kategori dengan nama ini sudah ada");
    }

    const slug = name.toLocaleLowerCase()
    const newCategory = new Category({
        name,
        slug
    });

    await newCategory.save();

    return newCategory;
}

export async function deleteCategory(id: string, role: string) {
    await connectDB();

    if (!Types.ObjectId.isValid(id)) {
        notFound()
    }

    try {
        const category = Category.findById(id)

        if (!category) notFound();

        if (role !== "admin" && role !== "moderator") {
            throw new Error("Unauthorized: You can only delete your own articles")
        }

        await Category.findByIdAndDelete(id);

        return { success: true, message: "Article Berhasil dihapus" }

    } catch (error) {
        console.error("Error deleting article:", error)
        throw new Error("Gagal Menghapus article")
    }
}

export async function setRole(formData: FormData) {
    const { sessionClaims } = await auth();

    // Check that the user trying to set the role is an admin
    if (sessionClaims?.metadata?.role !== "admin") {
        throw new Error("Not Authorized");
    }

    const client = await clerkClient();
    const id = formData.get("id") as string;
    const role = formData.get("role") as Roles;

    try {
        await client.users.updateUser(id, {
            publicMetadata: { role },
        });
        revalidatePath("/dashboard/admin");
    } catch {
        throw new Error("Failed to set role");
    }
}

export async function removeRole(formData: FormData) {
    const { sessionClaims } = await auth();

    if (sessionClaims?.metadata?.role !== "admin") {
        throw new Error("Not Authorized");
    }

    const client = await clerkClient();
    const id = formData.get("id") as string;

    try {
        await client.users.updateUser(id, {
            publicMetadata: { role: null },
        });
        revalidatePath("/dashboard/admin");
    } catch {
        throw new Error("Failed to remove role");
    }
}