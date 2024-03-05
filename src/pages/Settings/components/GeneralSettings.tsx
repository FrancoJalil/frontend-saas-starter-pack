import { ModeToggle } from "@/components/mode-toggle"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { AuthContext } from "@/contexts/AuthContext"
import { AuthContextType } from "@/models/context"
import { useContext } from "react"
import { Button } from "@/components/ui/button"


export const GeneralSettings = () => {

    const { user, logoutUser } = useContext(AuthContext) as AuthContextType

    return (
        <div className="flex flex-col gap-2 items-start">
            <h1>General Settings</h1>
            <Separator className="my-4" />
            <Label htmlFor="emailInput" > Email</Label>
            <Input defaultValue={user?.email} className="pointer-events-none" />
            <ModeToggle />

            <Separator className="my-4" />

            <Button onClick={() => logoutUser()} className="cursor-pointer font-semibold bg-rose-600 hover:bg-rose-700 text-white ">Logout</Button>

        </div>
    )
}
