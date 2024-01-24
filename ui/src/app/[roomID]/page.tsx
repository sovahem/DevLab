import FileExplorer from '@/components/organisms/file-explorer';
import Navigation from '@/components/organisms/navigation';
import fs from 'fs';
import path from 'path';

export function* generateDirectoryStructure(
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

const RoomID = () => {
    const directory = path.join(process.cwd(), 'src');
    const structure = [...generateDirectoryStructure(directory)];
    console.log(structure);
    return (
        <div className="flex flex-1 h-full w-full">
            <Navigation structure={structure} />
            <FileExplorer />
        </div>
    );
};

export default RoomID;
