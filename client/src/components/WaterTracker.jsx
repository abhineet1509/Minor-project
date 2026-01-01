import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Plus, Minus } from 'lucide-react';

const WaterTracker = () => {
    const [glasses, setGlasses] = useState(0);
    const goal = 10; // 10 glasses target

    const percentage = Math.min((glasses / goal) * 100, 100);

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-stone-100 dark:border-slate-700 relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Hydration Tracker</h3>
                        <p className="text-sm text-slate-500 font-medium">Goal: {goal} Glasses (2.5L)</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <Droplets className="w-6 h-6" />
                    </div>
                </div>

                <div className="flex items-center gap-8 mb-8">
                    <div className="relative w-24 h-24">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-slate-700" />
                            <motion.circle
                                cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent"
                                className="text-blue-500"
                                strokeDasharray={251.2}
                                initial={{ strokeDashoffset: 251.2 }}
                                animate={{ strokeDashoffset: 251.2 - (251.2 * percentage) / 100 }}
                                transition={{ duration: 1 }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-black text-slate-800 dark:text-white">{glasses}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Glasses</span>
                        </div>
                    </div>

                    <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setGlasses(Math.max(0, glasses - 1))}
                                className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-500 transition"
                            >
                                <Minus className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setGlasses(glasses + 1)}
                                className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition flex items-center justify-center gap-2"
                            >
                                <Plus className="w-5 h-5" /> Add Glass
                            </button>
                        </div>
                    </div>
                </div>

                <p className="text-xs font-bold text-slate-400 text-center">
                    {percentage >= 100 ? "Amazing! You're fully hydrated 💧" : "Stay hydrated for peak performance! 🌊"}
                </p>
            </div>

            {/* Background Water Wave Effect */}
            <motion.div
                className="absolute bottom-0 left-0 w-full bg-blue-500/5 dark:bg-blue-500/10"
                initial={{ height: 0 }}
                animate={{ height: `${percentage}%` }}
                transition={{ duration: 2 }}
            />
        </div>
    );
};

export default WaterTracker;
