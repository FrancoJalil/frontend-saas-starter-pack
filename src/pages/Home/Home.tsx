import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from "../../hooks/useFetch"
import { urlBase } from "@/utils/variables"
import { AuthContextType } from "@/models/context"

export const Home = () => {

    let { user, logoutUser } = useContext(AuthContext) as AuthContextType

    console.log(user)

    const { data, isLoading, errors } = useFetch(urlBase+'/user/protected-view/', 'GET', true)

    return (
        <>

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
                        <p>Your tokens: {data?.tokens}!</p>
                    </>

            }

            {
                errors ? <p>Hubo un error al pedir la información.</p> : null
            }

        </>

    )
}



