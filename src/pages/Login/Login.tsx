import { useContext, useState } from 'react';

import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import {
    BACK_FROM_IS_NOT_REGISTERED_FORM,
    BACK_FROM_OTP_FORM,
    BACK_FROM_IS_REGISTERED_FORM
} from './utils/variables'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from '../../components/mode-toggle';
import { IsRegisteredForm } from './components/IsRegisteredForm'
import { IsNotRegisteredForm } from './components/IsNotRegisteredForm'
import { EmailForm } from './components/EmailForm';
import { OtpForm } from './components/OtpForm';
import { FormErrors } from './models/forms'
import { HandleGoBackFunction } from './models/functions'
import { AuthContextType } from "@/models/context"

import { CodeResponse, useGoogleOneTapLogin, GoogleLogin, TokenResponse, useGoogleLogin, CredentialResponse } from '@react-oauth/google';

import { urlBase } from '@/utils/variables';
import { OTP_GOOGLE } from './utils/variables';
import { AuthContext } from '@/contexts/AuthContext';

type userInfo = {
    access_token?: string
    credential?: string
    clientId?: string
}

interface credentialResponseType {
    userInfo: userInfo
}

export const Login = () => {

    let { logInWithTokens } = useContext(AuthContext) as AuthContextType

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [email, setEmail] = useState<string>('');
    const [passwordLogin, setPasswordLogin] = useState<string>('');
    const [passwordRegister, setPasswordRegister] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [otp, setOtp] = useState<string>('')
    const [otpVerified, setOtpVerified] = useState<boolean | null>(null);
    const [showOtpForm, setShowOtpForm] = useState<boolean | null>(null);
    const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const [showLoginForm, setShowLoginForm] = useState<boolean>(true);
    const [showIsNotRegisteredForm, setShowIsNotRegisteredForm] = useState<boolean>(true);

    const googleLogin = useGoogleLogin({
        onSuccess: credentialResponse => handleGoogleAuth(credentialResponse),
    })

    useGoogleOneTapLogin({
        onSuccess: credentialResponse => handleGoogleAuth(credentialResponse),
    });

    const handleGoogleAuth = async (userCredential: Omit<TokenResponse, "error" | "error_description" | "error_uri"> | CredentialResponse) => {
        try {
            const response = await fetch(urlBase + '/user/auth/google/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userInfo: userCredential }),
            });

            if (response.status !== 200) {
                console.log(response)
                throw new Error('Google auth error.')
            }

            const data = await response.json();
            console.log(data)
            if (data.is_new_user === true) {

                setIsRegistered(false)
                setEmail(data.email)
                setShowLoginForm(false)
                setIsLoading(false);
                setOtp(OTP_GOOGLE)
                setOtpVerified(true);
                setShowOtpForm(false);
                setShowIsNotRegisteredForm(true);
                // redirect to isNotRegisteredForm
                return

            }

            logInWithTokens(data)



        } catch (err) {
            console.error(err);

        }
    }

    const handleGoBack: HandleGoBackFunction = (from) => {

        if (from === BACK_FROM_IS_NOT_REGISTERED_FORM && otp !== OTP_GOOGLE) {
            setPasswordRegister('')
            setConfirmPassword('')
            setOtpVerified(null)
            setShowOtpForm(true)
        } else if (from === BACK_FROM_IS_NOT_REGISTERED_FORM && otp === OTP_GOOGLE) {
            setOtpVerified(null)
            setOtp('')
            setEmail('')
            setIsRegistered(null)
            setShowLoginForm(true)

        } else if (from === BACK_FROM_OTP_FORM) {
            setIsRegistered(null)
            setShowLoginForm(true)

        } else if (from === BACK_FROM_IS_REGISTERED_FORM) {
            setIsRegistered(null)
            setPasswordLogin('')
            setShowLoginForm(true)
        }
        setErrors({})
    };

    return (
        <>

            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-left">
                <Card className="w-lvw max-w-md min-w-80">

                    <CardHeader className="space-y-1 gap-6 justify-between flex">
                        <div className="flex justify-between w-full">
                            <CardTitle className="justify-between">

                                <div className='text-2xl flex items-center justify-normal gap-2'>
                                    <img className="w-10" src="https://res.cloudinary.com/de49grmxi/image/upload/v1704653058/logo-tweet-x_nesbfm.png" alt="" />
                                    <h1>Log In</h1>
                                </div>


                            </CardTitle>
                            <ModeToggle ></ModeToggle>
                        </div>





                        <CardDescription>
                            {isRegistered === true ? `Hi again ${email}`
                                : isRegistered === false ? `Welcome ${email}`
                                    : 'Enter your email and continue to ExampleInc'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid grid-cols-2 gap-6">
                            <Button variant="outline">
                                <Icons.gitHub className="mr-2 h-4 w-4" />
                                Github
                            </Button>
                            <Button variant="outline" onClick={() => googleLogin()}>
                                <Icons.google className="mr-2 h-4 w-4" />
                                Google
                            </Button>


                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <EmailForm
                            showLoginForm={showLoginForm}
                            setShowLoginForm={setShowLoginForm}
                            setShowOtpForm={setShowOtpForm}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            email={email}
                            setEmail={setEmail}
                            setIsRegistered={setIsRegistered}
                            errors={errors}
                            setErrors={setErrors}
                        />
                        {
                            isRegistered === true ?
                                <IsRegisteredForm
                                    passwordLogin={passwordLogin}
                                    setPasswordLogin={setPasswordLogin}
                                    email={email}
                                    isLoading={isLoading}
                                    setIsLoading={setIsLoading}
                                    setErrors={setErrors}
                                    errors={errors}
                                    handleGoBack={handleGoBack}
                                />
                                : isRegistered === false ?
                                    <OtpForm
                                        otp={otp}
                                        setOtp={setOtp}
                                        email={email}
                                        showOtpForm={showOtpForm}
                                        setShowOtpForm={setShowOtpForm}
                                        setShowIsNotRegisteredForm={setShowIsNotRegisteredForm}
                                        setOtpVerified={setOtpVerified}
                                        setErrors={setErrors}
                                        errors={errors}
                                        isLoading={isLoading}
                                        setIsLoading={setIsLoading}
                                        handleGoBack={handleGoBack} />

                                    : null


                        }

                        {
                            otpVerified === true ?
                                <IsNotRegisteredForm
                                    email={email}
                                    otp={otp}
                                    showIsNotRegisteredForm={showIsNotRegisteredForm}
                                    passwordRegister={passwordRegister}
                                    setPasswordRegister={setPasswordRegister}
                                    confirmPassword={confirmPassword}
                                    setConfirmPassword={setConfirmPassword}
                                    errors={errors}
                                    setErrors={setErrors}
                                    isLoading={isLoading}
                                    setIsLoading={setIsLoading}
                                    handleGoBack={handleGoBack} />
                                : null
                        }
                    </CardContent>
                    <CardFooter className="flex-col text-left items-start">
                    </CardFooter>
                </Card>
            </div>

        </>
    );

};
