"use client"

import { DropdownMenuContentProps} from "@radix-ui/react-dropdown-menu"
import { useApiMutation } from "@/hooks/use-api-mutation";
import { Link2, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";

interface ActionProps{
    children : React.ReactNode;
    side? : DropdownMenuContentProps["side"];
    sideOffset? : DropdownMenuContentProps["sideOffset"];
    id : string;
    title : string;
}

export const Actions =({
    children,
    side,
    sideOffset,
    id,
    title
}: ActionProps) =>{

    const { mutate , pending } = useApiMutation(api.board.remove)
    const onCopyLink = () =>{
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`,
        )
        .then(()=>toast.success("Link copied!"))
        .catch(()=>toast.error("Failed to copy link"))
    }
    const onDelete = () =>{
        mutate({id})
        .then(()=>toast.success("Board Deleted!"))
        .catch(()=>toast.error("Failed to Delete Board!"))
    }
    return(
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
            {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent
        onClick={(e)=> e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60">
            <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink}>
                <Link2
                className="h-4 w-4 mr-2"
                />
                Copy board link
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 cursor-pointer" onClick={onDelete}>
                <Trash2
                className="h-4 w-4 mr-2"
                />
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
       </DropdownMenu>
    )
}