import { Separator } from "@/components/ui/separator"

type Props = {}

export const MyPurchases = (props: Props) => {
  return (
    <div className="flex flex-col gap-2 items-start">
            <h1>My Purchases</h1>
            <Separator className="my-4" />
        </div>
  )
}