"use client"
import { DeleteArticleButtonProps } from "@/types/types";
import { useState } from "react";

export default function DeleteArticleButton({
  articleId,
  articleTitle,
  onDelete
}: DeleteArticleButtonProps) {
  const [modal, setModal] = useState(false)
  const [send, setSend] = useState(false)

  const handleConfirmDelete = async () => {
    setSend(true); // disable tombol dan ganti teks
    const formData = new FormData()
    formData.append("articleId", articleId)

    try {
      await onDelete(formData) // tunggu proses delete selesai
    } finally {
      setSend(false)
      setModal(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setModal(true)}
        className="px-1.5 py-0.5 border border-slate-300 hover:rounded-md transition duration-700 ease-in-out text-xs md:text-base hover:text-red-600 mx-5 cursor-pointer"
      >
        {send ? "Menghapus..." : "Hapus"}
      </button>

      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-black border border-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
            <p className="text-gray-600 mb-6">
              Yakin mau hapus artikel : {articleTitle} ?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setModal(false)}
                disabled={send}
                className="px-4 py-2 cursor-pointer border border-gray-300 rounded hover:bg-slate-800 disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={send}
                className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {/* {send ? "Menghapus..." : "Ya, Hapus"} */}
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
