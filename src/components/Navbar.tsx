import { AuthContext } from "@/contexts/AuthContext"
import { AuthContextType } from "@/models/context"
import { Link } from "react-router-dom"
import { useContext } from "react"


export const Navbar = () => {
    let { logoutUser } = useContext(AuthContext) as AuthContextType

    return (
        <nav className="flex justify-between gap-2 px-10 py-4 border-b">

            <Link to="/" className="cursor-pointer">Home</Link>

            <div className="flex gap-10 justify-end items-end">
                <Link to="/settings" className="cursor-pointer">Settings</Link>
                <Link to="/login" onClick={() => logoutUser()} className="cursor-pointer">Logout</Link>
            </div>
        </nav>
    )
}