import { Router } from 'express';
import { saveHealthProfile, getHealthProfile } from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/health-profile', authenticate, saveHealthProfile);
router.get('/health-profile', authenticate, getHealthProfile);

export default router;
