import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Clock, Flame, Utensils, ChefHat, Heart, AlertCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../config';

const MealDetails = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMeal = async () => {
            try {
                // Encode the name for URL safety
                const encodedName = encodeURIComponent(name);
                const { data } = await axios.get(`${API_BASE_URL}/diet/meal/${encodedName}`, { withCredentials: true });
                setMeal(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchMeal();
    }, [name]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-[#007AFF] rounded-full animate-spin"></div>
                <p className="text-[#86868B] font-medium text-sm">Loading Recipe...</p>
            </div>
        </div>
    );
    if (!meal) return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
            <div className="text-center p-8">
                <AlertCircle className="w-12 h-12 text-[#FF3B30] mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-[#1D1D1F]">Recipe Not Found</h2>
                <p className="text-[#86868B] font-medium mt-1 mb-6">We couldn't find the meal you're looking for.</p>
                <button onClick={() => navigate(-1)} className="px-6 py-2.5 bg-[#007AFF] text-white rounded-full font-bold text-sm">Back to Plans</button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F5F5F7] p-6 md:p-12 font-sans text-[#1D1D1F]">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#86868B] hover:text-[#007AFF] transition-all mb-8 font-semibold text-sm group">
                <div className="w-8 h-8 bg-white flex items-center justify-center rounded-full shadow-sm group-hover:shadow-md transition-all">
                    <ArrowLeft className="w-4 h-4" />
                </div>
                Back to Diet Plan
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100"
            >
                <div className="h-80 md:h-96 relative bg-gray-100">
                    {meal.image ? (
                        <>
                            <img
                                src={meal.image}
                                alt={meal.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-300">
                            <Utensils className="w-24 h-24" />
                        </div>
                    )}
                </div>

                <div className="px-8 py-10 md:px-16 md:py-12 -mt-12 relative z-10 bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12">
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-blue-50 text-[#007AFF]">{meal.type}</span>
                                {meal.dietaryTags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-gray-50 text-[#86868B] text-xs font-bold uppercase tracking-wider rounded-full border border-gray-100">{tag}</span>
                                ))}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-semibold text-[#1D1D1F] mb-6 tracking-tight leading-tight">{meal.name}</h1>
                            <div className="flex flex-wrap gap-6 text-[#86868B] font-medium text-sm">
                                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#007AFF]" /> 25m Cook Time</span>
                                <span className="flex items-center gap-2"><Flame className="w-4 h-4 text-[#FF9500]" /> {meal.calories} kcal</span>
                                <span className="flex items-center gap-2"><ChefHat className="w-4 h-4 text-[#34C759]" /> Beginner Friendly</span>
                            </div>
                        </div>

                        <div className="bg-[#F5F5F7] p-8 rounded-[2rem] w-full lg:w-72">
                            <h3 className="font-bold text-[#1D1D1F] text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                                <Info className="w-4 h-4 text-[#007AFF]" /> Nutrition
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-end pb-2 border-b border-gray-200">
                                    <span className="text-[#86868B] font-bold text-xs uppercase">Protein</span>
                                    <span className="font-semibold text-[#1D1D1F] text-lg">{meal.protein}<span className="text-xs text-[#86868B] ml-0.5">g</span></span>
                                </div>
                                <div className="flex justify-between items-end pb-2 border-b border-gray-200">
                                    <span className="text-[#86868B] font-bold text-xs uppercase">Carbs</span>
                                    <span className="font-semibold text-[#1D1D1F] text-lg">{meal.carbs}<span className="text-xs text-[#86868B] ml-0.5">g</span></span>
                                </div>
                                <div className="flex justify-between items-end pb-2 border-b border-gray-200">
                                    <span className="text-[#86868B] font-bold text-xs uppercase">Fat</span>
                                    <span className="font-semibold text-[#1D1D1F] text-lg">{meal.fats}<span className="text-xs text-[#86868B] ml-0.5">g</span></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-16 border-t border-gray-100 pt-12">
                        <div>
                            <h3 className="text-xl font-semibold text-[#1D1D1F] mb-6 tracking-tight">Ingredients</h3>
                            <ul className="space-y-3">
                                {meal.ingredients.map((ing, idx) => (
                                    <li key={idx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#F5F5F7] transition-colors">
                                        <div className="w-1.5 h-1.5 bg-[#007AFF] rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-[#1D1D1F] font-medium leading-relaxed">{ing}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-[#1D1D1F] mb-6 tracking-tight">Instructions</h3>
                            <div className="text-[#424245] font-medium leading-relaxed bg-[#F5F5F7] p-8 rounded-[2rem]">
                                {meal.instructions}
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
};

export default MealDetails;
