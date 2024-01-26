'use client';
import { cn } from '@/lib/utils';
import { FC, ReactNode } from 'react';
import {
    ControllerRenderProps,
    FieldValues,
    useFormContext,
} from 'react-hook-form';

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './form';

export type FormRowProps = {
    className?: string;
    name: string;
    label: string;
    required?: boolean;
    child: (field: ControllerRenderProps<FieldValues, string>) => ReactNode;
};

const FormRow: FC<FormRowProps> = ({
    className = '',
    name,
    label,
    required,
    child,
}) => {
    const { control } = useFormContext();
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn('FormRow', className)}>
                    {label && (
                        <FormLabel>
                            {label}
                            {required && (
                                <span className={'text-destructive'}>*</span>
                            )}
                        </FormLabel>
                    )}
                    <div className={'input__ctn w-full relative'}>
                        <FormControl>{child(field)}</FormControl>
                        <FormMessage
                            className={`FormRow__message absolute top-full text-sm text-destructive font-semibold`}
                        />
                    </div>
                </FormItem>
            )}
        />
    );
};

export default FormRow;
