import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"


export const Contact = () => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("submit")
    }

    return (
        <div className="flex flex-col gap-2 sm:w-1/3 w-full">
            <h1>Contact Us</h1>
            <Separator className="my-4" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <Input type="text" placeholder="Subject" />
                <Textarea className="resize-none h-56" placeholder="Type your message here." />
                <Button>Send</Button>
            </form>
        </div>
    )
}

