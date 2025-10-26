import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Create a function that matches public routes
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',  // Match /sign-in and /sign-in/...
  '/sign-up(.*)',  // Match /sign-up and /sign-up/...
]);

export default clerkMiddleware((auth, req) => {
  // If the route is NOT public, then protect it.
  if (!isPublicRoute(req)) {
    auth.protect();
  }
  // If the route IS public, do nothing (allow access)
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};