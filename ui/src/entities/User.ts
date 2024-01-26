'use client';
import * as z from 'zod';

export const UserSchema = z.object({
    email: z.string().email().default(''),
    password: z.string().default(''),
    'password-confirm': z.string().default(''),
});

export type UserType = z.infer<typeof UserSchema>;

export const UserState: UserType = {
    email: '',
    password: '',
    'password-confirm': '',
};
