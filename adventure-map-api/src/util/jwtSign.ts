import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

export default function jwtSign(user: IUser):string{
    return jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET || 'your_secret_key',
        { expiresIn: '1h' }
    );
}
