import express from 'express';
import multer from 'multer';
import { analyzeFoodImage, getSimilarRecipes } from '../controllers/imageRecognitionController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Configure multer for memory storage (we'll convert to base64)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (_req, file, cb) => {
    // Only allow image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// POST /api/image-recognition/analyze - Analyze uploaded food image
router.post('/analyze', authenticate, upload.single('image'), analyzeFoodImage);

// POST /api/image-recognition/similar-recipes - Get similar recipes based on ingredients
router.post('/similar-recipes', authenticate, getSimilarRecipes);

export default router;
