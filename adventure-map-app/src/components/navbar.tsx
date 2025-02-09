import IUser from "../models/User";

const Navbar = ({user}:{user?: IUser}) => {
    return ( 
    <div>
        {user ? (
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => console.log("Logging out...")}>
                Log Out
            </button>
        ) : (
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => console.log("Logging in...")}>
                Log In
            </button>
        )}
    </div> 
    );
}
 
export default Navbar;