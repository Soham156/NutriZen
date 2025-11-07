import express from 'express';
import { getDashboardData, logMood, logWater, logMeal, deleteMeal } from '../controllers/dashboardController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All dashboard routes require authentication
router.use(authenticate);

// GET /api/dashboard - Get dashboard overview data
router.get('/', getDashboardData);

// POST /api/dashboard/mood - Log mood
router.post('/mood', logMood);

// POST /api/dashboard/water - Log water intake
router.post('/water', logWater);

// POST /api/dashboard/meal - Log a meal
router.post('/meal', logMeal);

// DELETE /api/dashboard/meal/:mealId - Delete a meal
router.delete('/meal/:mealId', deleteMeal);

export default router;
