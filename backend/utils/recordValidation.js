// middleware/validation.js
const { checkSchema } = require('express-validator');

const recordSchema = {
    'structure.type': {
        notEmpty: true,
        optional: true,
        errorMessage: 'Structure type is required',
    },
    'structure.address.street': {
        notEmpty: true,
        errorMessage: 'Street address is required',
    },
    'structure.address.city': {
        notEmpty: true,
        errorMessage: 'City is required',
    },
    'structure.address.state': {
        notEmpty: true,
        errorMessage: 'State is required',
    },
    'structure.address.zip': {
        notEmpty: true,
        errorMessage: 'Zip code is required',
    },
    'extermination.date': {
        notEmpty: true,
        errorMessage: 'Extermination date is required',
    },
    'extermination.time': {
        notEmpty: true,
        errorMessage: 'Extermination time is required',
    },
    'extermination.pesticideUsed.name': {
        notEmpty: true,
        errorMessage: 'Pesticide name is required',
    },
    'extermination.pesticideUsed.quantity': {
        notEmpty: true,
        isNumeric: true,
        errorMessage: 'Pesticide quantity is required and must be a number',
    },
    'extermination.pesticideUsed.unit': {
        notEmpty: true,
        errorMessage: 'Pesticide unit is required',
    },
    'extermination.targetPest': {
        notEmpty: true,
        errorMessage: 'Target pest is required',
    },
    'exterminator.name': {
        notEmpty: true,
        errorMessage: 'Exterminator name is required',
    },
    'exterminator.contactInfo.phone': {
        notEmpty: true,
        errorMessage: 'Exterminator phone number is required',
    },
};

const validateRecord = checkSchema(recordSchema);

module.exports = { validateRecord };