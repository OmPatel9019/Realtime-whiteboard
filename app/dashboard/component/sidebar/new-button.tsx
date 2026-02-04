"use client";

import { Plus } from "lucide-react";
// import { CreateOrganization } from "@clerk/nextjs";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export const NewButton = () =>{
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="aspect-square">
                    <button className="text-white">
                        <Plus/>
                    </button>
                </div>
            </DialogTrigger>
        </Dialog>
    );
}