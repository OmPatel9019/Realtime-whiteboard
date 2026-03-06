"use client";

import { useAuth } from "@clerk/nextjs";
import { NewButton } from "./new-button";
import { List } from "./list"

export const Sidebar = () => {
    const { isSignedIn } = useAuth();

    return (
        // Following tags allow you to show titles and logos of created organizations
        <aside className="fixed z-[1] left-0 bg-purple-950 h-full w-[60px] flex px-3 flex-col gap-y-4 text-white text-bold">
            <List />
            <div className={isSignedIn ? "" : "mt-4"}>
                <NewButton />
            </div>
        </aside>
    );
};
