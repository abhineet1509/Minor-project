import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Twitter, Instagram, Linkedin, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#0f172a] text-slate-400 py-20 border-t border-slate-800 font-sans">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* Brand */}
                <div className="col-span-1 md:col-span-1">
                    <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-slate-100 mb-6">
                        <Leaf className="w-8 h-8 text-indigo-500 fill-current" />
                        <span>SmartNutri</span>
                    </Link>
                    <p className="text-slate-500 mb-8 leading-relaxed text-sm">
                        AI-powered nutrition planning for the modern world. Eat smarter, live better, and achieve your goals with science-backed personalization.
                    </p>
                    <div className="flex gap-4">
                        {[Twitter, Instagram, Linkedin, Facebook].map((Icon, idx) => (
                            <a key={idx} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition">
                                <Icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h4 className="text-slate-100 font-bold mb-6 tracking-wide uppercase text-sm">Platform</h4>
                    <div className="flex flex-col gap-4 text-sm font-medium">
                        <Link to="/" className="hover:text-indigo-500 transition">Features</Link>
                        <Link to="/pricing" className="hover:text-indigo-500 transition">Pricing</Link>
                        <Link to="/about" className="hover:text-indigo-500 transition">About Us</Link>
                        <Link to="/dashboard" className="hover:text-indigo-500 transition">Dashboard</Link>
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h4 className="text-slate-100 font-bold mb-6 tracking-wide uppercase text-sm">Support</h4>
                    <div className="flex flex-col gap-4 text-sm font-medium">
                        <Link to="/contact" className="hover:text-indigo-500 transition">Contact Center</Link>
                        <Link to="/contact" className="hover:text-indigo-500 transition">FAQs</Link>
                        <Link to="/privacy" className="hover:text-indigo-500 transition">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-indigo-500 transition">Terms of Service</Link>
                        <Link to="/disclaimer" className="hover:text-indigo-500 transition">Disclaimer</Link>
                    </div>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="text-slate-100 font-bold mb-6 tracking-wide uppercase text-sm">Stay Updated</h4>
                    <p className="text-slate-500 text-sm mb-4">Get the latest nutrition tips and updates.</p>
                    <div className="flex gap-2">
                        <input type="email" placeholder="Enter your email" className="w-full bg-slate-800 border-none rounded-lg px-4 py-3 text-sm text-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none" />
                        <button className="bg-indigo-600 text-white rounded-lg px-4 py-3 font-bold text-sm hover:bg-indigo-700 transition">Go</button>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-medium text-slate-600">
                <p>© 2024 SmartNutri Inc. All rights reserved.</p>
                <div className="flex gap-8">
                    <span>Made with ❤️ for better health</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
