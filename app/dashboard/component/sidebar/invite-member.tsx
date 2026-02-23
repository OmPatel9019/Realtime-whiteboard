import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle
}from "@/components/ui/dialog";

export const InviteMember = () => {
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2"/>
                Invite Memebers
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none max-w-[880px]">
                <DialogTitle>
                     <span className="sr-only">Invite Members</span>
                </DialogTitle>
                <OrganizationProfile routing="hash"/>
            </DialogContent>
        </Dialog>
    );
};