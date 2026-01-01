import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, ShieldCheck, Check, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Payment = () => {
    const [selectedMethod, setSelectedMethod] = useState('card');
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    const handlePayment = (e) => {
        e.preventDefault();
        setProcessing(true);
        // Simulate payment processing
        setTimeout(() => {
            setProcessing(false);
            setSuccess(true);
        }, 2000);
    };

    if (success) {
        return (
            <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-6 text-[#1D1D1F]">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-12 rounded-[3rem] shadow-xl text-center max-w-lg w-full border border-gray-100"
                >
                    <div className="w-20 h-20 bg-[#F5F5F7] rounded-full flex items-center justify-center mx-auto mb-8 text-[#34C759]">
                        <Check className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-semibold text-[#1D1D1F] mb-4 tracking-tight">All set.</h2>
                    <p className="text-[#86868B] font-medium mb-10 text-lg">Your Pro subscription has been activated.</p>
                    <Link to="/dashboard" className="w-full py-4 bg-[#007AFF] text-white rounded-2xl font-bold text-sm uppercase tracking-wider hover:bg-[#0051A8] transition shadow-lg shadow-blue-500/20 flex items-center justify-center">
                        Go to Dashboard
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F5F7] pt-32 pb-20 px-6 font-sans text-[#1D1D1F]">
            <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">

                {/* Order Summary */}
                <div className="space-y-8">
                    <div>
                        <Link to="/pricing" className="text-[#007AFF] font-bold text-sm hover:underline mb-6 inline-block">Back to Plans</Link>
                        <h1 className="text-4xl md:text-5xl font-semibold text-[#1D1D1F] mb-6 tracking-tight">Checkout</h1>
                        <p className="text-[#86868B] text-xl font-medium">Complete your subscription to unlock all features.</p>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <h3 className="text-xs font-bold text-[#86868B] uppercase tracking-wider mb-6">Order Summary</h3>
                        <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">
                                    Pro
                                </div>
                                <div>
                                    <h4 className="font-semibold text-[#1D1D1F] text-lg">Pro Monthly</h4>
                                    <p className="text-sm font-medium text-[#86868B]">Billed monthly</p>
                                </div>
                            </div>
                            <span className="font-bold text-xl text-[#1D1D1F]">$19.00</span>
                        </div>
                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between items-center text-[#86868B] font-medium text-sm">
                                <span>Subtotal</span>
                                <span>$19.00</span>
                            </div>
                            <div className="flex justify-between items-center text-[#86868B] font-medium text-sm">
                                <span>Tax</span>
                                <span>$0.00</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-2xl font-semibold text-[#1D1D1F] pt-6 border-t border-gray-100">
                            <span>Total</span>
                            <span>$19.00</span>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start text-[#86868B] px-4">
                        <ShieldCheck className="w-6 h-6 shrink-0 mt-0.5 text-[#34C759]" />
                        <div>
                            <h4 className="font-semibold text-[#1D1D1F] text-sm mb-1">Secure Transaction</h4>
                            <p className="text-sm leading-relaxed">Your payment information is encrypted and processed securely. We never store your credit card details.</p>
                        </div>
                    </div>
                </div>

                {/* Payment Form */}
                <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100">
                    <h3 className="text-2xl font-semibold text-[#1D1D1F] mb-8 tracking-tight">Payment Details</h3>

                    <div className="flex gap-4 mb-8">
                        <button
                            onClick={() => setSelectedMethod('card')}
                            className={`flex-1 py-4 rounded-2xl border font-bold text-xs uppercase tracking-wider flex flex-col items-center gap-2 transition-all ${selectedMethod === 'card' ? 'border-[#007AFF] bg-blue-50 text-[#007AFF]' : 'border-gray-200 text-[#86868B] hover:border-gray-300'}`}
                        >
                            <CreditCard className="w-5 h-5" /> Card
                        </button>
                        <button
                            onClick={() => setSelectedMethod('paypal')}
                            className={`flex-1 py-4 rounded-2xl border font-bold text-xs uppercase tracking-wider flex flex-col items-center gap-2 transition-all ${selectedMethod === 'paypal' ? 'border-[#007AFF] bg-blue-50 text-[#007AFF]' : 'border-gray-200 text-[#86868B] hover:border-gray-300'}`}
                        >
                            <ShoppingBag className="w-5 h-5" /> PayPal
                        </button>
                    </div>

                    <form onSubmit={handlePayment} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#86868B] ml-1 uppercase tracking-wider">Cardholder Name</label>
                            <input
                                type="text"
                                required
                                className="w-full px-5 py-3.5 bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#007AFF] rounded-2xl outline-none font-medium text-[#1D1D1F] transition-all placeholder:text-gray-400"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#86868B] ml-1 uppercase tracking-wider">Card Number</label>
                            <div className="relative">
                                <CreditCard className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    required
                                    className="w-full pl-14 pr-5 py-3.5 bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#007AFF] rounded-2xl outline-none font-medium text-[#1D1D1F] transition-all placeholder:text-gray-400"
                                    placeholder="0000 0000 0000 0000"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#86868B] ml-1 uppercase tracking-wider">Expiry Date</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-5 py-3.5 bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#007AFF] rounded-2xl outline-none font-medium text-[#1D1D1F] transition-all placeholder:text-gray-400"
                                    placeholder="MM / YY"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#86868B] ml-1 uppercase tracking-wider">CVC</label>
                                <div className="relative">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-12 pr-5 py-3.5 bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#007AFF] rounded-2xl outline-none font-medium text-[#1D1D1F] transition-all placeholder:text-gray-400"
                                        placeholder="123"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-4 bg-[#007AFF] text-white rounded-2xl font-bold uppercase tracking-wider text-sm hover:bg-[#0051A8] transition shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 mt-4"
                        >
                            {processing ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>Pay $19.00 <Lock className="w-4 h-4" /></>
                            )}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Payment;
