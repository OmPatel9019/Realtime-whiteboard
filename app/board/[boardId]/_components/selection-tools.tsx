"use client"

import { useSelf, useMutation } from "@liveblocks/react/suspense";
import { Camera, Color } from "@/types/canvas";
import { memo } from "react";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { ColorPicker } from "./color-picker";

interface SelectionToolsProps {
    camera: Camera;
    setLastUsedColor: (color: Color) => void;
}

export const SelectionTools = memo ((
    {camera, setLastUsedColor}: SelectionToolsProps
)=>{
    const selection = useSelf((me)=> me.presence.selection);
    const selectionBounds = useSelectionBounds();

    const setFill = useMutation((
        { storage },
        fill: Color,
    ) => {
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);

        selection.forEach((id) => {
            liveLayers.get(id)?.set("fill", fill);
        });
    }, [selection, setLastUsedColor]);

    if(!selectionBounds){
        return null;
    }

    const x = selectionBounds.width /2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
        <div className="absolute p-3 bg-white rounded-xl shadow-sm border flex select-none" style={{
            transform: `translate(
                calc(${x}px - 50%),
                calc(${y - 16}px - 90%)
            )`,
        }}>
         <ColorPicker onChange={setFill} />  
        </div>
    )
})

SelectionTools.displayName = "SelectionTools";
