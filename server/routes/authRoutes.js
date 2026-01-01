import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.post('/register', asyncHandler(registerUser));
router.post('/login', asyncHandler(loginUser));
router.post('/logout', logoutUser);

export default router;
