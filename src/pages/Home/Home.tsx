import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from "react-router-dom"

type Props = {}

export const Home = () => {

    let { user, logoutUser } = useContext(AuthContext)

    return (
        <>

            <div>Home</div>

            {user ? (
                <p onClick={logoutUser}>Logout</p>
            ) : (
                <Link to="/login">Ir a Login</Link>
            )
            }


            {user &&
                <p>Hello {user.email}</p>
            }
        </>

    )
}

