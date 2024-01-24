import { ReadonlyURLSearchParams } from 'next/navigation';

export const escapeFilePath = (filePath: string): string => {
    const escapedFilePath = filePath.replace(/([\[\]])/g, '\\$1');
    return escapedFilePath;
};

export const createQueryString = (
    name: string,
    value: string,
    searchParams: ReadonlyURLSearchParams,
) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
};
