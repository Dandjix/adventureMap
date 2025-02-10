import { Avatar } from "@mui/material";
import IUser from "../models/User";
import NotFoundPage from "./NotFoundPage";

const AccountPage = ({user}:{user?: IUser}) => {

    if (user==undefined){
        return(
            <NotFoundPage/>
        )
    }



    return ( 
    <div>
        <Avatar>{user.username[0]}</Avatar>
    </div> );
}
 
export default AccountPage;