import React from 'react';
import { Check, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
    const navigate = useNavigate();

    const handleChoosePlan = () => {
        navigate('/payment');
    };

    return (
        <div className="min-h-screen bg-[#F5F5F7] pt-32 pb-20 px-6 font-sans text-[#1D1D1F]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-[#007AFF] font-bold tracking-wider uppercase text-xs mb-4 block">Plans</span>
                    <h1 className="text-4xl md:text-5xl font-semibold text-[#1D1D1F] mb-6 tracking-tight">Invest in your health.</h1>
                    <p className="text-xl text-[#86868B] max-w-2xl mx-auto leading-relaxed font-medium">Choose the plan that fits your lifestyle. Cancel anytime.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
                    {/* Free Tier */}
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 text-center hover:scale-[1.01] transition duration-300">
                        <h3 className="text-2xl font-semibold text-[#1D1D1F] mb-2">Basic</h3>
                        <p className="text-[#86868B] mb-8 font-medium">For getting started</p>
                        <div className="text-5xl font-bold text-[#1D1D1F] mb-8 tracking-tight">$0<span className="text-lg text-[#86868B] font-medium">/mo</span></div>
                        <ul className="space-y-4 mb-10 text-left px-4">
                            <li className="flex items-center gap-3 text-[#1D1D1F] font-medium"><Check className="w-5 h-5 text-[#007AFF]" /> Basic Health Tracking</li>
                            <li className="flex items-center gap-3 text-[#1D1D1F] font-medium"><Check className="w-5 h-5 text-[#007AFF]" /> Standard Support</li>
                            <li className="flex items-center gap-3 text-[#86868B] font-medium line-through"><Check className="w-5 h-5" /> AI Meal Plans</li>
                        </ul>
                        <button onClick={handleChoosePlan} className="w-full py-4 rounded-xl border border-gray-200 font-bold text-[#007AFF] hover:bg-gray-50 transition">Get Started</button>
                    </div>

                    {/* Pro Tier - Highlighted */}
                    <div className="bg-black p-10 rounded-[2.5rem] shadow-2xl text-center relative overflow-hidden scale-105 ring-1 ring-gray-900/5 z-10">
                        <div className="absolute top-0 right-0 bg-[#007AFF] text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">Most Popular</div>
                        <h3 className="text-2xl font-semibold text-white mb-2">Pro Monthly</h3>
                        <p className="text-gray-400 mb-8 font-medium">For serious results</p>
                        <div className="text-6xl font-bold text-white mb-8 tracking-tight">$19<span className="text-lg text-gray-400 font-medium">/mo</span></div>
                        <ul className="space-y-4 mb-10 text-left px-4">
                            <li className="flex items-center gap-3 text-white font-medium"><Check className="w-5 h-5 text-[#30B0C7]" /> Unlimited AI Meal Plans</li>
                            <li className="flex items-center gap-3 text-white font-medium"><Check className="w-5 h-5 text-[#30B0C7]" /> Advanced Analytics</li>
                            <li className="flex items-center gap-3 text-white font-medium"><Check className="w-5 h-5 text-[#30B0C7]" /> 24/7 Nutritionist Chat</li>
                            <li className="flex items-center gap-3 text-white font-medium"><Check className="w-5 h-5 text-[#30B0C7]" /> Full Workout Library</li>
                        </ul>
                        <button onClick={handleChoosePlan} className="w-full py-4 rounded-xl bg-[#007AFF] font-bold text-white hover:bg-[#0051A8] transition shadow-lg shadow-blue-500/30">Start Free Trial</button>
                    </div>

                    {/* Yearly Tier */}
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 text-center hover:scale-[1.01] transition duration-300">
                        <h3 className="text-2xl font-semibold text-[#1D1D1F] mb-2">Pro Yearly</h3>
                        <p className="text-[#86868B] mb-8 font-medium">Best value</p>
                        <div className="text-5xl font-bold text-[#1D1D1F] mb-8 tracking-tight">$190<span className="text-lg text-[#86868B] font-medium">/yr</span></div>
                        <p className="text-[10px] font-bold text-[#34C759] bg-green-50 inline-block px-3 py-1 rounded-full mb-6 uppercase tracking-wider">Save 17%</p>
                        <ul className="space-y-4 mb-10 text-left px-4">
                            <li className="flex items-center gap-3 text-[#1D1D1F] font-medium"><Check className="w-5 h-5 text-[#007AFF]" /> All Pro Features</li>
                            <li className="flex items-center gap-3 text-[#1D1D1F] font-medium"><Check className="w-5 h-5 text-[#007AFF]" /> Priority Support</li>
                            <li className="flex items-center gap-3 text-[#1D1D1F] font-medium"><Check className="w-5 h-5 text-[#007AFF]" /> Early Access</li>
                        </ul>
                        <button onClick={handleChoosePlan} className="w-full py-4 rounded-xl border border-gray-200 font-bold text-[#007AFF] hover:bg-gray-50 transition">Choose Plan</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
