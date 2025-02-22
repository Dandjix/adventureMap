
import User from '../models/User';
import bcrypt from 'bcryptjs';
import express, { Request, Response } from 'express';

import jwt from 'jsonwebtoken'
import jwtSign from '../util/jwtSign';

export const authRoutes = express.Router();

authRoutes.post('/login', async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    console.log(username,password);
    
    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user || user.account_type!="Password") {
            res.status(400).send({message:'Invalid username or password'});
            return 
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(400).send({message:'Invalid username or password'});
            return 
        }

        const token = jwtSign(user)

        res.setHeader("Authorization",`Bearer ${token}`)

        res.send({message:`Logged in successfully.`,token});
    } catch (err) {
        res.status(500).send({message:'Error logging in'});
    }
});

authRoutes.post('/register',async (req:Request,res:Response):Promise<void>=>{
    // console.log("body : ",JSON.stringify(req.body));
    
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
             res.status(400).send('Username or email already exists');
             return
        }
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(500).send('Error registering user');
    }
})

// authRoutes.get('/reset',async (req:Request,res:Response)=>{
//     await User.deleteMany()

//     const users = await User.find()

//     res.status(201).send(`users : ${JSON.stringify(users)}`)
// })