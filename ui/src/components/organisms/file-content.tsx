'use client';

import { useDebounce } from '@/lib/customHooks/useDebounce';
import { readFile, writeFile } from '@/lib/fs';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import CodeMirror from '@uiw/react-codemirror';
import { useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

const FileContent: FC<{ path: string }> = () => {
    const searchParams = useSearchParams();
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
    }, [debounceCode]);

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
