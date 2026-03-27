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
}

export const Room = ({ children, roomId }: RoomProps) => {
  return (
    <LiveblocksProvider publicApiKey="pk_dev_DKQojcVXOO1-HgceLEULUSS_dl9GjixYFaLIoLJayKS3HK8En-YMf4c7Skrodp-B">
      {/* 
        initialPresence is required in v2/v3 if you plan to use presence features.
        We initialize it with an empty object for now
      */}
      <RoomProvider
        id={roomId}
        initialPresence={{}}
        initialStorage={{}}
      >
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};