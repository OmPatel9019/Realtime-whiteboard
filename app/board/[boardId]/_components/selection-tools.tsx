"use client"

import { useSelf, useMutation } from "@liveblocks/react/suspense";
import { Camera, Color } from "@/types/canvas";
import { memo } from "react";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { ColorPicker } from "./color-picker";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { Button } from "@/components/ui/button";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";
import { Hint } from "@/components/hint";


interface SelectionToolsProps {
    camera: Camera;
    setLastUsedColor: (color: Color) => void;
}

export const SelectionTools = memo ((
    {camera, setLastUsedColor}: SelectionToolsProps
)=>{
    const selection = useSelf((me)=> me.presence.selection);
    const selectionBounds = useSelectionBounds();

    const moveToBack  = useMutation(({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const indices: number[] = [];

        const arr = liveLayerIds.toArray();
        for(let i = 0; i < arr.length; i++){
            if(selection.includes(arr[i])){
                indices.push(i)
            }
        }  
        for(let i=0; i < indices.length; i++){
            liveLayerIds.move(indices[i],i)
        }
    }, [selection])

    const moveToFront  = useMutation(({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const indices: number[] = [];

        const arr = liveLayerIds.toArray();
        for(let i = 0; i < arr.length; i++){
            if(selection.includes(arr[i])){
                indices.push(i)
            }
        }  
        for(let i= indices.length -1; i >=0; i--){
            liveLayerIds.move(
                indices[i], arr.length - 1 - (indices.length - 1 - i)
            )
        }
    }, [selection])

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

    const deleteLayers = useDeleteLayers();

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

         <div className="flex flex-col gap-y-0.5">
            <Hint label="Bring to front">
               <Button
               size="icon"
               variant="board"
               onClick={moveToFront}
               className="size-8"
               >
                <BringToFront className="size-4" />
               </Button>
            </Hint>

            <Hint label="Send to back">
               <Button
               size="icon"
               variant="board"
               onClick={moveToBack}
               className="size-8"
               >
                <SendToBack className="size-4" />
               </Button>
            </Hint>
         </div>

         <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
            <Hint label="Delete">
                <Button
                size="icon"
                variant="board"
                onClick={deleteLayers}
                className="size-8"
                >
                    <Trash2 className="size-4" />
                </Button>
            </Hint>
         </div>

        </div>
    )
})

SelectionTools.displayName = "SelectionTools";
