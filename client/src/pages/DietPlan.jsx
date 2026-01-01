import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, RefreshCw, ChevronRight, Flame, Utensils, Clock, Brain, Zap, Check } from 'lucide-react';

const DietPlan = () => {
    const { user } = useAuth();
    const location = useLocation();
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeDay, setActiveDay] = useState('monday');

    const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    useEffect(() => {
        fetchPlan();
    }, []);

    const fetchPlan = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/diet/current', { withCredentials: true });
            setPlan(data);
        } catch (error) {
            console.log("No plan found");
        }
    };

    const generatePlan = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post('http://localhost:5000/api/diet/generate', {}, { withCredentials: true });
            setPlan(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const MealCardSkeleton = () => (
        <div className="card-apple p-6 animate-pulse flex gap-6">
            <div className="w-48 h-48 bg-gray-200 rounded-2xl shrink-0"></div>
            <div className="flex-1 space-y-4 py-2">
                <div className="w-1/3 h-6 bg-gray-200 rounded-full"></div>
                <div className="w-3/4 h-8 bg-gray-200 rounded-full"></div>
                <div className="w-full h-12 bg-gray-100 rounded-xl"></div>
            </div>
        </div>
    );

    if (!plan && !loading) {
        return (
            <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-6">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center max-w-lg w-full card-apple p-12"
                >
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8 text-[#007AFF]">
                        <Utensils className="w-10 h-10" />
                    </div>

                    <h2 className="text-3xl font-semibold text-[#1D1D1F] mb-4 tracking-tight">Create Your Plan</h2>
                    <p className="text-[#86868B] mb-10 text-lg leading-relaxed">
                        AI will analyze your profile (Age {user?.age}, {user?.weight}kg) to build a perfect weekly menu.
                    </p>

                    <button
                        onClick={generatePlan}
                        className="w-full py-4 bg-[#007AFF] text-white rounded-full font-semibold text-lg hover:bg-[#0051A8] transition-colors shadow-lg shadow-blue-500/20"
                    >
                        Generate Weekly Menu
                    </button>
                </motion.div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F5F5F7] p-6 pt-32 max-w-7xl mx-auto space-y-8">
                <div className="w-48 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="space-y-6">
                    {[1, 2, 3].map(i => <MealCardSkeleton key={i} />)}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F5F7] font-sans pb-24">
            <header className="fixed top-0 left-0 right-0 z-40 glass-nav">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/dashboard" className="text-[#007AFF] font-medium flex items-center gap-1 hover:underline">
                        <ChevronRight className="w-4 h-4 rotate-180" /> Back
                    </Link>
                    <h1 className="text-lg font-semibold text-[#1D1D1F]">Weekly Nutrition</h1>
                    <div className="w-10"></div> {/* Spacer for balance */}
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 pt-32">

                {/* Header Info */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-semibold text-[#1D1D1F] tracking-tight mb-6">Your Menu</h2>
                        <div className="flex flex-wrap gap-3">
                            <div className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-medium text-[#1D1D1F] flex items-center gap-2">
                                <Flame className="w-4 h-4 text-orange-500" /> {plan.dailyCalories} kcal
                            </div>
                            <div className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-medium text-[#1D1D1F]">
                                Protein: {plan.macros.protein}g
                            </div>
                            <div className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-medium text-[#1D1D1F]">
                                Carbs: {plan.macros.carbs}g
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={generatePlan}
                        className="btn-apple-secondary px-6 py-3 text-sm flex items-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" /> Regenerate
                    </button>
                </div>

                <div className="grid lg:grid-cols-12 gap-10">
                    {/* Days Sidebar */}
                    <div className="lg:col-span-3">
                        <div className="lg:sticky lg:top-32 flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
                            {weekDays.map(day => (
                                <button
                                    key={day}
                                    onClick={() => setActiveDay(day)}
                                    className={`px-6 py-3 rounded-full text-sm font-semibold capitalize text-left transition-all whitespace-nowrap lg:whitespace-normal flex justify-between items-center ${activeDay === day
                                            ? 'bg-[#1D1D1F] text-white shadow-md'
                                            : 'bg-white text-[#86868B] hover:bg-gray-50'
                                        }`}
                                >
                                    {day}
                                    {activeDay === day && <Check className="w-4 h-4" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Meals List */}
                    <div className="lg:col-span-9 space-y-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeDay}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-6"
                            >
                                <h3 className="text-2xl font-semibold text-[#1D1D1F] capitalize mb-8">{activeDay}</h3>

                                {plan.meals[activeDay].map((meal, index) => (
                                    <div
                                        key={index}
                                        className="card-apple p-1 group hover:shadow-lg transition-all"
                                    >
                                        <div className="flex flex-col md:flex-row gap-6 p-4">
                                            {/* Image */}
                                            <div className="relative w-full md:w-56 h-56 bg-gray-100 rounded-[1.5rem] overflow-hidden shrink-0">
                                                {meal.image ? (
                                                    <img
                                                        src={meal.image}
                                                        alt={meal.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                                        <Utensils className="w-12 h-12" />
                                                    </div>
                                                )}
                                                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm">
                                                    {meal.type}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 py-2 flex flex-col justify-center">
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {meal.dietaryTags.map(tag => (
                                                        <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wide rounded-lg">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    <span className="flex items-center gap-1 px-3 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-wide rounded-lg">
                                                        <Clock className="w-3 h-3" /> {meal.timing || '15 min'}
                                                    </span>
                                                </div>

                                                <h4 className="text-2xl font-bold text-[#1D1D1F] mb-4 group-hover:text-[#007AFF] transition-colors">
                                                    {meal.name}
                                                </h4>

                                                <div className="flex items-center gap-6 text-sm font-medium text-[#86868B]">
                                                    <span className="flex items-center gap-2"><Flame className="w-4 h-4 text-orange-500" /> {meal.calories} kcal</span>
                                                    <span>{meal.protein}g Protein</span>
                                                    <span>{meal.carbs}g Carbs</span>
                                                </div>
                                            </div>

                                            {/* Action */}
                                            <div className="flex items-center pr-4">
                                                <Link
                                                    to={`/meal/${encodeURIComponent(meal.name)}`}
                                                    className="w-12 h-12 rounded-full bg-[#F5F5F7] flex items-center justify-center text-[#1D1D1F] hover:bg-[#007AFF] hover:text-white transition-all"
                                                >
                                                    <ChevronRight className="w-6 h-6" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DietPlan;
