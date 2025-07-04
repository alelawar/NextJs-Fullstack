'use client'
import AuthSkeleton from "@/components/skeletonAuth";
import { SignUp, useAuth } from "@clerk/nextjs";

export default function SignUpPage() {
    const {isLoaded} = useAuth()
    return (
        <div className="flex justify-center items-center h-[90dvh] py-8">
            {!isLoaded ?  <AuthSkeleton/>: <SignUp/> }
        </div>
    )
}   