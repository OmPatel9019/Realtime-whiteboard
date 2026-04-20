import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/provider/convex-client-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/provider/modal-provider";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ClerkProvider>
                    <ConvexClientProvider>
                        <Toaster/>
                        <ModalProvider/>
                        {children}
                    </ConvexClientProvider>
                </ClerkProvider>
            </body>
        </html>
    );
}