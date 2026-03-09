"use client";

import Link from "next/link";

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
}: BoardCardProps) => {
    return (
        <Link href={`/board/${id}`} className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
            <div className="relative flex-1 bg-[#fffcf5]">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-contain p-6"
                />
            </div>
            <div className="relative bg-white pt-3 pb-4 px-3 shrink-0 text-left">
                <p className="text-[13px] text-muted-foreground truncate">{title}</p>
            </div>
        </Link>
    );
};
