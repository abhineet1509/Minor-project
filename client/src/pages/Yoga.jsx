import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Heart, Star, Filter } from 'lucide-react';

const Yoga = () => {
    const [filter, setFilter] = useState('all');

    const asanas = [
        { name: "Sun Salutation", difficulty: "Beginner", duration: "10 min", focus: "Full Body", image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&q=80&w=800" },
        { name: "Warrior II", difficulty: "Intermediate", duration: "5 min", focus: "Legs & Core", image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&q=80&w=800" },
        { name: "Tree Pose", difficulty: "Beginner", duration: "3 min", focus: "Balance", image: "https://images.unsplash.com/photo-1566501206188-5dd0cf160a0e?auto=format&fit=crop&q=80&w=800" },
        { name: "Downward Dog", difficulty: "Beginner", duration: "5 min", focus: "Flexibility", image: "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&q=80&w=800" },
        { name: "Crow Pose", difficulty: "Advanced", duration: "8 min", focus: "Arm Strength", image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80&w=800" },
        { name: "Child's Pose", difficulty: "Beginner", duration: "5 min", focus: "Relaxation", image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&q=80&w=800" },
    ];

    const filteredAsanas = filter === 'all' ? asanas : asanas.filter(a => a.difficulty.toLowerCase() === filter);

    return (
        <div className="min-h-screen bg-[#F5F5F7] p-6 pt-24 pb-12 font-sans text-[#1D1D1F]">
            <div className="max-w-[1200px] mx-auto">
                <header className="mb-12 text-center">
                    <div className="inline-block bg-white px-4 py-1.5 rounded-full shadow-sm border border-gray-100 mb-6">
                        <span className="text-[#007AFF] font-bold text-xs uppercase tracking-widest">Mind & Body</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-semibold text-[#1D1D1F] mb-4 tracking-tight">Yoga Studio</h1>
                    <p className="text-xl text-[#86868B] max-w-xl mx-auto font-medium">Find your flow with our curated collection of asanas.</p>
                </header>

                {/* Filters */}
                <div className="flex justify-center gap-2 mb-12 flex-wrap">
                    {['all', 'beginner', 'intermediate', 'advanced'].map((lvl) => (
                        <button
                            key={lvl}
                            onClick={() => setFilter(lvl)}
                            className={`px-6 py-2 rounded-full font-semibold text-sm transition-all capitalize ${filter === lvl ? 'bg-[#1D1D1F] text-white shadow-md' : 'bg-white text-[#86868B] hover:bg-gray-50 border border-gray-200'}`}
                        >
                            {lvl}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAsanas.map((asana, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-60"></div>
                                <img src={asana.image} alt={asana.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                                <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-white/90 backdrop-blur-md text-[#1D1D1F]">
                                    {asana.difficulty}
                                </span>
                                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                    <div className="w-14 h-14 bg-white/30 backdrop-blur-md text-white rounded-full flex items-center justify-center">
                                        <Play className="w-6 h-6 ml-1 fill-current" />
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-[#1D1D1F] mb-1">{asana.name}</h3>
                                <p className="text-sm text-[#86868B] font-medium mb-4 flex items-center gap-2">
                                    <Clock className="w-3 h-3" /> {asana.duration}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-2 text-xs font-bold text-[#007AFF] bg-blue-50 px-3 py-1 rounded-full">
                                        <Heart className="w-3 h-3" /> {asana.focus}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Yoga;
