'use client';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from './form';

export type FormBaseProps<T> = {
    className?: string;
    table: string;
    dataState: T;
    zodSchema: z.ZodObject<any>;
    relationsTableIgnore?: string[];
    handleSubmit?: () => void;
} & React.PropsWithChildren<any>;

export const FormBase = <T extends {}>(props: FormBaseProps<T>) => {
    const {
        className = '',
        table,
        dataState,
        zodSchema,
        children,
        relationsTableIgnore = [],
    } = props;

    const { id = '', formType } = useParams();

    const form = useForm<z.infer<typeof zodSchema>>({
        resolver: zodResolver(zodSchema),
    });

    const onSubmit = async (values: z.infer<typeof zodSchema>) => {
        // action(values);
    };

    return (
        <Form {...form}>
            <form
                className={cn('FormBase', className)}
                onSubmit={form.handleSubmit(onSubmit)}
            >
                {children}
            </form>
        </Form>
    );
};
