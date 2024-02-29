import React, { useState } from 'react'

import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormErrors, BACK_FROM_OTP_FORM } from '../Login';

type Props = {
  showOtpForm: any
  setShowOtpForm: any
  setShowIsNotRegisteredForm: any
  otpVerified: any
  setOtpVerified: any
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  errors: FormErrors
  isLoading: boolean
  setIsLoading: any
  handleGoBack: any;
}

export const OtpForm = ({ otpVerified, setOtpVerified, showOtpForm, setShowOtpForm, setShowIsNotRegisteredForm, errors, setErrors, isLoading, setIsLoading, handleGoBack }: Props) => {

  const otpTest: string = "321"

  const [otp, setOtp] = useState<string>('')

  const handleSubmitOtp = (e: React.FormEvent<HTMLFormElement>): boolean => {
    e.preventDefault()
    const newErrors: { otp?: string } = {};

    if (otp !== otpTest) {
      newErrors.otp = 'Invalid OTP'
    } else {
      newErrors.otp = ''
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        setOtpVerified(true);
        setShowOtpForm(false);
        setShowIsNotRegisteredForm(true);
      }, 500);
    }

    setErrors({ ...errors, ...newErrors });
    return Object.keys(newErrors).length === 0;

  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmitOtp} style={{ display: showOtpForm ? 'grid' : 'none' }}>
      <Label className="flex items-center gap-2 justify-between" htmlFor="otp">Enter the code we sent to your email
      {errors.otp && <div className="text-red-500 text-xs">*{errors.otp}</div>}
      </Label>
      <Input
        disabled={isLoading}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        autoFocus={true}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        id="otp"
        type="text"
        placeholder="Code"
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Check Code
      </Button>
      <Button type="button" variant="outline" onClick={() => handleGoBack(BACK_FROM_OTP_FORM)}>Go Back</Button>
      <a href="/" className="italic text-sm text-muted-foreground">Forgot password?</a>
    </form>
  )
}
