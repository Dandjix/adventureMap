
import User from '../models/User';
import bcrypt from 'bcryptjs';
import express, { Request, Response } from 'express';

import jwt from 'jsonwebtoken'
import { authenticateUser } from '../middlewares/auth/authenticateUser';
import { checkRole } from '../middlewares/auth/checkRole';


export const mapRoutes = express.Router();

mapRoutes.get('/static'), async (req: Request, res: Response) :Promise<void> => {
    try {
        const userId = (req as any).user.id;
        const user = await User.findById(userId).select('-password')

        if (!user) {
            res.status(404).send('User not found')
            return 
        }

        res.json(user);
    } catch (err) {
        res.status(500).send('Error fetching user profile');
    }
})

mapRoutes.post('/static', authenticateUser,checkRole(["GameMaker"]), async (req: Request, res: Response) :Promise<void> => {
    try {
        const userId = (req as any).user.id;
        const user = await User.findById(userId).select('-password')

        if (!user) {
            res.status(404).send('User not found')
            return 
        }

        res.json(user);
    } catch (err) {
        res.status(500).send('Error fetching user profile');
    }
})

