'use client';
import { ChangeEvent, FC, useId, useState } from 'react';
import { Input, InputProps } from './input';

export type InputFileProps = {
    label: string;
} & InputProps;

const InputFile: FC<InputFileProps> = ({ label, ...props }) => {
    const id = useId();

    const [files, setFiles] = useState<FileList | null>(null);

    const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) setFiles(e.target.files);
    };

    return (
        <>
            {/* <Label htmlFor={id}>{label}</Label> */}
            <Input
                id={id}
                type="file"
                placeholder="Choisir un ficher"
                // onChange={handleSelectFile}
                {...props}
            />
        </>
    );
};

export default InputFile;
