import React from 'react'
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
    passwordRegister: any
    setPasswordRegister: any
    confirmPassword: any
    setConfirmPassword: any
    errors: any
    setErrors: any
    isLoading: any
    handleGoBack: any
}

export const IsNotRegisteredForm = ({ passwordRegister, setPasswordRegister, confirmPassword, setConfirmPassword, errors, setErrors, isLoading, handleGoBack }: Props) => {



    const handleSubmitRegister = (e: React.FormEvent<HTMLFormElement>): boolean => {
        e.preventDefault()
        const newErrors: { confirmPassword?: string } = {};

        if (passwordRegister !== confirmPassword) {
            console.log("NOT MATCH")
            newErrors.confirmPassword = 'Passwords do not match'
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(passwordRegister)) {
            console.log("mas larga pls")
            newErrors.confirmPassword = 'Password must be at least 8 characters long and contain at least one letter and one number'

        } else {
            newErrors.confirmPassword = ''
            console.log("REGISTRADO")

        }

        setErrors({ ...errors, ...newErrors });
        return Object.keys(newErrors).length === 0;

    }

    return (
        <form className="grid gap-4" onSubmit={handleSubmitRegister}>
            <Label htmlFor="passwordRegister">Password</Label>
            <Input
                disabled={isLoading}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                autoFocus={true}
                value={passwordRegister}
                onChange={(e) => setPasswordRegister(e.target.value)}
                id="passwordRegister"
                type="password"
                placeholder="Password"
            />
            <Input
                disabled={isLoading}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
            />
            {errors.confirmPassword && <div className="text-red-500 text-xs">{errors.confirmPassword}</div>}
            <Button disabled={isLoading}>
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Create account
            </Button>
            <Button variant="outline" onClick={handleGoBack}>Go Back</Button>
            <a href="/" className="italic text-sm text-muted-foreground">Forgot password?</a>
        </form>
    )
}