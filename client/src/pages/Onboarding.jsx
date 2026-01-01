import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, User, Activity, Utensils, Ruler, Weight } from 'lucide-react';
import { API_BASE_URL } from '../config';

const Onboarding = () => {
    const { user, refreshUser } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        height: '',
        weight: '',
        goal: 'loss',
        activityLevel: 'sedentary',
        dietaryPreference: 'veg',
        allergies: '',
        healthConditions: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => setStep(step + 1);
    const handlePrev = () => setStep(step - 1);

    const handleSubmit = async () => {
        try {
            // Update user profile
            await axios.put(`${API_BASE_URL}/users/profile`, formData, {
                withCredentials: true
            });

            // Generate diet plan automatically
            await axios.post(`${API_BASE_URL}/diet/generate`, {}, {
                withCredentials: true
            });

            // Refresh user data to get updated profile
            await refreshUser();

            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert('Failed to complete setup. Please try again.');
        }
    };

    const variants = {
        enter: { x: 50, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: -50, opacity: 0 }
    };

    return (
        <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-6 font-sans text-[#1D1D1F]">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 w-full max-w-5xl overflow-hidden border border-gray-100 flex flex-col md:flex-row min-h-[600px]">

                {/* Sidebar / Progress */}
                <div className="bg-[#F5F5F7] p-10 md:w-1/3 flex flex-col justify-between border-r border-gray-100">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-[#007AFF] rounded-lg flex items-center justify-center text-white">
                                <User className="w-5 h-5" />
                            </div>
                            <span className="font-semibold text-[#1D1D1F] tracking-tight">Setup</span>
                        </div>
                        <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-2 tracking-tight">Your Profile</h2>
                        <p className="text-sm text-[#86868B] font-medium leading-relaxed">Let's solve your nutritional needs.</p>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className={`flex items-center gap-4 transition-all duration-300 ${step >= i ? 'opacity-100' : 'opacity-40'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${step >= i ? 'bg-[#007AFF] border-[#007AFF] text-white' : 'bg-white border-gray-300 text-[#86868B]'}`}>
                                    {step > i ? <Check className="w-4 h-4" /> : <span className="text-xs font-bold">{i}</span>}
                                </div>
                                <span className={`font-medium text-sm ${step === i ? 'text-[#1D1D1F] font-semibold' : 'text-[#86868B]'}`}>
                                    {i === 1 && 'Basics'}
                                    {i === 2 && 'Measurements'}
                                    {i === 3 && 'Lifestyle'}
                                    {i === 4 && 'Preferences'}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#86868B]">Step {step} of 4</div>
                </div>

                {/* Form Area */}
                <div className="p-10 md:w-2/3 flex flex-col relative bg-white">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={step}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3, type: "spring", stiffness: 100, damping: 20 }}
                            className="flex-1 flex flex-col justify-center"
                        >
                            {step === 1 && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-semibold text-[#1D1D1F] tracking-tight mb-2">Basic Info</h3>
                                    <div>
                                        <label className="block text-xs font-bold text-[#86868B] uppercase tracking-wider mb-2 ml-1">Age</label>
                                        <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full p-4 bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#007AFF] rounded-2xl outline-none text-[#1D1D1F] font-medium transition-all" placeholder="e.g. 25" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#86868B] uppercase tracking-wider mb-2 ml-1">Gender</label>
                                        <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-4 bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#007AFF] rounded-2xl outline-none text-[#1D1D1F] font-medium transition-all cursor-pointer appearance-none">
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-semibold text-[#1D1D1F] tracking-tight mb-2">Body Measurements</h3>
                                    <div>
                                        <label className="block text-xs font-bold text-[#86868B] uppercase tracking-wider mb-2 ml-1">Height (cm)</label>
                                        <div className="relative">
                                            <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868B]" />
                                            <input type="number" name="height" value={formData.height} onChange={handleChange} className="w-full pl-12 p-4 bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#007AFF] rounded-2xl outline-none text-[#1D1D1F] font-medium transition-all" placeholder="e.g. 175" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#86868B] uppercase tracking-wider mb-2 ml-1">Weight (kg)</label>
                                        <div className="relative">
                                            <Weight className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868B]" />
                                            <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="w-full pl-12 p-4 bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#007AFF] rounded-2xl outline-none text-[#1D1D1F] font-medium transition-all" placeholder="e.g. 70" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-semibold text-[#1D1D1F] tracking-tight mb-2">Goals & Activity</h3>
                                    <div>
                                        <label className="block text-xs font-bold text-[#86868B] uppercase tracking-wider mb-2 ml-1">Primary Goal</label>
                                        <select name="goal" value={formData.goal} onChange={handleChange} className="w-full p-4 bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#007AFF] rounded-2xl outline-none text-[#1D1D1F] font-medium transition-all cursor-pointer appearance-none">
                                            <option value="loss">Weight Loss</option>
                                            <option value="gain">Muscle Gain</option>
                                            <option value="maintain">Maintain Weight</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#86868B] uppercase tracking-wider mb-2 ml-1">Activity Level</label>
                                        <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} className="w-full p-4 bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#007AFF] rounded-2xl outline-none text-[#1D1D1F] font-medium transition-all cursor-pointer appearance-none">
                                            <option value="sedentary">Sedentary (Minimum activity)</option>
                                            <option value="light">Lightly Active</option>
                                            <option value="moderate">Moderately Active</option>
                                            <option value="active">Very Active</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {step === 4 && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-semibold text-[#1D1D1F] tracking-tight mb-2">Preferences</h3>
                                    <div>
                                        <label className="block text-xs font-bold text-[#86868B] uppercase tracking-wider mb-2 ml-1">Diet Type</label>
                                        <div className="relative">
                                            <Utensils className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868B]" />
                                            <select name="dietaryPreference" value={formData.dietaryPreference} onChange={handleChange} className="w-full pl-12 p-4 bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#007AFF] rounded-2xl outline-none text-[#1D1D1F] font-medium transition-all cursor-pointer appearance-none">
                                                <option value="veg">Vegetarian</option>
                                                <option value="vegan">Vegan</option>
                                                <option value="non-veg">Non-Vegetarian</option>
                                                <option value="keto">Ketogenic</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#86868B] uppercase tracking-wider mb-2 ml-1">Allergies (Optional)</label>
                                        <input type="text" name="allergies" value={formData.allergies} onChange={handleChange} className="w-full p-4 bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#007AFF] rounded-2xl outline-none text-[#1D1D1F] font-medium transition-all" placeholder="e.g. Peanuts, Gluten" />
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
                        {step > 1 ? (
                            <button onClick={handlePrev} className="px-6 py-2.5 rounded-full text-[#86868B] font-bold text-sm hover:bg-[#F5F5F7] hover:text-[#1D1D1F] transition-all flex items-center gap-2">
                                <ArrowLeft className="w-4 h-4" /> Back
                            </button>
                        ) : <div></div>}

                        {step < 4 ? (
                            <button onClick={handleNext} className="px-8 py-3 bg-[#007AFF] text-white rounded-full font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-[#0051A8] transition-all flex items-center gap-2 group">
                                Next <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        ) : (
                            <button onClick={handleSubmit} className="px-8 py-3 bg-[#34C759] text-white rounded-full font-bold text-sm shadow-lg shadow-green-500/20 hover:bg-[#2CA84E] transition-all flex items-center gap-2 group">
                                Complete Setup <Check className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
