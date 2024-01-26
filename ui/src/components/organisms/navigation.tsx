'use client';

import Tree from '@uiw/react-tree';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { createQueryString } from '../../lib/string';
import { DirectoryType, FileType } from '../../lib/types';
type NavigationProps = {
    structure: (FileType | DirectoryType)[];
};

const Navigation: FC<NavigationProps> = ({ structure }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (
        <Tree
            className="p-4"
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

// const treeConfig = {
//     dataSource: {
//       /**
//        * Returns the unique identifier of the given element.
//        * No more than one element may use a given identifier.
//        */
//       getId: function(tree, element){
//         return element.key;
//       },

//       /**
//        * Returns a boolean value indicating whether the element has children.
//        */
//       hasChildren: function(tree, element){
//         return element.isDirectory;
//       },

//       /**
//        * Returns the element's children as an array in a promise.
//        */
//       getChildren: function(tree, element){
//         return Promise.resolve(element.children);
//       },

//       /**
//        * Returns the element's parent in a promise.
//        */
//       getParent: function(tree, element){
//           return Promise.resolve(element.parent);
//         },
//     },
//     renderer: {
//       getHeight: function(tree, element){
//         return 24;
//       },
//       renderTemplate: function(tree, templateId, container) {
//         return new FileTemplate(container);
//       },
//       renderElement: function(tree, element, templateId, templateData) {
//           templateData.set(element);
//       },
//       disposeTemplate: function(tree, templateId, templateData) {
//           FileTemplate.dispose();
//       }
//     },

//     //tree config requires a controller property but we would defer its initialisation
//     //to be done by the MonacoTree component
//     //controller: createController(this, this.getActions.bind(this), true),
//     dnd: new TreeDnD()
// };

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
