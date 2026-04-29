"use client";

import { colorTocss } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface ColorPickerProps {
    onChange: (color: Color) => void;
};

export const ColorPicker = ({
    onChange,
}: ColorPickerProps) => {
    return (
        <div className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200">
           <ColorButton color={{r: 0, g: 0, b: 0}} onClick={onChange} />
           <ColorButton color={{r: 225, g: 29, b: 72}} onClick={onChange} />
           <ColorButton color={{r: 173, g: 255, b: 47}} onClick={onChange} />
           <ColorButton color={{r: 250, g: 204, b: 21}} onClick={onChange} />
           <ColorButton color={{r:221, g: 160, b: 221}} onClick={onChange} />
           <ColorButton color={{r: 37, g: 99, b: 235}} onClick={onChange} />
           <ColorButton color={{r: 139, g: 92, b: 246}} onClick={onChange} />
           <ColorButton color={{r: 102, g: 205, b: 210}} onClick={onChange} />
        </div>
    )
};

interface ColorButtonProps {
    color: Color;
    onClick: (color: Color) => void;
};

const ColorButton = ({
    color,
    onClick,
}: ColorButtonProps) => {
    return (
        <button
            className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition"
            onClick={() => onClick(color)}
        >
            <div
            className="h-8 w-8 rounded-md border border-neutral-300"
            style={{
                background: colorTocss(color),
            }}
            />
        </button>
        
    );
};
