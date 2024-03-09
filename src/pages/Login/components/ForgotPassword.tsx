import React, { useEffect, useState } from "react";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormErrors } from "../models/forms";
import { HandleGoBackFunction } from "../models/functions";
import {
    BACK_FROM_FORGOT_PASSWORD,
} from "../utils/variables";
import { ForgotPasswordOTPForm } from "./ForgotPasswordOTPForm";
import { urlBase } from "@/utils/variables";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

type Props = {
    setShowForgotPasswordForm: React.Dispatch<
        React.SetStateAction<boolean | null>
    >;
    setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
    errors: FormErrors;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    handleGoBack: HandleGoBackFunction;
};

export const ForgotPassword = ({
    setErrors,
    errors,
    isLoading,
    setIsLoading,
    handleGoBack, }: Props) => {

    const [email, setEmail] = useState("")
    const [isOtpSended, setIsOtpSended] = useState<boolean | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        setIsLoading(true)
        const newErrors: { forgot?: string } = {};
        try {
            await axios.post(urlBase + "/user/forgot-password/send-code/", {
                email: email
            })
            setIsOtpSended(true)
        } catch (error: any) {
            newErrors.forgot = error.response.data.msg
        }

        setErrors({ ...errors, ...newErrors });
        setIsLoading(false)
        return Object.keys(newErrors).length === 0;
    }

    const { toast } = useToast()

    useEffect( () => {
        
            toast({ title: "Enter your emaill.", description: "We will send you a code to verify your identity.", duration: 3000 })
        
            
    }, [])

    return (
        <>
    
            {
                isOtpSended === null ?
                    <form className="grid gap-4" onSubmit={(e) => handleSubmit(e)}>
                        <Label className="flex justify-between" htmlFor="email">Email
                            {errors.forgot && <div className="text-red-500 text-xs">{errors.forgot}</div>}
                        </Label>

                        <Input
                            disabled={isLoading}
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect="off"
                            autoFocus={true}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            required={true}
                        />
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                            Send code
                        </Button>
                    </form>
                    :
                    isOtpSended === true ?
                        <ForgotPasswordOTPForm
                            email={email}
                            errors={errors}
                            setErrors={setErrors}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading} />
                        :
                        null
            }


            <Button
                disabled={isLoading}
                type="button"
                variant="outline"
                onClick={() => handleGoBack(BACK_FROM_FORGOT_PASSWORD)}
            >
                Go Back
            </Button>
        </>
    );
};
