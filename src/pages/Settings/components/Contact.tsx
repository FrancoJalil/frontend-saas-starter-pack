import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { urlBase } from "@/utils/variables"
import axios from "axios"


export const Contact = () => {

    const { toast } = useToast()


    const [isLoading, setIsLoading] = useState(false)
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        e.preventDefault()


        await axios.post(urlBase + "/users/contact/", {
            subject,
            msg: message
        })
        toast({ title: "Success", description: "Email received. We'll reply soon.", duration: 3000 })

        setSubject('');
        setMessage('');



        setIsLoading(false)

    }

    return (
        <div className="flex flex-col gap-2 sm:w-1/3 w-full">
            <h1>Contact Us</h1>
            <Separator className="my-4" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <Input value={subject} onChange={(e) => setSubject(e.target.value)} type="text" placeholder="Subject" minLength={5} maxLength={30} required />
                <Textarea value={message} onChange={(e) => setMessage(e.target.value)} className="resize-none h-56" placeholder="Type your message here." minLength={10} maxLength={500} required />
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                    Send</Button>
            </form>
        </div>
    )
}

