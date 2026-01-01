import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, ChevronRight, Mail } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${API_BASE_URL}/admin/login`, { email, password }, { withCredentials: true });
            localStorage.setItem('adminInfo', JSON.stringify(data));
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid Credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent p-6 selection:bg-blue-600 selection:text-white relative overflow-hidden">
            {/* Background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[150px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-400/5 rounded-full blur-[150px] animate-pulse-soft"></div>
            </div>

            <div className="glass-bright p-10 md:p-14 rounded-[4rem] shadow-2xl border border-slate-800 w-full max-w-lg relative overflow-hidden group">
                <div className="relative z-10">
                    <div className="text-center mb-12">
                        <div className="w-24 h-24 bg-blue-600/10 border border-blue-500/20 text-blue-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner group-hover:scale-105 transition-transform">
                            <ShieldCheck className="w-12 h-12" />
                        </div>
                        <span className="text-blue-500 font-black tracking-[0.3em] uppercase text-[10px] mb-4 block underline underline-offset-8">Critical Infrastructure</span>
                        <h1 className="text-5xl font-black text-white mb-2 font-heading tracking-tight leading-none">Admin Nexus</h1>
                        <p className="text-slate-500 font-bold">Authorized personnel verification required.</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-2xl mb-10 text-[10px] font-black uppercase tracking-widest text-center">
                            <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-500 ml-2 uppercase tracking-[0.2em]">Personnel Email</label>
                            <div className="relative group/input">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within/input:text-blue-500 w-5 h-5 transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-16 pr-6 py-5 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-black shadow-inner placeholder:text-slate-800"
                                    placeholder="admin@smartnutri.ai"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-500 ml-2 uppercase tracking-[0.2em]">Admin Passphrase</label>
                            <div className="relative group/input">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within/input:text-blue-500 w-5 h-5 transition-colors" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-16 pr-6 py-5 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-black shadow-inner placeholder:text-slate-800"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-blue-700 transition shadow-2xl shadow-blue-600/40 flex items-center justify-center gap-3 mt-8 group/btn"
                        >
                            Establish Connection <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
