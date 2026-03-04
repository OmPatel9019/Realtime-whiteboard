import Image from "next/image"

export const EmptySearch = () =>{
    return(
        <div className="flex flex-1 justify-center items-center">
             <Image
                src="/empty.svg"
                alt="empty"
                width={350}
                height={300}
             />
        </div>
    )
}