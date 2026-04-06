"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
}

export const Room = ({ children, roomId, fallback }: RoomProps) => {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth" throttle={60}>
      {/* 
        initialPresence is required in v2/v3 if you plan to use presence features.
        We initialize it with an empty object for now
      */}
      <RoomProvider
        id={roomId}
        initialPresence={{
          cursor: null,
        }}
        initialStorage={{}}
      >
        <ClientSideSuspense fallback={fallback}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};