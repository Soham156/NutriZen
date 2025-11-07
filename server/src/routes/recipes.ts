import { Router } from 'express';
import { 
  getRecipes, 
  getRecipeById, 
  generateRecipe, 
  toggleLike,
  getUserRecipes 
} from '../controllers/recipesController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/', getRecipes);
router.get('/:id', getRecipeById);

// Protected routes
router.post('/generate', authenticate, generateRecipe);
router.post('/:id/like', authenticate, toggleLike);
router.get('/user/my-recipes', authenticate, getUserRecipes);

export default router;
