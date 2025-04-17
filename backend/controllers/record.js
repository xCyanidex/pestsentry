// controllers/recordController.js
const Record = require('../models/record');
const { validationResult } = require('express-validator');
const { createClient } = require('@supabase/supabase-js');
const config=require('../config/config')


const supabase = createClient(
    config.SUPABASE_URL,
    config.SUPABASE_SERVICE_ROLE_KEY // not public anon key
);

const createRecord = async (req, res) => {
    const parsedRecord = JSON.parse(req.body.record);

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
 
        const pictures=req.files;
        const files = pictures;
        const uploadedUrls = [];

        if (files && files.length > 0) {
            for (let file of files) {
                const fileExt = file.originalname.split(".").pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
                const path = `records/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from("pest-sentry") // replace with your Supabase bucket name
                    .upload(path, file.buffer, {
                        contentType: file.mimetype,
                        upsert: false,
                    });

                if (uploadError) {
                    console.error("Supabase upload error:", uploadError);
                    return res.status(500).json({ message: "Error uploading file to Supabase" });
                }

                const { data: { publicUrl } } = supabase
                    .storage
                    .from("pest-sentry")
                    .getPublicUrl(path);

                uploadedUrls.push(publicUrl);
            }
        }
        parsedRecord.extermination.pictures = uploadedUrls;

        const record = new Record(parsedRecord);

        await record.save();
        res.status(201).json(record);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating record" });
    }
};

const getRecordByUser = async (req, res) => {

    try {
        const userId = req.params.id
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
        console.log(recordId);
        const userId=req.user._id.toString();
    
        const record = await Record.findOne({ _id: recordId, exterminatorId: userId });
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.status(200).json(record);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving record' });
    }
};

module.exports = { createRecord, getRecordByUser, editRecord, deleteRecord, getRecordById };