import { useState } from "react";
import IUser from "../models/User";
import LoginPopup from "./account/loginPopup";

const Navbar = ({user,setToken}:{user?: IUser,setToken:Function}) => {
    const [loginPopupOpen,setLoginPopupOpen] = useState(false)

    function onLoginSuccess()
    {
        const token = localStorage.getItem("token")!
        setToken(token)
    }

    return ( 
    <div>
        <LoginPopup isOpen={loginPopupOpen} onClose={()=>setLoginPopupOpen(false)} onLoginSuccess={onLoginSuccess}></LoginPopup>
        {user ? (
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => console.log("Logging out...")}>
                Log Out
            </button>
        ) : (
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={
                () => {
                    console.log("Logging in...")
                    setLoginPopupOpen(true)
                }
            }>
                Log In
            </button>
        )}
    </div> 
    );
}
 
export default Navbar;