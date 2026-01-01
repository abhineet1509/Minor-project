import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const TestAuth = () => {
    const { user } = useAuth();
    const [testResults, setTestResults] = useState({
        userContext: null,
        profileAPI: null,
        dietAPI: null,
        error: null
    });

    useEffect(() => {
        runTests();
    }, []);

    const runTests = async () => {
        const results = {
            userContext: user,
            profileAPI: null,
            dietAPI: null,
            error: null
        };

        try {
            // Test 1: Check user context
            console.log('User from context:', user);

            // Test 2: Try to fetch profile
            try {
                const profileRes = await axios.get(`${API_BASE_URL}/users/profile`, {
                    withCredentials: true
                });
                results.profileAPI = profileRes.data;
                console.log('Profile API response:', profileRes.data);
            } catch (err) {
                results.error = `Profile API Error: ${err.response?.data?.message || err.message}`;
                console.error('Profile API error:', err.response?.data || err.message);
            }

            // Test 3: Try to fetch diet plan
            try {
                const dietRes = await axios.get(`${API_BASE_URL}/diet/current`, {
                    withCredentials: true
                });
                results.dietAPI = dietRes.data;
                console.log('Diet API response:', dietRes.data);
            } catch (err) {
                if (!results.error) {
                    results.error = `Diet API Error: ${err.response?.data?.message || err.message}`;
                }
                console.error('Diet API error:', err.response?.data || err.message);
            }

        } catch (error) {
            results.error = error.message;
        }

        setTestResults(results);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8">
            <h1 className="text-3xl font-bold mb-8">Authentication Debug Page</h1>

            <div className="space-y-6">
                <div className="bg-slate-800 p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">User Context</h2>
                    <pre className="bg-slate-950 p-4 rounded overflow-auto">
                        {JSON.stringify(testResults.userContext, null, 2)}
                    </pre>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Profile API Response</h2>
                    <pre className="bg-slate-950 p-4 rounded overflow-auto">
                        {JSON.stringify(testResults.profileAPI, null, 2)}
                    </pre>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Diet API Response</h2>
                    <pre className="bg-slate-950 p-4 rounded overflow-auto">
                        {JSON.stringify(testResults.dietAPI, null, 2)}
                    </pre>
                </div>

                {testResults.error && (
                    <div className="bg-red-900 p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">Error</h2>
                        <p className="text-red-200">{testResults.error}</p>
                    </div>
                )}

                <button
                    onClick={runTests}
                    className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                    Re-run Tests
                </button>
            </div>
        </div>
    );
};

export default TestAuth;
