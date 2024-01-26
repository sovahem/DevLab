'use client';

import { ChangeEvent, useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button, buttonVariants } from '../ui/button';
import InputFile from '../ui/input-file';

const ImportFile = () => {
    const [files, setFiles] = useState<FileList | null>(null);

    const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) setFiles(e.target.files);
    };

    const sendRepository = () => {
        // if (!files) return;
        const formData = new FormData();
        //@ts-ignore
        formData.append('file', files[0]);

        const url = '/repository';
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP! Statut: ${response.status}`);
                }
                return response.text(); // ou response.json() selon le type de données que vous attendez
            })
            .then((data) => {
                console.log('Réponse du serveur:', data);
            })
            .catch((error: any) => {
                console.error('Erreur lors de la requête:', error);
            });
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger className={buttonVariants()}>
                Import repository
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Import repository</AlertDialogTitle>
                    <AlertDialogDescription>
                        Directly work on your GitHub repository in CodeSandbox.
                    </AlertDialogDescription>
                    <AlertDialogDescription>
                        <InputFile
                            label={'chooo'}
                            accept=".zip"
                            onChange={handleSelectFile}
                        />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>
                        <Button onClick={sendRepository}>Continue</Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ImportFile;
