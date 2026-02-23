"use client";

import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { SearchInput } from "./search-input";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { InviteMember } from "./invite-member";

export const Navbar = () => {
    const { user } = useUser();
    return (
        <div className="flex items-center gap-x-4 p-5">
            <div className="hidden lg:flex lg:flex-1">

                <SearchInput />

            </div>
            <div className="block lg:hidden flex-1">
                <OrganizationSwitcher
                    hidePersonal
                    appearance={{
                        elements: {
                            rootBox: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: "40px",
                                font: "bold",
                                maxWidth: "370px",
                            },
                            organizationSwitcherTrigger: {
                                padding: "2px",
                                width: "100%",
                                height: "40px", // match user button avatar size (h-10)
                                minWidth: "40px",
                                borderRadius: "8px",
                                border: "1px solid #E5E7EB",
                                justifyContent: "space-between",
                                backgroundColor: "white",
                            }
                        }
                    }}
                />
            </div>
            <InviteMember/>
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