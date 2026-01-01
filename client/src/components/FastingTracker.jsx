import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Play, Square, Settings, Zap } from 'lucide-react';

const FastingTracker = () => {
    const [isFasting, setIsFasting] = useState(false);
    const [protocol, setProtocol] = useState('16:8');
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let interval;
        if (isFasting) {
            interval = setInterval(() => {
                setSeconds(s => s + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isFasting]);

    const formatTime = (totalSeconds) => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const targetSeconds = parseInt(protocol.split(':')[0]) * 3600;
    const progress = Math.min((seconds / targetSeconds) * 100, 100);

    return (
        <div className="bg-[#0f172a] dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-2xl border border-slate-700 text-white relative overflow-hidden group">
            <div className="relative z-10">
                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                            <Clock className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold font-sans">Fasting Tracker</h3>
                    </div>
                    <div className="flex gap-2">
                        {['16:8', '18:6', 'OMAD'].map(p => (
                            <button
                                key={p}
                                onClick={() => setProtocol(p)}
                                className={`px-3 py-1 rounded-lg text-xs font-black transition ${protocol === p ? 'bg-orange-500 text-white' : 'bg-white/10 text-slate-400 hover:bg-white/20'}`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center mb-10">
                    <div className="relative w-48 h-48 mb-6">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/5" />
                            <motion.circle
                                cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="transparent"
                                className="text-orange-500"
                                strokeDasharray={552.6}
                                initial={{ strokeDashoffset: 552.6 }}
                                animate={{ strokeDashoffset: 552.6 - (552.6 * progress) / 100 }}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{isFasting ? 'Fasting Time' : 'Ready?'}</p>
                            <h2 className="text-4xl font-black tabular-nums">{formatTime(seconds)}</h2>
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <p className="text-slate-400 text-sm font-medium">Protocol: <span className="text-white font-bold">{protocol}</span></p>
                        <p className="text-orange-500 text-xs font-bold mt-1 flex items-center gap-1 justify-center">
                            <Zap className="w-3 h-3 fill-current" /> Burning Fat
                        </p>
                    </div>

                    <button
                        onClick={() => setIsFasting(!isFasting)}
                        className={`w-full py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 ${isFasting ? 'bg-red-500/10 text-red-500 border-2 border-red-500/50 hover:bg-red-500 hover:text-white' : 'bg-orange-600 text-white shadow-xl shadow-orange-600/30 hover:bg-orange-500'}`}
                    >
                        {isFasting ? <><Square className="w-5 h-5 fill-current" /> Stop Fast</> : <><Play className="w-5 h-5 fill-current" /> Start Fasting</>}
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Target</p>
                        <p className="text-lg font-bold">{protocol.split(':')[0]}h</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">State</p>
                        <p className="text-lg font-bold text-orange-400">{progress > 50 ? 'Autophagy' : 'Digestive'}</p>
                    </div>
                </div>
            </div>

            {/* Background Glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-600/20 rounded-full blur-[100px] group-hover:bg-orange-600/30 transition-all"></div>
        </div>
    );
};

export default FastingTracker;
