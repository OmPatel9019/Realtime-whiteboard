import Image from "next/image"

export const Favorites = () =>{
    return(
        <div className="flex flex-1 justify-center items-center">
             <Image
                src="/favorites.svg"
                alt="favorites"
                width={250}
                height={200}
             />
        </div>
    )
}