// we "use client" as it is client side
"use client"

import Link from "next/link";
import Image from "next/image";
import {Poppins} from "next/font/google";
import {cn} from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";

const fonts = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});
    
export const Orgsidebar = () => {
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
            <div className="text-2xl flex-col items-center w-[204px] px-8 py-0 bg-green-500 ">
               
                    <OrganizationSwitcher />
                
            </div>
        </div>
    );
};