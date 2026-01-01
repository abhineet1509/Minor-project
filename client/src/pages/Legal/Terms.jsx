import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Terms = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-48 pb-20 px-6 font-sans">
            <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-[2.5rem] shadow-xl border border-slate-100 relative">
                <Link to="/" className="absolute top-10 left-10 p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </Link>

                <div className="text-center mb-16">
                    <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <ShieldCheck className="w-10 h-10" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-black mb-4">Terms of Service</h1>
                    <p className="text-slate-600">Last Updated: December 2024</p>
                </div>

                <div className="prose prose-slate prose-lg max-w-none text-black">
                    <h3 className="text-black">1. Acceptance of Terms</h3>
                    <p className="text-gray-800">By accessing and using SmartNutri ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.</p>

                    <h3 className="text-black">2. Service Description</h3>
                    <p className="text-gray-800">SmartNutri provides AI-powered diet planning and health tracking tools. These tools are for informational purposes only and do not constitute medical advice.</p>

                    <h3 className="text-black">3. User Accounts</h3>
                    <p className="text-gray-800">You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information during registration.</p>

                    <h3 className="text-black">4. Subscription and Billing</h3>
                    <p className="text-gray-800">Some features of the Service may require a paid subscription. You agree to pay all fees associated with your chosen subscription plan. Subscriptions automatically renew unless cancelled.</p>

                    <h3 className="text-black">5. Intellectual Property</h3>
                    <p className="text-gray-800">The Service and its original content, features, and functionality are owned by SmartNutri and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>

                    <h3 className="text-black">6. Limitation of Liability</h3>
                    <p className="text-gray-800">In no event shall SmartNutri, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>

                    <h3 className="text-black">7. Governing Law</h3>
                    <p className="text-gray-800">These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.</p>
                </div>
            </div>
        </div>
    );
};

export default Terms;
