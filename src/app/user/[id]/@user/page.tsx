import { log } from "console";
import { getUserDetail } from "../../../../../services/articlesServices";
import Image from "next/image";

export default async function detailUser({ params }: {
    params: Promise<{ id: string }>
}) {
    // await new Promise(resolve => {
    //     setTimeout(resolve, 1700)
    // })
    const { id } = await params;
    const user = await getUserDetail(id)
    // log("data user" + user)
    return (
        <>
            <div className="flex items-center gap-4">
                <div className="relative size-10 rounded-full overflow-hidden">
                    <Image
                        src={user.imageUrl}
                        alt={user.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <h1>{user.name}</h1>
                    <p className="text-xs text-slate-300">{user.email}</p>
                    <p className="text-xs text-slate-300"><span className="text-white">Dibuat Pada : </span>{user.createdAt.toDateString()}</p>
                </div>
            </div>
        </>

    )
}