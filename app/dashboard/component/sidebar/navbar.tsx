"use client";

import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import { Search } from "lucide-react";

export const Navbar = () => {
    const { user } = useUser();
    return (
        <div className="flex items-center gap-x-4 p-5 bg-green-500">
            <div className="hidden lg:flex lg:flex-1">
                <div className="relative w-full max-w-[480px]">
                    <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white h-4 w-4" />
                    <input
                        className="w-full bg-white/20 pl-10 pr-4 py-2 rounded-md border text-white placeholder-white/100 focus:bg-white/30 focus:outline-none transition"
                        placeholder="Search boards"
                    />
                </div>
            </div>
            {user ? (
                <UserButton
                    appearance={{
                        elements: {
                            userButtonAvatarBox: "!h-10 !w-10"
                        }
                    }}
                />
            ) : (
                <SignInButton />
            )}
        </div>
    );
};