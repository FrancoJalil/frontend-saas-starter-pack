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

import { useState } from "react"



export const ChangePassword = () => {

    const { toast } = useToast()

    const [otpCode, setOtpCode] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const sendOtp = async () => {
        try {
            setOpen(true)
            await axios.get(urlBase + '/user/change-password/send-code/')
            return true
        } catch {
            setOpen(false)
            return false
        }
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await axios.post(urlBase + '/user/change-password/', {
                code: otpCode,
                new_password: newPassword,
                confirm_new_password: confirmNewPassword
            })

            toast({ title: "Success", description: "Password changed!", duration: 3000 })
            setOpen(false)
            setOtpCode('')
            setNewPassword('')
            setConfirmNewPassword('')


        } catch (error: any) {
            toast({ title: "Error", description: error.response.data.msg, duration: 3000 })
        }

        setIsLoading(false)

    }

    return (

        <div className="flex flex-col gap-2 items-start">

            <h1>Password Settings</h1>
            <Separator className="my-4" />

            <Dialog open={open} onOpenChange={setOpen}>

                <DialogTrigger asChild >
                    <Button
                        onClick={async () => {
                            const sended = await sendOtp()
                            if (sended) {
                                toast({ title: "Email sended!", description: "Copy and paste the code.", duration: 3000 })

                            } else {
                                toast({ title: "Email error", description: "We could not send the OTP to your email. If the error persists, please contact us.", duration: 3000 })
                            }

                        }}
                        variant="outline"

                    >Change Password</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Change password</DialogTitle>
                        <DialogDescription>
                            Enter the code we sent to your email
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
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="newPassword" className="text-right">
                                    New Password
                                </Label>
                                <Input
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    value={newPassword}
                                    name="newPassword"
                                    type="password"
                                    placeholder="********"
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="confirmNewPassword" className="text-right">
                                    Confirm Password
                                </Label>
                                <Input
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    value={confirmNewPassword}
                                    name="confirmNewPassword"
                                    type="password"
                                    placeholder="********"
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                                Change</Button>
                        </DialogFooter>
                    </form>

                </DialogContent>
            </Dialog>

        </div>
    )
}