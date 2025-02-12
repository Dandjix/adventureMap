import express from 'express';
import { authRoutes } from './authRoutes';
import { accountRoutes } from './accountRoutes';
import googleAuthRoutes from './googleAuthRoutes';
import { setupRoutes } from './setupRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/auth/google', googleAuthRoutes);
router.use('/account', accountRoutes);
if(process.env.SETUP_ROUTES == "enabled")
{
    console.warn("SETUP_ROUTES is enabled. Absolutely turn it off in production.")
    router.use('/setup',setupRoutes)
}
export default router;