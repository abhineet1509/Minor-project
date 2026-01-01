import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Search, Flame, Target, Utensils, Zap, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const FoodRecognition = () => {
    const [image, setImage] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (re) => setImage(re.target.result);
            reader.readAsDataURL(file);
            setError(null);
        }
    };

    const analyzeImage = async () => {
        setAnalyzing(true);
        setError(null);

        try {
            const { data } = await axios.post(`${API_BASE_URL}/food/recognize`,
                { image },
                { withCredentials: true }
            );

            setTimeout(() => {
                setResult(data);
                setAnalyzing(false);
            }, 2500);
        } catch (err) {
            console.error('Food recognition error:', err);
            setError(err.response?.data?.message || 'Failed to analyze image. Please try again.');
            setAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F5F7] p-6 pt-24 pb-12 font-sans text-[#1D1D1F]">
            <header className="max-w-[1200px] mx-auto mb-16 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 mb-6 shadow-sm">
                    <Camera className="w-4 h-4 text-[#007AFF]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1D1D1F]">AI Vision</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1D1D1F] mb-4">Meal Scanner</h1>
                <p className="text-[#86868B] text-lg font-medium">Instantly analyze nutritional content from your photos.</p>
            </header>

            <div className="max-w-4xl mx-auto">
                {!image && (
                    <label className="block bg-white border-2 border-dashed border-gray-200 rounded-[3rem] p-24 text-center group hover:border-[#007AFF] transition-all cursor-pointer relative overflow-hidden">
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleUpload}
                            accept="image/*"
                        />
                        <div className="w-20 h-20 bg-[#F5F5F7] rounded-3xl flex items-center justify-center mx-auto mb-8 text-[#007AFF] group-hover:scale-110 transition-transform duration-300">
                            <Utensils className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-2">Tap to Scan Meal</h2>
                        <p className="text-[#86868B] text-sm font-medium">Supports JPG, PNG, HEIC</p>
                    </label>
                )}

                {image && !result && (
                    <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-gray-100">
                        <div className="aspect-square max-w-sm mx-auto rounded-[2.5rem] overflow-hidden mb-8 shadow-lg relative border border-gray-100">
                            <img src={image} alt="Meal" className="w-full h-full object-cover" />
                            {analyzing && (
                                <div className="absolute inset-0 bg-white/60 backdrop-blur-md flex flex-col items-center justify-center text-[#1D1D1F] p-8 text-center transition-all duration-500">
                                    <div className="w-12 h-12 border-4 border-gray-200 border-t-[#007AFF] rounded-full animate-spin mb-4"></div>
                                    <h3 className="text-xl font-semibold mb-2">Analyzing...</h3>
                                    <p className="text-sm text-[#86868B] font-medium">Identifying ingredients & portions</p>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-4 justify-center">
                            <button onClick={() => setImage(null)} className="px-8 py-3 text-[#86868B] font-semibold text-sm hover:text-[#1D1D1F] transition">Cancel</button>
                            <button
                                onClick={analyzeImage}
                                disabled={analyzing}
                                className="px-8 py-3 bg-[#007AFF] text-white rounded-full font-semibold text-lg hover:bg-[#0051A8] transition shadow-lg shadow-blue-500/20 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <Zap className="w-5 h-5 fill-current" /> Analyze Meal
                            </button>
                        </div>
                    </div>
                )}

                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
                        >
                            <div className="md:flex">
                                <div className="md:w-1/2 p-8 bg-[#F5F5F7]">
                                    <div className="relative group mb-6">
                                        <img src={image} alt="Analyzed" className="w-full h-[400px] object-cover rounded-[2.5rem] shadow-sm" />
                                    </div>
                                    <div className="flex items-center justify-between px-2">
                                        <span className="text-xs font-bold uppercase tracking-wider text-[#86868B]">AI Confidence</span>
                                        <span className="text-[#007AFF] font-bold text-lg">{result.confidence}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full mt-2 overflow-hidden mx-2">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${result.confidence}%` }}
                                            className="h-full bg-[#007AFF]"
                                        />
                                    </div>
                                </div>
                                <div className="md:w-1/2 p-10 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-6">
                                        <CheckCircle2 className="w-6 h-6 text-[#34C759]" />
                                        <h2 className="text-3xl font-semibold text-[#1D1D1F]">Analysis Complete</h2>
                                    </div>
                                    <h3 className="text-2xl font-medium text-[#1D1D1F] mb-8">{result.name}</h3>

                                    <div className="grid grid-cols-2 gap-4 mb-10">
                                        <div className="p-6 bg-[#F5F5F7] rounded-[2rem]">
                                            <p className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider mb-2 flex items-center gap-1"><Flame className="w-3 h-3" /> Calories</p>
                                            <p className="text-3xl font-semibold text-[#1D1D1F]">{result.calories}</p>
                                        </div>
                                        <div className="p-6 bg-[#F5F5F7] rounded-[2rem]">
                                            <p className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider mb-2 flex items-center gap-1"><Target className="w-3 h-3" /> Protein</p>
                                            <p className="text-3xl font-semibold text-[#1D1D1F]">{result.macros.protein}g</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6 mb-10">
                                        <h4 className="font-bold text-[#86868B] uppercase text-xs tracking-wider">Macros</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between text-xs font-medium mb-1">
                                                    <span className="text-[#1D1D1F]">Carbs</span> <span className="text-[#86868B]">{result.macros.carbs}g</span>
                                                </div>
                                                <div className="h-2 bg-[#F5F5F7] rounded-full overflow-hidden">
                                                    <div className="h-full bg-[#FF9F0A]" style={{ width: '45%' }}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-xs font-medium mb-1">
                                                    <span className="text-[#1D1D1F]">Fats</span> <span className="text-[#86868B]">{result.macros.fat}g</span>
                                                </div>
                                                <div className="h-2 bg-[#F5F5F7] rounded-full overflow-hidden">
                                                    <div className="h-full bg-[#AF52DE]" style={{ width: '30%' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => { setResult(null); setImage(null); }}
                                        className="w-full py-4 bg-[#007AFF] text-white rounded-full font-semibold text-lg hover:bg-[#0051A8] transition shadow-lg shadow-blue-500/20"
                                    >
                                        Save to Log
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default FoodRecognition;
