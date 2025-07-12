import Image from "next/image"
import { currentUser } from "@clerk/nextjs/server";
import { dataUser } from "../../../../services/articlesServices";

export default async function UserProfilePage() {
    const userObj = await currentUser()
    // const user = {
    //     name: `${userObj?.firstName ?? ""} ${userObj?.lastName ?? ""}`.trim(),
    //     email: userObj?.emailAddresses?.[0]?.emailAddress ?? "-",
    //     imageUrl: userObj?.imageUrl,
    //     createdAt: new Date(userObj?.createdAt ?? Date.now()),
    // };
    const id = userObj?.id as string

    const user = await dataUser(id)
    if(!user) {
        return (
            <h1>Kamu belum terdaftar sebagai member, coba buat artikel!</h1>
        )
    }
    return (
        
        <div className="flex items-center gap-4">
            <div className="relative size-10 rounded-full overflow-hidden">
                <Image
                    src={user?.imageUrl ?? "/"}
                    alt={user?.name ?? "belum login"}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col">
                <h1>{user?.name}</h1>
                <p className="text-xs text-slate-300">{user?.email}</p>
                <p className="text-xs text-slate-300"><span className="text-white">Terakhir masuk pada : </span>{user?.createdAt.toDateString()}</p>
            </div>
        </div>
    )
}