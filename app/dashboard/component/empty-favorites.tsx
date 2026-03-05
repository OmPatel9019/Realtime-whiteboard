import Image from "next/image"

export const EmptyFavorites = () =>{
    return(
        <div className=" h-full w-full flex flex-col justify-center items-center">
             <Image
                src="/favorites.svg"
                alt="favorites"
                width={200}
                height={200}
             />
            <h2 className="text-xl font-semibold">
                Save your Favorites!
            </h2>
        </div>
    )
}