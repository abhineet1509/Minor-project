import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../config';

const Chat = () => {
    const [messages, setMessages] = useState([
        { role: 'bot', content: "Hello! I'm your AI Nutrition Assistant. Ask me anything about your diet, meal replacements, or health goals." }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInput('');
        setLoading(true);

        try {
            const { data } = await axios.post(`${API_BASE_URL}/chat`, { message: userMsg }, { withCredentials: true });
            setMessages(prev => [...prev, { role: 'bot', content: data.reply }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'bot', content: "Sorry, I'm having trouble connecting to the server." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen bg-[#F5F5F7] flex flex-col font-sans text-[#1D1D1F]">
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#007AFF] rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                        <Bot className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold text-[#1D1D1F] tracking-tight">AI Assistant</h1>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-[#34C759] rounded-full"></span>
                            <span className="text-[10px] text-[#86868B] font-bold uppercase tracking-wider">Online</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex items-end gap-3 max-w-[85%] md:max-w-[70%]`}>
                            {msg.role === 'bot' && (
                                <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#007AFF] flex-shrink-0 shadow-sm">
                                    <Bot className="w-5 h-5" />
                                </div>
                            )}
                            <div
                                className={`px-5 py-3 rounded-[1.25rem] text-[15px] leading-relaxed font-medium shadow-sm ${msg.role === 'user'
                                    ? 'bg-[#007AFF] text-white rounded-br-sm'
                                    : 'bg-white text-[#1D1D1F] border border-gray-100 rounded-bl-sm'
                                    }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="flex items-end gap-3">
                            <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#007AFF] shadow-sm">
                                <Sparkles className="w-4 h-4 animate-spin" />
                            </div>
                            <div className="bg-white border border-gray-100 px-4 py-3 rounded-[1.25rem] rounded-bl-sm text-[#86868B] flex gap-1 shadow-sm">
                                <span className="animate-bounce font-bold text-[#007AFF] text-xs">●</span>
                                <span className="animate-bounce font-bold text-[#007AFF] text-xs" style={{ animationDelay: '0.1s' }}>●</span>
                                <span className="animate-bounce font-bold text-[#007AFF] text-xs" style={{ animationDelay: '0.2s' }}>●</span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-gray-200">
                <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask anything..."
                        className="w-full pl-5 pr-14 py-3.5 bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#007AFF] rounded-full outline-none transition-all text-[#1D1D1F] font-medium text-base placeholder:text-[#86868B]"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || loading}
                        className="absolute right-2 p-2 bg-[#007AFF] text-white rounded-full hover:bg-[#0051A8] transition disabled:opacity-50 disabled:hover:bg-[#007AFF] shadow-md shadow-blue-500/20"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
