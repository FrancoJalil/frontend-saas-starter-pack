import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { urlBase } from "@/utils/variables";
import { useState } from "react";
import { FormErrors } from "../models/forms";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

type Props = {
    email: string
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    errors: FormErrors;
    setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
}

export const ForgotPasswordOTPForm = ({ email, errors, setErrors, isLoading, setIsLoading }: Props) => {

    const navigate = useNavigate()
    const { toast } = useToast()

    const [isOtpValid, setIsOtpValid] = useState<boolean | null>(null)
    const [newPassword, setNewPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [otpCode, setOtpCode] = useState<string>('')


    const handleSubmitOTP = async (e: React.FormEvent<HTMLFormElement>) => {
        setErrors({});

        e.preventDefault()
        setIsLoading(true)
        const newErrors: { forgotFormOtp?: string } = {};

        try {
            const response = await fetch(urlBase + '/users/passwords/resets/otp/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    otp: otpCode,
                })
            });

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.msg);
            }
            newErrors.forgotFormOtp = ''
            setIsOtpValid(true)


        } catch (error: any) {
            newErrors.forgotFormOtp = error.message
            setIsOtpValid(null)
            console.error('Error:', error);
        }
        setErrors({ ...errors, ...newErrors });
        setIsLoading(false)
        return Object.keys(newErrors).length === 0;

    }

    const handleSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        const newErrors: { forgotFormPassword?: string } = {};

        if (newPassword !== confirmPassword) {
            newErrors.forgotFormPassword = "Passwords don't match"
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(newPassword)) {
            newErrors.forgotFormPassword = 'Password must be at least 8 characters long and contain at least one letter and one number'
        } else {
            newErrors.forgotFormPassword = ''

            try {
                const response = await fetch(urlBase + '/users/passwords/resets/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        otp: otpCode,
                        email: email,
                        new_password: newPassword
                    })
                });
                const data = await response.json()
                if (!response.ok) {
                    throw new Error(data.msg);
                }
                // poner los jwts
                toast({ title: "Success", description: "Password changed!", duration: 3000 })
                navigate('/')

            } catch (error: any) {
                newErrors.forgotFormPassword = error.message
                console.error('Error:', error);
            }


        }

        setErrors({ ...errors, ...newErrors });
        setIsLoading(false)
        return Object.keys(newErrors).length === 0;
    }

    return (

        <>
            {
                isOtpValid === null ?
                    <form className="grid gap-4" onSubmit={(e) => handleSubmitOTP(e)}>

                        <Label className="flex justify-between sm:flex-row gap-2 flex-col" htmlFor="email">Enter the code we sent to your email
                            {errors.forgotFormOtp && <div className="text-red-500 text-xs">{errors.forgotFormOtp}</div>}
                        </Label>
                        <Input
                            disabled={isLoading}
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect="off"
                            autoFocus={true}
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            id="otpCode"
                            name="otpCode"
                            type="number"
                            placeholder="Enter the code"
                            required={true}

                        />
                        <Button type="submit" disabled={isLoading}>

                            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                            Check </Button>

                    </form>
                    :
                    isOtpValid === true ?
                        <form className="grid gap-4" onSubmit={(e) => handleSubmitPassword(e)}>
                            <Label className="flex justify-between gap-2 flex-col" htmlFor="password">Change your password
                                {errors.forgotFormPassword && <div className="text-red-500 text-xs">{errors.forgotFormPassword}</div>}
                            </Label>
                            <Input
                                disabled={isLoading}
                                autoFocus={true}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                name="password"
                                type="password"
                                placeholder="New Password"
                                required={true}
                            />
                            <Input
                                disabled={isLoading}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                required={true}

                            />
                            <Button type="submit" disabled={isLoading}>
                                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                                Change password</Button>
                        </form>
                        :
                        null
            }


        </>

    )
}
