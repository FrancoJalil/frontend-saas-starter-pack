import { Link } from 'react-router-dom';
import { Navigate } from "react-router-dom"

type Props = {}

export const Home = (props: Props) => {
    return (
        <>

            <div>Home</div>
            <Link to="/login">Ir a Login</Link>
            
        </>

    )
}

