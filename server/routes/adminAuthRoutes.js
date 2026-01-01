import express from 'express';
import asyncHandler from 'express-async-handler';
import Admin from '../models/Admin.js';
import generateToken from '../utils/generateToken.js';

const router = express.Router();

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
        generateToken(res, admin._id);
        res.json({
            _id: admin._id,
            email: admin.email,
            role: admin.role,
        });
    } else {
        res.status(401);
        throw new Error('Invalid Admin Credentials');
    }
}));

// @desc    Register a new admin (Seed only)
// @route   POST /api/admin/register
// @access  Public
router.post('/register', asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
        res.status(400);
        throw new Error('Admin already exists');
    }

    const admin = await Admin.create({ email, password });

    if (admin) {
        generateToken(res, admin._id);
        res.status(201).json({
            _id: admin._id,
            email: admin.email,
            role: admin.role,
        });
    } else {
        res.status(400);
        throw new Error('Invalid admin data');
    }
}));

// @desc    Logout admin
// @route   POST /api/admin/logout
// @access  Public
router.post('/logout', (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Admin Logged out' });
});

export default router;
