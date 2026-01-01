import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Leaf, Menu, X, ChevronDown, LayoutDashboard, Utensils, Dumbbell, Users, Heart, Zap, Scale, Activity, Camera, History, Sparkles, MessageSquare, CreditCard, HelpCircle, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Apple-style: Transparent at top, Glass when scrolled
    // Height fixed to prevent layout shift issues visually, but "fixed" position requires body padding (handled in Layout)
    const navBaseClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
            ? 'glass-nav border-gray-200/50 py-3'
            : 'bg-transparent border-transparent py-5'
        }`;

    // Helper for dropdown items
    const DropdownItem = ({ to, icon: Icon, label, color = "text-blue-500", bg = "bg-blue-50" }) => (
        <Link to={to} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F5F5F7] transition-colors group">
            <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center ${color} group-hover:scale-105 transition-transform`}>
                <Icon className="w-4 h-4" />
            </div>
            <div><p className="text-[13px] font-semibold text-[#1D1D1F]">{label}</p></div>
        </Link>
    );

    const desktopLinkClass = "px-3 py-2 rounded-full text-[13px] font-medium text-[#1D1D1F] hover:bg-[#000000]/5 transition-all flex items-center gap-1 group";

    return (
        <nav className={navBaseClass}>
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group z-50 relative">
                    <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center">
                        <Leaf className="w-5 h-5 fill-current" />
                    </div>
                    <span className="text-xl font-semibold text-[#1D1D1F] tracking-tight">SmartNutri</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-1">
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? "bg-black text-white px-4 py-2 rounded-full text-[13px] font-medium transition-all" : desktopLinkClass}>Dashboard</NavLink>

                    {/* Fitness Dropdown */}
                    <div className="relative group">
                        <button className={desktopLinkClass}>
                            Fitness <ChevronDown className="w-3 h-3 opacity-50 transition-transform group-hover:rotate-180" />
                        </button>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out">
                            <div className="w-64 bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-gray-200/50 p-2 overflow-hidden ring-1 ring-black/5">
                                <DropdownItem to="/workout-planner" icon={Dumbbell} label="Workout Planner" color="text-indigo-500" bg="bg-indigo-50" />
                                <DropdownItem to="/exercise-library" icon={Trophy} label="Exercise Library" color="text-orange-500" bg="bg-orange-50" />
                                <DropdownItem to="/yoga" icon={Wind} label="Yoga Studio" color="text-teal-500" bg="bg-teal-50" />
                                <DropdownItem to="/workout-logger" icon={History} label="Activity Log" color="text-red-500" bg="bg-red-50" />
                            </div>
                        </div>
                    </div>

                    {/* Nutrition Dropdown */}
                    <div className="relative group">
                        <button className={desktopLinkClass}>
                            Nutrition <ChevronDown className="w-3 h-3 opacity-50 transition-transform group-hover:rotate-180" />
                        </button>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out">
                            <div className="w-64 bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-gray-200/50 p-2 overflow-hidden ring-1 ring-black/5">
                                <DropdownItem to="/diet-plan" icon={Utensils} label="Weekly Meal Plan" color="text-green-500" bg="bg-green-50" />
                                <DropdownItem to="/food-recognition" icon={Camera} label="Food Scanner" color="text-blue-500" bg="bg-blue-50" />
                            </div>
                        </div>
                    </div>

                    {/* Health & Tools Dropdown */}
                    <div className="relative group">
                        <button className={desktopLinkClass}>
                            Health <ChevronDown className="w-3 h-3 opacity-50 transition-transform group-hover:rotate-180" />
                        </button>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out">
                            <div className="w-64 bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-gray-200/50 p-2 overflow-hidden ring-1 ring-black/5">
                                <DropdownItem to="/health" icon={Heart} label="Health Hub" color="text-rose-500" bg="bg-rose-50" />
                                <DropdownItem to="/bmi-calculator" icon={Scale} label="BMI Calculator" color="text-cyan-500" bg="bg-cyan-50" />
                                <DropdownItem to="/analytics" icon={Activity} label="Analytics" color="text-purple-500" bg="bg-purple-50" />
                            </div>
                        </div>
                    </div>

                    <NavLink to="/community" className={desktopLinkClass}>Community</NavLink>
                    <NavLink to="/pricing" className={desktopLinkClass}>Pricing</NavLink>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4 z-50">
                    <Link to="/chat" className="hidden sm:flex items-center gap-2 text-[#007AFF] text-[13px] font-medium hover:bg-blue-50 px-3 py-2 rounded-full transition-colors">
                        <MessageSquare className="w-4 h-4" /> AI Coach
                    </Link>

                    {user ? (
                        <div className="relative group">
                            <button className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
                                <span className="text-xs font-semibold pl-2">{user.name?.split(' ')[0]}</span>
                                <div className="w-7 h-7 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center text-xs font-bold">
                                    {user.name?.charAt(0)}
                                </div>
                            </button>
                            <div className="absolute top-full right-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="w-48 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 p-2">
                                    <DropdownItem to="/payment" icon={CreditCard} label="Billing" color="text-gray-500" bg="bg-gray-100" />
                                    <DropdownItem to="/contact" icon={HelpCircle} label="Support" color="text-gray-500" bg="bg-gray-100" />
                                    <div className="h-px bg-gray-100 my-1"></div>
                                    <button onClick={logout} className="w-full text-left px-3 py-2 rounded-xl hover:bg-red-50 text-red-600 text-[11px] font-bold tracking-wider uppercase flex items-center gap-2">
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link to="/auth/login" className="px-5 py-2 rounded-full text-[13px] font-semibold text-[#1D1D1F] hover:bg-gray-100 transition-colors">Log In</Link>
                            <Link to="/auth/signup" className="px-5 py-2 rounded-full text-[13px] font-semibold bg-[#1D1D1F] text-white hover:bg-black transition-all shadow-lg shadow-black/20">Sign Up</Link>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center text-[#1D1D1F] bg-[#F5F5F7] rounded-full">
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-x-4 top-24 bottom-4 bg-white/95 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-gray-100 z-40 overflow-y-auto lg:hidden"
                    >
                        <div className="p-6 space-y-8">
                            <div>
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Fitness</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <MobileNavLink to="/workout-planner" icon={Dumbbell} label="Workouts" onClick={() => setMobileMenuOpen(false)} />
                                    <MobileNavLink to="/yoga" icon={Wind} label="Yoga" onClick={() => setMobileMenuOpen(false)} />
                                    <MobileNavLink to="/exercise-library" icon={Trophy} label="Exercises" onClick={() => setMobileMenuOpen(false)} />
                                    <MobileNavLink to="/workout-logger" icon={History} label="Logs" onClick={() => setMobileMenuOpen(false)} />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Nutrition & Health</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <MobileNavLink to="/diet-plan" icon={Utensils} label="Diet Plan" onClick={() => setMobileMenuOpen(false)} />
                                    <MobileNavLink to="/food-recognition" icon={Camera} label="Scanner" onClick={() => setMobileMenuOpen(false)} />
                                    <MobileNavLink to="/health" icon={Heart} label="Health Hub" onClick={() => setMobileMenuOpen(false)} />
                                    <MobileNavLink to="/bmi-calculator" icon={Scale} label="BMI" onClick={() => setMobileMenuOpen(false)} />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Menu</h3>
                                <div className="space-y-2">
                                    <Link to="/community" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl font-bold">Community <Users className="w-4 h-4" /></Link>
                                    <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl font-bold">Pricing <CreditCard className="w-4 h-4" /></Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

// Import these if missing
import { Trophy, Wind } from 'lucide-react';

const MobileNavLink = ({ to, icon: Icon, label, onClick }) => (
    <Link to={to} onClick={onClick} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] font-semibold gap-2 hover:bg-blue-50 hover:text-blue-600 transition-colors">
        <Icon className="w-6 h-6" />
        <span className="text-xs">{label}</span>
    </Link>
);

export default Navbar;
