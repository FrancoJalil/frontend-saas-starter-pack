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
import { AuthContext } from "@/contexts/AuthContext"
import { AuthContextType } from "@/models/context"
import { urlBase } from "@/utils/variables"

import { useContext, useState } from "react"



export const ChangePassword = () => {

    const { toast } = useToast()

    const { user } = useContext(AuthContext) as AuthContextType

    const [otpCode, setOtpCode] = useState<string>('')
    const [otpSent, setOtpSent] = useState<boolean | null>(null)
    const [newPassword, setNewPassword] = useState<string>('')
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const sendOtp = async () => {
        setOtpSent(false)
        try {
            handleOpenDialog()
            const url = `${urlBase}/users/passwords/resets/otp/?email=${user && user.email}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.msg);
            }
            
            setOtpSent(true)
            return true
        } catch {
            handleOpenDialog()
            return false
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        if (newPassword !== confirmNewPassword) {
            toast({ title: "Error", description: "Passwords do not match.", duration: 3000 })

        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(newPassword)) {
            toast({ title: "Error", description: "Password must be at least 8 characters long and contain at least one letter and one number.", duration: 3000 })
        } else {

            try {
                const response = await fetch(urlBase + '/users/passwords/resets/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: user && user.email,
                        otp: otpCode,
                        new_password: newPassword,
                    })
                });

                if (!response.ok) {
                    const data = await response.json()
                    throw new Error(data.msg);
                }

                toast({ title: "Success", description: "Password changed!", duration: 3000 })
                handleOpenDialog()


            } catch (error: any) {
                toast({ title: "Error", description: error.message, duration: 3000 })
            }


        }
        setIsLoading(false)
    }

    const handleOpenDialog = () => {
        setOpen(!open)
        setOtpCode('')
        setNewPassword('')
        setConfirmNewPassword('')
    }

    return (

        <div className="flex flex-col gap-2 items-start">

            <h1>Password Settings</h1>
            <Separator className="my-4" />

            <Dialog open={open && otpSent ? open : false} onOpenChange={handleOpenDialog}>

                <DialogTrigger asChild >
                    <Button
                        onClick={async () => {
                            const sent = await sendOtp()
                            if (sent) {
                                toast({ title: "Email sent!", description: "Copy and paste the code.", duration: 3000 })

                            }

                        }}
                        variant="outline"
                        disabled={open}

                    >
                        {otpSent === false && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}

                        Change Password</Button>
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
                                    required={true}

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
                                    required={true}
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
                                    required={true}

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