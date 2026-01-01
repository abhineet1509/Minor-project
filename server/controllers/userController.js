import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        age: req.user.age,
        gender: req.user.gender,
        height: req.user.height,
        weight: req.user.weight,
        goal: req.user.goal,
        activityLevel: req.user.activityLevel,
        dietaryPreference: req.user.dietaryPreference,
        allergies: req.user.allergies,
        allergies: req.user.allergies,
        healthConditions: req.user.healthConditions,
        calorieGoal: req.user.calorieGoal,
        proteinGoal: req.user.proteinGoal,
        hydrationGoal: req.user.hydrationGoal,
        dailyCalories: req.user.dailyCalories,
        dailyProtein: req.user.dailyProtein,
        dailyHydration: req.user.dailyHydration,
        weightHistory: req.user.weightHistory,
    };

    res.status(200).json(user);
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        // Update health stats
        if (req.body.age) user.age = req.body.age;
        if (req.body.gender) user.gender = req.body.gender;
        if (req.body.height) user.height = req.body.height;
        // Weight handled separately for history

        if (req.body.goal) user.goal = req.body.goal;
        if (req.body.activityLevel) user.activityLevel = req.body.activityLevel;
        if (req.body.dietaryPreference) user.dietaryPreference = req.body.dietaryPreference;
        if (req.body.allergies) user.allergies = req.body.allergies;
        if (req.body.healthConditions) user.healthConditions = req.body.healthConditions;

        if (req.body.calorieGoal) user.calorieGoal = req.body.calorieGoal;
        if (req.body.proteinGoal) user.proteinGoal = req.body.proteinGoal;
        if (req.body.hydrationGoal) user.hydrationGoal = req.body.hydrationGoal;

        if (req.body.dailyCalories !== undefined) user.dailyCalories = req.body.dailyCalories;
        if (req.body.dailyProtein !== undefined) user.dailyProtein = req.body.dailyProtein;
        if (req.body.dailyHydration !== undefined) user.dailyHydration = req.body.dailyHydration;

        // Weight History Logic
        if (req.body.weight && req.body.weight !== user.weight) {
            user.weightHistory.push({ weight: req.body.weight });
            user.weight = req.body.weight;
        }

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            age: updatedUser.age,
            gender: updatedUser.gender,
            height: updatedUser.height,
            weight: updatedUser.weight,
            goal: updatedUser.goal,
            activityLevel: updatedUser.activityLevel,
            dietaryPreference: updatedUser.dietaryPreference,
            allergies: updatedUser.allergies,
            healthConditions: updatedUser.healthConditions,
            calorieGoal: updatedUser.calorieGoal,
            proteinGoal: updatedUser.proteinGoal,
            hydrationGoal: updatedUser.hydrationGoal,
            dailyCalories: updatedUser.dailyCalories,
            dailyProtein: updatedUser.dailyProtein,
            dailyHydration: updatedUser.dailyHydration,
            weightHistory: updatedUser.weightHistory,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export { getUserProfile, updateUserProfile };
