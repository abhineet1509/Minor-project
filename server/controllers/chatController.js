import asyncHandler from 'express-async-handler';
import { mealDatabase } from '../data/meals.js';

// Simple heuristic response generator
const generateResponse = (message, user) => {
    const msg = message.toLowerCase();

    if (msg.includes('post-workout') || msg.includes('after gym')) {
        return "Post-workout, I recommend high protein and moderate carbs to aid muscle recovery. A whey protein shake with a banana or grilled chicken with brown rice are excellent choices!";
    }

    if (msg.includes('night') || msg.includes('evening snack')) {
        return "Eating at night is fine as long as it fits your daily calories. However, try to avoid heavy, greasy meals. A small portion of greek yogurt or a handful of almonds is better for digestion before sleep.";
    }

    if (msg.includes('calories')) {
        return `Your daily target is ${user.dailyCalories || 'around 2000'} kcal. Tracking your intake consistently is the fastest way to reach your goal of ${user.goal}!`;
    }

    return "I'm still learning! Ask me about post-workout meals, night-time snacks, or your daily calorie targets. I'm here to help you stay on track!";
};

// @desc    Process chat message
// @route   POST /api/chat
// @access  Private
const chatWithAI = asyncHandler(async (req, res) => {
    const { message } = req.body;

    // In a real app, you would call OpenAI/Gemini API here
    // const response = await openai.createCompletion(...)

    // Simulated delay for realism
    await new Promise(resolve => setTimeout(resolve, 1000));

    const reply = generateResponse(message, req.user);

    res.json({ reply });
});

export { chatWithAI };
