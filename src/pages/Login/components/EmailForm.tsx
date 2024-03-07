import React from 'react'

import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { urlBase } from "@/utils/variables"
import { FormErrors } from "../models/forms"

type Props = {
    showLoginForm: boolean
    setShowLoginForm: React.Dispatch<React.SetStateAction<boolean>>
    setShowOtpForm: React.Dispatch<React.SetStateAction<boolean | null>>
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    setIsRegistered: React.Dispatch<React.SetStateAction<boolean | null>>
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
    errors: FormErrors
    setErrors: React.Dispatch<React.SetStateAction<FormErrors>>
}

type responseFetchIsMailChecked = {
    email: boolean
}

export const EmailForm = ({ showLoginForm, setShowLoginForm, setShowOtpForm, isLoading, setIsLoading, email, setEmail, setIsRegistered, errors, setErrors }: Props) => {

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

    const handleSubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateEmail()) {
            setIsLoading(true);

            const newErrors: { email?: string } = {};
            setErrors({ ...errors, ...newErrors });


            try {
                const response = await fetch(urlBase+'/user/check-email/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                const data: responseFetchIsMailChecked = await response.json();
                const userExists: boolean = data.email

                if (userExists === undefined) {
                    newErrors.email = 'Email is invalid'
                    setIsLoading(false);
                    setErrors({ ...errors, ...newErrors });
                    return Object.keys(newErrors).length === 0;

                } else {
                    userExists ? setIsRegistered(true) : setIsRegistered(false);
                    setShowLoginForm(false);
                    setShowOtpForm(true);

                    setIsLoading(false);
                    setShowLoginForm(false);
                    setShowOtpForm(true);
                }



            } catch (error) {
                console.error('Error al enviar el correo electrónico:', error);

            }

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

            <a href="/" className="text-sm text-muted-foreground">Forgot password</a>
        </form>
    )
}