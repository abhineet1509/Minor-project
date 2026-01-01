import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem('userInfo');
            return saved ? JSON.parse(saved) : null;
        } catch (error) {
            console.error('Failed to parse userInfo:', error);
            localStorage.removeItem('userInfo');
            return null;
        }
    });
    const [loading, setLoading] = useState(true); // Start as true to verify session

    // Use centralized configuration
    // API_BASE_URL is 'https://minor-project-ceg5.onrender.com/api'

    // Verify user session on mount
    useEffect(() => {
        // Simply set loading to false after initial check
        // If user exists in localStorage, they're considered logged in
        // The backend will validate the JWT cookie on each request
        setLoading(false);
    }, []); // Only run on mount

    const login = async (email, password) => {
        setLoading(true);
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true // Important for cookies
            };
            const { data } = await axios.post(`${API_BASE_URL}/auth/login`, { email, password }, config);
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            throw error.response?.data?.message || error.message;
        }
    };

    const register = async (name, email, password) => {
        setLoading(true);
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            };
            const { data } = await axios.post(`${API_BASE_URL}/auth/register`, { name, email, password }, config);
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            throw error.response?.data?.message || error.message;
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
            localStorage.removeItem('userInfo');
            setUser(null);
        } catch (error) {
            console.error(error);
            localStorage.removeItem('userInfo');
            setUser(null);
        }
    };

    // Function to update user data (e.g., after profile update)
    const updateUser = async (updatedData) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}` // Ensure token is sent if needed, though cookies might be used
                },
                withCredentials: true
            };
            const { data } = await axios.put(`${API_BASE_URL}/users/profile`, updatedData, config);

            const newUserData = { ...user, ...data };
            setUser(newUserData);
            localStorage.setItem('userInfo', JSON.stringify(newUserData));
            return newUserData;
        } catch (error) {
            console.error('Failed to update user profile:', error);
            throw error;
        }
    };

    // Function to refresh user data from server
    const refreshUser = async () => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/users/profile`, {
                withCredentials: true
            });
            const updatedUser = { ...user, ...data };
            setUser(updatedUser);
            localStorage.setItem('userInfo', JSON.stringify(updatedUser));
            return updatedUser;
        } catch (error) {
            console.error('Failed to refresh user data:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};
