import { AuthContext } from '../../contexts/AuthContext'
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { urlBase } from "@/utils/variables"
import { AuthContextType } from "@/models/context"
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

type data = {
    email: string
    tokens:number
    
}

export const Home = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<data>()
    const navigate = useNavigate()

    let { user, logoutUser } = useContext(AuthContext) as AuthContextType

    const getData = async () => {
        setIsLoading(true)
        const response = await axios.get(urlBase + '/user/protected-view/')
        setData(response.data)
        setIsLoading(false)

    }

    useEffect(() => {
        getData()

    }, [])

    return (
        <div className="flex flex-col p-10 w-fit">

            <div>Home</div>

            {user ? (
                <p onClick={() => logoutUser()}>Logout</p>
            ) : (
                <Link to="/login">Ir a Login</Link>
            )
            }

            {
                isLoading ?
                    <h4>Cargando...</h4>
                    :
                    <>
                        <p>Hello {data?.email}!</p>
                    </>

            }
            <p>Hola</p>
            <Separator className="my-4" />

            {
                <p>Your tokens: {data?.tokens}</p>

            }
            <Button type="button" onClick={() => navigate('/buy-tokens')}>Buy Tokens</Button>
            {/*
                errors ? <p>Hubo un error al pedir la información.</p> : null
        */}

        </div>

    )
}



