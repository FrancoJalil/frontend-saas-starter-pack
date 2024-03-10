"use client"
import { Slider } from "@/components/ui/slider"
import { useEffect, useState } from "react"
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { urlBase } from "@/utils/variables"
import axios from "axios"
import { OnApproveData } from "@paypal/paypal-js/types/components/buttons";
import { useNavigate } from "react-router-dom"
import { useThemeSwitcher } from "@/components/useThemeSwitcher"

export const BuyTokens = () => {

    useThemeSwitcher("light");
    const navigate = useNavigate()
    const [paypalButtonsKey, setPaypalButtonsKey] = useState<number>(0);
    const [isSliderChange, setIsSliderChange] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const defaultValue = 50
    const [sliderValue, setSliderValue] = useState<number>(defaultValue)

    const paypalOptions = {
        clientId: "AU5Q1frZ04OBqEeE55sMjTbKMOxj0aaHKtMtsCXVlrtjEevJ5B-1uPvfG1RHJxn7z6llGCbqQniv4r4i",
    }



    async function createOrder() {

        try {
            const response = await axios.post(urlBase + "/paypal/create-custom-order/", {
                cart: [
                    {
                        id: "PROD-99T8164a53R899701X",
                        quantity: "1",
                        value: sliderValue
                    },
                ],
            });
            return response.data.id;

        } catch (error: any) {
            console.error('Request error:', error);
        }
    }

    async function onApprove(data: OnApproveData) {

        try {
            const response = await axios.post(urlBase + "/paypal/on-success/", {
                orderID: data.orderID,
            });


            if (response.data.status === 'COMPLETED') {
                //const tokensBuyed = response.data.purchase_units[0].payments.captures[0].amount.value
                navigate('/')
            }

        } catch (error: any) {
            console.error('Request error:', error)
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

