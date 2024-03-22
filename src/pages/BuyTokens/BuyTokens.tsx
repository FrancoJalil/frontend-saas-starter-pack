"use client"
import { Slider } from "@/components/ui/slider"
import { useEffect, useState } from "react"
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { urlBase } from "@/utils/variables"
import axios from "axios"
import { OnApproveData } from "@paypal/paypal-js/types/components/buttons";
import { useNavigate } from "react-router-dom"
import { useThemeSwitcher } from "@/components/useThemeSwitcher"

const VITE_PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID
const VITE_PAYPAL_PRODUCT_ID = import.meta.env.VITE_PAYPAL_PRODUCT_ID

export const BuyTokens = () => {



    useThemeSwitcher("light");
    const navigate = useNavigate()
    const [paypalButtonsKey, setPaypalButtonsKey] = useState<number>(0);
    const [isSliderChange, setIsSliderChange] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const defaultValue = 50
    const [sliderValue, setSliderValue] = useState<number>(defaultValue)

    const paypalOptions = {
        clientId: VITE_PAYPAL_CLIENT_ID,
    }



    async function createOrder() {


        const response = await axios.post(urlBase + "/paypal/orders/", {
            cart: [
                {
                    id: VITE_PAYPAL_PRODUCT_ID,
                    quantity: "1",
                    value: sliderValue
                },
            ],
        });
        return response.data.id;


    }

    async function onApprove(data: OnApproveData) {


        await axios.post(urlBase + "/paypal/orders/capture/", {
            orderID: data.orderID,
        });

        navigate('/')



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
        const loadData = async () => {
            // Simulación de carga asíncrona
            await new Promise(resolve => setTimeout(resolve, 1000));
            setIsLoading(false);
        };

        loadData();
    }, []);

    return (

        <div className="flex flex-col justify-center items-center gap-6 p-10 bg-dark">



            <PayPalScriptProvider options={paypalOptions} >
                Tokens to buy: {sliderValue}
                <Slider onPointerUp={() => handleSliderChange()} onPointerDown={() => handleSliderChange()} onValueChange={(e) => handleSliderValueChange(Number(e))} defaultValue={[sliderValue]} min={1} max={100} step={1} className="w-48" />

                {
                    !isLoading ?
                        <div style={{ opacity: isSliderChange ? '0.5' : '1' }}>
                            <PayPalButtons
                                disabled={isSliderChange}
                                key={paypalButtonsKey}
                                className="w-96"
                                createOrder={createOrder}
                                onApprove={onApprove}
                            />
                        </div>
                        : <div className="custom-loader"></div>
                }
            </PayPalScriptProvider>


        </div>
    )
}

