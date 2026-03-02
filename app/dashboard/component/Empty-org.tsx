import Image from "next/image";
import { CreateOrganization } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";


export const EmptyOrg = () => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center">
            <Image
                src="/Image.png"
                alt="Organization"
                width={200}
                height={500}
            />
            <h2 className="text-2xl font-semibold mt-6">Welcome to Board</h2>
            <p className="text-muted-foreground text-sm mt-2">
                Create your first board to get started
            </p>
            <div className="mt-6">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="lg">
                            Create Organization
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-transparent border-none w-fit max-w-none shadow-none text-left" showCloseButton={false}>
                        <DialogTitle />
                        <div className="relative">
                            {/* Below tag enables create organizatoin form */}
                            <CreateOrganization afterCreateOrganizationUrl="/" />
                            <DialogClose className="absolute right-4 top-4 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-0">
                                <X className="h-5 w-5 text-muted-foreground" />
                                <span className="sr-only">Close</span>
                            </DialogClose>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}