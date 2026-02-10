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
import { Hint } from "@/components/hint"

export const NewButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="aspect-square">
                    {/* created a plus button that allows to create organization */}
                    <Hint label="Create organization"
                        side="right"
                        align="start"
                        sideOffset={18}>
                        <button className="bg-white/25 h-full w-full rounded-md flex  items-center justify-center opacity-60 hover:opacity-100 transition">
                            <Plus className="text-white" />
                        </button>
                    </Hint>
                </div>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none w-fit max-w-none shadow-none text-left" showCloseButton={false}>
                <DialogTitle />
                <div className="relative">
                    {/* Below tag enables create organizatoin form */}
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