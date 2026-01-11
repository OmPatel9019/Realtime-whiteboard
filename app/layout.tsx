import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/provider/convex-client-provider";
import "./globals.css";

// export const metadata: Metadata = {
//     title: "Realtime Whiteboard",
//     description: "A realtime whiteboard application",
// };

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <ClerkProvider>
                    <ConvexClientProvider>
                        {children}
                    </ConvexClientProvider>
                </ClerkProvider>
            </body>
        </html>
    );
}
