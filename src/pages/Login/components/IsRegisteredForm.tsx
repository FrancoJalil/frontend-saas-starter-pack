import React, { useContext, useState } from 'react'
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormErrors } from '../models/forms';
import { HandleGoBackFunction } from '../models/functions';
import { BACK_FROM_IS_REGISTERED_FORM } from '../utils/variables'
import { AuthContext } from '@/contexts/AuthContext';
import { AuthContextType } from "@/models/context"

type Props = {
    setShowForgotPasswordForm: React.Dispatch<React.SetStateAction<boolean | null>>
    email: string
    setErrors: React.Dispatch<React.SetStateAction<FormErrors>>
    errors: FormErrors
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    handleGoBack: HandleGoBackFunction
}

export const IsRegisteredForm = ({  setShowForgotPasswordForm, email, setErrors, errors, isLoading, setIsLoading, handleGoBack }: Props) => {

    let {loginUser} = useContext(AuthContext) as AuthContextType
    const [passwordLogin, setPasswordLogin] = useState<string>("")

    return (

        <form className="grid gap-4" onSubmit={(e) => loginUser(e, email, passwordLogin, setIsLoading, setErrors, errors)}>
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
                required={true}
            />
            {errors.passwordLogin && <div className="text-red-500 text-xs">{errors.passwordLogin}</div>}
            <Button type="submit" disabled={isLoading}>
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Log In
            </Button>
            <Button disabled={isLoading} type="button" variant="outline" onClick={() => handleGoBack(BACK_FROM_IS_REGISTERED_FORM)}>Go Back</Button>
            <a onClick={() => setShowForgotPasswordForm(true)} className="text-sm text-muted-foreground">Forgot password</a>
            
        </form>

    )
}
