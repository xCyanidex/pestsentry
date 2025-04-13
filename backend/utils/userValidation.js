// middleware/validation.js
const { checkSchema } = require('express-validator');

const userCreateSchema = {
    name: {
        notEmpty: true,
        errorMessage: 'Name is required',
    },
    email: {
        notEmpty: true,
        isEmail: true,
        errorMessage: 'Email is required and must be a valid email address',
    },
    password: {
        notEmpty: true,
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password must be at least 8 characters long',
        },
        errorMessage: 'Password is required',
    },
    role: {
        optional: true,
        isIn: {
            options: [['exterminator', 'admin', 'customer']],
            errorMessage: 'Invalid role',
        },
    },
    'contactInfo.phone': {
        optional: true,
        errorMessage: 'Phone number must be a string',
    },
    'exterminatorInfo.licenseNumber': {
        optional: true,
        errorMessage: 'License number must be a string',
    },
    'exterminatorInfo.companyName': {
        optional: true,
        errorMessage: 'Company name must be a string',
    },
};


const userLoginSchema = {
    email: {
        notEmpty: true,
        isEmail: true,
        errorMessage: 'Email is required and must be a valid email address',
    },
    password: {
        notEmpty: true,
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password must be at least 8 characters long',
        },
        errorMessage: 'Password is required',
    },
};

const editUserSchema = {
    name: {
        optional: true,
        notEmpty: true,
        errorMessage: 'Name is required',
    },
    role: {
        optional: true,
        isIn: {
            options: [['exterminator', 'admin', 'customer']],
            errorMessage: 'Invalid role',
        },
    },
    'contactInfo.phone': {
        optional: true,
        errorMessage: 'Phone number must be a string',
    },
    'contactInfo.address': {
        optional: true,
        errorMessage: 'Address must be a string',
    },
    'exterminatorInfo.licenseNumber': {
        optional: true,
        errorMessage: 'License number must be a string',
    },
    'exterminatorInfo.companyName': {
        optional: true,
        errorMessage: 'Company name must be a string',
    },
};


const validateCreateUser = checkSchema(userCreateSchema);

const validateLoginUser = checkSchema(userLoginSchema)

const validateEditUser=checkSchema(editUserSchema);

module.exports = { validateCreateUser, validateLoginUser, validateEditUser   };