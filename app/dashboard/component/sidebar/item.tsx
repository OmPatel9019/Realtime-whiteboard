"use client";

import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Hint } from "@/components/hint";

interface ItemProps {
    id: string;
    name: string;
    imageUrl: string;
}

export const Item = ({ id, name, imageUrl }: ItemProps) => {
    const { organization } = useOrganization();
    const { setActive } = useOrganizationList();

    const isActive = organization?.id === id;

    const onClick = () => {
        if (!setActive) return;

        setActive({ organization: id });
    };

    return (
        <div className="aspect-square relative">
                <div
                    onClick={onClick}
                    className={cn(
                        "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
                        "bg-white/25 h-full w-full flex items-center justify-center",
                        isActive && "opacity-100"
                    )}
                >
                    {/* Instead of using the image URL, I used the organization's name directly. */}
                    <Hint label={name}
                    side="right"
                    align="start"
                    sideOffset={18}>
                    <span className="text-white font-bold">
                        {name.charAt(0).toUpperCase()}
                    </span>
                    </Hint>
                </div>
          
        </div>
    );
};
