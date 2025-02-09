import express from 'express';
import { authRoutes } from './authRoutes';
import { accountRoutes } from './accountRoutes';
import googleAuthRoutes from './googleAuthRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/auth/google', googleAuthRoutes);
router.use('/account', accountRoutes);

export default router;