import express from 'express';
import { recognizeFood } from '../controllers/foodController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/recognize', protect, recognizeFood);

export default router;
