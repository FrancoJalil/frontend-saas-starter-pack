import { Link } from "react-router-dom"


export const Navbar = () => {

    return (
        <nav className="flex justify-between gap-2 px-10 py-4 border-b">

            <Link to="/" className="cursor-pointer font-semibold">Home</Link>

            <div className="flex gap-10 justify-end items-end">
                <Link to="/settings" className="cursor-pointer font-semibold">Settings</Link>
            </div>
        </nav>
    )
}