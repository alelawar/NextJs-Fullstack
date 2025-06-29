import mongoose from "mongoose";
import dotenv from "dotenv";
import { Category } from "./models/Category";
import { Article } from "./models/Article";
import { ICategory } from "@/types/types";
import { User } from "./models/User";

dotenv.config({ path: '.env.local' });

const MONGODB_URI =
  process.env.MONGODB_URI as string; // HARUS DI KONFERSI KE STRING DLU

// log(`Api ATLAS 🌏 : ${MONGODB_URI}`);

async function seed() {
  try {
    // KONEKSIIN DLU KE MONGO DB / ATLAS YA
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // FRESH/HAPUS IN SEMUA COLLECTIONS YANG ADA
    await User.deleteMany({});
    await Category.deleteMany({});
    await Article.deleteMany({});
    console.log('🗑️ ' + 'Koleksi category & article dikosongkan');

    // SEED DATA KE COLLECTION USER
    const users = await User.insertMany([
      {
        userId: 'user_123456',
        name: 'Alice',
        email: 'alice@example.com',
        imageUrl: 'https://i.pravatar.cc/150?img=1',
      },
      {
        userId: 'user_789123',
        name: 'Bob',
        email: 'bob@example.com',
        imageUrl: 'https://i.pravatar.cc/150?img=2',
      },
    ])
    console.log(`✅ ${users.length} users berhasil ditambahkan`);

    // SEED DATA KE COLLECION CATEGORY
    const categories = await Category.insertMany([
      { name: 'Berita', slug: 'berita' },
      { name: 'Tutorial', slug: 'tutorial' },
      { name: 'Opini', slug: 'opini' },
    ]);
    console.log(`✅ ${categories.length} kategori berhasil dimasukkan`);

    // FUNGSI BUAT NGAMBIL ID RANDOM DARI COLLECTIONS ATLAS
    function getRandomCategoryId(categories: ICategory[]) {
      const randomIndex = Math.floor(Math.random() * categories.length);
      return categories[randomIndex]?._id;
    }

    const articles = await Article.insertMany([
      {
        title: 'Artikel Pertama',
        content: 'Ini isi dari artikel pertama.',
        authorId: users[0]._id,
        categoryId: getRandomCategoryId(categories),
      },
      {
        title: 'Tips Next.js dan MongoDB',
        content: 'Berikut adalah tips menggunakan Next.js dengan MongoDB...',
        authorId: users[1]._id,
        categoryId: getRandomCategoryId(categories),
      },
    ])

    console.log(`✅ ${articles.length} artikel berhasil dimasukkan`);
  } catch (err) {
    console.error('❌ Gagal seeding:', err);
  } finally {
    await mongoose.connection.close();
  }
}

seed()