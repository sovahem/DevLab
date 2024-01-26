'use client';
import { Button } from '@/components/ui/button';
import { FormBase } from '@/components/ui/form-base';
import { FormRowTextField } from '@/components/ui/form-row-text-field';
import { Text } from '@/components/ui/text';
import { UserSchema, UserState } from '@/entities/User';

const Login = () => {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex flex-col m-auto text-center relative">
                <Text className="font-semibold text-4xl absolute -top-20 left-[50%] translate-x-[-50%] w-full">
                    Log in to DevLab
                </Text>

                <FormBase
                    className={'flex flex-col gap-3 w-96'}
                    dataState={UserState}
                    zodSchema={UserSchema}
                    // onSubmit={authenticate}
                >
                    <FormRowTextField
                        label={''}
                        name={'email'}
                        placeholder="Email Address"
                    />
                    <FormRowTextField
                        label={''}
                        name={'password'}
                        placeholder="Password"
                    />
                    <Button type={'submit'}>Submit</Button>
                </FormBase>
            </div>
        </div>
    );
};

export default Login;
