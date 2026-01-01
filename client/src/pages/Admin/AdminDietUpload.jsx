import React, { useState } from 'react';
import { Upload, X, Check, FileText, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDietUpload = () => {
    const [dragActive, setDragActive] = useState(false);
    const [fileName, setFileName] = useState(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFileName(e.dataTransfer.files[0].name);
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] p-8 pt-32 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <Link to="/admin" className="text-sm font-bold text-slate-400 hover:text-slate-600 mb-2 block">← Back to Dashboard</Link>
                        <h1 className="text-3xl font-extrabold text-slate-900">Upload Diet Template</h1>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
                    <form className="space-y-8">
                        {/* Title & Category */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Plan Title</label>
                                <input type="text" placeholder="e.g. Keto Shred 3000" className="w-full px-5 py-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 outline-none font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Category</label>
                                <select className="w-full px-5 py-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-slate-600">
                                    <option>Weight Loss</option>
                                    <option>Muscle Gain</option>
                                    <option>Maintenance</option>
                                    <option>Vegetarian</option>
                                    <option>Vegan</option>
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Description</label>
                            <textarea rows="4" placeholder="Describe the benefits of this plan..." className="w-full px-5 py-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 outline-none font-medium resize-none"></textarea>
                        </div>

                        {/* File Upload Zone */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Import Meal Data (JSON/CSV)</label>
                            <div
                                className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition ${dragActive ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 hover:border-slate-400'}`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleChange} />
                                <div className="flex flex-col items-center pointer-events-none">
                                    <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                                        {fileName ? <Check className="w-6 h-6 text-indigo-500" /> : <Upload className="w-6 h-6" />}
                                    </div>
                                    <p className="font-bold text-slate-700">{fileName || "Click or Drag to Upload"}</p>
                                    <p className="text-sm text-slate-400 mt-2">Support for .json, .csv files only</p>
                                </div>
                            </div>
                        </div>

                        <hr className="border-slate-100" />

                        <div className="flex justify-end gap-4">
                            <button type="button" className="px-8 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition">Cancel</button>
                            <button type="button" className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20">Create Plan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default AdminDietUpload;
