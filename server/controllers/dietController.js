import User from '../models/User.js';
import DietPlan from '../models/DietPlan.js';
import { mealDatabase } from '../data/meals.js';
import asyncHandler from 'express-async-handler';

// Helper to calculate BMR and Needs
const calculateNutritionNeeds = (user) => {
    let bmr;
    // Mifflin-St Jeor Equation
    if (user.gender === 'male') {
        bmr = 10 * user.weight + 6.25 * user.height - 5 * user.age + 5;
    } else {
        bmr = 10 * user.weight + 6.25 * user.height - 5 * user.age - 161;
    }

    let activityMultiplier = 1.2; // Sedentary
    if (user.activityLevel === 'light') activityMultiplier = 1.375;
    if (user.activityLevel === 'moderate') activityMultiplier = 1.55;
    if (user.activityLevel === 'active') activityMultiplier = 1.725;

    let tdee = bmr * activityMultiplier;

    // Adjust for Goal
    let targetCalories = tdee;
    if (user.goal === 'loss') targetCalories -= 500;
    if (user.goal === 'gain') targetCalories += 500;

    // Macros (Simple 30/40/30 split or similar)
    // Protein 4 cal/g, Carbs 4 cal/g, Fat 9 cal/g
    const proteinRatio = 0.3;
    const carbsRatio = 0.4;
    const fatsRatio = 0.3;

    return {
        calories: Math.round(targetCalories),
        protein: Math.round((targetCalories * proteinRatio) / 4),
        carbs: Math.round((targetCalories * carbsRatio) / 4),
        fats: Math.round((targetCalories * fatsRatio) / 9)
    };
};

const getRandomMeal = (type, dietPref, calorieTarget) => {
    console.log(`Searching for meal: Type=${type}, Pref=${dietPref}`);

    // First try: Strict match
    const suitableMeals = mealDatabase.filter(m => {
        if (m.type !== type) return false;

        // Strict logic: 
        // if user is veg, NO non-veg
        // if user is vegan, MUST have vegan tag
        if (dietPref === 'veg' && m.dietaryTags.includes('non-veg')) return false;
        if (dietPref === 'vegan' && !m.dietaryTags.includes('vegan')) return false;

        return true;
    });

    if (suitableMeals.length > 0) {
        const randomIndex = Math.floor(Math.random() * suitableMeals.length);
        return suitableMeals[randomIndex];
    }

    // Fallback 1: Relaxed match (just match type)
    console.warn(`No specific match found for ${type} + ${dietPref}. Using generic fallback.`);
    const fallbackMeals = mealDatabase.filter(m => m.type === type);

    if (fallbackMeals.length > 0) {
        return fallbackMeals[Math.floor(Math.random() * fallbackMeals.length)];
    }

    // Fallback 2: Any meal (Last resort to prevent crash)
    console.error(`Critical: No meals found for type ${type} in database!`);
    return { name: "Standard Meal", type, calories: 400, protein: 20, carbs: 40, fats: 15, dietaryTags: ["balanced"] };
};

// @desc    Generate a new diet plan
// @route   POST /api/diet/generate
// @access  Private
const generateDietPlan = asyncHandler(async (req, res) => {
    console.log("FIRST MEAL IN DB:", mealDatabase[0]);
    const user = await User.findById(req.user._id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    const nutrition = calculateNutritionNeeds(user);

    // Generate Weekly Plan
    const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const weeklyPlan = {};

    weekDays.forEach(day => {
        weeklyPlan[day] = [
            { ...getRandomMeal('breakfast', user.dietaryPreference, nutrition.calories * 0.25), timing: '08:00 AM' },
            { ...getRandomMeal('lunch', user.dietaryPreference, nutrition.calories * 0.35), timing: '01:00 PM' },
            { ...getRandomMeal('snack', user.dietaryPreference, nutrition.calories * 0.10), timing: '04:00 PM' },
            { ...getRandomMeal('dinner', user.dietaryPreference, nutrition.calories * 0.30), timing: '07:30 PM' }
        ];
    });

    // Save to DB
    const plan = await DietPlan.create({
        user: user._id,
        dailyCalories: nutrition.calories,
        macros: {
            protein: nutrition.protein,
            carbs: nutrition.carbs,
            fats: nutrition.fats
        },
        meals: weeklyPlan
    });

    res.status(201).json(plan);
});

// @desc    Get current diet plan
// @route   GET /api/diet/current
// @access  Private
const getDietPlan = asyncHandler(async (req, res) => {
    const plan = await DietPlan.findOne({ user: req.user._id }).sort({ createdAt: -1 });
    if (plan) {
        res.json(plan);
    } else {
        res.status(404).json({ message: 'No diet plan found' });
    }
});

// @desc    Get meal details by name
// @route   GET /api/diet/meal/:name
// @access  Private
const getMealDetails = asyncHandler(async (req, res) => {
    const mealName = decodeURIComponent(req.params.name);
    console.log(`Fetching details for meal: "${mealName}"`);

    // Case-insensitive search attempt
    const meal = mealDatabase.find(m => m.name.toLowerCase() === mealName.toLowerCase());

    if (meal) {
        const enrichedMeal = {
            ...meal,
            instructions: meal.instructions || "1. Prepare ingredients.\n2. Cook according to standard methods.\n3. Serve hot.",
            ingredients: meal.ingredients || ["Ingredient A", "Ingredient B", "Spice C"]
        };
        res.json(enrichedMeal);
    } else {
        res.status(404);
        throw new Error('Meal not found');
    }
});

export { generateDietPlan, getDietPlan, getMealDetails };
