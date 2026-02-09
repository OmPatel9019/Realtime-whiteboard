// Import tooltip components from the custom UI component library
import{
    Tooltip,                // Main tooltip component that manages state and behavior
    TooltipContent,        // The content/popup that appears when hovering
    TooltipTrigger,        // The element that triggers the tooltip on hover
    TooltipProvider        // Provider component that wraps the tooltip context
} from "@/components/ui/tooltip";

// Define the props interface for the Hint component
export interface HintProps {
    label : string;                                             
    children: React.ReactNode;                                  
    side?: "top" | "bottom" | "left" | "right";               
    align?: "start" | "center" | "end";                         
    sideOffset?: number;                                        
    alignOffset?: number;                                      
};

export const Hint = ({
    label,
    children,
    side,
    align,
    sideOffset,
    alignOffset,
}: HintProps) =>{
    return(
        <TooltipProvider>
            {/* Tooltip - Main component that manages tooltip state (delayed by 100ms) */}
            <Tooltip delayDuration={100}>
                {/* TooltipTrigger - The element that triggers the tooltip on hover (asChild renders without wrapper) */}
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>

                {/* TooltipContent - The popup that displays the hint label with styling and positioning */}
                <TooltipContent
                    className="text-white bg-black border-black" 
                    side={side}                                   
                    align={align}                                  
                    alignOffset={alignOffset}                      
                    sideOffset={sideOffset}                      
                >
                    <p className="font-semibold capitalize">{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};