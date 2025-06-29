"use server"

import { Roles } from "@/types/types";
import { auth, clerkClient } from "@clerk/nextjs/server"

export async function setRole(formData: FormData) {
    const {sessionClaims} = await auth()

    if(sessionClaims?.metadata?.role !== "admin") {
        throw new Error("Not Authorized");
    }

    const client = await clerkClient()
    const id = formData.get("id") as string
    const role = formData.get("role") as Roles
}