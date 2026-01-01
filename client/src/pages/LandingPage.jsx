import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Activity, ArrowRight, CheckCircle,
    Brain, Zap, Shield, Star, PlayCircle, ChevronRight, Users, Trophy, Leaf
} from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans overflow-x-hidden selection:bg-[#007AFF] selection:text-white">

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-6 max-w-[1200px] mx-auto min-h-[90vh] flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-gray-200 rounded-full text-[11px] font-bold uppercase tracking-widest text-[#007AFF] mb-8 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-[#007AFF] animate-pulse"></span>
                        Introducing SmartNutri 2.0
                    </div>

                    <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter text-[#1D1D1F] mb-8 leading-[0.95]">
                        Health. <br />
                        <span className="text-[#86868B]">Reimagined.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-[#86868B] mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                        The world's most advanced nutrition neural engine.
                        <br />Personalized to your unique biology.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                        <Link to="/auth/signup" className="px-8 py-4 bg-[#007AFF] text-white rounded-full font-semibold text-lg hover:bg-[#0051A8] transition-all flex items-center gap-2 hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20">
                            Get Started <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link to="/about" className="px-8 py-4 bg-white text-[#007AFF] border border-gray-200 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all flex items-center gap-2">
                            Learn more <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>

                {/* Hero Graphic (Abstract UI Representation) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="relative w-full max-w-5xl mx-auto"
                >
                    <div className="relative z-10 bg-white rounded-t-[3rem] p-4 shadow-2xl border border-gray-200/50 overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop"
                            alt="Dashboard Preview"
                            className="w-full h-auto rounded-[2.5rem] shadow-inner"
                        />

                        {/* Floating Cards */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-20 left-10 p-4 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 flex gap-3 items-center"
                        >
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white"><CheckCircle className="w-6 h-6" /></div>
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase">Daily Goal</p>
                                <p className="text-sm font-bold text-gray-900">Protein Hit</p>
                            </div>
                        </motion.div>
                    </div>
                    {/* Glow effect behind */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-400/20 blur-[120px] -z-10 rounded-full"></div>
                </motion.div>
            </section>

            {/* Bento Grid Features */}
            <section className="py-32 px-6 max-w-[1200px] mx-auto">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-6xl font-semibold text-[#1D1D1F] tracking-tight mb-6">Designed for impact.</h2>
                    <p className="text-xl text-[#86868B]">Powerful tools packaged in a beautiful interface.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
                    {/* Large Card */}
                    <div className="md:col-span-2 card-apple p-10 flex flex-col justify-between overflow-hidden relative group">
                        <div className="z-10">
                            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white mb-6">
                                <Brain className="w-6 h-6" />
                            </div>
                            <h3 className="text-3xl font-semibold text-[#1D1D1F] mb-4">Neural Diet Engine.</h3>
                            <p className="text-[#86868B] text-lg max-w-md">Our AI analyzes your metabolic rate in real-time to adjust your meal plans day by day.</p>
                        </div>
                        <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent"></div>
                        <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800" className="absolute -right-10 bottom-10 w-64 h-64 object-cover rounded-2xl shadow-2xl rotate-[-6deg] group-hover:rotate-0 transition-all duration-500" alt="Food" />
                    </div>

                    {/* Tall Card */}
                    <div className="md:row-span-2 card-apple p-10 flex flex-col relative overflow-hidden bg-black text-white group">
                        <div className="z-10 relative">
                            <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-white mb-6">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-3xl font-semibold mb-4">Pro Workouts.</h3>
                            <p className="text-gray-400 text-lg">Adaptive training cycles that scale with your performance.</p>
                        </div>
                        <div className="mt-12 flex-1 relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                            <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover rounded-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" alt="Workout" />
                        </div>
                    </div>

                    {/* Small Card 1 */}
                    <div className="card-apple p-8 flex flex-col justify-center items-center text-center hover:scale-[1.02] transition-transform">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                            <Leaf className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-semibold text-[#1D1D1F] mb-2">100% Organic</h3>
                        <p className="text-[#86868B]">Curated meal sources.</p>
                    </div>

                    {/* Small Card 2 */}
                    <div className="card-apple p-8 flex flex-col justify-center items-center text-center hover:scale-[1.02] transition-transform">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-6">
                            <Trophy className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-semibold text-[#1D1D1F] mb-2">Leaderboards</h3>
                        <p className="text-[#86868B]">Compete globally.</p>
                    </div>
                </div>
            </section>

            {/* Testimonial Carousel style */}
            <section className="py-32 bg-white">
                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-12">Trusted by Athletes</p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { text: "The precision is unmatched. It feels like having a dedicated nutritionist.", author: "Sarah C.", role: "Marathon Runner" },
                            { text: "Simple, beautiful, and effective. I've successfully cut 15lbs in 2 months.", author: "Mike T.", role: "Product Designer" },
                            { text: "The recipes are actually delicious. I don't feel like I'm on a diet.", author: "Emma W.", role: "Yoga Instructor" }
                        ].map((t, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-[#F5F5F7]">
                                <div className="flex justify-center mb-6 text-[#007AFF]">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                                </div>
                                <p className="text-[#1D1D1F] font-medium text-lg mb-6">"{t.text}"</p>
                                <p className="text-sm font-bold text-gray-500">{t.author}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-40 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-5xl md:text-7xl font-semibold text-[#1D1D1F] tracking-tighter mb-8">
                        Ready to start?
                    </h2>
                    <p className="text-xl text-[#86868B] mb-12">Join for free today. Upgrade anytime.</p>
                    <Link to="/auth/signup" className="inline-flex px-12 py-6 bg-[#1D1D1F] text-white rounded-full font-semibold text-2xl hover:scale-105 transition-transform shadow-2xl">
                        Join SmartNutri
                    </Link>
                </div>
            </section>

            {/* Footer Simple */}
            <footer className="py-12 bg-white border-t border-gray-100 text-center text-[#86868B] text-sm">
                <p>&copy; 2024 SmartNutri Inc. All rights reserved.</p>
            </footer>

        </div>
    );
};

export default LandingPage;
