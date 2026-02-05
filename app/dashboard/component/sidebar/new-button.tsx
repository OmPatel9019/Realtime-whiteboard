"use client";

import { Plus, X } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";
// import { CreateOrganization } from "@clerk/clerk-react";

export const NewButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="aspect-square">
                    <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
                        <Plus className="text-white h-10 w-10" />
                    </button>
                </div>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none w-fit max-w-none shadow-none text-left" showCloseButton={false}>
                <DialogTitle />
                <div className="relative">
                    <CreateOrganization />
                    <DialogClose className="absolute right-4 top-4 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-0">
                        <X className="h-5 w-5 text-muted-foreground" />
                        <span className="sr-only">Close</span>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
}