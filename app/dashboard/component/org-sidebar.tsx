// we "use client" as it is client side
"use client"

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { LayoutDashboard, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation"

const fonts = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

export const Orgsidebar = () => {
    const searchParams = useSearchParams();
    const favorites = searchParams.get("favorites");

    return (
        <div className="hidden lg:flex flex-col h-full w-[204px] space-y-4 pl-[5px] pt-[5px] ">
            <Link href="/">
                <div className="flex items-center gap-x-4">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={60}
                        height={60}
                    />
                    <span className={cn("text-2xl text-black-600", fonts.className)}>
                        Sketchly
                    </span>
                </div>
            </Link>

            <OrganizationSwitcher
                hidePersonal
                appearance={{
                    elements: {
                        rootBox: {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                        },
                        organizationSwitcherTrigger: {
                            padding: "6px",
                            width: "100%",
                            borderRadius: "8px",
                            border: "1px solid #E5E7EB",
                            justifyContent: "space-between",
                            backgroundColor: "white",
                        }
                    }
                }}
            />
            {/* Added two buttons */}
            <div className="space-y-1 w-full">
                <Button variant={favorites ? "ghost" : "secondary"} asChild
                    size="lg"
                    className="font-bold text-md justify-start px-2 w-full ">
                    <Link href="/">
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Team boards
                    </Link>
                </Button>
            </div>
            <div className="space-y-1 w-full">
                <Button variant={favorites ? "secondary" : "ghost"} asChild
                    size="lg"
                    className="font-bold text-md justify-start px-2 w-full ">
                    <Link href={{
                        pathname: '/',
                        query: {
                            favorites: true
                        }
                    }}>
                        <Star className="h-4 w-4 mr-2" />
                        Favorite boards
                    </Link>
                </Button>
            </div>
        </div>
    );
};