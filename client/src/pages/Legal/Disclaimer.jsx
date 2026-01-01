import React from 'react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Disclaimer = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-48 pb-20 px-6 font-sans">
            <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-[2.5rem] shadow-xl border border-slate-100 relative">
                <Link to="/" className="absolute top-10 left-10 p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </Link>

                <div className="text-center mb-16">
                    <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <AlertTriangle className="w-10 h-10" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-black mb-4">Medical Disclaimer</h1>
                    <p className="text-slate-600">Important Health Information</p>
                </div>

                <div className="prose prose-slate prose-lg max-w-none text-black">
                    <div className="p-6 bg-amber-50 border border-amber-100 rounded-2xl mb-8">
                        <p className="font-bold text-amber-900 m-0">
                            THIS SERVICE DOES NOT PROVIDE MEDICAL ADVICE.
                        </p>
                    </div>

                    <h3 className="text-black">1. No Medical Advice</h3>
                    <p className="text-gray-800">The contents of the SmartNutri website, such as text, graphics, images, and other material contained on the SmartNutri website ("Content") are for informational purposes only. The Content is not intended to be a substitute for professional medical advice, diagnosis, or treatment.</p>

                    <h3 className="text-black">2. Consult Your Doctor</h3>
                    <p className="text-gray-800">Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on the SmartNutri website.</p>

                    <h3 className="text-black">3. Nutritional Information</h3>
                    <p className="text-gray-800">Nutritional information provided on the SmartNutri website is for informational purposes only. While we strive to provide accurate information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information.</p>

                    <h3 className="text-black">4. Assumption of Risk</h3>
                    <p className="text-gray-800">You acknowledge that diet and health changes involve risk, and you assume all risk for any such changes you make based on information from this Service.</p>

                    <h3 className="text-black">5. Emergencies</h3>
                    <p className="text-gray-800">If you think you may have a medical emergency, call your doctor or 911 immediately. SmartNutri does not recommend or endorse any specific tests, physicians, products, procedures, opinions, or other information that may be mentioned on the Site.</p>
                </div>
            </div>
        </div>
    );
};

export default Disclaimer;
