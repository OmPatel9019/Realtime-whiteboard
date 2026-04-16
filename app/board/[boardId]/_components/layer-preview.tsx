"use client"

import { memo } from "react";
import { useStorage } from "@liveblocks/react";
import { LayerType } from "@/types/canvas";
import { Rectangle } from "./rectangle";
import { Ellipse } from "./ellipse";
import { Text } from "./text";
import { Note } from "./note";

interface LayerPreviewProps {
    id: string;
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
    selectionColor?: string;
}

export const Layerpreview = memo(({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));
    if (!layer) {
        return null;
    }
    switch (layer.type) {
        case LayerType.Ellipse:
            return (
                <Ellipse
                    layer={layer}
                    id={id}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            );
        
        case LayerType.Note:
            return (
                <Note
                    layer={layer}
                    id={id}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            );

        case LayerType.Text:
            return (
                <Text
                    layer={layer}
                    id={id}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            );

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