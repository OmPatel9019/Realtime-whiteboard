"use client";

import { Plus, X } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";

export const InviteMember = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Invite Memebers
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none shadow-none w-fit max-w-none flex items-center justify-center" showCloseButton={false}>
                <DialogTitle>
                    <span className="sr-only">Invite Members</span>
                </DialogTitle>
                <div className="relative inline-block mx-auto">
                    <DialogClose className="absolute right-2 top-2 z-50 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-0">
                        <X className="h-5 w-5 text-muted-foreground" />
                        <span className="sr-only">Close</span>
                    </DialogClose>
                    <OrganizationProfile routing="hash" appearance={{
                        elements: {
                            rootBox: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                maxWidth: "870px",
                            },
                        }
                    }} />
                </div>
            </DialogContent>
        </Dialog>
    );
};