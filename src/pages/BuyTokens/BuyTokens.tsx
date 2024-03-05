"use client"
import { Slider } from "@/components/ui/slider"
import { useEffect, useState } from "react"
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { urlBase } from "@/utils/variables"
import { useThemeToggle } from "@/utils/useThemeToggle"
import axios from "axios"
import { OnApproveData } from "@paypal/paypal-js/types/components/buttons";
import { useNavigate } from "react-router-dom"

export const BuyTokens = () => {

    const navigate = useNavigate()

    const { theme, toggleTheme } = useThemeToggle("light");
    const [paypalButtonsKey, setPaypalButtonsKey] = useState<number>(0); 
    const [isSliderChange, setIsSliderChange] = useState<boolean>(false); 
    const [error, setError] = useState<string | null>(null); 

    const defaultValue = 50
    const [sliderValue, setSliderValue] = useState<number>(defaultValue)

    const paypalOptions = {
        clientId: "AU5Q1frZ04OBqEeE55sMjTbKMOxj0aaHKtMtsCXVlrtjEevJ5B-1uPvfG1RHJxn7z6llGCbqQniv4r4i",
    }

    

    async function createOrder() {
        setError(null)

        try {
            const response = await axios.post(urlBase + "/paypal/create-custom-order/", {
                cart: [
                    {
                        id: "PROD-99T816453R899701X",
                        quantity: "1",
                        value: sliderValue
                    },
                ],
            });
            return response.data.id;

        } catch (error) {
            console.error('Se produjo un error al realizar la solicitud:', error);
        }
    }

    async function onApprove(data: OnApproveData) {

        try {
            const response = await axios.post(urlBase + "/paypal/on-success/", {
                orderIDa: data.orderID,
            });
            
            console.log(response.data)

            if (response.data.status === 'COMPLETED') {
                const tokensBuyed = response.data.purchase_units[0].payments.captures[0].amount.value
                navigate('/')
            }

        } catch (error: any) {
            console.log(error.response.data.error)
            setError("Error: " + error.response.data.error)
            console.error('Se produjo un error al realizar la solicitud:', error)
        }

    }

    const handleSliderValueChange = (value: number) => {
        setSliderValue(value)
    }

    const handleSliderChange = (value: number = sliderValue) => {
        setSliderValue(value)
        setIsSliderChange(!isSliderChange)
        setPaypalButtonsKey(prevKey => prevKey + 1)
    }



    useEffect(() => {
        // Al montar el componente, almacenar el tema anterior
        toggleTheme();
        localStorage.setItem("vite-ui-theme", theme);
    }, []);

    return (

        <div className="flex flex-col justify-center items-center gap-6 p-10">
            <PayPalScriptProvider options={paypalOptions} >
                Tokens to buy: {sliderValue}
                <Slider onPointerUp={() => handleSliderChange()} onPointerDown={() => handleSliderChange()} onValueChange={(e) => handleSliderValueChange(Number(e))} defaultValue={[sliderValue]} max={100} step={1} className="w-48" />

                <div style={{ opacity: isSliderChange ? '0.5' : '1' }}>
                    <PayPalButtons
                        disabled={isSliderChange}
                        key={paypalButtonsKey}
                        className="w-96"
                        createOrder={createOrder}
                        onApprove={onApprove}
                    />
                </div>

            </PayPalScriptProvider>

            {error ? <p className="text-red-500">{error}</p> : null}
        </div>

    )
}

