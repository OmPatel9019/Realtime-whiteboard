import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import {ConvexClientProvider} from "@/provider/convex-client-provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My App",
  description: "My App Description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} min-h-screen`}>
          <ConvexClientProvider>
            <div className="min-h-screen flex flex-col">
              {children}
            </div>
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}