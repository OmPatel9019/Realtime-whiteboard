import Image from "next/image";

export const EmptyOrg = () => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center">
            <Image
                src="/Image.png"
                alt="Organization"
                width={200}
                height={500}
            />
            <h1>Create board</h1>
        </div>
    )
}