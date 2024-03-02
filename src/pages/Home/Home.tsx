import { AuthContext } from '../../contexts/AuthContext'
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from "react-router-dom"

type Props = {}

type ResponseType = {
    email: any
    tokens: any
}

export const Home = () => {

    let { user, logoutUser, authTokens } = useContext(AuthContext)

    const [info, setInfo] = useState<ResponseType>()

    useEffect(() => {
        getInfo()
        console.log(info)
    }, [])

    const getInfo = async () => {
        try {
            let response = await fetch('http://localhost:8000/user/protected-view/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                }
            })

            const data = await response.json()
            console.log(data)

            if (response.status === 200) {
                setInfo(data)
                console.log(info)

            } else if (response.status === 401) {
                logoutUser()
            } else {
                throw new Error('Invalid response');
            }
        } catch (err) {
            console.error(err)
        } finally {
        }
    }

    return (
        <>

            <div>Home</div>

            {user ? (
                <p onClick={logoutUser}>Logout</p>
            ) : (
                <Link to="/login">Ir a Login</Link>
            )
            }


            <>
                <p>Hello {info?.email}!</p>
                <p>Your tokens: {info?.tokens}!</p>
            </>


        </>

    )
}

