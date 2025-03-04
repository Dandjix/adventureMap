import { Request,RequestHandler,Response } from 'express';
import { IUser, role } from '../../models/User';

export const checkRole = (allowedRoles : role[]): RequestHandler =>
(req: Request, res: Response, next: Function): void => {
    try {
        if(!req.user){
            res.status(400).send('Not logged in');
            return
        }
        const user = req.user as IUser

        if(allowedRoles.includes(user.role))
        {
            next();
        }
        res.status(400).send({message:`This route requires a role in ${allowedRoles}.`})
    } catch (err) {
        res.status(400).send({message:'Invalid token'});
    }
};

