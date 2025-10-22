"use client";

// Providers: Clerk + Convex (wires auth to Convex)

import { ClerkProvider , useAuth } from "@clerk/nextjs"; // Clerk auth
import { ConvexProviderWithClerk } from "convex/react-clerk"; // Convex + Clerk
import {
    AuthLoading,
    Authenticated,
    ConvexReactClient
} from "convex/react";

interface ConvexClientProviderProps {
    children : React.ReactNode;
}

// Convex URL from env (client-side)
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

// Single Convex client instance
const convex =  new ConvexReactClient(convexUrl);

// Exports a provider that wraps the app with Clerk + Convex
export const ConvexClientProvider = ({ children }: ConvexClientProviderProps) => {
    return (
        <ClerkProvider>
            <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
};





