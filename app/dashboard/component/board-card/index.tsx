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
        <Link
            href={`/board/${id}`}
            className="group aspect-[100/127] flex flex-col rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
        >
            <div className="relative flex-1 bg-amber-50">
                <img
                    src={imageUrl.replace("/placeholders/", "/")}
                    alt={title}
                    className="w-full h-full object-fit"
                />
            </div>
            <div className="bg-white p-2 text-left">
                <p className="text-[13px] text-muted-foreground truncate">{title}</p>
            </div>
        </Link>
    );
};
