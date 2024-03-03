import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from "../../hooks/useFetch"
import { urlBase } from "@/utils/variables"
import { AuthContextType } from "@/models/context"
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

export const Home = () => {

    const navigate = useNavigate()

    let { user, logoutUser } = useContext(AuthContext) as AuthContextType

    const { data, isLoading, errors } = useFetch(urlBase + '/user/protected-view/', 'GET', true)

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
            {
                errors ? <p>Hubo un error al pedir la información.</p> : null
            }

        </div>

    )
}



