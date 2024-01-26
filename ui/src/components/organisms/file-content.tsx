'use client';

import Editor, { Monaco } from '@monaco-editor/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect, useRef, useState } from 'react';
import { useDebounce } from '../../lib/customHooks/useDebounce';
import { readFile, writeFile } from '../../lib/fs';
import { socket } from '../../lib/socket-client';

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

    const editorRef = useRef(null);

    const handleEditorDidMount = (editor: any, monaco: Monaco) => {
        editorRef.current = editor;
    };

    return (
        <Editor
            height="100%"
            language="typescript"
            defaultValue={code}
            value={code}
            theme="vs-dark"
            onMount={handleEditorDidMount}
        />
    );
};

export default FileContent;

// // import 'monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution';
// import { useDebounce } from '@/lib/customHooks/useDebounce';
// import { readFile, writeFile } from '@/lib/fs';
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
// import { useSearchParams } from 'next/navigation';
// import { FC, useEffect, useRef, useState } from 'react';
// import { socket } from '../../../public/assets/sayse-example/src/socket';

// const FileContent: FC<{ path: string; roomID: string }> = ({ roomID }) => {
//     const editorRef = useRef(null);
//     const [code, setCode] = useState('');
//     const debounceCode = useDebounce<string>(code, 500);
//     const searchParams = useSearchParams();
//     const filepath = searchParams.get('filepath');

//     useEffect(() => {
//         readFile(filepath).then((res) => {
//             if (res) setCode(res);
//         });
//     }, [filepath]);

//     useEffect(() => {
//         writeFile(filepath, debounceCode).then((res) => console.log(res));
//         socket.emit('file:change', roomID, filepath);
//     }, [debounceCode]);

//     useEffect(() => {
//         socket.on('file:change', (args) => {
//             // console.log(args.filepath, filepath);
//             if (filepath === args.filepath) {
//                 readFile(filepath).then((res) => {
//                     if (res) setCode(res);
//                 });
//             }
//         });
//     }, []);

//     useEffect(() => {
//         // URL to your tsconfig.json file in the public directory
//         const tsConfigUrl =
//             'http://localhost:3000/assets/sayse-example/tsconfig.node.json';

//         // Fetch tsconfig.json content
//         fetch(tsConfigUrl)
//             .then((response) => response.json())
//             .then((tsConfigContent) => {
//                 // Set TypeScript compiler options
//                 monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
//                     {
//                         ...tsConfigContent.compilerOptions,
//                     },
//                 );

//                 // Set eager model sync to true for immediate synchronization with tsconfig.json changes
//                 monaco.languages.typescript.typescriptDefaults.setEagerModelSync(
//                     true,
//                 );

//                 // Create Monaco Editor instance
//                 const editor = monaco.editor.create(editorRef.current, {
//                     value: 'console.log("Hello, TypeScript!");',
//                     language: 'typescript',
//                 });

//                 // Optional: Listen for changes in the editor content
//                 const onContentChange = () => {
//                     const content = editor.getValue();
//                     console.log(content);
//                 };
//                 editor.onDidChangeModelContent(onContentChange);

//                 // Optional: Set up additional features or configurations
//                 // ...

//                 // Cleanup on component unmount
//                 return () => {
//                     editor.dispose();
//                 };
//             })
//             .catch((error) => {
//                 console.error('Error fetching tsconfig.json:', error);
//             });
//     }, [editorRef, code]); // Empty dependency array ensures this runs once after mount

//     return <div ref={editorRef} style={{ height: '100%', width: '100%' }} />;
// };

// export default FileContent;
