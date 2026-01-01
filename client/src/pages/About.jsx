import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Shield, Globe, Award, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroLifestyle from '../assets/hero_lifestyle.png';
import storyNutrition from '../assets/story_nutrition.png';

const About = () => {
    return (
        <div className="min-h-screen bg-[#F5F5F7] font-sans text-[#1D1D1F]">
            {/* Header */}
            <div className="bg-white pt-32 pb-20 px-6 border-b border-gray-100">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-8"
                        >
                            <span className="text-[#007AFF] font-bold tracking-wider uppercase text-xs mb-6 block">Our Mission</span>
                            <h1 className="text-5xl md:text-7xl font-semibold mb-8 tracking-tight text-[#1D1D1F]">
                                Health, simplified.
                            </h1>
                        </motion.div>
                        <p className="text-2xl text-[#86868B] leading-relaxed font-medium mb-10">
                            SmartNutri combines advanced nutrition science with beautiful design to make healthy living effortless and accessible for everyone.
                        </p>
                    </div>
                    <div className="flex-1 relative h-[600px] w-full">
                        <div className="absolute top-8 right-8 w-80 h-[28rem] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-500/10 border border-gray-100 rotate-3 hover:rotate-0 transition-transform duration-700 ease-out z-10">
                            <img
                                src={heroLifestyle}
                                alt="Healthy Lifestyle"
                                className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
                            />
                        </div>
                        <div className="absolute bottom-8 left-8 w-72 h-72 rounded-full overflow-hidden shadow-2xl border-4 border-white z-20 hover:scale-105 transition-transform duration-500">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                                alt="Team working"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: 'Active Users', value: '50K+', icon: Users },
                        { label: 'Meal Plans', value: '1M+', icon: Sparkles },
                        { label: 'Countries', value: '30+', icon: Globe },
                        { label: 'Nutritionists', value: '45', icon: Heart },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-100 text-center shadow-sm hover:scale-105 transition-transform duration-300">
                            <stat.icon className="w-8 h-8 mx-auto mb-4 text-[#007AFF]" />
                            <h3 className="text-4xl font-semibold text-[#1D1D1F] mb-1 tracking-tight">{stat.value}</h3>
                            <p className="text-[#86868B] font-bold uppercase tracking-wider text-[10px]">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Story Section */}
            <div className="py-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                <div>
                    <span className="text-[#007AFF] font-bold tracking-wider uppercase text-xs mb-4 block">Our Story</span>
                    <h1 className="text-4xl md:text-5xl font-semibold text-[#1D1D1F] mb-8 tracking-tight">Built for you.</h1>
                    <div className="space-y-6 text-[#86868B] text-lg leading-relaxed font-medium">
                        <p>
                            In 2023, we noticed that most health apps were cluttered, confusing, and impersonal. They treated users like data points rather than people.
                        </p>
                        <p>
                            We built SmartNutri to be different. By focusing on privacy, simplicity, and personalization, we created a platform that adapts to your life, not the other way around.
                        </p>
                    </div>
                </div>
                <div className="relative">
                    <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100">
                        <img
                            src={storyNutrition}
                            alt="Nutrition Science"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Values */}
            <div className="bg-white py-32 px-6 border-y border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-[#007AFF] font-bold uppercase tracking-wider text-xs mb-4 block">Values</span>
                        <h2 className="text-4xl font-semibold mb-6 tracking-tight text-[#1D1D1F]">What we stand for.</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            { title: 'Science First', desc: 'Our recommendations are backed by nutritional science, not trends.', icon: Award },
                            { title: 'Privacy Focused', desc: 'Your health data belongs to you. We encrypt everything by default.', icon: Shield },
                            { title: 'Design Driven', desc: 'We believe health tools should be beautiful and intuitive to use.', icon: Sparkles },
                        ].map((value, idx) => (
                            <div key={idx} className="bg-[#F5F5F7] p-10 rounded-[2.5rem] hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300">
                                <value.icon className="w-10 h-10 text-[#007AFF] mb-6" />
                                <div>
                                    <h3 className="text-xl font-semibold mb-3 tracking-tight text-[#1D1D1F]">{value.title}</h3>
                                    <p className="text-[#86868B] leading-relaxed font-medium">{value.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="py-40 text-center px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-semibold text-[#1D1D1F] mb-10 tracking-tight">Start your journey today.</h2>
                    <Link to="/auth/signup" className="inline-flex px-10 py-4 bg-[#007AFF] text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-[#0051A8] transition shadow-lg shadow-blue-500/20">
                        Join SmartNutri
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default About;
