import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, TrendingUp, AlertCircle, Plus, Settings, Search, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-[#F5F5F7] font-sans pb-20">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-[#1D1D1F]">Admin Console</h1>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868B]" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2 bg-[#F5F5F7] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 w-64 transition-all"
                            />
                        </div>
                        <button className="p-2 text-[#86868B] hover:bg-[#F5F5F7] rounded-full transition relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <div className="w-8 h-8 bg-gradient-to-br from-[#007AFF] to-[#00C7BE] rounded-full"></div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 pt-12">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-semibold text-[#1D1D1F] tracking-tight mb-2">Dashboard</h2>
                        <p className="text-[#86868B] text-lg">Platform overview and content management.</p>
                    </div>
                    <Link to="/admin/upload-diet" className="flex items-center gap-2 px-6 py-3 bg-[#1D1D1F] text-white rounded-full font-medium hover:bg-black transition shadow-lg shadow-black/5 hover:scale-105 active:scale-95 duration-200">
                        <Plus className="w-5 h-5" /> New Diet Plan
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { label: "Total Users", value: "12,450", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
                        { label: "Active Plans", value: "8,320", icon: FileText, color: "text-indigo-500", bg: "bg-indigo-50" },
                        { label: "Pending Reviews", value: "15", icon: AlertCircle, color: "text-orange-500", bg: "bg-orange-50" },
                    ].map((stat, idx) => (
                        <div key={idx} className="card-apple p-6 flex items-center gap-6 group hover:scale-[1.02] transition-transform duration-300">
                            <div className={`p-4 rounded-full ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[#86868B] font-medium text-xs uppercase tracking-wider mb-1">{stat.label}</p>
                                <p className="text-3xl font-semibold text-[#1D1D1F] tracking-tight">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-12">
                    {/* Recent Content Table */}
                    <div className="lg:col-span-2 card-apple overflow-hidden p-0">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-[#1D1D1F]">Recent Signups</h3>
                            <button className="text-sm font-medium text-[#007AFF] hover:underline">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#F5F5F7] text-[#86868B] font-semibold text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Plan</th>
                                        <th className="px-6 py-4">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[
                                        { name: "Alex Morgan", email: "alex@example.com", status: "Active", plan: "Pro Monthly", date: "2 mins ago" },
                                        { name: "Sarah Jones", email: "sarah@example.com", status: "Pending", plan: "Free", date: "15 mins ago" },
                                        { name: "Mike Ross", email: "mike@example.com", status: "Active", plan: "Pro Yearly", date: "1 hour ago" },
                                        { name: "Emily Clark", email: "emily@example.com", status: "Inactive", plan: "Free", date: "3 hours ago" },
                                    ].map((user, idx) => (
                                        <tr key={idx} className="hover:bg-[#F5F5F7]/50 transition">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gray-100 text-[#86868B] flex items-center justify-center font-bold text-xs ring-2 ring-white">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-[#1D1D1F] text-sm">{user.name}</p>
                                                        <p className="text-xs text-[#86868B]">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${user.status === 'Active' ? 'bg-green-100 text-green-700' :
                                                        user.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'
                                                    }`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-[#1D1D1F]">{user.plan}</td>
                                            <td className="px-6 py-4 text-sm text-[#86868B]">{user.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Activity Feed */}
                    <div className="card-apple p-6">
                        <h3 className="text-lg font-semibold text-[#1D1D1F] mb-6">Live Activity</h3>
                        <div className="space-y-6">
                            {[
                                { text: "New subscription purchased", time: "Just now", icon: FileText, color: "bg-green-100 text-green-600" },
                                { text: "System update completed", time: "2h ago", icon: Settings, color: "bg-blue-100 text-blue-600" },
                                { text: "User reported an issue", time: "5h ago", icon: AlertCircle, color: "bg-red-100 text-red-600" },
                                { text: "New diet plan template added", time: "1d ago", icon: Plus, color: "bg-indigo-100 text-indigo-600" },
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className={`mt-1 w-8 h-8 rounded-full ${item.color} flex items-center justify-center shrink-0`}>
                                        <item.icon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-[#1D1D1F]">{item.text}</p>
                                        <p className="text-xs text-[#86868B]">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <h3 className="text-xl font-semibold text-[#1D1D1F] mb-6">Management</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <Link to="/admin/upload-diet" className="group card-apple p-8 flex items-start gap-6 hover:border-[#007AFF] transition-colors cursor-pointer ring-1 ring-transparent hover:ring-[#007AFF]/10">
                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform duration-300">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-[#1D1D1F] mb-1 group-hover:text-[#007AFF] transition-colors">Manage Diet Plans</h3>
                            <p className="text-[#86868B] text-sm leading-relaxed">Upload new AI templates, edit existing meal databases, and review user feedback.</p>
                        </div>
                    </Link>

                    <div className="group card-apple p-8 flex items-start gap-6 hover:border-[#007AFF] transition-colors cursor-pointer ring-1 ring-transparent hover:ring-[#007AFF]/10">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
                            <Settings className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-[#1D1D1F] mb-1 group-hover:text-[#007AFF] transition-colors">System Settings</h3>
                            <p className="text-[#86868B] text-sm leading-relaxed">Configure AI parameters, update pricing tiers, and manage global notifications.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
