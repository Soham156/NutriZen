import { Router } from 'express';
import nutritionRouter from './nutrition.js';

const router = Router();

// API routes
router.use('/nutrition', nutritionRouter);

export default router;
