import React, { useState } from 'react';
import { Activity, Search, Filter, PlayCircle } from 'lucide-react';

const ExerciseLibrary = () => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');

    const exercises = [
        { name: "Pushups", type: "No-equipment", muscles: ["Chest", "Triceps"], difficulty: "Beginner", video: "https://www.youtube.com/embed/IODxDxX7oi4" },
        { name: "Squats", type: "No-equipment", muscles: ["Legs", "Glutes"], difficulty: "Beginner", video: "https://www.youtube.com/embed/aclHkVaku9U" },
        { name: "Bench Press", type: "Gym", muscles: ["Chest", "Triceps"], difficulty: "Intermediate", video: "https://www.youtube.com/embed/rT7DgCr-3ps" },
        { name: "Deadlift", type: "Gym", muscles: ["Back", "Legs"], difficulty: "Advanced", video: "https://www.youtube.com/embed/op9kVnSso6Q" },
        { name: "Pull-ups", type: "Home", muscles: ["Back", "Biceps"], difficulty: "Intermediate", video: "https://www.youtube.com/embed/eGo4IYlbE5g" }
    ];

    const filtered = exercises.filter(ex =>
        (filter === 'All' || ex.type === filter) &&
        (ex.name.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-[#F5F5F7] p-6 pt-24 pb-12 font-sans text-[#1D1D1F]">
            <div>
                <header className="max-w-[1200px] mx-auto mb-10">
                    <h1 className="text-4xl font-semibold tracking-tight text-[#1D1D1F] mb-6">Exercise Library</h1>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative group">
                            <input
                                type="text"
                                placeholder="Search movements..."
                                className="w-full p-4 pl-12 rounded-2xl border border-gray-200 bg-white text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#007AFF]/20 transition-all font-medium placeholder:text-gray-400 shadow-sm"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#007AFF] transition-colors">
                                <Search className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                <Filter className="w-4 h-4" />
                            </div>
                            <select
                                className="p-4 pl-10 pr-10 rounded-2xl border border-gray-200 bg-white text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#007AFF]/20 transition-all font-semibold text-sm cursor-pointer shadow-sm appearance-none"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="All">All Types</option>
                                <option value="Gym">Gym</option>
                                <option value="Home">Home</option>
                                <option value="No-equipment">Bodyweight</option>
                            </select>
                        </div>
                    </div>
                </header>

                <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((ex, i) => (
                        <div key={i} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                            <div className="aspect-video bg-gray-100 relative">
                                <iframe
                                    className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                                    src={ex.video}
                                    title={ex.name}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold text-[#1D1D1F]">{ex.name}</h3>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${ex.difficulty === 'Beginner' ? 'bg-green-50 text-green-600 border-green-100' : ex.difficulty === 'Intermediate' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                                        {ex.difficulty}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {ex.muscles.map(m => (
                                        <span key={m} className="px-2 py-1 bg-[#F5F5F7] text-[#86868B] rounded-md text-[11px] font-semibold">{m}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExerciseLibrary;
