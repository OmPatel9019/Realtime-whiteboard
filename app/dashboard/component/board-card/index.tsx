"use client";

import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns"
import Link from "next/link";
import { Footer } from "./Footer"
import { Skeleton } from "@/components/ui/skeleton"
import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";

interface BoardCardProps {
    id: string;
    title: string;
    imageUrl: string;
    imageUrls?: string[];
    authorId: string;
    authorName: string;
    orgId: string;
    createdAt: number;
    isFavorite: boolean;
}

export const BoardCard = ({
    id,
    title,
    imageUrl,
    authorId,
    authorName,
    createdAt,
    orgId,
    isFavorite,
}: BoardCardProps) => {

    const { userId } = useAuth();
    const authorLabel = userId === authorId ? 'You' : authorName;
    const addLabel = formatDistanceToNow(createdAt, {
        addSuffix : true,
    })
    return (
        <Link href={`/board/${id}`}>
        <div className="group aspect-[100/127] flex flex-col rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all hover:bg-black/30">
        
            <div className="relative flex-1 bg-yellow-50 px-2">
                <img
                    src={imageUrl.replace("/placeholders/", "/")}
                    alt={title}
                    className="px-2 w-full h-full object-fit"
                />
               <Actions id={id} title={title}>
                <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
                    <MoreHorizontal className="w-4 h-4 text-black opacity-75 group-hover:opacity-100 transition-opacity"/>
                </button>
               </Actions>
            </div>
            <Footer 
             isFavorite={isFavorite}
             title={title}
             authorLabel={authorLabel}
             createdAtLabel={addLabel}
             onClick={() => {}}
             disabled={false}
            />
        </div>
        </Link>
    );
};

BoardCard.Skeleton = function BoardCardSkeleton(){
    return (
            <div className="aspect-[100/127] rounded-lg overflow-hidden">
                <Skeleton className="px-2 w-full h-full object-fit" />
            </div>
        
    );
}