// app/api/articles/route.ts
// import { connectDB } from '@/lib/mongoose';
import { connectDB } from '../../../../lib/mongoose';
import { Article } from '../../../../models/Article';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const articles = await Article.find();
  return NextResponse.json(articles);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const article = await Article.create(body);
  return NextResponse.json(article, { status: 201 });
}
