import React from 'react'

import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
    showLoginForm: any
    setShowLoginForm: any
    setShowOtpForm: any
    isLoading: any
    setIsLoading: any
    isRegistered: any
    setIsRegistered: any
    email: any
    setEmail: any
    errors: any
    setErrors: any
}

export const EmailForm = ({ showLoginForm, setShowLoginForm, setShowOtpForm, isLoading, setIsLoading, email, setEmail, isRegistered, setIsRegistered, errors, setErrors }: Props) => {

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

    const emailRegistered: string = 'francocraftero78@gmail.com';


    const handleSubmitEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateEmail()) {
            setIsLoading(true);

            setTimeout(async () => {
                const newErrors: { email?: string } = {};
                setErrors({ ...errors, ...newErrors });


                try {
                    const response = await fetch('http://localhost:8000/user/check-email/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email }),
                    });

                    const data = await response.json();
                    const userExists: boolean = data.email
                    console.log(userExists)
                    console.log("paso")

                    if (userExists === undefined) {
                        newErrors.email = 'Email is invalid'
                        console.log("hola")
                        setIsLoading(false);
                        setErrors({ ...errors, ...newErrors });
                        return Object.keys(newErrors).length === 0;

                    } else {
                        userExists ? setIsRegistered(true) : setIsRegistered(false);
                        setShowLoginForm(false);
                        setShowOtpForm(true);

                        setIsLoading(false);
                        email === emailRegistered ? setIsRegistered(true) : setIsRegistered(false);
                        setShowLoginForm(false);
                        setShowOtpForm(true);
                        console.log("ciao")
                    }



                } catch (error) {
                    console.error('Error al enviar el correo electrónico:', error);

                }

            }, 500);
        }
    };

    return (
        <form className="grid gap-4" onSubmit={handleSubmitEmail} style={{ display: showLoginForm ? 'grid' : 'none' }}>
            <Label className="flex items-center gap-2 justify-between" htmlFor="email">Email
                <div className="text-red-500 text-xs" style={{ visibility: errors.email ? 'visible' : 'hidden' }}>
                    *{errors.email ? errors.email : 'mensaje error'}
                </div>
            </Label>
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


            <Button type="submit" disabled={isLoading}>
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Continue with Email
            </Button>

            <a href="/" className="italic text-sm text-muted-foreground">Forgot password?</a>
        </form>
    )
}