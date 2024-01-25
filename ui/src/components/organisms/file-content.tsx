'use client';

import { useDebounce } from '@/lib/customHooks/useDebounce';
import { readFile, writeFile } from '@/lib/fs';
import { socket } from '@/lib/socket-client';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import CodeMirror from '@uiw/react-codemirror';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

const FileContent: FC<{ path: string; roomID: string }> = ({ roomID }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const filepath = searchParams.get('filepath');
    const [code, setCode] = useState('');
    const debounceCode = useDebounce<string>(code, 500);

    useEffect(() => {
        readFile(filepath).then((res) => {
            if (res) setCode(res);
        });
    }, [filepath]);

    useEffect(() => {
        writeFile(filepath, debounceCode).then((res) => console.log(res));
        socket.emit('file:change', roomID, filepath);
    }, [debounceCode]);

    useEffect(() => {
        socket.on('file:change', (args) => {
            // console.log(args.filepath, filepath);
            if (filepath === args.filepath) {
                readFile(filepath).then((res) => {
                    if (res) setCode(res);
                });
            }
        });
    }, []);

    return (
        <CodeMirror
            value={code}
            height="100%"
            width="100%"
            theme={okaidia}
            extensions={[javascript({ jsx: true })]}
            onChange={(value) => setCode(value)}
        />
    );
};

export default FileContent;
