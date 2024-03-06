import { Button } from "@/components/ui/button"
import { useState } from "react";
import { GeneralSettings } from "./components/GeneralSettings"
import { ChangePassword } from "./components/ChangePassword";
import { VerifyAccount } from "./components/VerifyAccount";
import { Contact } from "./components/Contact";
import { MyPurchases } from "./components/MyPurchases";

type SettingsPages = {
    general: "general"
    changePassword: "changePassword"
    smsVerify: "smsVerify"
    contact: "contact"
    myPurchases: "myPurchases"
}

export const Settings = () => {


    const [currentPage, setCurrentPage] = useState<keyof SettingsPages>("general")

    return (
        <div className="flex flex-col p-10 w-fit gap-10 sm:flex-row">


            <nav className="flex flex-col lg:flex-col lg:space-x-0 lg:space-y-1">
                <Button
                    onClick={() => setCurrentPage("general")}
                    variant={"ghost"}
                    className={`flex justify-start gap-2 svg-animate-shake ${currentPage === "general" ? 'bg-muted hover:bg-muted' : 'hover:bg-transparent hover:underline'} `}>

                    <svg width="22px" height="22px" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path clipRule="evenodd" d="M14 20C17.3137 20 20 17.3137 20 14C20 10.6863 17.3137 8 14 8C10.6863 8 8 10.6863 8 14C8 17.3137 10.6863 20 14 20ZM18 14C18 16.2091 16.2091 18 14 18C11.7909 18 10 16.2091 10 14C10 11.7909 11.7909 10 14 10C16.2091 10 18 11.7909 18 14Z" fill="#000000" fillRule="evenodd"></path><path clipRule="evenodd" d="M0 12.9996V14.9996C0 16.5478 1.17261 17.822 2.67809 17.9826C2.80588 18.3459 2.95062 18.7011 3.11133 19.0473C2.12484 20.226 2.18536 21.984 3.29291 23.0916L4.70712 24.5058C5.78946 25.5881 7.49305 25.6706 8.67003 24.7531C9.1044 24.9688 9.55383 25.159 10.0163 25.3218C10.1769 26.8273 11.4511 28 12.9993 28H14.9993C16.5471 28 17.8211 26.8279 17.9821 25.3228C18.4024 25.175 18.8119 25.0046 19.2091 24.8129C20.3823 25.6664 22.0344 25.564 23.0926 24.5058L24.5068 23.0916C25.565 22.0334 25.6674 20.3813 24.814 19.2081C25.0054 18.8113 25.1757 18.4023 25.3234 17.9824C26.8282 17.8211 28 16.5472 28 14.9996V12.9996C28 11.452 26.8282 10.1782 25.3234 10.0169C25.1605 9.55375 24.9701 9.10374 24.7541 8.66883C25.6708 7.49189 25.5882 5.78888 24.5061 4.70681L23.0919 3.29259C21.9846 2.18531 20.2271 2.12455 19.0485 3.1103C18.7017 2.94935 18.3459 2.80441 17.982 2.67647C17.8207 1.17177 16.5468 0 14.9993 0H12.9993C11.4514 0 10.1773 1.17231 10.0164 2.6775C9.60779 2.8213 9.20936 2.98653 8.82251 3.17181C7.64444 2.12251 5.83764 2.16276 4.70782 3.29259L3.2936 4.7068C2.16377 5.83664 2.12352 7.64345 3.17285 8.82152C2.98737 9.20877 2.82199 9.60763 2.67809 10.0167C1.17261 10.1773 0 11.4515 0 12.9996ZM15.9993 3C15.9993 2.44772 15.5516 2 14.9993 2H12.9993C12.447 2 11.9993 2.44772 11.9993 3V3.38269C11.9993 3.85823 11.6626 4.26276 11.2059 4.39542C10.4966 4.60148 9.81974 4.88401 9.18495 5.23348C8.76836 5.46282 8.24425 5.41481 7.90799 5.07855L7.53624 4.70681C7.14572 4.31628 6.51256 4.31628 6.12203 4.7068L4.70782 6.12102C4.31729 6.51154 4.31729 7.14471 4.70782 7.53523L5.07958 7.90699C5.41584 8.24325 5.46385 8.76736 5.23451 9.18395C4.88485 9.8191 4.6022 10.4963 4.39611 11.2061C4.2635 11.6629 3.85894 11.9996 3.38334 11.9996H3C2.44772 11.9996 2 12.4474 2 12.9996V14.9996C2 15.5519 2.44772 15.9996 3 15.9996H3.38334C3.85894 15.9996 4.26349 16.3364 4.39611 16.7931C4.58954 17.4594 4.85042 18.0969 5.17085 18.6979C5.39202 19.1127 5.34095 19.6293 5.00855 19.9617L4.70712 20.2632C4.3166 20.6537 4.3166 21.2868 4.70712 21.6774L6.12134 23.0916C6.51186 23.4821 7.14503 23.4821 7.53555 23.0916L7.77887 22.8483C8.11899 22.5081 8.65055 22.4633 9.06879 22.7008C9.73695 23.0804 10.4531 23.3852 11.2059 23.6039C11.6626 23.7365 11.9993 24.1411 11.9993 24.6166V25C11.9993 25.5523 12.447 26 12.9993 26H14.9993C15.5516 26 15.9993 25.5523 15.9993 25V24.6174C15.9993 24.1418 16.3361 23.7372 16.7929 23.6046C17.5032 23.3985 18.1809 23.1157 18.8164 22.7658C19.233 22.5365 19.7571 22.5845 20.0934 22.9208L20.2642 23.0916C20.6547 23.4821 21.2879 23.4821 21.6784 23.0916L23.0926 21.6774C23.4831 21.2868 23.4831 20.6537 23.0926 20.2632L22.9218 20.0924C22.5855 19.7561 22.5375 19.232 22.7669 18.8154C23.1166 18.1802 23.3992 17.503 23.6053 16.7931C23.7379 16.3364 24.1425 15.9996 24.6181 15.9996H25C25.5523 15.9996 26 15.5519 26 14.9996V12.9996C26 12.4474 25.5523 11.9996 25 11.9996H24.6181C24.1425 11.9996 23.7379 11.6629 23.6053 11.2061C23.3866 10.4529 23.0817 9.73627 22.7019 9.06773C22.4643 8.64949 22.5092 8.11793 22.8493 7.77781L23.0919 7.53523C23.4824 7.14471 23.4824 6.51154 23.0919 6.12102L21.6777 4.7068C21.2872 4.31628 20.654 4.31628 20.2635 4.7068L19.9628 5.00748C19.6304 5.33988 19.1137 5.39096 18.6989 5.16979C18.0976 4.84915 17.4596 4.58815 16.7929 4.39467C16.3361 4.2621 15.9993 3.85752 15.9993 3.38187V3Z" fill="#000000" fillRule="evenodd"></path></g></svg>
                    General
                </Button>
                <Button
                    onClick={() => setCurrentPage("changePassword")}
                    variant={"ghost"}
                    className={`flex justify-start gap-2 svg-animate-shake ${currentPage === "changePassword" ? 'bg-muted hover:bg-muted' : 'hover:bg-transparent hover:underline'} `}>
                    <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.1819 10.7027H6.00008C5.44781 10.7027 5.0001 11.1485 5.00009 11.7008C5.00005 13.3483 5 16.6772 5.00011 18.9189C5.00023 21.4317 8.88618 22 12 22C15.1139 22 19 21.4317 19 18.9189C19 16.6773 19 13.3483 19 11.7008C19 11.1485 18.5523 10.7027 18 10.7027H15.8182M8.1819 10.7027C8.1819 10.7027 8.18193 8.13514 8.1819 6.59459C8.18186 4.74571 9.70887 3 12 3C14.2912 3 15.8182 4.74571 15.8182 6.59459C15.8182 8.13514 15.8182 10.7027 15.8182 10.7027M8.1819 10.7027H15.8182" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path fillRule="evenodd" clipRule="evenodd" d="M13 16.6181V18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18V16.6181C10.6931 16.3434 10.5 15.9442 10.5 15.5C10.5 14.6716 11.1716 14 12 14C12.8284 14 13.5 14.6716 13.5 15.5C13.5 15.9442 13.3069 16.3434 13 16.6181Z" fill="#000000"></path> </g></svg>
                    Password</Button>
                <Button
                    onClick={() => setCurrentPage("smsVerify")}
                    variant={"ghost"}
                    className={`flex justify-start gap-2 svg-animate-shake ${currentPage === "smsVerify" ? 'bg-muted hover:bg-muted' : 'hover:bg-transparent hover:underline'} `}>
                    <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M10.7905 15.17C10.5905 15.17 10.4005 15.09 10.2605 14.95L7.84055 12.53C7.55055 12.24 7.55055 11.76 7.84055 11.47C8.13055 11.18 8.61055 11.18 8.90055 11.47L10.7905 13.36L15.0905 9.06003C15.3805 8.77003 15.8605 8.77003 16.1505 9.06003C16.4405 9.35003 16.4405 9.83003 16.1505 10.12L11.3205 14.95C11.1805 15.09 10.9905 15.17 10.7905 15.17Z" fill="#000000"></path><path d="M12.0009 22.75C11.3709 22.75 10.7409 22.54 10.2509 22.12L8.67086 20.76C8.51086 20.62 8.11086 20.48 7.90086 20.48H6.18086C4.70086 20.48 3.50086 19.28 3.50086 17.8V16.09C3.50086 15.88 3.36086 15.49 3.22086 15.33L1.87086 13.74C1.05086 12.77 1.05086 11.24 1.87086 10.27L3.22086 8.68C3.36086 8.52 3.50086 8.13 3.50086 7.92V6.2C3.50086 4.72 4.70086 3.52 6.18086 3.52H7.91086C8.12086 3.52 8.52086 3.37 8.68086 3.24L10.2609 1.88C11.2409 1.04 12.7709 1.04 13.7509 1.88L15.3309 3.24C15.4909 3.38 15.8909 3.52 16.1009 3.52H17.8009C19.2809 3.52 20.4809 4.72 20.4809 6.2V7.9C20.4809 8.11 20.6309 8.51 20.7709 8.67L22.1309 10.25C22.9709 11.23 22.9709 12.76 22.1309 13.74L20.7709 15.32C20.6309 15.48 20.4809 15.88 20.4809 16.09V17.79C20.4809 19.27 19.2809 20.47 17.8009 20.47H16.1009C15.8909 20.47 15.4909 20.62 15.3309 20.75L13.7509 22.11C13.2609 22.54 12.6309 22.75 12.0009 22.75ZM6.18086 5.02C5.53086 5.02 5.00086 5.55 5.00086 6.2V7.91C5.00086 8.48 4.73086 9.21 4.36086 9.64L3.01086 11.23C2.66086 11.64 2.66086 12.35 3.01086 12.76L4.36086 14.35C4.73086 14.79 5.00086 15.51 5.00086 16.08V17.79C5.00086 18.44 5.53086 18.97 6.18086 18.97H7.91086C8.49086 18.97 9.22086 19.24 9.66086 19.62L11.2409 20.98C11.6509 21.33 12.3709 21.33 12.7809 20.98L14.3609 19.62C14.8009 19.25 15.5309 18.97 16.1109 18.97H17.8109C18.4609 18.97 18.9909 18.44 18.9909 17.79V16.09C18.9909 15.51 19.2609 14.78 19.6409 14.34L21.0009 12.76C21.3509 12.35 21.3509 11.63 21.0009 11.22L19.6409 9.64C19.2609 9.2 18.9909 8.47 18.9909 7.89V6.2C18.9909 5.55 18.4609 5.02 17.8109 5.02H16.1109C15.5309 5.02 14.8009 4.75 14.3609 4.37L12.7809 3.01C12.3709 2.66 11.6509 2.66 11.2409 3.01L9.66086 4.38C9.22086 4.75 8.48086 5.02 7.91086 5.02H6.18086Z" fill="#000000"></path></g></svg>
                    SMS Verify
                </Button>
                <Button
                    onClick={() => setCurrentPage("contact")}
                    variant={"ghost"}
                    className={`flex justify-start gap-2 svg-animate-shake ${currentPage === "contact" ? 'bg-muted hover:bg-muted' : 'hover:bg-transparent hover:underline'} `}>
                    <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 11H8.01M12 11H12.01M16 11H16.01M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    Contact</Button>
                <Button
                    onClick={() => setCurrentPage("myPurchases")}
                    variant={"ghost"}
                    className={`flex justify-start gap-2 svg-animate-shake ${currentPage === "myPurchases" ? 'bg-muted hover:bg-muted' : 'hover:bg-transparent hover:underline'} `}>
                    <svg width="22px" height="22px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="dolarIconTitle" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" color="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title id="dolarIconTitle">Dolar</title> <path d="M12 4L12 6M12 18L12 20M15.5 8C15.1666667 6.66666667 14 6 12 6 9 6 8.5 7.95652174 8.5 9 8.5 13.140327 15.5 10.9649412 15.5 15 15.5 16.0434783 15 18 12 18 10 18 8.83333333 17.3333333 8.5 16"></path> </g></svg>
                    Purchases
                </Button>
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
                                : currentPage === "myPurchases" ?
                                    <MyPurchases />
                                    : null
            }
        </div>
    )
}
