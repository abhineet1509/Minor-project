import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    protein: { type: Number, required: true }, // in grams
    carbs: { type: Number, required: true }, // in grams
    fats: { type: Number, required: true }, // in grams
    ingredients: [{ type: String }],
    instructions: { type: String },
    image: { type: String }, // URL or placeholder path
    type: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'] },
    dietaryTags: [{ type: String }], // veg, vegan, keto, gluten-free, etc.
});

const dietPlanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dailyCalories: { type: Number, required: true },
    macros: {
        protein: { type: Number },
        carbs: { type: Number },
        fats: { type: Number }
    },
    meals: {
        monday: [{ type: Object }], // Store detailed meal objects for simplicity or Refs
        tuesday: [{ type: Object }],
        wednesday: [{ type: Object }],
        thursday: [{ type: Object }],
        friday: [{ type: Object }],
        saturday: [{ type: Object }],
        sunday: [{ type: Object }],
    },
    generatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

const DietPlan = mongoose.model('DietPlan', dietPlanSchema);
export default DietPlan;
