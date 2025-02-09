import { useState } from "react";
import IUser from "../models/User";
import LoginPopup from "./account/loginPopup";
import { Button } from "@mui/material";

const Navbar = ({user,setToken}:{user?: IUser,setToken:Function}) => {
    const [loginPopupOpen,setLoginPopupOpen] = useState(false)

    function onLoginSuccess()
    {
        const token = localStorage.getItem("token")!
        setToken(token)
    }

    function logout()
    {
        console.log("setting token to null")
        localStorage.removeItem("token")
        setToken(null)
    }
    return ( 
    <div>
        <LoginPopup isOpen={loginPopupOpen} onClose={()=>setLoginPopupOpen(false)} onLoginSuccess={onLoginSuccess}></LoginPopup>
        {user ? (
            <div>
                <Button className="bg-red-500 text-white px-4 py-2 rounded" onClick={logout}>
                    Log Out
                </Button>
                <h1>
                    {user.username}
                </h1>
            </div>
        ) : (
            <Button className="bg-red-500 text-white px-4 py-2 rounded" onClick={
                () => {
                    setLoginPopupOpen(true)
                }
            }>
                Log In
            </Button>
        )}
    </div> 
    );
}
 
export default Navbar;