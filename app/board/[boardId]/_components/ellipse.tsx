import { colorTocss } from "@/lib/utils";
import { EllipseLayer } from "@/types/canvas";

interface EllipseProps{
    id: string;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
    layer: EllipseLayer;
}

export const Ellipse = ({
        id, 
        onPointerDown, 
        selectionColor, 
        layer
    }: EllipseProps) => {
    
    return (
        <ellipse
            className="drop-shadow-md"
            onPointerDown={ (e) => onPointerDown(e,id)}
            style={{
                transform: `translate(${layer.x}px, ${layer.y}px)`,
            }}
            cx={layer.width/2}
            cy={layer.height/2}
            rx={layer.width/2}
            ry={layer.height/2}
           
            fill={ layer.fill? colorTocss(layer.fill) : "#000000ff"}
            stroke={ selectionColor || "transparent"}
            strokeWidth={1}
        />
    );
};