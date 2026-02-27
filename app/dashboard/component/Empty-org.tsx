import Image from "next/image";

export const EmptyOrg = () => {
    return(
        <div className="h-full flex flex-col items-center justify-center">
            <Image 
                src="/Image.png" 
                alt="Organization" 
                width={200} 
                height={200} 
            />
            <h1>Create board</h1>
        </div>
    )
}