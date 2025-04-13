// controllers/recordController.js
const Record = require('../models/record');
const { validationResult } = require('express-validator');

const createRecord = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const record = new Record({
            ...req.body,
            // exterminatorId: req.user._id,
            exterminatorId: "6510a9e8d45d3f63d5e7b9ab",
        
        });
        await record.save();
        res.status(201).json(record);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating record' });
    }
};

const getRecordByUser = async (req, res) => {
    try {
        // const userId = req.user._id;
        const userId = "6510a9e8d45d3f63d5e7b9ab";
        const records = await Record.find({ exterminatorId: userId });
        res.json(records);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving records' });
    }
};

const editRecord = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const recordId = req.params.id;
        // const userId = req.user._id;
        const userId = "6510a9e8d45d3f63d5e7b9ab";
        const record = await Record.findOne({ _id: recordId, exterminatorId: userId });
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }
        Object.assign(record, req.body);
        record.updatedAt = Date.now();
        await record.save();
        res.json(record);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating record' });
    }
};

const deleteRecord = async (req, res) => {
    try {
        const recordId = req.params.id;
        // const userId = req.user._id;
        const userId = "6510a9e8d45d3f63d5e7b9ab";
        const record = await Record.findOneAndDelete({ _id: recordId, exterminatorId: userId });
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting record' });
    }
};

const getRecordById = async (req, res) => {
    try {
        const recordId = req.params.id;
        // const userId = req.user._id;
        const userId ="6510a9e8d45d3f63d5e7b9ab";
        const record = await Record.findOne({ _id: recordId, exterminatorId: userId });
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json(record);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving record' });
    }
};

module.exports = { createRecord, getRecordByUser, editRecord, deleteRecord, getRecordById };