import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Users, Gift, ChevronRight, Star, Flame, Medal, Share2, Droplets, Clock } from 'lucide-react';

const Community = () => {
    const [activeTab, setActiveTab] = useState('Challenges');

    const challenges = [
        { id: 1, title: "7-Day Sugar Detox", participants: 1240, daysLeft: 4, icon: <Flame className="text-orange-500" />, prize: "500 Points" },
        { id: 2, title: "Daily 10k Steps", participants: 3500, daysLeft: 12, icon: <Star className="text-yellow-500" />, prize: "Exclusive Badge" },
        { id: 3, title: "Hydration Hero", participants: 890, daysLeft: 2, icon: <Droplets className="text-blue-500" />, prize: "100 Points" }
    ];

    const leaderboard = [
        { rank: 1, name: "Marcus J.", points: 12450, avatar: "MJ" },
        { rank: 2, name: "Sarah K.", points: 11200, avatar: "SK" },
        { rank: 3, name: "Leo T.", points: 10800, avatar: "LT" },
        { rank: 4, name: "Anna B.", points: 9500, avatar: "AB" },
        { rank: 5, name: "Chris P.", points: 8700, avatar: "CP" }
    ];

    return (
        <div className="min-h-screen bg-[#F5F5F7] p-6 md:p-12 font-sans text-[#1D1D1F]">
            <header className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div>
                    <span className="text-[#007AFF] font-bold tracking-wider uppercase text-xs mb-4 block">Together We Thrive</span>
                    <h1 className="text-4xl md:text-6xl font-semibold text-[#1D1D1F] tracking-tight mb-4">Community</h1>
                    <p className="text-[#86868B] font-medium text-lg">Connect, compete, and grow with the global community.</p>
                </div>
                <div className="flex bg-[#E5E5EA] p-1.5 rounded-full">
                    {['Challenges', 'Leaderboard', 'Rewards'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${activeTab === tab ? 'bg-white text-[#1D1D1F] shadow-sm' : 'text-[#86868B] hover:text-[#1D1D1F]'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </header>

            <div className="max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                    {activeTab === 'Challenges' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {challenges.map(c => (
                                <div key={c.id} className="bg-white p-10 rounded-[2.5rem] shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                                    <div className="w-16 h-16 bg-[#F5F5F7] rounded-2xl flex items-center justify-center mb-8 text-2xl group-hover:scale-110 transition-transform">
                                        {c.icon}
                                    </div>
                                    <h3 className="text-2xl font-semibold text-[#1D1D1F] mb-3 tracking-tight">{c.title}</h3>
                                    <div className="flex items-center gap-4 text-[#86868B] text-[10px] font-bold uppercase tracking-wider mb-10">
                                        <span className="flex items-center gap-2"><Users className="w-4 h-4 text-[#007AFF]" /> {c.participants.toLocaleString()} joined</span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#007AFF]" /> {c.daysLeft}d left</span>
                                    </div>
                                    <div className="p-4 bg-[#F5F5F7] rounded-2xl mb-8 flex justify-between items-center">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868B]">Reward</span>
                                        <span className="font-bold text-[#1D1D1F] text-sm">{c.prize}</span>
                                    </div>
                                    <button className="w-full py-4 bg-[#007AFF] text-white rounded-xl font-bold text-sm hover:bg-[#0051A8] transition shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2">
                                        Join Challenge
                                    </button>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {activeTab === 'Leaderboard' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden"
                        >
                            <div className="p-10 border-b border-gray-100 bg-[#FAFAFA] flex justify-between items-center">
                                <h2 className="text-3xl font-semibold text-[#1D1D1F] flex items-center gap-4 tracking-tight">
                                    <Trophy className="text-[#FFD60A] w-10 h-10" /> Top Performers
                                </h2>
                                <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider">Updated 5m ago</span>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {leaderboard.map(u => (
                                    <div key={u.rank} className="p-8 flex items-center justify-between hover:bg-[#F5F5F7] transition-all duration-200">
                                        <div className="flex items-center gap-8">
                                            <span className={`text-2xl font-bold w-8 text-center ${u.rank === 1 ? 'text-[#FFD60A]' : u.rank === 2 ? 'text-[#AEAEB2]' : u.rank === 3 ? 'text-[#BF5AF2]' : 'text-[#86868B]'}`}>
                                                {u.rank}
                                            </span>
                                            <div className="w-14 h-14 bg-[#E5E5EA] rounded-full flex items-center justify-center font-bold text-[#1D1D1F] text-lg">
                                                {u.avatar}
                                            </div>
                                            <span className="font-semibold text-[#1D1D1F] text-xl tracking-tight">{u.name}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-[#1D1D1F] tracking-tight">{u.points.toLocaleString()}</p>
                                            <p className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider mt-1">Points</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'Rewards' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-3xl mx-auto"
                        >
                            <div className="bg-white rounded-[2.5rem] p-12 text-center shadow-xl border border-gray-100 mb-10">
                                <div className="w-20 h-20 bg-[#007AFF] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-500/30">
                                    <Gift className="w-10 h-10 text-white" />
                                </div>
                                <h2 className="text-4xl font-semibold text-[#1D1D1F] mb-4 tracking-tight">Refer & Earn</h2>
                                <p className="text-[#86868B] font-medium text-lg mb-10 max-w-lg mx-auto leading-relaxed">Invite friends to join the community and earn 1,000 points for every successful referral.</p>
                                <div className="p-3 bg-[#F5F5F7] rounded-2xl flex items-center gap-4 max-w-lg mx-auto">
                                    <code className="flex-1 font-mono text-lg font-bold text-[#1D1D1F] tracking-wider">HEALTH-2025</code>
                                    <button className="px-8 py-4 bg-[#1D1D1F] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-black transition text-xs uppercase tracking-wider">
                                        <Share2 className="w-4 h-4" /> Copy
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                    <div className="w-12 h-12 bg-[#FFD60A]/10 rounded-xl flex items-center justify-center mb-4 text-[#FFD60A]">
                                        <Medal className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-semibold text-[#1D1D1F] text-lg mb-1 tracking-tight">Pro Status</h4>
                                    <p className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider">50k Points</p>
                                </div>
                                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                    <div className="w-12 h-12 bg-[#FF3B30]/10 rounded-xl flex items-center justify-center mb-4 text-[#FF3B30]">
                                        <Gift className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-semibold text-[#1D1D1F] text-lg mb-1 tracking-tight">Free Month</h4>
                                    <p className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider">5 Referrals</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Community;
