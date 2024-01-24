'use client';

import { createQueryString } from '@/lib/string';
import { DirectoryType, FileType } from '@/lib/types';
import Tree from '@uiw/react-tree';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';

type NavigationProps = {
    structure: (FileType | DirectoryType)[];
};

const Navigation: FC<NavigationProps> = ({ structure }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (
        <Tree
            data={structure}
            onSelected={(re, key, te, item) => {
                if (item.type === 'file') {
                    router.push(
                        pathname +
                            '?' +
                            createQueryString(
                                'filepath',
                                String(key),
                                searchParams,
                            ),
                    );
                }
            }}
        />
    );
};

export default Navigation;

// const List: FC<{
//     item: FileType | DirectoryType;
//     index: number;
//     level: number;
//     path: string;
// }> = ({ item, index, level, path }) => {
//     const [isExpanded, setExpanded] = useState(false);
//     const router = useRouter();
//     const pathname = usePathname();
//     const searchParams = useSearchParams();

//     const margin = 30;

//     const handleToggle = () => {
//         setExpanded(!isExpanded);
//     };

//     const classExpanded = isExpanded ? 'expanded' : 'collapsed';

//     const createQueryString = useCallback(
//         (name: string, value: string) => {
//             const params = new URLSearchParams(searchParams.toString());
//             params.set(name, value);

//             return params.toString();
//         },
//         [searchParams],
//     );

//     return (
//         <li key={index} style={{ borderLeft: '1px solid red' }}>
//             {'directory' in item ? (
//                 <div style={{ paddingLeft: `${level * margin}px` }}>
//                     <span onClick={() => setExpanded(!isExpanded)}>
//                         {item.directory} {isExpanded ? '[-] ' : '[+] '}
//                     </span>
//                     <div className={classExpanded}>
//                         <Navigation
//                             path={`${path}/${item.directory}`}
//                             structure={item.children}
//                             level={level + 1}
//                             className={classExpanded}
//                         />
//                     </div>
//                 </div>
//             ) : (
//                 <span
//                     style={{ paddingLeft: `${margin}px` }}
//                     onClick={() => {
//                         router.push(
//                             pathname +
//                                 '?' +
//                                 createQueryString('filepath', item.key),
//                         );
//                     }}
//                 >
//                     {item.key}
//                 </span>
//             )}
//         </li>
//     );
// };

// const Navigation: FC<NavigationProps> = ({
//     className = '',
//     path,
//     structure,
//     level = 0,
// }) => {
//     return (
//         <ul>
//             {structure.map((item, index) => {
//                 return (
//                     <List
//                         key={index}
//                         index={index}
//                         item={item}
//                         level={level}
//                         path={path}
//                     />
//                 );
//             })}
//         </ul>
//     );
// };
