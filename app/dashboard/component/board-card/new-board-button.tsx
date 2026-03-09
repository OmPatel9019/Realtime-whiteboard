"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface NewBoardButtonProps {
    orgId: string;
    disabled?: boolean;
}

export const NewBoardButton = ({
    orgId,
    disabled,
}: NewBoardButtonProps) => {
    const router = useRouter();
    const mutate = useMutation(api.board.create);

    const onClick = () => {
        // We already have orgId
        mutate({
            orgId,
            title: "Untitled"
        })
            .then((id) => {
                toast.success("Board created successfully");
                if (id) {
                    router.push(`/board/${id}`);
                }
            })
            .catch(() => {
                toast.error("Failed to create board");
            });
    };

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={cn(
                "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center relative transition-all",
                disabled && "opacity-75 hover:bg-blue-600 cursor-not-allowed"
            )}
        >
            <Plus className="h-12 w-12 text-white stroke-1" />
            <p className="text-sm text-white font-light absolute bottom-4">
                New Board
            </p>
        </button>
    );
};
