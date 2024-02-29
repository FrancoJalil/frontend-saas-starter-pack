import React from 'react'
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormErrors } from '../Login';

type Props = {
    passwordLogin: string
    setPasswordLogin: React.Dispatch<React.SetStateAction<string>>;
    setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
    errors: FormErrors
    isLoading: boolean
    handleGoBack: () => void;
}

export const IsRegisteredForm = ({passwordLogin, setPasswordLogin, setErrors, errors, isLoading, handleGoBack}: Props) => {

    // se va
    const validatePassword = (): boolean => {
        const newErrors: { password?: string } = {};

        if (passwordLogin !== '123') {
            newErrors.password = 'Incorrect password';
        }

        setErrors({ ...errors, ...newErrors });
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmitPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validatePassword()) {
            console.log('Logged in successfully!'); // Muestra el mensaje en la consola si la contraseña es "123"
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
            <Button disabled={isLoading}>
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Log In
            </Button>
            <Button variant="outline" onClick={handleGoBack}>Go Back</Button>
            <a href="/" className="italic text-sm text-muted-foreground">Forgot password?</a>
        </form>

    )
}