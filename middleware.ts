import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// 1. Define the routes that are public and should not require authentication
const isPublic = createRouteMatcher([
  '/',                // The landing page
  '/dashboard(.*)',   // Make dashboard public for testing
  '/sign-in(.*)',     // The sign-in page (and all its sub-routes)
  '/sign-up(.*)',     // The sign-up page (and all its sub-routes)
  // Add any other public routes here, like '/api/webhooks(.*)'
]);

import { NextResponse } from "next/server";

// 2. Export the middleware
export default clerkMiddleware((auth, req) => {
  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 3. Check if the route is public. If it's not, protect it.
  if (!isPublic(req)) {
    auth.protect();
  }
});

// 4. Use the new, recommended matcher from your example
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|_not-found|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};