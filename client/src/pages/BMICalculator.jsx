import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Activity, Info, RefreshCw, CheckCircle, AlertTriangle, Utensils, ChevronRight } from 'lucide-react';

const BMICalculator = () => {
    const navigate = useNavigate();
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState('');

    const calculateBMI = (e) => {
        e.preventDefault();
        if (height && weight) {
            const heightInMeters = height / 100;
            const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
            setBmi(bmiValue);

            if (bmiValue < 18.5) setCategory('Underweight');
            else if (bmiValue < 25) setCategory('Normal');
            else if (bmiValue < 30) setCategory('Overweight');
            else setCategory('Obese');
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F5F7] pt-32 pb-20 px-6 font-sans text-[#1D1D1F]">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-[#007AFF] font-bold tracking-wider uppercase text-xs mb-4 block">Body Metrics</span>
                    <h1 className="text-4xl md:text-5xl font-semibold text-[#1D1D1F] mb-4 tracking-tight">BMI Calculator</h1>
                    <p className="text-lg text-[#86868B] max-w-2xl mx-auto font-medium leading-relaxed">Understand your body mass index with precision.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Calculator Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100"
                    >
                        <form onSubmit={calculateBMI} className="space-y-8">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-[#86868B] ml-1">Gender</label>
                                    <div className="flex bg-[#F5F5F7] p-1.5 rounded-2xl">
                                        <button
                                            type="button"
                                            onClick={() => setGender('male')}
                                            className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${gender === 'male' ? 'bg-white text-[#1D1D1F] shadow-sm' : 'text-[#86868B] hover:text-[#1D1D1F]'}`}
                                        >
                                            Male
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setGender('female')}
                                            className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${gender === 'female' ? 'bg-white text-[#1D1D1F] shadow-sm' : 'text-[#86868B] hover:text-[#1D1D1F]'}`}
                                        >
                                            Female
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-[#86868B] ml-1">Age</label>
                                    <input
                                        type="number"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="w-full px-5 py-3.5 bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#007AFF] rounded-2xl outline-none font-semibold text-[#1D1D1F] text-lg transition-all"
                                        placeholder="25"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-[#86868B] ml-1">Height (cm)</label>
                                <input
                                    type="number"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    className="w-full px-5 py-3.5 bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#007AFF] rounded-2xl outline-none font-semibold text-[#1D1D1F] text-lg transition-all"
                                    placeholder="175"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-[#86868B] ml-1">Weight (kg)</label>
                                <input
                                    type="number"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="w-full px-5 py-3.5 bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#007AFF] rounded-2xl outline-none font-semibold text-[#1D1D1F] text-lg transition-all"
                                    placeholder="70"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-[#007AFF] text-white rounded-2xl font-semibold text-lg hover:bg-[#0051A8] transition shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group"
                            >
                                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" /> Calculate BMI
                            </button>
                        </form>
                    </motion.div>

                    {/* Results Display */}
                    <div className="space-y-6">
                        {bmi ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white p-10 rounded-[2.5rem] text-center relative overflow-hidden shadow-sm border border-gray-100"
                            >
                                <div className="relative z-10">
                                    <span className="text-[#007AFF] font-bold uppercase tracking-wider text-xs mb-6 block">Your Result</span>
                                    <h2 className="text-8xl font-semibold mb-4 tracking-tighter text-[#1D1D1F]">{bmi}</h2>
                                    <p className={`text-lg font-bold mb-10 px-6 py-2 rounded-full tracking-wide uppercase inline-block ${category === 'Normal' ? 'bg-green-50 text-[#34C759]' : 'bg-red-50 text-[#FF3B30]'}`}>{category}</p>

                                    <div className="w-full bg-[#F5F5F7] h-4 rounded-full overflow-hidden mb-12 relative">
                                        <div className="absolute left-0 w-[18.5%] h-full bg-blue-200"></div>
                                        <div className="absolute left-[18.5%] w-[6.5%] h-full bg-[#34C759]"></div>
                                        <div className="absolute left-[25%] w-[5%] h-full bg-orange-300"></div>
                                        <div className="absolute left-[30%] w-[70%] h-full bg-[#FF3B30]"></div>
                                        <motion.div
                                            initial={{ left: 0 }}
                                            animate={{ left: `${Math.min(bmi, 40) * 2.5}%` }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-md border-[3px] border-white z-20"
                                        ></motion.div>
                                    </div>

                                    <div className="bg-[#F5F5F7] p-8 text-left rounded-[2rem]">
                                        <h3 className="font-semibold text-xl mb-4 flex items-center gap-3 text-[#1D1D1F]"><Info className="w-6 h-6 text-[#007AFF]" /> Health Insight</h3>
                                        <p className="text-[#86868B] leading-relaxed font-medium text-base mb-8">
                                            {category === 'Normal'
                                                ? "You're in a healthy weight range. Maintain your current activity levels and balanced diet."
                                                : `Your BMI indicates you are ${category.toLowerCase()}. Consider adjusting your caloric intake and activity levels.`}
                                        </p>

                                        <button
                                            onClick={() => navigate('/diet-plan', { state: { bmi, weight, category } })}
                                            className="w-full py-4 bg-white text-[#1D1D1F] border border-gray-200 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-gray-50 transition shadow-sm flex items-center justify-center gap-3 group"
                                        >
                                            <Utensils className="w-4 h-4 text-[#007AFF]" /> detailed diet plan <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col justify-center items-center text-center p-16 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-200">
                                <div className="w-20 h-20 bg-[#F5F5F7] text-[#007AFF] rounded-[2rem] flex items-center justify-center mb-6">
                                    <Activity className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-semibold text-[#1D1D1F] mb-3">Enter Data</h3>
                                <p className="text-[#86868B] font-medium max-w-xs mx-auto">Fill out the form to calculate your BMI score.</p>
                            </div>
                        )}

                        {/* Quick Facts */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                                <h4 className="text-[10px] font-bold text-[#007AFF] uppercase tracking-wider mb-2">Optimal Target</h4>
                                <p className="text-3xl font-semibold text-[#1D1D1F] tracking-tight">18.5 - 25</p>
                            </div>
                            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                                <h4 className="text-[10px] font-bold text-[#007AFF] uppercase tracking-wider mb-2">Did you know?</h4>
                                <p className="text-sm font-medium text-[#86868B] leading-relaxed">Muscle mass can result in a higher BMI score.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BMICalculator;
