"use client";

import { useRenameModel } from "@/store/use-rename-model";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { FormEventHandler} from "react";
import { toast } from "sonner";


export const RenameModal = () => {
    const { isOpen, initialValues, onClose } = useRenameModel();
    const [title, setTitle] = useState(initialValues.title);

    const {mutate,pending} = useApiMutation(api.board.update);
    useEffect(() => {
        setTitle(initialValues.title);
    }, [initialValues.title]);

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        mutate({
            id: initialValues.id,
            title,
        })
        .then(()=>{
            toast.success("Board renamed");
            onClose();
        })
        .catch(()=>{
            toast.error("Failed to rename board");
        })
    }
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Rename board</DialogTitle>
                </DialogHeader>
                    <DialogDescription>
                        Change the name of the board.
                    </DialogDescription>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                    disabled={pending}
                    required
                    maxLength={60}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Board title"
                    />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>   
                    </DialogClose>
                        <Button disabled={pending} type="submit">Save</Button>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};