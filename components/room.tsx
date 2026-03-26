"use client"

import { RoomProvider } from "@liveblocks.config";
import { ReactNode } from "react";

interface RoomProps {
    children: ReactNode;
    boardId: string;
};

export const Room = ({children, boardId}: RoomProps) => {
    return (
        <RoomProvider id={boardId} initialStorage={{
            
        }}>
            {children}
        </RoomProvider>
    )
}