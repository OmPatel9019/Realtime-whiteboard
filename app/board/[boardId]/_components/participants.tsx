"use client"

import { useOthers, useSelf } from "@liveblocks/react";
import { UserAvatar } from "./user-avatar";

const MAX_SHOWN_USERS = 2;

export const Participants = () =>{
    const users = useOthers();
    const self = useSelf();

    const hasMoreUsers = users.length > MAX_SHOWN_USERS;

    return (
        <div className="absolute top-2 right-2 bg-white rounded-md p-3 h-12 flex items-center shadow-md">
            <div className="flex gap-x-2">
                {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => (
                    <UserAvatar
                        key={connectionId}
                        src={info?.image}
                        name={info?.name}
                        fallback={info?.name?.[0] || "T"}
                    />
                ))}

                {self && (
                    <UserAvatar
                        src={self.info?.image}
                        name={`${self.info?.name} (You)`}
                        fallback={self.info?.name?.[0]}
                    />
                )}

                {hasMoreUsers && (
                    <UserAvatar
                        name={`${users.length - MAX_SHOWN_USERS} more`}
                        fallback={`+${users.length - MAX_SHOWN_USERS}`}
                    />
                )}
            </div>
        </div>
    );
};

export const ParticipantsSkeleton = () => {
    return (
        <div className="absolute top-2 right-2 bg-white rounded-md p-2 h-12 flex items-center shadow-md w-[100px]"/>
    );
};