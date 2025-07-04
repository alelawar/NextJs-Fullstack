import Image from 'next/image'
import { getDetailArticle } from '../../../../../services/articlesServices'

export default async function DetailArticle({ params }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const article = await getDetailArticle(id)

    // Ubah createdAt ke tanggal lokal Indonesia
    const createdAt = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(article.createdAt))

    return (
        <div className="md:w-full h-fit border border-white rounded-lg py-5 px-2 md:py-8 md:px-5 mx-5 mt-10">
            <h1 className="text-center mb-3 md:mb-8 font-bold text-2xl md:text-4xl">
                {article.title}
            </h1>

            <div className="mb-1 my-0.5 text-xs md:text-base flex items-center gap-4">
                <div className="relative size-7 rounded-full overflow-hidden">
                    <Image
                        src={article.authorId.imageUrl}
                        alt={article.authorId.name}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex flex-col">
                    <a href={`/user/${article.authorId._id}`} className="font-medium">{article.authorId.name}</a>
                    <p className="text-slate-400 text-xs">{createdAt}</p>
                </div>

            </div>
            
            <div className="mt-10 mb-3">
                <p>
                    {article.content}
                </p>
            </div>
        </div>
    )
}
