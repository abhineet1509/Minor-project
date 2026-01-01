import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Plus, Trash2, CheckCircle, Save, ArrowLeft, Dumbbell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const WorkoutLogger = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [exercises, setExercises] = useState([
        { name: '', sets: [{ reps: '', weight: '' }] }
    ]);
    const [loading, setLoading] = useState(false);

    const addExercise = () => {
        setExercises([...exercises, { name: '', sets: [{ reps: '', weight: '' }] }]);
    };

    const removeExercise = (index) => {
        const newEx = [...exercises];
        newEx.splice(index, 1);
        setExercises(newEx);
    };

    const addSet = (exIndex) => {
        const newEx = [...exercises];
        newEx[exIndex].sets.push({ reps: '', weight: '' });
        setExercises(newEx);
    };

    const handleExChange = (index, value) => {
        const newEx = [...exercises];
        newEx[index].name = value;
        setExercises(newEx);
    };

    const handleSetChange = (exIndex, setIndex, field, value) => {
        const newEx = [...exercises];
        newEx[exIndex].sets[setIndex][field] = value;
        setExercises(newEx);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/workouts/log', { exercises }, { withCredentials: true });
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert("Failed to log workout");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F5F7] p-6 pt-24 pb-12 font-sans text-[#1D1D1F]">
            <div className="max-w-[800px] mx-auto">
                <header className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-4">
                        <Link to="/dashboard" className="w-10 h-10 bg-white shadow-sm flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors text-[#1D1D1F]">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-semibold tracking-tight text-[#1D1D1F]">Log Workout</h1>
                            <p className="text-[#86868B] text-sm font-medium">Record your progress.</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-6 py-3 bg-[#007AFF] text-white rounded-full font-semibold text-sm hover:bg-[#0051A8] transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-70"
                    >
                        {loading ? 'Saving...' : <><Save className="w-4 h-4" /> Finish</>}
                    </button>
                </header>

                <div className="space-y-6">
                    {exercises.map((ex, exIndex) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={exIndex}
                            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex-1 mr-4">
                                    <label className="text-xs font-bold text-[#86868B] uppercase tracking-wider mb-2 block">Exercise Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Bench Press"
                                        className="text-2xl font-semibold bg-transparent border-none p-0 focus:ring-0 outline-none text-[#1D1D1F] placeholder:text-gray-300 w-full"
                                        value={ex.name}
                                        onChange={(e) => handleExChange(exIndex, e.target.value)}
                                        autoFocus={exIndex === exercises.length - 1 && exercises.length > 1}
                                    />
                                </div>
                                <button onClick={() => removeExercise(exIndex)} className="text-gray-300 hover:text-red-500 transition-colors">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4 text-xs font-bold text-[#86868B] uppercase tracking-wider px-2">
                                    <span>Set</span>
                                    <span className="text-center">kg</span>
                                    <span className="text-center">Reps</span>
                                </div>
                                {ex.sets.map((set, setIndex) => (
                                    <div key={setIndex} className="grid grid-cols-3 gap-4 items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-gray-100 text-[#86868B] text-xs font-bold flex items-center justify-center">
                                                {setIndex + 1}
                                            </div>
                                            <div className="h-px bg-gray-100 flex-1"></div>
                                        </div>

                                        <input
                                            type="number"
                                            placeholder="0"
                                            className="bg-[#F5F5F7] p-2 rounded-xl text-center font-semibold text-[#1D1D1F] focus:bg-white focus:ring-2 focus:ring-[#007AFF] outline-none transition-all placeholder:text-gray-300"
                                            value={set.weight}
                                            onChange={(e) => handleSetChange(exIndex, setIndex, 'weight', e.target.value)}
                                        />
                                        <input
                                            type="number"
                                            placeholder="0"
                                            className="bg-[#F5F5F7] p-2 rounded-xl text-center font-semibold text-[#1D1D1F] focus:bg-white focus:ring-2 focus:ring-[#007AFF] outline-none transition-all placeholder:text-gray-300"
                                            value={set.reps}
                                            onChange={(e) => handleSetChange(exIndex, setIndex, 'reps', e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => addSet(exIndex)}
                                className="mt-6 w-full py-3 rounded-2xl text-[#007AFF] font-semibold text-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 border border-transparent hover:border-blue-100"
                            >
                                <Plus className="w-4 h-4" /> Add Set
                            </button>
                        </motion.div>
                    ))}

                    <button
                        onClick={addExercise}
                        className="w-full py-6 rounded-3xl border-2 border-dashed border-gray-200 text-[#86868B] font-semibold hover:border-[#007AFF] hover:text-[#007AFF] hover:bg-blue-50 transition-all flex items-center justify-center gap-3"
                    >
                        <Plus className="w-6 h-6" /> Add Exercise
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WorkoutLogger;
