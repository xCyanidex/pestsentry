// controllers/recordController.js
const Record = require('../models/record');
const { validationResult } = require('express-validator');


const createRecord = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
        const record = new Record(req.body);
        await record.save();
        res.status(201).json(record);
};

const getRecordByUser=async (req,res)=>{
    const userId=req.user._id;
    const records = await Record.find({ 'exterminator._id': userId });
    res.json(records);
}


const editRecord = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
        const recordId = req.params.id;
        const userId = req.user._id; // Assuming you're using authentication middleware

        const record = await Record.findOne({ _id: recordId, exterminatorId: userId });
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        Object.assign(record, req.body);
        record.updatedAt = Date.now();
        await record.save();
        res.json(record);   
};


const deleteRecord = async (req, res) => {
    
        const recordId = req.params.id;
        const userId = req.user._id;

        const record = await Record.findOneAndDelete({ _id: recordId, exterminatorId: userId });
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        res.json({ message: 'Record deleted successfully' });
  
};


const getRecordById=async (req,res)=>{
  
        const recordId = req.params.id;
        const userId = req.user._id;
        const record = await Record.findOne({ _id: recordId, exterminatorId: userId });
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json(record);
   
}

module.exports = { createRecord, getRecordByUser, editRecord, deleteRecord, getRecordById };