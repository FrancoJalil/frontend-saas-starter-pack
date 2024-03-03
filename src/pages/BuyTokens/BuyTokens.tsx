import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"

type Props = {}

export const BuyTokens = (props: Props) => {

    const defaultValue = 50
    const [sliderValue, setSliderValue] = useState<any>(defaultValue)

    return (
        <div className="flex flex-col justify-center items-center h-80 gap-6">
            Tokens to buy: {sliderValue}
            <Slider onValueChange={(e) => setSliderValue(e)} defaultValue={[defaultValue]} max={100} step={1} className="w-48" />

            <Button>Buy :D</Button>
        </div>
    )
}
