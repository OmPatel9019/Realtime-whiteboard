import Image from "next/image";

export const Loading = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-4">
        <Image src="/logo.png" alt="logo" width={120} height={120} />
    </div>
  );
}