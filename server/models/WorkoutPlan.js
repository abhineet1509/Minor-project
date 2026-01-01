import mongoose from 'mongoose';

const workoutPlanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    goal: {
        type: String,
        required: true
    },
    mode: {
        type: String, // Gym, Home, No-equipment
        required: true
    },
    difficulty: {
        type: String,
        default: 'intermediate'
    },
    exercises: [{
        day: { type: String, required: true },
        moves: [{
            name: { type: String, required: true },
            sets: { type: Number, required: true },
            reps: { type: String, required: true },
            rest: { type: String },
            notes: { type: String },
            muscles: [String],
            videoUrl: String
        }]
    }],
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const WorkoutPlan = mongoose.model('WorkoutPlan', workoutPlanSchema);

export default WorkoutPlan;
