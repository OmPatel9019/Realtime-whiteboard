import {
     Circle, 
     MousePointer2,
     Pencil, 
     Redo2, 
     Square, 
     StickyNote, 
     Type, 
     Undo2 
    } from "lucide-react";

import { ToolButton } from "./tool-button";

type CanvasState = any;

interface ToolBarProps{
    canvasState: CanvasState;
    setCanvasState: (newState: CanvasState)=> void;
    undo:() => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
};

export const Toolbar = ({
    canvasState,
    setCanvasState,
    undo,
    redo,
    canRedo,
    canUndo
}:ToolBarProps ) => {
    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
            <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col  items-center shadow-md">
                <ToolButton
                    label="Select"
                    icon={MousePointer2}
                    onClick={()=>{}}
                    isActive={false}
                />
                <ToolButton
                    label="Text"
                    icon={Type}
                    onClick={()=>{}}
                    isActive={false}
                />
                <ToolButton
                    label="Sticky Note"
                    icon={StickyNote}
                    onClick={()=>{}}
                    isActive={false}
                />
                <ToolButton
                    label="Rectangle"
                    icon={Square}
                    onClick={()=>{}}
                    isActive={false}
                />
                <ToolButton
                    label="Ellipse"
                    icon={Circle}
                    onClick={()=>{}}
                    isActive={false}
                />
                <ToolButton
                    label="Pencil"
                    icon={Pencil}
                    onClick={()=>{}}
                    isActive={false}
                />
            </div>
            <div className="bg-white font-medium rounded-md p-1.5 flex flex-col shadow-md">
                <ToolButton
                    label="Undo"
                    icon={Undo2}
                    isDisabled={true}
                    onClick={()=>{}}
                />
                <ToolButton
                    label="Redo"
                    icon={Redo2}
                    isDisabled={true}
                    onClick={()=>{}}
                />
            </div>
        </div>
    );
};

export const ToolbarSkeleton = () => {
    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] rounded-md shadow-md"/>
    );
};
