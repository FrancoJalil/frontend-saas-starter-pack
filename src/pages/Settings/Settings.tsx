import { Button } from "@/components/ui/button"
import { useState } from "react";
import { GeneralSettings } from "./components/GeneralSettings"
import { ChangePassword } from "./components/ChangePassword";
import { VerifyAccount } from "./components/VerifyAccount";
import { Contact } from "./components/Contact";

type SettingsPages = {
    general: "general"
    changePassword: "changePassword"
    smsVerify: "smsVerify"
    contact: "contact"
}

export const Settings = () => {


    const [currentPage, setCurrentPage] = useState<keyof SettingsPages>("general")

    return (
        <div className="flex flex-col p-10 w-fit gap-10 sm:flex-row">


            <nav className="flex flex-col lg:flex-col lg:space-x-0 lg:space-y-1">
                <Button onClick={() => setCurrentPage("general")} variant={"ghost"} className={`flex justify-start ${currentPage === "general" ? 'bg-muted hover:bg-muted' : 'hover:bg-transparent hover:underline'} `}>General</Button>
                <Button onClick={() => setCurrentPage("changePassword")} variant={"ghost"} className={`flex justify-start ${currentPage === "changePassword" ? 'bg-muted hover:bg-muted' : 'hover:bg-transparent hover:underline'} `}>Password</Button>
                <Button onClick={() => setCurrentPage("smsVerify")} variant={"ghost"} className={`flex justify-start ${currentPage === "smsVerify" ? 'bg-muted hover:bg-muted' : 'hover:bg-transparent hover:underline'} `}>SMS Verify</Button>
                <Button onClick={() => setCurrentPage("contact")} variant={"ghost"} className={`flex justify-start ${currentPage === "contact" ? 'bg-muted hover:bg-muted' : 'hover:bg-transparent hover:underline'} `}>Contact</Button>
            </nav>


            {
                currentPage === "general" ?
                    <GeneralSettings />
                    : currentPage === "changePassword" ?
                        <ChangePassword />
                        : currentPage === "smsVerify" ?
                            <VerifyAccount />
                            : currentPage === "contact" ?
                                <Contact />
                                : null
            }
        </div>
    )
}
