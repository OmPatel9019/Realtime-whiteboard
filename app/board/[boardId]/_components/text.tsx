import React, { useEffect } from "react";
import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { colorTocss, cn } from "@/lib/utils";
import { TextLayer } from "@/types/canvas";
import { useMutation } from "@liveblocks/react/suspense";

const font = Kalam({
    subsets: ["latin"],
    weight: ["400"],
});

const calculateFontSize = (width: number, height: number) => {
    const maxFontSize = 96;
    const scaleFactor = 0.25;
    const fontSizeBasedOnHeight = height * scaleFactor;
    const fontSizeBasedOnWidth = width * scaleFactor;
    return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
};

interface TextProps {
    id: string;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
    layer: TextLayer;
}

export const Text = ({
    id,
    onPointerDown,
    selectionColor,
    layer,
}: TextProps) => {
    const { x, y, width, height, fill, value } = layer;

    const updateValue = useMutation(({ storage }, newValue: string) => {
        const liveLayers = storage.get("layers");
        liveLayers.get(id)?.set("value", newValue);
    }, []);

    const handleContentChange = (e: ContentEditableEvent) => {
        updateValue(e.target.value);
    };

    return (
        <foreignObject
            x={x}
            y={y}
            width={width}
            height={height}
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                outline: selectionColor ? `1px solid ${selectionColor}` : "none",
            }}
        >
            <ContentEditable
                html={value || "Text"}
                onChange={handleContentChange}
                className={cn(
                    "w-full h-full flex items-center justify-center text-center  outline-none",
                    font.className,
                )}
                style={{
                    color: fill ? colorTocss(fill) : "#000",
                    fontSize: calculateFontSize(width, height),
                }}
            />
        </foreignObject>
    );
};