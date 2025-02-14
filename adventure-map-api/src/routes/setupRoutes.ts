
import User from '../models/User';
import bcrypt from 'bcryptjs';
import express, { Request, Response } from 'express';

import jwt from 'jsonwebtoken'
import { authenticateUser } from '../middlewares/auth/authenticateUser';
import { Human } from '../models/Creatures/Species/Human';
import { WorldDate } from '../models/util/WorldDate';
import {World} from '../models/World/World';
import Backpack from '../models/Creatures/Items/Accessories/Backpack';
import { Torso } from '../models/Creatures/BodyParts/Torso';
import { Helmet } from '../models/Creatures/Items/Armor/Helmet';
import { Ring } from '../models/Creatures/Items/Accessories/Ring';
import { Abomination } from '../models/Creatures/Species/Abomination';

export const setupRoutes = express.Router();

setupRoutes.get('/users', async (req: Request, res: Response) :Promise<void> => {
    try {
        const users = await User.find().select('-password')

        res.status(200).json(users)
    } catch (err) {
        res.status(500).send(`Error fetching users : ${err}`);
    }
})

setupRoutes.delete('/users', async (req: Request, res: Response) :Promise<void> => {
    try {
        await User.deleteMany()

        res.status(200).json(true)
    } catch (err) {
        res.status(500).send(`Error deleting users : ${err}`);
    }
})


setupRoutes.patch('/makeAdmin', async (req: Request, res: Response) :Promise<void> => {
    try {
        const {userId,role} = req.body

        if(!['Player','Admin','GameMaker'].includes(role))
            throw new Error ("incorrect role")

        const user = await User.findById(userId)

        if (!user)
            throw new Error("user not found")

        user.role = role
        user.save()

        res.status(200).json(true)
    } catch (err) {
        res.status(500).send(`Error making user admin : ${err}`);
    }
})