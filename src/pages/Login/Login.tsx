import { useState } from 'react';

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



export const Login = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [passwordLogin, setPasswordLogin] = useState<string>('');
    const [passwordRegister, setPasswordRegister] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [otpVerified, setOtpVerified] = useState<boolean | null>(null);
    const [showOtpForm, setShowOtpForm] = useState<boolean | null>(null);
    const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const [showLoginForm, setShowLoginForm] = useState<boolean>(true);
    const [showIsNotRegisteredForm, setShowIsNotRegisteredForm] = useState<boolean>(true);


    const handleGoBack: HandleGoBackFunction = (from) => {

        if (from === BACK_FROM_IS_NOT_REGISTERED_FORM) {
            setPasswordRegister('')
            setConfirmPassword('')
            setOtpVerified(null)
            setShowOtpForm(true)
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
                            Enter your email and continue to ExampleInc
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid grid-cols-2 gap-6">
                            <Button variant="outline">
                                <Icons.gitHub className="mr-2 h-4 w-4" />
                                Github
                            </Button>
                            <Button variant="outline">
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
