import asyncHandler from 'express-async-handler';

// Mock food recognition data
const foodDatabase = [
    {
        name: "Avocado Toast with Poached Egg",
        calories: 420,
        macros: { protein: 18, carbs: 32, fat: 26 },
        ingredients: ["Sourdough Bread", "Avocado", "Egg", "Olive Oil", "Chili Flakes"],
        confidence: 94
    },
    {
        name: "Grilled Chicken Salad",
        calories: 350,
        macros: { protein: 35, carbs: 15, fat: 18 },
        ingredients: ["Chicken Breast", "Mixed Greens", "Cherry Tomatoes", "Cucumber", "Olive Oil"],
        confidence: 92
    },
    {
        name: "Oatmeal with Berries",
        calories: 280,
        macros: { protein: 10, carbs: 45, fat: 8 },
        ingredients: ["Oats", "Blueberries", "Strawberries", "Honey", "Almond Milk"],
        confidence: 89
    },
    {
        name: "Salmon with Vegetables",
        calories: 480,
        macros: { protein: 40, carbs: 20, fat: 28 },
        ingredients: ["Salmon Fillet", "Broccoli", "Carrots", "Lemon", "Olive Oil"],
        confidence: 91
    }
];

// @desc    Recognize food from image
// @route   POST /api/food/recognize
// @access  Private
const recognizeFood = asyncHandler(async (req, res) => {
    // In a real implementation, this would:
    // 1. Receive image data from req.body
    // 2. Send to AI vision API (e.g., Google Vision, AWS Rekognition)
    // 3. Process the response

    // For now, return a random food item from database
    const randomIndex = Math.floor(Math.random() * foodDatabase.length);
    const recognizedFood = foodDatabase[randomIndex];

    // Simulate processing delay
    setTimeout(() => {
        res.json(recognizedFood);
    }, 100);
});

export { recognizeFood };
