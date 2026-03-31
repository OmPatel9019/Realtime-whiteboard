"use client"

import {Info} from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import { useSelf } from "@liveblocks/react";

interface CanvasProps {
    boardId: string;
};

export const Canvas = ({boardId}: CanvasProps) => {
    
    return (
        <main className="h-screen w-full relative bg-neutral-100">
            <Info boardId={boardId}/>
            <Participants/>
            <Toolbar/>
        </main>
    )
}
