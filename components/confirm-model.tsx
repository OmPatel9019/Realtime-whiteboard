"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import React from 'react'

interface confirmModalProps{
    children: React.ReactNode,
    onConfirm : () => void;
    disabled? : boolean;
    description?: string;
    header: string;
};

export const ConfirmModel = ({
 children,
 onConfirm,
 disabled,
 description,
 header,
}:confirmModalProps) => {
    const handleconfirm = () => {
        onConfirm();
    }

    return(
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {header}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                    disabled={disabled} onClick={handleconfirm}
                    >Confrim</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}