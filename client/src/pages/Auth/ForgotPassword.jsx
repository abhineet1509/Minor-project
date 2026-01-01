import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ChevronLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-6 font-sans">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-white p-10 md:p-12 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100/80">

                    <Link to="/auth/login" className="inline-flex items-center gap-1 text-[#86868B] hover:text-[#007AFF] transition-colors mb-8 font-medium text-sm group">
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Login
                    </Link>

                    {!isSubmitted ? (
                        <>
                            <div className="mb-8">
                                <h1 className="text-3xl font-semibold text-[#1D1D1F] mb-3 tracking-tight">Forgot Password</h1>
                                <p className="text-[#86868B] font-medium leading-relaxed">Enter your email and we'll send you instructions to reset your password.</p>
                            </div>

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

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-[#007AFF] text-white rounded-2xl font-bold text-sm hover:bg-[#0051A8] transition shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group disabled:opacity-70 mt-2"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>Send Instructions <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center"
                        >
                            <div className="w-20 h-20 bg-[#34C759]/10 text-[#34C759] rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-3 tracking-tight">Check your email</h2>
                            <p className="text-[#86868B] font-medium mb-8 leading-relaxed">
                                We've sent password reset instructions to <span className="text-[#1D1D1F] font-semibold">{email}</span>.
                            </p>
                            <Link
                                to="/auth/login"
                                className="inline-block w-full py-4 bg-[#F5F5F7] text-[#1D1D1F] rounded-2xl font-bold text-sm hover:bg-gray-200 transition"
                            >
                                Back to Login
                            </Link>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
