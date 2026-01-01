import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Moon, Sun, Heart, AlertCircle, CheckCircle } from 'lucide-react';

const HealthHub = () => {
    const [waterIntake, setWaterIntake] = useState(3); // glasses
    const [sleepHours, setSleepHours] = useState(7);
    const [mood, setMood] = useState('');

    return (
        <div className="min-h-screen bg-[#F5F5F7] p-6 pt-24 pb-12 font-sans text-[#1D1D1F]">
            <header className="max-w-[1200px] mx-auto mb-12">
                <div className="flex items-center gap-2 mb-2 text-[#007AFF]">
                    <Heart className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Vital Signs</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1D1D1F]">Health Hub</h1>
                <p className="text-[#86868B] text-lg mt-2 font-medium">Your biological homeostasis, monitored.</p>
            </header>

            <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-8">
                {/* Hydration Card */}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden group"
                >
                    <div className="flex justify-between items-start mb-10 relative z-10">
                        <div>
                            <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-1">Hydration</h2>
                            <p className="text-[#86868B] text-xs font-bold uppercase tracking-wider">Goal: 8 Cups</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-50 text-[#007AFF] rounded-full flex items-center justify-center">
                            <Droplets className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-8 mb-10 relative z-10">
                        <button
                            onClick={() => setWaterIntake(Math.max(0, waterIntake - 1))}
                            className="w-12 h-12 rounded-full bg-[#F5F5F7] text-[#1D1D1F] font-medium text-2xl hover:bg-gray-200 transition flex items-center justify-center"
                        >-</button>
                        <div className="text-center w-24">
                            <span className="text-6xl font-semibold text-[#1D1D1F] tracking-tight">{waterIntake}</span>
                            <p className="text-[#86868B] font-bold uppercase text-[10px] tracking-widest mt-2">Cups</p>
                        </div>
                        <button
                            onClick={() => setWaterIntake(waterIntake + 1)}
                            className="w-12 h-12 rounded-full bg-[#007AFF] text-white font-medium text-2xl hover:bg-[#0051A8] shadow-lg shadow-blue-500/30 transition flex items-center justify-center"
                        >+</button>
                    </div>

                    <div className="relative z-10">
                        <div className="h-3 w-full bg-[#F5F5F7] rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-[#007AFF] rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min((waterIntake / 8) * 100, 100)}%` }}
                            />
                        </div>
                        <p className="text-center mt-6 text-[11px] font-bold uppercase tracking-wider text-[#86868B]">
                            {waterIntake >= 8 ? <span className="text-[#34C759] flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4" /> Goal Met</span> : 'Keep Drinking'}
                        </p>
                    </div>
                </motion.div>

                {/* Sleep Card */}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden group"
                >
                    <div className="flex justify-between items-start mb-10 relative z-10">
                        <div>
                            <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-1">Sleep Quality</h2>
                            <p className="text-[#86868B] text-xs font-bold uppercase tracking-wider">Goal: 8 Hours</p>
                        </div>
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center">
                            <Moon className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="flex flex-col items-center mb-8 relative z-10">
                        <div className="w-full flex justify-between px-2 mb-2 text-[10px] font-bold text-[#86868B] uppercase tracking-wider">
                            <span>4h</span>
                            <span>8h</span>
                            <span>12h</span>
                        </div>
                        <input
                            type="range"
                            min="4"
                            max="12"
                            step="0.5"
                            value={sleepHours}
                            onChange={(e) => setSleepHours(Number(e.target.value))}
                            className="w-full h-2 bg-[#F5F5F7] rounded-full appearance-none cursor-pointer accent-[#007AFF] hover:accent-[#0051A8] transition"
                        />
                        <div className="mt-8 text-center">
                            <span className="text-6xl font-semibold text-[#1D1D1F] tracking-tight">{sleepHours}</span>
                            <span className="text-lg text-[#86868B] font-medium ml-1">hrs</span>
                        </div>
                    </div>

                    <div className="p-4 bg-[#F5F5F7] rounded-2xl relative z-10">
                        <div className="flex items-center gap-3">
                            <AlertCircle className={`w-5 h-5 ${sleepHours < 7 || sleepHours > 9 ? 'text-[#FF3B30]' : 'text-[#34C759]'}`} />
                            <p className="text-xs font-semibold text-[#1D1D1F]">
                                {sleepHours < 7 ? "Rest deficit detected." : sleepHours > 9 ? "Oversleeping detected." : "Optimal restoration."}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Mood & Map */}
            <div className="max-w-[1200px] mx-auto mt-8 grid md:grid-cols-2 gap-8">
                {/* Mood Tracker */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                    <h3 className="text-xl font-semibold text-[#1D1D1F] mb-6">How are you feeling?</h3>
                    <div className="flex justify-between gap-2 mb-8">
                        {['😡', '😔', '😐', '🙂', '😄'].map((emoji, idx) => (
                            <button key={idx} className="w-12 h-12 rounded-2xl bg-[#F5F5F7] hover:bg-blue-50 hover:scale-110 transition-all text-2xl flex items-center justify-center grayscale hover:grayscale-0">
                                {emoji}
                            </button>
                        ))}
                    </div>
                    <textarea
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                        placeholder="Log your thoughts..."
                        className="w-full p-4 bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#007AFF] rounded-2xl text-sm font-medium text-[#1D1D1F] focus:outline-none placeholder:text-[#86868B] resize-none transition-all h-32"
                    ></textarea>
                </div>

                <div className="bg-white p-2 rounded-[2.5rem] shadow-sm border border-gray-100 h-[22rem] overflow-hidden relative group">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093747!2d144.9537353153169!3d-37.81720997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d6a32f623631!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1625624748443!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        className="rounded-[2rem]"
                    ></iframe>
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider text-[#1D1D1F] shadow-lg pointer-events-none">
                        📍 Wellness Center
                    </div>
                </div>
            </div>

            {/* Daily Tip */}
            <div className="max-w-[1200px] mx-auto mt-8">
                <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                    <div className="w-16 h-16 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Sun className="w-8 h-8" />
                    </div>
                    <div>
                        <span className="text-[#007AFF] font-bold uppercase tracking-wider text-[10px] mb-2 block">Daily Insight</span>
                        <h3 className="text-xl font-semibold text-[#1D1D1F] mb-2">Morning Protocol</h3>
                        <p className="text-[#86868B] text-lg leading-relaxed font-medium">"Start your morning with a glass of warm lemon water to kickstart your metabolism and hydration."</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthHub;
