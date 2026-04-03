"use client";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { LucideIcon } from "lucide-react";

interface ToolButtonProps{
    label: string;
    icon: LucideIcon;
    isActive?: boolean;
    isDisabled?: boolean;
    onClick:() => void;
}

export const ToolButton = ({
    label,
    icon: Icon,
    isActive,
    isDisabled,
    onClick
}: ToolButtonProps) =>{
    return(
        <Hint label={label} side="right" sideOffset={14}>
            <Button
                disabled={isDisabled}
                variant={isActive? "boardActive" : "board"}
                onClick={onClick}
                size="icon"
            >
                <Icon/>
            </Button>
        </Hint>
    )
}
