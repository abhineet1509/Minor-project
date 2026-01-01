// Quick script to create a test admin account
// Run this once: node createAdmin.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const createAdmin = async () => {
    try {
        // Check if admin exists
        const adminExists = await Admin.findOne({ email: 'admin@smartnutri.ai' });

        if (adminExists) {
            console.log('Admin already exists!');
            console.log('Email: admin@smartnutri.ai');
            process.exit(0);
        }

        // Create new admin
        const admin = await Admin.create({
            email: 'admin@smartnutri.ai',
            password: 'admin123' // Will be hashed automatically
        });

        console.log('✅ Admin created successfully!');
        console.log('Email: admin@smartnutri.ai');
        console.log('Password: admin123');
        console.log('\nYou can now login at /admin/login');

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
