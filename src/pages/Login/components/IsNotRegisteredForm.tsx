import React, { useContext, useState } from 'react'
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BACK_FROM_IS_NOT_REGISTERED_FORM } from '../utils/variables';
import { urlBase } from "@/utils/variables"
import { FormErrors } from "../models/forms"
import { HandleGoBackFunction } from "../models/functions"
import { AuthContext } from '@/contexts/AuthContext';
import { AuthContextType } from "@/models/context"

type Props = {
    email: string
    googleCredentials: any
    otp: string
    showIsNotRegisteredForm: boolean
    errors: FormErrors
    setErrors: React.Dispatch<React.SetStateAction<FormErrors>>
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    handleGoBack: HandleGoBackFunction
}



export const IsNotRegisteredForm = ({ showIsNotRegisteredForm, email, googleCredentials, otp, errors, setErrors, isLoading, setIsLoading, handleGoBack }: Props) => {

    const { logInWithTokens } = useContext(AuthContext) as AuthContextType
    const [passwordRegister, setPasswordRegister] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const handleSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        const newErrors: { confirmPassword?: string } = {};

        if (passwordRegister !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(passwordRegister)) {
            newErrors.confirmPassword = 'Password must be at least 8 characters long and contain at least one letter and one number'

        } else {
            newErrors.confirmPassword = ''

            try {
                console.log(otp)
                console.log(passwordRegister)
                console.log(email)
                const response = await fetch(urlBase + '/users/signup/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: passwordRegister,
                        register_type: googleCredentials ? "google" : "email", 
                        otp: otp,
                        google_credential: googleCredentials

                    }),
                });

                if (!response.ok) {
                    newErrors.confirmPassword = 'Error'
                    throw new Error('Invalid response');
                }

                const data = await response.json()
                logInWithTokens(data)



            } catch (error) {
                console.error('Error:', error);
            } 

        }

        setIsLoading(false)

        setErrors({ ...errors, ...newErrors });
        return Object.keys(newErrors).length === 0;

    }

    return (
        <form className="grid gap-4" onSubmit={handleSubmitRegister} style={{ display: showIsNotRegisteredForm ? 'grid' : 'none' }}>
            <Label htmlFor="passwordRegister">Create your password</Label>
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
                required={true}
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
                required={true}
            />
            {errors.confirmPassword && <div className="text-red-500 text-xs">{errors.confirmPassword}</div>}
            <Button type="submit" disabled={isLoading}>
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Create account
            </Button>
            <Button disabled={isLoading} type="button" variant="outline" onClick={() => handleGoBack(BACK_FROM_IS_NOT_REGISTERED_FORM)}>Go Back</Button>

        </form>
    )
}