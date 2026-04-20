import { shallow } from "@liveblocks/react";
import { useStorage, useSelf } from "@liveblocks/react/suspense";
import { Layer, XYWH } from "@/types/canvas";

const boundingBox = (layers: any[]): XYWH | null => {
    const first = layers[0];
    if(!first){
        return null;
    }

    // Handle both plain objects and LiveObjects
    const getCoord = (obj: any, key: string) => {
        return "get" in obj && typeof obj.get === "function" ? obj.get(key) : obj[key];
    };
   
    let left = getCoord(first, "x");
    let top = getCoord(first, "y");
    let right = left + getCoord(first, "width");
    let bottom = top + getCoord(first, "height");

    for(let i = 1; i < layers.length; i++){
        const layer = layers[i];
        const x = getCoord(layer, "x");
        const y = getCoord(layer, "y");
        const width = getCoord(layer, "width");
        const height = getCoord(layer, "height");

        if(left>x){
            left = x;
        }
        if(top>y){
            top = y;
        }
        if(right<x+width){
            right = x+width;
        }
        if(bottom<y+height){
            bottom = y+height;
        }
    }
    return {
        x: left,
        y: top,
        width: right - left,
        height: bottom - top,
    };
};

export const useSelectionBounds = () => {
    const selection = useSelf((me)=> me.presence.selection);
    const layers = useStorage((root)=> root.layers);
    const layerIds = useStorage((root)=> root.layerIds);

    return useStorage((root) => {
        const selectedLayers = (selection || [])
        .map(layerId=> root.layers.get(layerId)!)
        .filter(Boolean);
        return boundingBox(selectedLayers);
    }, shallow);
}