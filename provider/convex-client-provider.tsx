"use client";

// Provider: Convex client that integrates with Clerk's auth (the app-level
// `ClerkProvider` should wrap the tree — we don't re-wrap here).

import { useAuth } from "@clerk/nextjs"; // Clerk auth hook (app-level provider must exist)
import { ConvexProviderWithClerk } from "convex/react-clerk"; // Convex + Clerk
import {
    AuthLoading,
    Authenticated,
    ConvexReactClient
} from "convex/react";
import {Loading} from "@/components/auth/loading";

interface ConvexClientProviderProps {
    children : React.ReactNode;
}

// Convex URL from env (client-side)
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

// Single Convex client instance
const convex =  new ConvexReactClient(convexUrl);

// Exports a provider that wires Convex to the existing Clerk auth provider.
// Important: do NOT add a second `ClerkProvider` here — `app/layout.tsx` already
// provides Clerk for the whole app. This component expects to be rendered
// use of 'auth' from '@clerk/nextjs' for authentication.
export const ConvexClientProvider = ({ children,
}: ConvexClientProviderProps) => {
    return (
        <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
            <Authenticated>
                {children}
            </Authenticated>
            <AuthLoading>
                <Loading />
            </AuthLoading>
        </ConvexProviderWithClerk>
    );
};





