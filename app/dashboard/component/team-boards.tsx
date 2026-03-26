"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useOrganization } from "@clerk/nextjs"
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const EmptyBoards = () => {
    const router = useRouter();
    const { organization } = useOrganization();
    const mutate = useMutation(api.board.create);

    const onClick = () => {
        if (!organization) return;
        mutate({
            orgId: organization.id,
            title: "Untitled"
        })
        .then((id)=>{
            toast.success("Board created successfully");
            router.push(`/board/${id}`);
        })
        .catch(()=>{
            toast.error("Failed to create board");
        })
    }

    return (
        <div className="h-full w-full flex flex-col justify-center items-center text-center">
            <Image
                src="/board.svg"
                alt="note"
                width={250}
                height={250}
                className="block -mt-6"
            />
            <h2 className="text-xl font-semibold">
                Create your first board!
            </h2>
            <p className="text-muted-foreground">Start creating a board for your organization!</p>
            <Button onClick={onClick} className="mt-2">
                Create board
            </Button>
        </div>
    )
}