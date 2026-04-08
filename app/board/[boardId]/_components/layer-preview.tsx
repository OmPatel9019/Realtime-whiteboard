"use client"

import { memo } from "react";
import { useStorage } from "@liveblocks/react";
import { LayerType } from "@/types/canvas";
import { Rectangle } from "./rectangle";

interface LayerPreviewProps {
    id: string;
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
    selectionColor?: string;
}

export const Layerpreview = memo(({id, onLayerPointerDown, selectionColor}: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));
    if (!layer) {
        return null;
    }
       switch (layer.type) {
        case LayerType.Rectangle:
            return (
                <Rectangle
                    layer={layer}
                    id={id}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            );

        default:
           console.warn("Unknown layer type");
           return null;
       }
});

Layerpreview.displayName = "LayerPreview";