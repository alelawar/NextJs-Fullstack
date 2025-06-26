import { ActionUser } from "@/components/actionUser";
import { Button } from "@/components/Button";

export default function Home() {
  return (
    <section
      className="text-center px-8 md:px-20 py-12 ">
      <h1
        className="text-2xl md:text-5xl text-slate-100 font-bold mb-3 md:mb-6 ">
        NextJS + Clerk + MongoDB
      </h1>

      <h2
        className="text-sm md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-7 md:mb-10">
        Ini adalah project pertama saya menggunakan NextJS Fullstack, website ini hanyalah sebuah prototype, dan hanya untuk sebuah contoh. <span className="text-red-500 font-medium">Sign-In</span> Untuk Membuat Artikel
      </h2>
      <Button
        href="/articles"
        label="Artikel"
        icon="bi bi-journal-text"
      />
      <ActionUser/>
    </section>
  );
}
