import { auth, currentUser } from "@clerk/nextjs/server";
import { log } from "console";

export default async function DashboardPage() {
    const authObj = await auth()
    const userObj = await currentUser()

    log(authObj)
    log(userObj)

    return <h1>Dashboard Page</h1>
}