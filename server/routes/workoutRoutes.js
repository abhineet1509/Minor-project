import express from 'express';
import { generateWorkoutPlan, getCurrentWorkoutPlan, logWorkout, getUserLogs } from '../controllers/workoutController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate', protect, generateWorkoutPlan);
router.get('/current', protect, getCurrentWorkoutPlan);
router.post('/log', protect, logWorkout);
router.get('/logs', protect, getUserLogs);

export default router;
