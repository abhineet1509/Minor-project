import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Leaf, Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-6 font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md"
            >
                <div className="bg-white p-10 md:p-12 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100/80">
                    <div className="flex flex-col items-center mb-10">
                        <Link to="/" className="flex items-center gap-3 mb-8 group">
                            <div className="w-12 h-12 bg-[#007AFF] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-300">
                                <Leaf className="w-6 h-6 fill-current" />
                            </div>
                            <span className="text-2xl font-semibold text-[#1D1D1F] tracking-tight">SmartNutri</span>
                        </Link>
                        <h2 className="text-3xl font-semibold text-[#1D1D1F] mb-3 tracking-tight">Welcome Back</h2>
                        <p className="text-[#86868B] font-medium text-center">Sign in to continue your healthy journey.</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#FF3B30]/10 text-[#FF3B30] p-4 rounded-xl mb-6 text-xs font-semibold uppercase tracking-wider flex items-center gap-3"
                        >
                            <span className="w-2 h-2 bg-[#FF3B30] rounded-full animate-pulse"></span>
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#86868B] uppercase tracking-wider ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868B] group-focus-within:text-[#007AFF] transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-[#F5F5F7] border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#007AFF] focus:ring-4 focus:ring-[#007AFF]/10 transition-all font-medium text-[#1D1D1F] placeholder:text-[#86868B]/50"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-bold text-[#86868B] uppercase tracking-wider">Password</label>
                                <Link to="/auth/forgot-password" className="text-xs font-bold text-[#007AFF] hover:underline transition">Forgot?</Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868B] group-focus-within:text-[#007AFF] transition-colors" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-[#F5F5F7] border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#007AFF] focus:ring-4 focus:ring-[#007AFF]/10 transition-all font-medium text-[#1D1D1F] placeholder:text-[#86868B]/50"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-[#007AFF] text-white rounded-2xl font-bold text-sm hover:bg-[#0051A8] transition shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group disabled:opacity-70 mt-4"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-gray-100 text-center">
                        <p className="text-[#86868B] text-sm font-medium">
                            Don't have an account? <Link to="/auth/signup" className="text-[#007AFF] font-bold hover:underline transition ml-1">Sign up</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
