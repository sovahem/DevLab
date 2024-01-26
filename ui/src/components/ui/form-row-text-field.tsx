'use client';
import { cn } from '@/lib/utils';
import { FC } from 'react';
import { FormControl } from './form';
import FormRow, { FormRowProps } from './form-row';
import { Input, InputProps } from './input';

export type FormRowTextFieldProps = {
    className?: string;
    isView?: boolean;
    funcConvertValue?: any;
} & Omit<FormRowProps, 'child'> &
    InputProps;

export const FormRowTextField: FC<FormRowTextFieldProps> = ({
    className = '',
    label,
    isView,
    name,
    funcConvertValue,
    ...restProps
}) => {
    return (
        <FormRow
            className={cn('FormRowTextField', className)}
            label={label}
            name={name}
            required={restProps.required}
            child={(field) => {
                if (isView)
                    return (
                        <p className={'text-right'}>
                            {funcConvertValue
                                ? funcConvertValue(field.value)
                                : field.value || '---'}
                        </p>
                    );
                return (
                    <FormControl>
                        <Input {...field} {...restProps} />
                    </FormControl>
                );
            }}
        />
    );
};
