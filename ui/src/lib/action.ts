import { AuthError } from 'next-auth';
import { signIn } from '../../auth';

export const authenticate = async (formData: any) => {
    console.log('FORMSARTWQ', formData);

    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
};
