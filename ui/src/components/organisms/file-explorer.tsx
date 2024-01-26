'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createQueryString } from '../../lib/string';
import FileContent from './file-content';
// async function getContent(path: string) {
//     'use server';
//     try {
//         const filePath = path.join(
//             process.cwd(),
//             'chemin/vers/votre/fichier.txt',
//         ); // Remplacez par le chemin de votre fichier
//         const content = fs.readFileSync(filePath, 'utf-8');
//     } catch (error) {
//         console.error('Error reading file:', error);
//     }
// }

const FileExplorer = ({ roomID }: { roomID: string }) => {
    const [filesPath, setFilesPath] = useState<string[]>([]);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const filepath = searchParams.get('filepath');

    useEffect(() => {
        if (filepath && !filesPath.includes(filepath)) {
            setFilesPath((prevState) => [...new Set([...prevState, filepath])]);
        }
    }, [filepath]);

    const closeFile = (filepath: string) => {
        setFilesPath((prevState) => prevState.filter((fp) => fp !== filepath));
    };

    return (
        <div className="flex flex-col w-full">
            <ul className="flex border-b border-nearest-gray-80">
                {filesPath.map((fp) => {
                    const fileName = fp.split('/').at(-1);
                    const isActive = fp === filepath;

                    return (
                        <li
                            className="w-40 pl-2 pr-1 py-1.5 border border-nearest-gray-80 border-b-none"
                            style={{
                                background: isActive ? '#1A1A1A' : '',
                            }}
                            onClick={() => {
                                router.push(
                                    pathname +
                                        '?' +
                                        createQueryString(
                                            'filepath',
                                            String(fp),
                                            searchParams,
                                        ),
                                );
                            }}
                            key={fp}
                        >
                            {fileName}
                            <span onClick={() => closeFile(fp)}>x</span>
                        </li>
                    );
                })}
            </ul>
            <FileContent path={''} roomID={roomID} />
        </div>
    );
};

export default FileExplorer;
