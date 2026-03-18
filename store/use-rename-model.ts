import { create } from "zustand";

const defaultValues = { id:"",title:""}

interface IRemovemodel{
    isOpen: boolean;
    initialValues: typeof defaultValues;
    onOpen: (id: string, title:string) => void;
    onClose: () => void;
}