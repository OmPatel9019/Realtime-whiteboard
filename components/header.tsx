"use client";

import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export function Header() {
  return (
    <div className="p-4 flex items-center justify-between">
      {/* <div className="flex items-center">
        <h1 className="text-2xl font-bold">Realtime Whiteboard</h1>
      </div> */}
      {/* <div className="flex items-center gap-4">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
              Sign in
            </button>
          </SignInButton>
        </SignedOut>
      </div> */}
    </div>
  );
}