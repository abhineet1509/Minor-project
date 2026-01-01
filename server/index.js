import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173',
             "https://minor-project-1-gl4t.onrender.com"
            ],
    // Setup for Vite default port
    credentials: true
}));
app.use(cookieParser());

// Database Connection
connectDB();

import authRoutes from './routes/authRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// ... (imports)

// Routes
import dietRoutes from './routes/dietRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import adminAuthRoutes from './routes/adminAuthRoutes.js';
import userRoutes from './routes/userRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';
import foodRoutes from './routes/foodRoutes.js';

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/diet', dietRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminAuthRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/food', foodRoutes);

app.get('/', (req, res) => {
    res.send('Smart Nutrition API is running...');
});

// Error Middleware (must be last)
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
