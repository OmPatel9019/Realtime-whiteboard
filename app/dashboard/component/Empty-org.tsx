"use client";

import Image from "next/image";
import { CreateOrganization, useAuth, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { X, LogIn } from "lucide-react";


export const EmptyOrg = () => {
    const { isSignedIn } = useAuth();

    return (
        <div className="flex-1 flex flex-col items-center justify-center">
            <Image
                src="/Image.svg"
                alt="Organization"
                width={200}
                height={500}
            />
            <h2 className="text-2xl font-semibold mt-6">Welcome to Board</h2>
            <p className="text-muted-foreground text-sm mt-2">
                {isSignedIn
                    ? "Create your first board to get started"
                    : "Sign in or create an account to get started"}
            </p>
            <div className="mt-6">
                {isSignedIn ? (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="lg">
                                Create Organization
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="p-0 bg-transparent border-none w-fit max-w-none shadow-none text-left" showCloseButton={false}>
                            <DialogTitle />
                            <div className="relative">
                                {/* Below tag enables create organization form */}
                                <CreateOrganization afterCreateOrganizationUrl="/" />
                                <DialogClose className="absolute right-4 top-4 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-0">
                                    <X className="h-5 w-5 text-muted-foreground" />
                                    <span className="sr-only">Close</span>
                                </DialogClose>
                            </div>
                        </DialogContent>
                    </Dialog>
                ) : (
                    <SignInButton mode="redirect" fallbackRedirectUrl="/dashboard">
                        <Button size="lg">
                            <LogIn className="mr-2 h-5 w-5" />
                            Login / Sign Up
                        </Button>
                    </SignInButton>
                )}
            </div>
        </div>
    );
}