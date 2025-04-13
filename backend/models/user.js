const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['exterminator', 'admin', 'customer'],
        default: 'customer',
    },
    contactInfo: {
        phone: {
            type: String,
        },
        address: {
            type: String,
        },
    },
    exterminatorInfo: {
        licenseNumber: {
            type: String,
        },
        companyName: {
            type: String,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', UserSchema);