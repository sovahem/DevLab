export type FileSysBaseType = {
    label: string;
    key: string;
    type: 'directory' | 'file';
};

export type FileType = FileSysBaseType;

export type DirectoryType = {
    directory: string;
    children: (FileType | DirectoryType)[];
};
