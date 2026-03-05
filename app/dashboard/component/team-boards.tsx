import Image from "next/image"
import { Button } from "@/components/ui/button"

export const EmptyBoards = () =>{
    return(
        <div className="h-full w-full flex flex-col justify-center items-center text-center">
             <Image
                src="/board.svg"
                alt="board"
                width={250}
                height={250}
                className="block -mt-6"
             />
            <h2 className="text-xl font-semibold">
                Create your first board!
            </h2>
            <p className="text-muted-foreground">Start creating a board for your organization!</p>
            <Button className="mt-2">
                Create board
            </Button>
        </div>
    )
}