"use client"

import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import { useHistory, useCanUndo, useCanRedo, useSelf, useMutation, useMyPresence } from "@liveblocks/react";
import { useState, useCallback } from "react";
import { CanvasState, CanvasMode, Camera } from "@/types/canvas";
import { CursorPresence } from "./cursor-presence";

const MAX_LAYERS = 100;

interface CanvasProps {
    boardId: string;
};

export const Canvas = ({ boardId }: CanvasProps) => {
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    });

    const [camera, setCamera] = useState<Camera>({x:0, y:0});
    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    // Log our own cursor to the console so we can see it working locally!
    const [myPresence, updateMyPresence] = useMyPresence();
    console.log("My Presence Cursor:", myPresence.cursor);

    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera((camera) => ({ x: camera.x - e.deltaX, y: camera.y - e.deltaY }));
    }, []);

    const onPointerMove = useMutation(({ setMyPresence}, e: React.PointerEvent) => {
        e.preventDefault();
        
        // Account for camera position for accurate cursor placement during panning
        const current = { 
            x: Math.round(e.clientX) - camera.x, 
            y: Math.round(e.clientY) - camera.y 
        };

        setMyPresence({ cursor: current });
    }, [camera]);

    const onPointerLeave = useMutation(({ setMyPresence }) => {
        setMyPresence({ cursor: null });
    }, []);

    return (
        <main className="h-screen w-full relative bg-neutral-100">
            <Info boardId={boardId} />
            <Participants />
            <Toolbar
                canvasState={canvasState}
                setCanvasState={setCanvasState}
                undo={history.undo}
                redo={history.redo}
                canUndo={canUndo}
                canRedo={canRedo}
            />
            <svg
                className="h-[100vh] w-[100vw]"
                onWheel={onWheel}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
            >
                <g
                    style={{
                        transform: `translate(${camera.x}px, ${camera.y}px)`
                    }}
                >
                    <CursorPresence />
                </g>
            </svg>
        </main>
    )
}
