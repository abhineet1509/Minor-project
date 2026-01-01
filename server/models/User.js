import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: { type: Number },
    gender: { type: String },
    height: { type: Number }, // in cm
    weight: { type: Number }, // in kg
    goal: { type: String }, // loss, gain, maintain
    activityLevel: { type: String },
    dietaryPreference: { type: String },
    allergies: [{ type: String }],
    allergies: [{ type: String }],
    healthConditions: [{ type: String }],
    // Tracking Targets
    calorieGoal: { type: Number, default: 2000 },
    proteinGoal: { type: Number, default: 150 },
    hydrationGoal: { type: Number, default: 2500 }, // ml

    // Daily Progress
    dailyCalories: { type: Number, default: 0 },
    dailyProtein: { type: Number, default: 0 },
    dailyHydration: { type: Number, default: 0 },

    // History
    weightHistory: [{
        weight: { type: Number },
        date: { type: Date, default: Date.now }
    }],
}, {
    timestamps: true
});

// Crypto password middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
