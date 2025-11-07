import { Router } from 'express';
import { analyzeNutrition } from '../controllers/nutritionController.js';

const router = Router();

router.post('/analyze', analyzeNutrition);

export default router;
