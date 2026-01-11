"use client";
// I will use only userbutton when the persona is signed in
import { UserButton } from "@clerk/nextjs";

export const Navbar = () => {
    return (
        <div className="flex items-center p-[18px] gap-x-4 bg-blue-400">
            <UserButton/>
        </div>
    );
};