import WorkoutPlan from '../models/WorkoutPlan.js';
import User from '../models/User.js';
import { exerciseDatabase } from '../data/exercises.js';
import asyncHandler from 'express-async-handler';

// @desc    Generate a new AI workout plan
// @route   POST /api/workouts/generate
// @access  Private
const generateWorkoutPlan = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const { mode } = req.body; // Gym, Home, No-equipment

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const planExercises = [];

    // Simple Logic for AI Generation
    weekDays.forEach((day, index) => {
        // 3 days rest, 4 days workout as example
        if (index % 2 === 0) {
            const moves = exerciseDatabase
                .filter(ex => ex.type === mode || ex.type === 'No-equipment')
                .sort(() => 0.5 - Math.random())
                .slice(0, 5)
                .map(ex => ({
                    name: ex.name,
                    sets: 3,
                    reps: "10-12",
                    rest: "60s",
                    muscles: ex.muscles,
                    videoUrl: ex.videoUrl
                }));

            planExercises.push({ day, moves });
        } else {
            planExercises.push({ day, moves: [] }); // Rest Day
        }
    });

    const workoutPlan = await WorkoutPlan.create({
        user: user._id,
        goal: user.goal || 'General Health',
        mode: mode || 'Gym',
        exercises: planExercises
    });

    res.status(201).json(workoutPlan);
});

// @desc    Get current active workout plan
// @route   GET /api/workouts/current
// @access  Private
const getCurrentWorkoutPlan = asyncHandler(async (req, res) => {
    const plan = await WorkoutPlan.findOne({ user: req.user._id, active: true }).sort({ createdAt: -1 });
    if (plan) {
        res.json(plan);
    } else {
        res.status(404).json({ message: 'No active workout plan found' });
    }
});

import ExerciseLog from '../models/ExerciseLog.js';

// @desc    Log a completed workout
// @route   POST /api/workouts/log
// @access  Private
const logWorkout = asyncHandler(async (req, res) => {
    const { exercises, notes } = req.body;

    const totalVolume = exercises.reduce((acc, ex) => {
        return acc + ex.sets.reduce((setAcc, set) => setAcc + (Number(set.reps) * Number(set.weight)), 0);
    }, 0);

    const log = await ExerciseLog.create({
        user: req.user._id,
        exercises,
        notes,
        totalVolume
    });

    res.status(201).json(log);
});

// @desc    Get user workout logs
// @route   GET /api/workouts/logs
// @access  Private
const getUserLogs = asyncHandler(async (req, res) => {
    const logs = await ExerciseLog.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(logs);
});

export { generateWorkoutPlan, getCurrentWorkoutPlan, logWorkout, getUserLogs };
