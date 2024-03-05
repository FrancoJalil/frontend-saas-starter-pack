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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

type Props = {}

export const ChangePassword = (props: Props) => {
  return (
    <div className="flex flex-col gap-2 items-start">
                        <h1>Password Settings</h1>
                        <Separator className="my-4" />

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">Change Password</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                    <DialogTitle>Change password</DialogTitle>
                                    <DialogDescription>
                                        Enter the code we sent to your email
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Code
                                        </Label>
                                        <Input
                                            id="otpCode"
                                            placeholder="654321"
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            New Password
                                        </Label>
                                        <Input
                                            type="password"

                                            id="password"
                                            placeholder="********"
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            Confirm Password
                                        </Label>
                                        <Input
                                            type="password"
                                            id="newPassword"
                                            placeholder="********"
                                            className="col-span-3"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Change</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                    </div>
  )
}