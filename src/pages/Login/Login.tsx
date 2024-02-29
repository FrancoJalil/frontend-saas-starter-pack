import React, { useState } from 'react';

import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from '../../components/mode-toggle';
import { IsRegisteredForm } from './components/IsRegisteredForm'
import { IsNotRegisteredForm } from './components/IsNotRegisteredForm'

// MODELOS
export interface FormErrors {
    email?: string;
    passwordLogin?: string;
    confirmPassword?: string;
}


export const Login = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [passwordLogin, setPasswordLogin] = useState<string>('');
    const [passwordRegister, setPasswordRegister] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [otpVerified, setOtpVerified] = useState<boolean | null>(null);
    const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const [showLoginForm, setShowLoginForm] = useState<boolean>(true);


    const emailRegistered: string = 'x@x.com';

    const validateEmail = (): boolean => {
        const newErrors: { email?: string } = {};

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }

        setErrors({ ...errors, ...newErrors });
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmitEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateEmail()) {
            setIsLoading(true);

            setTimeout(() => {
                setIsLoading(false);
                email === emailRegistered ? setIsRegistered(true) : setIsRegistered(false);
                setShowLoginForm(false);
            }, 500);
        }
    };

    const handleGoBack = () => {
        setIsRegistered(null)
        setShowLoginForm(true); // Cambia showLoginForm a true para volver al formulario de correo electrónico
        setErrors({}); // Limpia los errores al regresar al formulario de correo electrónico
        setPasswordLogin('')
        setPasswordRegister('')
        setConfirmPassword('')
    };



    return (
        <>
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-left">
                <Card className="w-1/3 min-w-80">
                    <CardHeader className="space-y-1 gap-6">
                        <CardTitle className="text-2xl flex items-center justify-normal gap-2">
                            <img className="w-10" src="https://res.cloudinary.com/de49grmxi/image/upload/v1704653058/logo-tweet-x_nesbfm.png" alt="" />
                            Log In
                        </CardTitle>
                        <CardDescription>
                            Enter your email and continue to ExampleInc
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid grid-cols-2 gap-6">
                            <Button variant="outline">
                                <Icons.gitHub className="mr-2 h-4 w-4" />
                                Github
                            </Button>
                            <Button variant="outline">
                                <Icons.google className="mr-2 h-4 w-4" />
                                Google
                            </Button>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <form className="grid gap-4" onSubmit={handleSubmitEmail} style={{ display: showLoginForm ? 'grid' : 'none' }}>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                disabled={isLoading}
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                            />
                            {errors.email && <div className="text-red-500 text-xs">{errors.email}</div>}
                            <Button disabled={isLoading}>
                                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                                Continue with Email
                            </Button>
                            <a href="/" className="italic text-sm text-muted-foreground">Forgot password?</a>
                        </form>
                        {
                            isRegistered === true ?
                                <IsRegisteredForm
                                    passwordLogin={passwordLogin}
                                    setPasswordLogin={setPasswordLogin}
                                    isLoading={isLoading}
                                    setErrors={setErrors}
                                    errors={errors}
                                    handleGoBack={handleGoBack}
                                />
                                : isRegistered === false ?
                                    <IsNotRegisteredForm
                                        passwordRegister={passwordRegister}
                                        setPasswordRegister={setPasswordRegister}
                                        confirmPassword={confirmPassword}
                                        setConfirmPassword={setConfirmPassword}
                                        errors={errors}
                                        setErrors={setErrors}
                                        isLoading={isLoading}
                                        handleGoBack={handleGoBack} />
                                    : null
                        }
                    </CardContent>
                    <CardFooter className="flex-col text-left items-start">
                    </CardFooter>
                </Card>
            </div>
            <ModeToggle />
        </>
    );
};
