'use server';
import fs from 'fs';
import path from 'path';

const getFilePath = (filepath: string) => {
    const parts = filepath.split(process.cwd());
    const modifiedString = parts.join('');
    const filePath = path.join(process.cwd(), modifiedString);
    return filePath;
};

export const readFile = async (
    filepath: string | null,
): Promise<string | undefined> => {
    try {
        if (filepath) {
            return await fs.readFileSync(getFilePath(filepath), 'utf8');
        }
    } catch (error: any) {
        console.error('Error reading file:', error.message);
        throw error; // Vous pouvez gérer l'erreur ici ou la remonter si nécessaire
    }
};

export const writeFile = async (filepath: string | null, content: string) => {
    try {
        if (filepath) {
            return await fs.writeFileSync(getFilePath(filepath), content);
        }
    } catch (error: any) {
        console.error(error);
    }
};
