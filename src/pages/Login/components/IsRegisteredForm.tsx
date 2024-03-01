import React from 'react'
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BACK_FROM_IS_REGISTERED_FORM, FormErrors } from '../Login';

type Props = {
    passwordLogin: string
    setPasswordLogin: React.Dispatch<React.SetStateAction<string>>;
    email: any
    setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
    errors: FormErrors
    isLoading: boolean
    setIsLoading: any
    handleGoBack: any;
}

export const IsRegisteredForm = ({ passwordLogin, setPasswordLogin, email, setErrors, errors, isLoading, setIsLoading, handleGoBack }: Props) => {

    // se va
    const validatePassword = (): boolean => {
        const newErrors: { passwordLogin?: string } = {};

        if (passwordLogin !== '123') {
            newErrors.passwordLogin = 'Incorrect password';
        }

        setErrors({ ...errors, ...newErrors });
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        setErrors({})

        setIsLoading(true)

        e.preventDefault();

        if (/*validatePassword()*/ true) {
            try {
                const response = await fetch('http://localhost:8000/user/token/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: passwordLogin
                    }),
                });
    
                if (!response.ok) {
                    throw new Error('Invalid response');
                }
    
                const data = await response.json();
                console.log(data.access);
                console.log(data.refresh);
                
            } catch (error) {
                console.error('Error:', error);
                const newErrors: FormErrors = { passwordLogin: 'Incorrect password' };
                setErrors({ ...errors, ...newErrors });
            } finally {
                setIsLoading(false)
            }

        }
    };

    return (


        <form className="grid gap-4" onSubmit={handleSubmitPassword}>
            <Label htmlFor="password">Password</Label>
            <Input
                disabled={isLoading}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                autoFocus={true}
                value={passwordLogin}
                onChange={(e) => setPasswordLogin(e.target.value)}
                id="password"
                type="password"
                placeholder="Enter your password"
            />
            {errors.passwordLogin && <div className="text-red-500 text-xs">{errors.passwordLogin}</div>}
            <Button type="submit" disabled={isLoading}>
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Log In
            </Button>
            <Button type="button" variant="outline" onClick={() => handleGoBack(BACK_FROM_IS_REGISTERED_FORM)}>Go Back</Button>
            <a href="/" className="italic text-sm text-muted-foreground">Forgot password?</a>
        </form>

    )
}
