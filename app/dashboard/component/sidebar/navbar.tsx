"use client";

import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { SearchInput } from "./search-input";

export const Navbar = () => {
    const { user } = useUser();
    return (
        <div className="flex items-center gap-x-4 p-5">
            <div className="hidden lg:flex lg:flex-1">

                <SearchInput />

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
                <SignInButton>
                    <Button size="sm" variant="secondary">
                        Login
                    </Button>
                </SignInButton>
            )}
        </div>
    );
};