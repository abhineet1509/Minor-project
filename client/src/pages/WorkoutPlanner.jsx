import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, RefreshCw, ChevronRight, Clock, Flame, Target, Play, Calendar, Activity } from 'lucide-react';
import { API_BASE_URL } from '../config';

const WorkoutPlanner = () => {
    const { user } = useAuth();
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [mode, setMode] = useState('Gym');
    const [activeDay, setActiveDay] = useState('Monday');

    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    useEffect(() => {
        fetchPlan();
    }, []);

    const fetchPlan = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${API_BASE_URL}/workouts/current`, { withCredentials: true });
            setPlan(data);
        } catch (error) {
            console.log("No workout plan found");
        } finally {
            setLoading(false);
        }
    };

    const generatePlan = async () => {
        setGenerating(true);
        try {
            const { data } = await axios.post(`${API_BASE_URL}/workouts/generate`, { mode }, { withCredentials: true });
            setPlan(data);
        } catch (error) {
            console.error(error);
            alert("Failed to generate plan");
        } finally {
            setGenerating(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-gray-200 border-t-[#007AFF] rounded-full animate-spin"></div>
                    <p className="text-[#86868B] text-sm font-medium">Loading your plan...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F5F7] p-6 pt-24 pb-12 font-sans text-[#1D1D1F]">
            <header className="max-w-[1200px] mx-auto mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2 text-[#007AFF]">
                        <Activity className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-wider">Smart Coach</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1D1D1F]">Workout Plan</h1>
                    <p className="text-[#86868B] text-lg mt-2 font-medium"> personalized for {user?.goal?.toLowerCase() || 'health'}.</p>
                </div>

                {!plan && (
                    <div className="bg-white p-1 rounded-2xl shadow-sm border border-gray-200 flex">
                        {['Gym', 'Home', 'No-equipment'].map(m => (
                            <button
                                key={m}
                                onClick={() => setMode(m)}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${mode === m ? 'bg-[#1D1D1F] text-white shadow-md' : 'text-[#86868B] hover:bg-gray-50'}`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                )}

                {plan && (
                    <button
                        onClick={() => setPlan(null)}
                        className="px-5 py-2.5 bg-white text-[#1D1D1F] border border-gray-200 rounded-full hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2 shadow-sm"
                    >
                        <RefreshCw className="w-4 h-4" /> Reset Plan
                    </button>
                )}
            </header>

            <div className="max-w-[1200px] mx-auto">
                {!plan ? (
                    <div className="max-w-xl mx-auto text-center bg-white rounded-3xl p-12 shadow-sm border border-gray-100">
                        <div className="w-20 h-20 bg-blue-50 text-[#007AFF] rounded-full flex items-center justify-center mx-auto mb-8">
                            <Dumbbell className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-semibold text-[#1D1D1F] mb-4">Let's build your routine.</h2>
                        <p className="text-[#86868B] mb-10 text-lg leading-relaxed">Our AI analyzes your goal to <strong>{user?.goal || 'get fit'}</strong> and creates a perfect weekly schedule utilizing your available equipment ({mode}).</p>
                        <button
                            onClick={generatePlan}
                            disabled={generating}
                            className="w-full py-4 bg-[#007AFF] text-white rounded-full font-semibold text-lg hover:bg-[#0051A8] transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {generating ? (
                                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating...</>
                            ) : (
                                <>Generate Plan <ChevronRight className="w-5 h-5" /></>
                            )}
                        </button>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-12 gap-8">
                        {/* Sidebar Days */}
                        <div className="lg:col-span-3 lg:space-y-2 flex overflow-x-auto lg:overflow-visible lg:flex-col gap-2 pb-4 lg:pb-0 scrollbar-hide">
                            {weekDays.map(day => (
                                <button
                                    key={day}
                                    onClick={() => setActiveDay(day)}
                                    className={`px-6 py-4 rounded-2xl text-left transition-all duration-200 flex items-center justify-between group min-w-[140px] ${activeDay === day ? 'bg-[#1D1D1F] text-white shadow-lg' : 'bg-white text-[#86868B] hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}
                                >
                                    <span className={`text-sm font-semibold ${activeDay === day ? 'text-white' : 'text-[#1D1D1F]'}`}>{day}</span>
                                    {activeDay === day && <ChevronRight className="w-4 h-4 text-gray-400" />}
                                </button>
                            ))}
                        </div>

                        {/* Content Area */}
                        <div className="lg:col-span-9">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeDay}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="flex items-center gap-3 mb-8">
                                        <h2 className="text-2xl font-semibold text-[#1D1D1F]">{activeDay}'s Focus</h2>
                                        <div className="h-px flex-1 bg-gray-200"></div>
                                    </div>

                                    {plan.exercises.find(e => e.day === activeDay)?.moves.length === 0 ? (
                                        <div className="p-12 text-center bg-white rounded-3xl border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
                                            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                                                <Calendar className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-[#1D1D1F] mb-2">Rest Day</h3>
                                            <p className="text-[#86868B] max-w-sm mx-auto">Recovery is just as important as training. Take this time to stretch, hydrate, and relax.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {plan.exercises.find(e => e.day === activeDay)?.moves.map((move, i) => (
                                                <div key={i} className="bg-white p-6 rounded-3xl hover:shadow-md transition-shadow border border-gray-100 flex flex-col md:flex-row items-center gap-6 group">
                                                    <div className="flex-1 flex items-center gap-6 w-full md:w-auto">
                                                        <div className="w-14 h-14 bg-[#F5F5F7] rounded-2xl flex items-center justify-center text-[#007AFF] group-hover:scale-110 transition-transform duration-300">
                                                            <Target className="w-6 h-6" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-lg font-semibold text-[#1D1D1F] mb-1">{move.name}</h3>
                                                            <div className="flex flex-wrap gap-2">
                                                                {move.muscles.map(m => (
                                                                    <span key={m} className="text-[10px] font-bold uppercase tracking-wider text-[#86868B] bg-[#F5F5F7] px-2 py-1 rounded-md">{m}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end bg-[#F5F5F7] md:bg-transparent p-4 md:p-0 rounded-2xl">
                                                        <div className="text-center">
                                                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#86868B] mb-1">Sets</p>
                                                            <p className="text-xl font-semibold text-[#1D1D1F]">{move.sets}</p>
                                                        </div>
                                                        <div className="w-px h-8 bg-gray-300"></div>
                                                        <div className="text-center">
                                                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#86868B] mb-1">Reps</p>
                                                            <p className="text-xl font-semibold text-[#1D1D1F]">{move.reps}</p>
                                                        </div>
                                                        <div className="w-px h-8 bg-gray-300"></div>
                                                        <div className="text-center">
                                                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#86868B] mb-1">Rest</p>
                                                            <p className="text-xl font-semibold text-[#1D1D1F]">{move.rest}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkoutPlanner;
