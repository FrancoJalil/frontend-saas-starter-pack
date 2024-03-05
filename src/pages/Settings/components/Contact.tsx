import { Separator } from "@/components/ui/separator"

type Props = {}

export const Contact = (props: Props) => {
    return (
        <div className="flex flex-col gap-2 items-start">
            <h1>Contact Us</h1>
            <Separator className="my-4" />
        </div>
    )
}

