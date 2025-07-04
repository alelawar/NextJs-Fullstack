import Image from "next/image"
import { auth, currentUser } from "@clerk/nextjs/server";
import { log } from "console";

export default async function UserProfilePage() {
    const userObj = await currentUser()
    log(userObj)

    const user = {
        name: `${userObj?.firstName ?? ""} ${userObj?.lastName ?? ""}`.trim(),
        email: userObj?.emailAddresses?.[0]?.emailAddress ?? "-",
        imageUrl: userObj?.imageUrl,
        createdAt: new Date(userObj?.createdAt ?? Date.now()),
    };
    return (
        <div className="flex items-center gap-4">
            <div className="relative size-10 rounded-full overflow-hidden">
                <Image
                    src={user?.imageUrl ?? "/"}
                    alt={user?.name}
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