const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const config=require('../config/config');
const { validationResult } = require('express-validator');


const createUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(req.body.password, saltRounds);

        const user = new User({ ...req.body, password: passwordHash });
        await user.save();
        res.status(201).json({ ...user.toObject(), password: undefined });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
}

const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const tokenPayload = {
            id: user._id.toString(),
            email: user.email,
            }
        const token = jwt.sign(tokenPayload, config.SECRET, { expiresIn: req.body.rememberMe ? '30d' : '1h' });
        
        res
            .status(200)
            .json({ token, userId: user._id.toString(), email: user.email, name: user.name })
            
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in user' });
    }
};

const editUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user details
        user.name = req.body.name || user.name;
        user.role = req.body.role || user.role;
        user.contactInfo.phone = req.body.contactInfo?.phone || user.contactInfo.phone;
        user.contactInfo.address = req.body.contactInfo?.address || user.contactInfo.address;
        if (req.body.role === 'exterminator') {
            user.exterminatorInfo.licenseNumber = req.body.exterminatorInfo?.licenseNumber || user.exterminatorInfo.licenseNumber;
            user.exterminatorInfo.companyName = req.body.exterminatorInfo?.companyName || user.exterminatorInfo.companyName;
        }
        user.updatedAt = Date.now();
        await user.save();
        res.json({ ...user.toObject(), password: undefined });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user' });
    }
};




module.exports = { createUser, loginUser, editUser }