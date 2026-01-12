"use client";
import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";


export const NewButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="aspect-square">
                    <button className="bg-blue-500 rounded-md h-full w-full flex justify-center items-center opacity-60 hover:opacity-80 transition">
                        <Plus className="text-white" />
                    </button>
                </div>
            </DialogTrigger>            Stop-Process -Id 13596
            Remove-Item 'C:\Users\op249\my-nextjs-app\.git\index.lock' -Force
            git -C 'C:\Users\op249\my-nextjs-app' status
            <DialogContent className="p-0 bg-transparent border-none max-w-fit shadow-none">
                <DialogTitle className="sr-only">
                    Create Organization
                </DialogTitle>
                <CreateOrganization />
            </DialogContent>
        </Dialog>
    );
}

