import { useEffect, useState } from 'react';
import { urlBase } from "@/utils/variables"
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { Skeleton } from '@/components/ui/skeleton';

type userData = {
    email: string
    tokens: number
}

export const Home = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [userData, setUserData] = useState<userData>()
    const navigate = useNavigate()


    const getData = async () => {
        setIsLoading(true)
        const response = await axios.get(urlBase + '/user/protected-view/')
        setUserData(response.data)
        setIsLoading(false)

    }

    useEffect(() => {

        const fetchData = async () => {
            await getData()
        }
        fetchData()

    }, [])

    return (
        <div className="flex flex-col p-10 gap-2 w-fit items-start">
            <h2 className="text-2xl font-semibold tracking-tight">Welcome to EXAMPLE INC!</h2>
            
            <div className='flex gap-2 items-center'>
                Hello {isLoading ? <Skeleton className="h-4 w-[200px]" /> : userData?.email}
            </div>
            <Separator className="my-4" />
            <div className='flex gap-2 items-center'>
                Your tokens: {isLoading ? <Skeleton className="h-4 w-[50px]" /> : userData?.tokens}
            </div>
            <Button className='' type="button" onClick={() => navigate('/buy-tokens')}>
                Buy Tokens
            </Button>
        </div>

    )
}



