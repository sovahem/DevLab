import FileExplorer from '@/components/organisms/file-explorer';
import ImportFile from '@/components/organisms/import-file';
import Navigation from '@/components/organisms/navigation';
import fs from 'fs';
import path from 'path';
import { FC } from 'react';

type RoomIDProps = {
    params: {
        roomID: string;
    };
};

const RoomID: FC<RoomIDProps> = ({ params }) => {
    const { roomID } = params;
    const directory = path.join('../../../../autoForm/test-sayse/src');

    function* generateDirectoryStructure(
        directory: string,
    ): Generator<any, void, void> {
        const directoryContents = fs.readdirSync(directory, {
            withFileTypes: true,
        });

        for (const element of directoryContents) {
            const elementPath = path.join(directory, element.name);

            if (element.isDirectory()) {
                yield {
                    label: element.name,
                    key: elementPath,
                    type: 'directory',
                    children: [...generateDirectoryStructure(elementPath)],
                };
            } else {
                yield {
                    label: element.name,
                    key: elementPath,
                    type: 'file',
                };
            }
        }
    }

    const structure = [...generateDirectoryStructure(directory)];
    return (
        <div className="flex flex-1 h-full w-full">
            {/* <ImportFile /> */}
            <Navigation structure={structure} />
            <FileExplorer roomID={roomID} />
            {/* <Chat roomID={roomID} /> */}
        </div>
    );
};

export default RoomID;
