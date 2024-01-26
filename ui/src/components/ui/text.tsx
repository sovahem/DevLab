import { cn } from '@/lib/utils';
import { FC, PropsWithChildren } from 'react';

export type TextProps = {
    className?: string;
} & PropsWithChildren;

export const Text: FC<TextProps> = ({ className = '', children }) => {
    return <p className={cn('Text', className)}>{children}</p>;
};
