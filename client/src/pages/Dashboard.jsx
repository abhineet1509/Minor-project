import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Activity, Flame, Droplets, Target, Calendar,
    ChevronRight, Bell, Settings, LogOut, Utensils,
    Plus, Search, Menu, MessageCircle, Heart, Brain, Zap
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell
} from 'recharts';
import { motion } from 'framer-motion';
import WaterTracker from '../components/WaterTracker';
import FastingTracker from '../components/FastingTracker';

const Dashboard = () => {
    const { user, updateUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [stats, setStats] = useState({
        weight: '',
        calorieGoal: '',
        proteinGoal: '',
        hydrationGoal: '',
        dailyCalories: '',
        dailyProtein: '',
        dailyHydration: ''
    });

    useEffect(() => {
        if (user) {
            setStats({
                weight: user.weight || 70,
                calorieGoal: user.calorieGoal || 2000,
                proteinGoal: user.proteinGoal || 150,
                hydrationGoal: user.hydrationGoal || 2500,
                dailyCalories: user.dailyCalories || 0,
                dailyProtein: user.dailyProtein || 0,
                dailyHydration: user.dailyHydration || 0,
            });
            setLoading(false);
        }
    }, [user]);

    const handleStatChange = (key, value) => {
        setStats(prev => ({ ...prev, [key]: value }));
    };

    const handleSaveStats = async () => {
        try {
            await updateUser(stats);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update stats", error);
        }
    };

    // Format Data for Charts
    const weightChartData = user?.weightHistory?.length > 0
        ? user.weightHistory.map(entry => ({
            date: new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' }),
            weight: entry.weight
        }))
        : [
            { date: 'Mon', weight: user?.weight || 70 },
            { date: 'Tue', weight: user?.weight || 70 },
        ]; // Fallback if no history

    const macroData = [
        { name: 'Protein', value: stats.dailyProtein || 0, max: stats.proteinGoal || 150, color: '#007AFF' },
        { name: 'Carbs', value: 180, max: 250, color: '#FF9500' }, // Todo: Add carbs tracking
        { name: 'Fats', value: 45, max: 70, color: '#34C759' }, // Todo: Add fats tracking
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[#007AFF]/30 border-t-[#007AFF] rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F5F7] font-sans pb-20">
            {/* Main Content */}
            <main className="max-w-[1400px] mx-auto px-6 pt-32">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 animate-fade-in">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-semibold text-[#1D1D1F] tracking-tight mb-2">Welcome back, {user?.name?.split(' ')[0]}.</h1>
                        <div className="flex items-center gap-4">
                            <p className="text-[#86868B] text-lg">Here's your daily health summary.</p>
                            <button
                                onClick={() => !isEditing ? setIsEditing(true) : handleSaveStats()}
                                className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${isEditing ? 'bg-[#007AFF] text-white shadow-lg shadow-blue-500/30' : 'bg-gray-100 text-[#86868B] hover:bg-gray-200'}`}
                            >
                                {isEditing ? 'Save Changes' : 'Update Stats'}
                            </button>
                        </div>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-[#1D1D1F]">Systems Normal</span>
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    {[
                        {
                            key: 'dailyCalories',
                            targetKey: 'calorieGoal',
                            label: 'Calories',
                            value: stats.dailyCalories,
                            unit: 'kcal',
                            target: stats.calorieGoal || 2000,
                            icon: Flame,
                            color: 'text-orange-500',
                            bg: 'bg-orange-50',
                            isTarget: true
                        },
                        {
                            key: 'dailyProtein',
                            targetKey: 'proteinGoal',
                            label: 'Protein',
                            value: stats.dailyProtein,
                            unit: 'g',
                            target: stats.proteinGoal || 150,
                            icon: Utensils,
                            color: 'text-blue-500',
                            bg: 'bg-blue-50',
                            isTarget: true
                        },
                        {
                            key: 'dailyHydration',
                            targetKey: 'hydrationGoal',
                            label: 'Hydration',
                            value: (stats.dailyHydration / 1000).toFixed(1),
                            unit: 'L',
                            target: (stats.hydrationGoal || 2500) / 1000,
                            icon: Droplets,
                            color: 'text-cyan-500',
                            bg: 'bg-cyan-50',
                            isTarget: true,
                            isHydration: true
                        },
                        {
                            key: 'weight',
                            label: 'Weight',
                            value: stats.weight,
                            unit: 'kg',
                            target: 'Stable',
                            icon: Target,
                            color: 'text-emerald-500',
                            bg: 'bg-emerald-50',
                            isMain: true
                        },
                    ].map((stat, idx) => (
                        <div key={idx} className={`card-apple p-6 flex flex-col justify-between h-40 ${isEditing ? 'ring-2 ring-transparent hover:ring-[#007AFF]/10 transition-shadow' : ''}`}>
                            <div className="flex justify-between items-start">
                                <div className={`w-10 h-10 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                {isEditing && stat.isTarget ? (
                                    <div className="flex items-center gap-1 bg-[#F5F5F7] px-2 py-1 rounded-md">
                                        <span className="text-xs text-[#86868B]">/</span>
                                        <input
                                            type="number"
                                            value={stat.isHydration ? stats[stat.targetKey] / 1000 : stats[stat.targetKey]}
                                            onChange={(e) => handleStatChange(stat.targetKey, stat.isHydration ? e.target.value * 1000 : e.target.value)}
                                            className="w-12 text-xs font-semibold text-[#1D1D1F] bg-transparent text-right outline-none focus:text-[#007AFF]"
                                            placeholder="Goal"
                                        />
                                        <span className="text-xs text-[#86868B]">{stat.isHydration ? 'L' : stat.unit === 'kcal' ? '' : stat.unit}</span>
                                    </div>
                                ) : (
                                    <span className="text-xs font-semibold text-[#86868B] bg-gray-50 px-2 py-1 rounded-md">
                                        / {stat.isHydration ? stat.target : stat.target}{stat.isHydration ? 'L' : stat.unit === 'kcal' ? '' : stat.unit}
                                    </span>
                                )}
                            </div>
                            <div>
                                {isEditing ? (
                                    <div className="flex items-baseline gap-1 mt-1">
                                        <input
                                            type="number"
                                            value={stat.isHydration ? stats[stat.key] / 1000 : stats[stat.key]}
                                            onChange={(e) => handleStatChange(stat.key, stat.isHydration ? e.target.value * 1000 : e.target.value)}
                                            className="w-24 text-3xl font-semibold text-[#1D1D1F] bg-transparent border-b border-[#007AFF]/30 focus:border-[#007AFF] outline-none transition-colors"
                                            placeholder="0"
                                        />
                                        <span className="text-base text-[#86868B] font-medium">{stat.unit}</span>
                                    </div>
                                ) : (
                                    <h3 className="text-3xl font-semibold text-[#1D1D1F] tracking-tight">{stat.value}<span className="text-base text-[#86868B] ml-1 font-medium">{stat.unit}</span></h3>
                                )}
                                <p className="text-sm font-medium text-[#86868B]">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Bento Grid */}
                <div className="grid lg:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>

                    {/* Left Column (Charts) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Weight Trend */}
                        <div className="card-apple p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-semibold text-[#1D1D1F]">Weight Trend</h3>
                                <button className="text-[#007AFF] text-sm font-medium hover:underline">View History</button>
                            </div>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={weightChartData}>
                                        <defs>
                                            <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#007AFF" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#007AFF" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5EA" />
                                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#86868B', fontSize: 12 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#86868B', fontSize: 12 }} domain={['dataMin - 1', 'dataMax + 1']} />
                                        <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }} itemStyle={{ color: '#1D1D1F' }} />
                                        <Area type="monotone" dataKey="weight" stroke="#007AFF" strokeWidth={3} fill="url(#colorWeight)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Activity */}
                            <div className="card-apple p-8">
                                <h3 className="text-xl font-semibold text-[#1D1D1F] mb-6">Activity</h3>
                                <div className="h-48">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={[
                                            { day: 'M', mins: 45 }, { day: 'T', mins: 30 }, { day: 'W', mins: 60 },
                                            { day: 'T', mins: 45 }, { day: 'F', mins: 50 }, { day: 'S', mins: 90 }, { day: 'S', mins: 20 }
                                        ]}>
                                            <Bar dataKey="mins" fill="#007AFF" radius={[4, 4, 4, 4]} barSize={8} />
                                            <Tooltip cursor={{ fill: '#F5F5F7' }} contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Recent Log */}
                            <div className="card-apple p-8">
                                <h3 className="text-xl font-semibold text-[#1D1D1F] mb-6">Recent</h3>
                                <div className="space-y-4">
                                    {[
                                        { title: "Yoga Flow", time: "7:00 AM", cal: "120", bg: "bg-purple-100", text: "text-purple-600" },
                                        { title: "HIIT Cardio", time: "Yesterday", cal: "350", bg: "bg-orange-100", text: "text-orange-600" },
                                        { title: "Evening Walk", time: "Yesterday", cal: "85", bg: "bg-blue-100", text: "text-blue-600" },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between group cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full ${item.bg} ${item.text} flex items-center justify-center`}>
                                                    <Activity className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-[#1D1D1F]">{item.title}</p>
                                                    <p className="text-xs text-[#86868B]">{item.time}</p>
                                                </div>
                                            </div>
                                            <span className="text-sm font-medium text-[#1D1D1F]">{item.cal} kcal</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Sidebars) */}
                    <div className="space-y-8">

                        {/* Diet Plan Promo */}
                        <div className="card-apple p-8 bg-[#1D1D1F] text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-semibold mb-2">Neural Diet Plan</h3>
                                <p className="text-gray-400 text-sm mb-6">AI-optimized nutrition for today.</p>
                                <Link to="/diet-plan" className="btn-apple-secondary px-6 py-3 text-sm inline-flex items-center gap-2">
                                    View Plan <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <Brain className="absolute -bottom-4 -right-4 w-32 h-32 text-gray-800 opacity-50 group-hover:rotate-12 transition-transform duration-500" />
                        </div>

                        {/* Macros */}
                        <div className="card-apple p-8">
                            <h3 className="text-xl font-semibold text-[#1D1D1F] mb-6">Macronutrients</h3>
                            <div className="space-y-6">
                                {macroData.map((macro, idx) => (
                                    <div key={idx}>
                                        <div className="flex justify-between text-sm mb-2 font-medium">
                                            <span className="text-[#1D1D1F]">{macro.name}</span>
                                            <span className="text-[#86868B]">{macro.value} / {macro.max}g</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(macro.value / macro.max) * 100}%` }}
                                                className="h-full rounded-full"
                                                style={{ backgroundColor: macro.color }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Trackers - TODO: Refactor these components to be light mode compatible too */}
                        {/* For now, wrapping them in a light container or just letting them look different */}
                        {/* Ideally, we should update WaterTracker and FastingTracker too, but for scope, we'll leave them or do minimal */}
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;
