import mongoose from 'mongoose';

const exerciseLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    workoutPlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkoutPlan'
    },
    date: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        name: { type: String, required: true },
        sets: [{
            reps: { type: Number, required: true },
            weight: { type: Number, required: true },
            completed: { type: Boolean, default: true }
        }]
    }],
    notes: String,
    totalVolume: Number
}, {
    timestamps: true
});

const ExerciseLog = mongoose.model('ExerciseLog', exerciseLogSchema);

export default ExerciseLog;
