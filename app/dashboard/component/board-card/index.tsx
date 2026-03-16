"use client";

import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns"
import Link from "next/link";
import { Footer } from "./Footer"
import { Skeleton } from "@/components/ui/skeleton"

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
        <div className="group aspect-[100/127] flex flex-col rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
        
            <div className="relative flex-1 bg-yellow-50 px-2">
                <img
                    src={imageUrl.replace("/placeholders/", "/")}
                    alt={title}
                    className="px-2 w-full h-full object-fit"
                />
               
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