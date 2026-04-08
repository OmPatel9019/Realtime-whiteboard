import { colorTocss } from "@/lib/utils";
import { RectangleLayer } from "@/types/canvas";

interface RectangleProps{
    id: string;
    onPointerDown: (e: React.PointerEvent, layerId: string) => void;
    selectionColor?: string;
    layer: RectangleLayer;
}

export const Rectangle = ({
        id, 
        onPointerDown, 
        selectionColor, 
        layer
    }: RectangleProps) => {
    const { x, y, width, height, fill } = layer;
    return (
        <rect
            className="drop-shadow-md"
            onPointerDown={ (e) => onPointerDown(e,id)}
            style={{
                transform: `translate(${x}px, ${y}px)`,
            }}
            x={0}
            y={0}
            height={height}
            width={width}
            strokeWidth={1}
            fill={ fill? colorTocss(fill) : "#fcda19"}
            stroke={ selectionColor || "transparent"}
        />
    );
};