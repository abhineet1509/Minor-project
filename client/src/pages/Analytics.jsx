import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { TrendingUp, Activity, Target, Calendar, ChevronRight, BarChart2, Plus, Check, Trash2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

import { API_BASE_URL } from '../config';

const Analytics = () => {
    const { user, updateUser } = useAuth();
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditingWeight, setIsEditingWeight] = useState(false);
    const [newWeight, setNewWeight] = useState('');

    // To-Do List State
    const [todos, setTodos] = useState(() => {
        try {
            const savedTodos = localStorage.getItem('analyticsTodos');
            return savedTodos ? JSON.parse(savedTodos) : [
                { id: 1, text: "Review weekly calorie deficit", completed: false },
                { id: 2, text: "Plan next week's meal prep", completed: true },
            ];
        } catch (e) {
            return [];
        }
    });
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        localStorage.setItem('analyticsTodos', JSON.stringify(todos));
    }, [todos]);

    const handleAddTodo = (e) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
        setNewTodo('');
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/workouts/logs`, { withCredentials: true });
                setLogs(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    const handleUpdateWeight = async () => {
        if (!newWeight) return;
        try {
            await updateUser({ weight: newWeight });
            setIsEditingWeight(false);
            setNewWeight('');
        } catch (error) {
            console.error("Failed to update weight:", error);
            alert("Failed to update weight. Please try again.");
        }
    };

    // Process Weight Data from User History
    const weightTrend = user?.weightHistory?.length > 0
        ? user.weightHistory.map(entry => ({
            date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            weight: entry.weight
        }))
        : [
            { date: 'Start', weight: user?.weight || 70 },
            { date: 'Now', weight: user?.weight || 70 }
        ];

    // Calculate Mass Delta (Last recorded change)
    const massDelta = user?.weightHistory?.length >= 2
        ? (user.weightHistory[user.weightHistory.length - 1].weight - user.weightHistory[user.weightHistory.length - 2].weight).toFixed(1)
        : '0.0';

    const volumeTrend = logs.slice(0, 7).reverse().map(log => ({
        date: new Date(log.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        volume: log.totalVolume
    }));

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
            <div className="w-8 h-8 border-4 border-[#007AFF]/30 border-t-[#007AFF] rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F5F5F7] font-sans pb-20">
            {/* Header - Fixed Z-Index to avoid blocking Navbar */}
            <div className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-gray-100 mb-12">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-[#1D1D1F]">Analytics</h1>
                    <div className="text-sm font-medium text-[#86868B]">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-semibold text-[#1D1D1F] tracking-tight mb-2">Performance Data</h1>
                    <p className="text-[#86868B] text-lg font-medium">Real-time analysis of your fitness journey.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { label: 'Mean Volume', value: logs.length > 0 ? Math.round(logs.reduce((a, b) => a + b.totalVolume, 0) / logs.length) : 0, unit: 'kg', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-50' },
                                { label: 'Active Logs', value: logs.length, unit: 'sessions', icon: Calendar, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                                { label: 'Mass Delta', value: massDelta > 0 ? `+${massDelta}` : massDelta, unit: 'kg', icon: TrendingUp, color: parseFloat(massDelta) <= 0 ? 'text-emerald-500' : 'text-orange-500', bg: parseFloat(massDelta) <= 0 ? 'bg-emerald-50' : 'bg-orange-50' },
                                { label: 'Sync Rate', value: '85', unit: '%', icon: Target, color: 'text-orange-500', bg: 'bg-orange-50' },
                            ].map((s, i) => (
                                <div key={i} className="card-apple p-6 flex flex-col justify-between h-40 group hover:scale-[1.02] transition-transform duration-300">
                                    <div className="flex justify-between items-start">
                                        <div className={`w-10 h-10 rounded-full ${s.bg} ${s.color} flex items-center justify-center`}>
                                            <s.icon className="w-5 h-5" />
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-300" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-semibold text-[#1D1D1F] tracking-tight">{s.value}<span className="text-base text-[#86868B] ml-1 font-medium">{s.unit}</span></h3>
                                        <p className="text-sm font-medium text-[#86868B]">{s.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Weight Journey */}
                        <div className="card-apple p-8">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h3 className="text-xl font-semibold text-[#1D1D1F]">Mass Trajectory</h3>
                                    <p className="text-sm text-[#86868B]">Current: {user?.weight || '--'} kg</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    {isEditingWeight ? (
                                        <div className="flex items-center gap-2 animate-fade-in">
                                            <input
                                                type="number"
                                                value={newWeight}
                                                onChange={(e) => setNewWeight(e.target.value)}
                                                placeholder="New Weight"
                                                className="w-24 px-3 py-1 bg-[#F5F5F7] rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20"
                                                autoFocus
                                            />
                                            <button
                                                onClick={handleUpdateWeight}
                                                className="px-3 py-1 bg-[#007AFF] text-white rounded-full text-xs font-bold hover:bg-[#0051A8] transition"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setIsEditingWeight(false)}
                                                className="px-3 py-1 bg-gray-100 text-[#86868B] rounded-full text-xs font-bold hover:bg-gray-200 transition"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => { setIsEditingWeight(true); setNewWeight(user?.weight || ''); }}
                                            className="px-4 py-2 bg-[#F5F5F7] text-[#007AFF] rounded-full text-xs font-bold hover:bg-[#007AFF] hover:text-white transition-all"
                                        >
                                            Update Weight
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={weightTrend}>
                                        <defs>
                                            <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#007AFF" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#007AFF" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5EA" />
                                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#86868B', fontSize: 12 }} />
                                        <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}
                                            itemStyle={{ color: '#1D1D1F' }}
                                        />
                                        <Area type="monotone" dataKey="weight" stroke="#007AFF" strokeWidth={3} fill="url(#colorWeight)" animationDuration={1000} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Workout Volume */}
                        <div className="card-apple p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-semibold text-[#1D1D1F]">Load Intensity</h3>
                                <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full">
                                    <BarChart2 className="w-3 h-3 text-blue-600" />
                                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">Incremental</span>
                                </div>
                            </div>
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={volumeTrend.length > 0 ? volumeTrend : [{ date: 'No Data', volume: 0 }]}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5EA" />
                                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#86868B', fontSize: 12 }} />
                                        <YAxis hide />
                                        <Tooltip
                                            cursor={{ fill: '#F5F5F7' }}
                                            contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}
                                        />
                                        <Bar dataKey="volume" fill="#007AFF" radius={[4, 4, 4, 4]} barSize={32} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-8">
                        {/* To-Do List */}
                        <div className="card-apple p-6">
                            <h3 className="text-xl font-semibold text-[#1D1D1F] mb-4">Focus Goals</h3>
                            <form onSubmit={handleAddTodo} className="mb-4 relative">
                                <input
                                    type="text"
                                    value={newTodo}
                                    onChange={(e) => setNewTodo(e.target.value)}
                                    placeholder="Add a new goal..."
                                    className="w-full pl-4 pr-10 py-3 bg-[#F5F5F7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 transition-all"
                                />
                                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#007AFF] text-white rounded-lg hover:bg-[#0051A8] transition">
                                    <Plus className="w-4 h-4" />
                                </button>
                            </form>
                            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                                {todos.map(todo => (
                                    <div key={todo.id} className="flex items-center gap-3 p-3 hover:bg-[#F5F5F7] rounded-xl group transition-colors">
                                        <div
                                            onClick={() => toggleTodo(todo.id)}
                                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${todo.completed ? 'bg-[#007AFF] border-[#007AFF]' : 'border-gray-300'}`}
                                        >
                                            {todo.completed && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <span className={`flex-1 text-sm font-medium transition-colors ${todo.completed ? 'text-gray-400 line-through' : 'text-[#1D1D1F]'}`}>
                                            {todo.text}
                                        </span>
                                        <button
                                            onClick={() => deleteTodo(todo.id)}
                                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                {todos.length === 0 && (
                                    <p className="text-center text-sm text-gray-400 py-4">No goals yet. Add one above!</p>
                                )}
                            </div>
                        </div>

                        {/* Recent Activity Mini */}
                        <div className="card-apple p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-[#1D1D1F]">Recent Logs</h3>
                                <button className="text-xs text-[#007AFF] font-medium hover:underline">See All</button>
                            </div>
                            <div className="space-y-4">
                                {logs.slice(0, 3).map((log, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
                                            <Activity className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-[#1D1D1F]">Workout</p>
                                            <p className="text-xs text-[#86868B]">{new Date(log.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
                                        </div>
                                        <div className="ml-auto text-right">
                                            <p className="text-sm font-semibold text-[#1D1D1F]">{log.totalVolume}kg</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Analytics;
