'use client';

import { SignIn, useAuth } from "@clerk/nextjs";
import AuthSkeleton from "@/components/skeletonAuth";

export default function SignInPageClient() {
  const { isLoaded } = useAuth(); // <- ini kunci utama

  return (
    <div className="flex justify-center h-[90dvh] items-center py-8">
      {!isLoaded ? <AuthSkeleton /> : <SignIn />}
    </div>
  );
}
