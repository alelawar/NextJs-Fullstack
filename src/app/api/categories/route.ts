import { connectDB } from "../../../../lib/mongoose";
import { Category } from "../../../../models/Category";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find({});
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch categories", error },
      { status: 500 }
    );
  }
}
