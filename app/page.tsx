import { SignIn } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
export default function Page() {
  return (
  <div>
    <div className="flex h-screen w-full items-center justify-center">
      <SignIn />
    </div>
    <div className="flex flex-col justify-center items-right p-4 fixed top-0 right-0">
      <UserButton />
    </div>
      <div className="p-4">
      <p>Welcome back!</p>
      </div>
  </div>
  );
};