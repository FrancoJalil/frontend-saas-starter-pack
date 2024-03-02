import React from 'react'
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BACK_FROM_IS_NOT_REGISTERED_FORM } from '../utils/variables';
import { useNavigate } from "react-router-dom";
import { urlBase } from "@/utils/variables"
import { FormErrors } from "../models/forms"
import { HandleGoBackFunction } from "../models/functions"

type Props = {
    email: string
    showIsNotRegisteredForm: boolean
    passwordRegister: string
    setPasswordRegister: React.Dispatch<React.SetStateAction<string>>
    confirmPassword: string
    setConfirmPassword: React.Dispatch<React.SetStateAction<string>>
    errors: FormErrors
    setErrors: React.Dispatch<React.SetStateAction<FormErrors>>
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    handleGoBack: HandleGoBackFunction
}

export const IsNotRegisteredForm = ({ showIsNotRegisteredForm, email, passwordRegister, setPasswordRegister, confirmPassword, setConfirmPassword, errors, setErrors, isLoading, setIsLoading, handleGoBack }: Props) => {


    const navigate = useNavigate()

    const handleSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newErrors: { confirmPassword?: string } = {};

        if (passwordRegister !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(passwordRegister)) {
            newErrors.confirmPassword = 'Password must be at least 8 characters long and contain at least one letter and one number'

        } else {
            newErrors.confirmPassword = ''

            try {
                const response = await fetch(urlBase+'/user/register/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: passwordRegister
                    }),
                });
                
                if (!response.ok) {
                    newErrors.confirmPassword = 'Error'
                    throw new Error('Invalid response');
                }

                const data = await response.json()
                localStorage.setItem('authTokens', JSON.stringify(data))
                navigate("/")



            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false)
            }

        }

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
            <Button type="submit" disabled={isLoading}>
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Create account
            </Button>
            <Button type="button" variant="outline" onClick={() => handleGoBack(BACK_FROM_IS_NOT_REGISTERED_FORM)}>Go Back</Button>

        </form>
    )
}