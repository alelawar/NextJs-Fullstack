import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)", "/api/articles(.*)", "/articles(.*)", "/user(.*)"])
const isAdminRoute = createRouteMatcher(["/admin(.*)"])
const isModRoute = createRouteMatcher(["/dashboard(.*)"])

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth()

  // Get user role from session claims
  const userRole = (await auth()).sessionClaims?.metadata?.role

  // Check admin route access
  if (isAdminRoute(req) && userRole !== "admin") {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }

  // Check moderator route access (moderator and admin can access)
  if (isModRoute(req) && !["moderator", "admin"].includes(userRole ?? "")) {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }

  // Check if user is authenticated for private routes
  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn();
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};