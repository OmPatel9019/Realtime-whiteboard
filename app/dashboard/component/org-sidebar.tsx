// we "use client" as it is client side
"use client"

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { useOrganization, useOrganizationList, useClerk } from "@clerk/nextjs";
import { ChevronsUpDown, Plus, Settings } from "lucide-react";
import { useState } from "react";

const fonts = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

export const Orgsidebar = () => {
    const { organization } = useOrganization();
    const { userMemberships, setActive } = useOrganizationList({
        userMemberships: {
            infinite: true,
        },
    });
    const { openOrganizationProfile, openCreateOrganization } = useClerk();
    const [isOpen, setIsOpen] = useState(false);

    const onSelect = (id: string) => {
        if (!setActive) return;
        setActive({ organization: id });
        setIsOpen(false);
    };

    // Get the current organization name and initial for the custom trigger button.
    const currentOrgName = organization?.name || "Organization";
    const currentOrgInitial = currentOrgName.charAt(0).toUpperCase();

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

            <div className="relative w-full font-poppins">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between w-full p-[6px] rounded-[8px] border border-[#E5E7EB] bg-white hover:bg-gray-50 transition"
                >
                    <div className="flex items-center gap-2 overflow-hidden">
                        <div className="h-[30px] w-[30px] min-h-[30px] min-w-[30px] bg-zinc-200 text-black rounded-md flex items-center justify-center font-bold">
                            {currentOrgInitial}
                        </div>
                        <span className="text-sm font-medium truncate">
                            {currentOrgName}
                        </span>
                    </div>
                    <ChevronsUpDown className="h-4 w-4 text-muted-foreground shrink-0" />
                </button>

                {isOpen && (
                    <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-[#E5E7EB] rounded-[8px] shadow-lg z-50 py-1 flex flex-col">
                        <div className="max-h-[300px] overflow-y-auto">
                            {userMemberships.data?.map((mem) => (
                                <button
                                    key={mem.organization.id}
                                    onClick={() => onSelect(mem.organization.id)}
                                    className={cn(
                                        "flex items-center gap-2 w-full px-2 py-2 hover:bg-gray-50 text-left transition",
                                        mem.organization.id === organization?.id && "bg-gray-50 text-black"
                                    )}
                                >
                                    <div className="h-[24px] w-[24px] bg-zinc-200 text-black rounded-sm flex items-center justify-center font-bold text-xs shrink-0">
                                        {mem.organization.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm truncate">
                                        {mem.organization.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                        <div className="h-px bg-gray-200 my-1" />
                        <button
                            onClick={() => {
                                openOrganizationProfile();
                                setIsOpen(false);
                            }}
                            className="flex items-center gap-2 w-full px-2 py-2 hover:bg-gray-50 text-left text-sm transition"
                        >
                            <Settings className="h-4 w-4 mr-2" />
                            Manage Organization
                        </button>
                        <button
                            onClick={() => {
                                openCreateOrganization();
                                setIsOpen(false);
                            }}
                            className="flex items-center gap-2 w-full px-2 py-2 hover:bg-gray-50 text-left text-sm transition"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Create Organization
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};