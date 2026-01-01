import React from 'react';
import { Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-48 pb-20 px-6 font-sans">
            <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-[2.5rem] shadow-xl border border-slate-100 relative">
                <Link to="/" className="absolute top-10 left-10 p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </Link>

                <div className="text-center mb-16">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-10 h-10" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-black mb-4">Privacy Policy</h1>
                    <p className="text-slate-600">Last Updated: December 2024</p>
                </div>

                <div className="prose prose-slate prose-lg max-w-none text-black">
                    <h3 className="text-black">1. Information We Collect</h3>
                    <p className="text-gray-800">We collect information you provide directly to us, such as your name, email address, physical characteristics (height, weight), health goals, and dietary preferences.</p>

                    <h3 className="text-black">2. How We Use Your Information</h3>
                    <p className="text-gray-800">We use the information we collect to operate, maintain, and improve our Service, to generate personalized diet plans, to process transactions, and to send you related information, including confirmations and invoices.</p>

                    <h3 className="text-black">3. Data Security</h3>
                    <p className="text-gray-800">We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.</p>

                    <h3 className="text-black">4. Sharing of Information</h3>
                    <p className="text-gray-800">We do not share your personal information with third parties except as described in this privacy policy, such as with vendors who need access to such information to carry out work on our behalf.</p>

                    <h3 className="text-black">5. Cookies</h3>
                    <p className="text-gray-800">We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>

                    <h3 className="text-black">6. Changes to This Privacy Policy</h3>
                    <p className="text-gray-800">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

                    <h3 className="text-black">7. Contact Us</h3>
                    <p className="text-gray-800">If you have any questions about this Privacy Policy, please contact us at privacy@smartnutri.com.</p>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
