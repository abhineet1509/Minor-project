import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, MessageSquare } from 'lucide-react';

const Contact = () => {
    const [status, setStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setStatus('sending');
        setTimeout(() => setStatus('sent'), 1500);
    };

    return (
        <div className="min-h-screen bg-[#F5F5F7] font-sans pt-32 pb-20 px-6 text-[#1D1D1F]">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24">

                {/* Contact Info */}
                <div>
                    <span className="text-[#007AFF] font-bold tracking-wider uppercase text-xs mb-6 block">Support</span>
                    <h1 className="text-5xl font-semibold text-[#1D1D1F] mb-6 tracking-tight">Get in touch.</h1>
                    <p className="text-xl text-[#86868B] mb-16 leading-relaxed font-medium">
                        Need help with your plan? Our team is here to assist you with any questions or feedback.
                    </p>

                    <div className="space-y-6">
                        {[
                            { icon: Mail, label: 'Email', value: 'support@smartnutri.com' },
                            { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
                            { icon: MapPin, label: 'Location', value: '123 Innovation Dr, Tech City, CA' },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-8 p-6 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                <div className="w-12 h-12 bg-[#F5F5F7] rounded-full flex items-center justify-center text-[#007AFF]">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-[#86868B] uppercase tracking-wider mb-1">{item.label}</p>
                                    <p className="text-lg font-semibold text-[#1D1D1F]">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Map Section */}
                    <div className="mt-12 rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 h-64 relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093747!2d144.9537353153169!3d-37.81720997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d6a32f623631!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1625624748443!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            className="grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition duration-500"
                        ></iframe>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white p-12 rounded-[3rem] shadow-lg border border-gray-100">
                    <div className="mb-10">
                        <h2 className="text-3xl font-semibold text-[#1D1D1F] mb-2 tracking-tight">Send a Message</h2>
                        <p className="text-[#86868B] font-medium text-sm">We usually respond within 24 hours.</p>
                    </div>

                    {status === 'sent' ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-24">
                            <div className="w-20 h-20 bg-[#F5F5F7] text-[#34C759] rounded-full flex items-center justify-center mb-8">
                                <Send className="w-10 h-10" />
                            </div>
                            <h3 className="text-3xl font-semibold text-[#1D1D1F] mb-4">Message Sent</h3>
                            <p className="text-[#86868B] font-medium mb-10">Thank you for contacting us. We'll be in touch soon.</p>
                            <button onClick={() => setStatus(null)} className="px-10 py-3 bg-[#F5F5F7] text-[#1D1D1F] rounded-full font-bold text-sm hover:bg-gray-200 transition-all">Send Another</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-[#86868B] ml-1">First Name</label>
                                    <input type="text" required className="w-full px-5 py-3.5 bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#007AFF] rounded-2xl outline-none font-medium text-[#1D1D1F] transition-all" placeholder="Jane" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-[#86868B] ml-1">Last Name</label>
                                    <input type="text" required className="w-full px-5 py-3.5 bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#007AFF] rounded-2xl outline-none font-medium text-[#1D1D1F] transition-all" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-[#86868B] ml-1">Email Address</label>
                                <input type="email" required className="w-full px-5 py-3.5 bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#007AFF] rounded-2xl outline-none font-medium text-[#1D1D1F] transition-all" placeholder="jane@example.com" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-[#86868B] ml-1">Topic</label>
                                <select className="w-full px-5 py-3.5 bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#007AFF] rounded-2xl outline-none font-medium text-[#1D1D1F] transition-all cursor-pointer appearance-none">
                                    <option>General Inquiry</option>
                                    <option>Technical Support</option>
                                    <option>Billing Question</option>
                                    <option>Partnership</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-[#86868B] ml-1">Message</label>
                                <textarea required rows="5" className="w-full px-5 py-3.5 bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#007AFF] rounded-2xl outline-none font-medium text-[#1D1D1F] transition-all resize-none" placeholder="How can we help you?"></textarea>
                            </div>

                            <button type="submit" disabled={status === 'sending'} className="w-full py-4 bg-[#007AFF] text-white rounded-2xl font-bold uppercase tracking-wider text-sm hover:bg-[#0051A8] transition shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group mt-4">
                                {status === 'sending' ? 'Sending...' : <><Send className="w-4 h-4" /> Send Message</>}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact;
