import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { urlBase } from "@/utils/variables"
import axios from "axios"
import PhoneInput from 'react-phone-input-2';
import { useEffect, useState } from "react"
import 'react-phone-input-2/lib/style.css'
import { Skeleton } from "@/components/ui/skeleton"


export const VerifyAccount = () => {

    const { toast } = useToast()


    const [isVerified, setIsVerified] = useState<boolean | null>(null)
    const [otpCode, setOtpCode] = useState<string>('')
    const [otpSent, setOtpSent] = useState<boolean | null>(null)
    const [open, setOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const [phoneNumber, setPhoneNumber] = useState<string | null>(null)

    const sendOtp = async () => {
        setOtpSent(false)
        try {

            await axios.post(urlBase + '/user/send-sms-code/', {
                user_num: phoneNumber
            })
            setOtpSent(true)
            return true
        } catch (error: any) {

            setOtpSent(false)
            //return error.response.data
        }

        setOtpSent(null)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await axios.post(urlBase + '/user/otp-verification/', {
                otp_code: otpCode,
            })

            toast({ title: "Success", description: "Verified account!", duration: 3000 })
            handleOpenDialog()
            window.location.reload()

        } catch (error: any) {
            toast({ title: "Error", description: error.response.data.msg, duration: 3000 })
        }

        setIsLoading(false)

    }

    const handleOpenDialog = () => {
        setOpen(!open)
        setOtpCode('')
    }


    const handleChangeNumber = (val: string) => {
        const input = "+" + val

        setPhoneNumber(input)
    }

    const validatePhoneNumber = (phoneNumber: string) => {
        const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/
        return phoneNumberPattern.test(phoneNumber)
    }

    const [country, setCountry] = useState('');

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await fetch('https://ipinfo.io/json');
                const data = await response.json();
                const userCountry = data.country;
                setCountry(userCountry);
            } catch (error) {
                setCountry("us")
            }
        };

        fetchCountry();
    }, []);


    useEffect(() => {
        const fetchUserData = async () => {

            try {
                const response = await axios.get(urlBase + "/user/get-data?fields=email,verified")
                setIsVerified(response.data.verified)
            } catch (error) {
                console.error(error)
            }
        }

        fetchUserData()
    }, [])


    return (

        <div className="flex flex-col gap-2 items-start">

            {isVerified === false ?
                <>
                    <h1>Verify your Account</h1>
                    <Separator className="my-4" />
                    <div className="flex gap-2 items-center">
                        <PhoneInput
                            containerStyle={{ height: '100%', color: "black" }}
                            inputStyle={{ height: '100%', color: "black" }}
                            country={country}
                            value={phoneNumber}
                            onChange={(e) => handleChangeNumber(e)}
                        />
                        <Button
                            onClick={async () => {
                                const response = await sendOtp()
                                if (response === true) {
                                    setOpen(true)
                                    toast({ title: "SMS Sent!", description: "Copy and paste the code.", duration: 3000 })
                                }

                            }}
                            disabled={otpSent === false}

                        >
                            {otpSent === false && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                            Send SMS</Button>


                    </div>


                    <Dialog open={open && otpSent ? open : false} onOpenChange={handleOpenDialog}>

                        <DialogTrigger asChild >

                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>Verify</DialogTitle>
                                <DialogDescription>
                                    Enter the code we sent to you
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="otpCode" className="text-right">
                                            Code
                                        </Label>
                                        <Input
                                            onChange={(e) => setOtpCode(e.target.value)}
                                            value={otpCode}
                                            name="otpCode"
                                            placeholder="654321"
                                            className="col-span-3"
                                        />
                                    </div>


                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={isLoading}>
                                        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                                        Check</Button>
                                </DialogFooter>
                            </form>

                        </DialogContent>
                    </Dialog>
                </>
                :
                isVerified === true ?
                    <div className="flex items-center gap-2">

                        <svg width="34px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M9.78133 3.89027C10.3452 3.40974 10.6271 3.16948 10.9219 3.02859C11.6037 2.70271 12.3963 2.70271 13.0781 3.02859C13.3729 3.16948 13.6548 3.40974 14.2187 3.89027C14.4431 4.08152 14.5553 4.17715 14.6752 4.25747C14.9499 4.4416 15.2584 4.56939 15.5828 4.63344C15.7244 4.66139 15.8713 4.67312 16.1653 4.69657C16.9038 4.7555 17.273 4.78497 17.5811 4.89378C18.2936 5.14546 18.8541 5.70591 19.1058 6.41844C19.2146 6.72651 19.244 7.09576 19.303 7.83426C19.3264 8.12819 19.3381 8.27515 19.3661 8.41669C19.4301 8.74114 19.5579 9.04965 19.7421 9.32437C19.8224 9.44421 19.918 9.55642 20.1093 9.78084C20.5898 10.3447 20.8301 10.6267 20.971 10.9214C21.2968 11.6032 21.2968 12.3958 20.971 13.0776C20.8301 13.3724 20.5898 13.6543 20.1093 14.2182C19.918 14.4426 19.8224 14.5548 19.7421 14.6747C19.5579 14.9494 19.4301 15.2579 19.3661 15.5824C19.3381 15.7239 19.3264 15.8709 19.303 16.1648C19.244 16.9033 19.2146 17.2725 19.1058 17.5806C18.8541 18.2931 18.2936 18.8536 17.5811 19.1053C17.273 19.2141 16.9038 19.2435 16.1653 19.3025C15.8713 19.3259 15.7244 19.3377 15.5828 19.3656C15.2584 19.4297 14.9499 19.5574 14.6752 19.7416C14.5553 19.8219 14.4431 19.9175 14.2187 20.1088C13.6548 20.5893 13.3729 20.8296 13.0781 20.9705C12.3963 21.2963 11.6037 21.2963 10.9219 20.9705C10.6271 20.8296 10.3452 20.5893 9.78133 20.1088C9.55691 19.9175 9.44469 19.8219 9.32485 19.7416C9.05014 19.5574 8.74163 19.4297 8.41718 19.3656C8.27564 19.3377 8.12868 19.3259 7.83475 19.3025C7.09625 19.2435 6.72699 19.2141 6.41893 19.1053C5.7064 18.8536 5.14594 18.2931 4.89427 17.5806C4.78546 17.2725 4.75599 16.9033 4.69706 16.1648C4.6736 15.8709 4.66188 15.7239 4.63393 15.5824C4.56988 15.2579 4.44209 14.9494 4.25796 14.6747C4.17764 14.5548 4.08201 14.4426 3.89076 14.2182C3.41023 13.6543 3.16997 13.3724 3.02907 13.0776C2.7032 12.3958 2.7032 11.6032 3.02907 10.9214C3.16997 10.6266 3.41023 10.3447 3.89076 9.78084C4.08201 9.55642 4.17764 9.44421 4.25796 9.32437C4.44209 9.04965 4.56988 8.74114 4.63393 8.41669C4.66188 8.27515 4.6736 8.12819 4.69706 7.83426C4.75599 7.09576 4.78546 6.72651 4.89427 6.41844C5.14594 5.70591 5.7064 5.14546 6.41893 4.89378C6.72699 4.78497 7.09625 4.7555 7.83475 4.69657C8.12868 4.67312 8.27564 4.66139 8.41718 4.63344C8.74163 4.56939 9.05014 4.4416 9.32485 4.25747C9.4447 4.17715 9.55691 4.08152 9.78133 3.89027Z" stroke="currentColor" strokeWidth="1.5"></path>
                                <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </g>
                        </svg>

                        <h1>Already verified</h1>

                    </div>
                    :
                    <Skeleton className="h-5 w-[150px]" />
            }

        </div>
    )
}