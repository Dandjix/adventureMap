import express from 'express';
import passport from '../config/passport';
import jwt from 'jsonwebtoken';
import { Request,Response } from 'express';
import jwtSign from '../plugins/jwtSign';
import { IUser } from '../models/User';
const router = express.Router();

// Redirect to Google login
router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] ,session:false}));

// Google callback route
router.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/login' ,session:false}),
  (req :Request, res:Response):void => {
    if (!req.user) {
      res.status(401).json({ message: 'Google authentication failed' });
      return
    }

    // Generate JWT token
    const token = jwtSign(req.user as IUser)

    // Send token in response
    res.setHeader('Authorization', `Bearer ${token}`);
    res.status(200).json(`Google login successful ${token}`);
  }
);

export default router;
