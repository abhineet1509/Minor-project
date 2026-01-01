import express from 'express';
import { generateDietPlan, getDietPlan, getMealDetails } from '../controllers/dietController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate', protect, generateDietPlan);
router.get('/current', protect, getDietPlan);
router.get('/meal/:name', protect, getMealDetails);

export default router;
