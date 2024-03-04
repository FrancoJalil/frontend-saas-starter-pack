"use client"
import { Slider } from "@/components/ui/slider"
import { useContext, useEffect, useState } from "react"
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { urlBase } from "@/utils/variables"
import { AuthContext } from "@/contexts/AuthContext"
import { AuthContextType } from "@/models/context"
import { useThemeToggle } from "@/utils/useThemeToggle"
import axios  from "axios"
import { OnApproveData } from "@paypal/paypal-js/types/components/buttons";

type Props = {}


export const BuyTokens = (props: Props) => {

    const { theme, toggleTheme } = useThemeToggle("light");
    let { authTokens } = useContext(AuthContext) as AuthContextType
    const [paypalButtonsKey, setPaypalButtonsKey] = useState<number>(0); // Clave única para los botones de PayPal
    const [isSliderChange, setIsSliderChange] = useState<boolean>(false); // Clave única para los botones de PayPal

    const paypalOptions = {
        clientId: "AU5Q1frZ04OBqEeE55sMjTbKMOxj0aaHKtMtsCXVlrtjEevJ5B-1uPvfG1RHJxn7z6llGCbqQniv4r4i",
    }
    const defaultValue = 50
    const [sliderValue, setSliderValue] = useState<number>(defaultValue)

    async function createOrder() {
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
            console.log(response)
            return response.data.id;
    
        } catch (error) {
            console.error('Se produjo un error al realizar la solicitud:', error);
        }
    }

    async function onApprove(data: OnApproveData) {
        return await fetch(urlBase + "/paypal/on-success/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + String(authTokens?.access)
            },
            body: JSON.stringify({
                orderID: data.orderID
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            }).catch((err) => {
                console.log(err)
            });

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
                        onError={() => console.log("pepe")}
                    />
                </div>

            </PayPalScriptProvider>
        </div>

    )
}

