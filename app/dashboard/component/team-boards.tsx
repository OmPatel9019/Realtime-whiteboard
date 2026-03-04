import Image from "next/image"

export const TeamBoards = () =>{
    return(
        <div className="flex flex-1 justify-center items-center">
             <Image
                src="/board.svg"
                alt="board"
                width={350}
                height={300}
             />
        </div>
    )
}