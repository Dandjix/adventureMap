import jwt from 'jsonwebtoken';
import { Request,Response } from 'express';

export const authenticateUser = (req: Request, res: Response, next: Function): void => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from header

    if (!token) {
        res.status(401).send('Access denied. No token provided.');
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
        (req as any).user = decoded; // Attach user data to request
        next(); // Proceed to the next middleware
    } catch (err) {
        res.status(400).send('Invalid token');
    }
};

