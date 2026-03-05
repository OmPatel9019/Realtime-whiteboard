import Image from "next/image"

export const EmptySearch = () =>{
    return(
        <div className=" h-full w-full flex flex-col justify-center items-center">
             <Image
                src="/empty.svg"
                alt="empty"
                width={250}
                height={250}
             />
            <h2 className="text-xl font-semibold">
                Oops! No result found!
            </h2>
        </div>
    )
}