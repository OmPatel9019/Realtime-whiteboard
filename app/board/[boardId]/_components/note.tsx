import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { colorTocss, cn, getContrastingTextColor } from "@/lib/utils";
import { NoteLayer } from "@/types/canvas";
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

interface NoteProps {
    id: string;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
    layer: NoteLayer;
}

export const Note = ({
    id,
    onPointerDown,
    selectionColor,
    layer,
}: NoteProps) => {
    const { x, y, width, height, fill, value } = layer;

    const updateText = useMutation(({ storage }, newText: string) => {
        const liveLayers = storage.get("layers");
        liveLayers.get(id)?.set("value", newText);
    }, []);

    const handleContentChange = (e: ContentEditableEvent) => {
        updateText(e.target.value);
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
            className="shadow-md drop-shadow-xl"
        >
            <ContentEditable
                html={value || "Text"}
                onChange={handleContentChange}
                className={cn(
                    "h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none",
                    font.className,
                )}
                style={{
                    backgroundColor: fill ? colorTocss(fill) : "#FFCC99",
                    color:fill ? getContrastingTextColor(fill) : "#020202ff",
                    fontSize: calculateFontSize(width, height),
                }}
            />
        </foreignObject>
    );
};