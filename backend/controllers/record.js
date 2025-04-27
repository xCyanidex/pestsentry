// controllers/recordController.js
const Record = require('../models/record');
const { validationResult } = require('express-validator');
const { createClient } = require('@supabase/supabase-js');
const config=require('../config/config');
const {GoogleGenAI} = require('@google/genai');



const GEMINI_API_KEY = config.Gemini_key;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });


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
        const records = await Record.find({ exterminatorId: userId }).sort({ createdAt: -1 });
        res.json(records);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving records' });
    }
};

const editRecord = async (req, res) => {
    const parsedRecord = JSON.parse(req.body.updatedRecord);
    const recordId = req.params.id;
    const files = req.files;
    const uploadedUrls = [];

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const record = await Record.findById(recordId);
        if (!record) {
            return res.status(404).json({ message: "Record not found" });
        }

    

        // Remove old pictures from Supabase if new pictures are provided
        if (files && files.length > 0 && record.extermination?.pictures?.length) {
            for (const pic of record.extermination.pictures) {
                const picPath = pic.split("/storage/v1/object/public/pest-sentry/")[1];
                if (picPath) {
                    const { error: uploadError } = await supabase
                        .storage
                        .from('pest-sentry')
                        .remove([picPath]);

                    if (uploadError) {
                        console.error("Error deleting picture:", picPath, uploadError);
                    }
                }
            }
        }

        // Upload new pictures to Supabase
        if (files && files.length > 0) {
            for (let file of files) {
                const fileExt = file.originalname.split(".").pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
                const path = `records/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from("pest-sentry")
                    .upload(path, file.buffer, {
                        contentType: file.mimetype,
                        upsert: false,
                    });

                if (uploadError) {
                    console.error("Supabase upload error:", uploadError);
                    return res.status(500).json({ message: "Error uploading file to Supabase" });
                }

                const { data } = supabase
                    .storage
                    .from("pest-sentry")
                    .getPublicUrl(path);

                uploadedUrls.push(data.publicUrl);
            }

            parsedRecord.extermination.pictures = uploadedUrls;
        }


        if (!files || files.length === 0) {
            const record = await Record.findById(recordId);
            parsedRecord.extermination.pictures = record.extermination?.pictures || [];
        }

        const updatedRecord = await Record.findByIdAndUpdate(recordId, parsedRecord, { new: true });
        res.status(200).json(updatedRecord);
    } catch (error) {
        console.error("Edit Record Error:", error);
        res.status(500).json({ message: "Error editing record" });
    }
};


const deleteRecord = async (req, res) => {
    try {
        const recordId = req.params.id;
        const userId = req.user._id;
        console.log("Deleting record ID:", recordId);

        const record = await Record.findOne({ _id: recordId, exterminatorId: userId });

        if (!record) {
            return res.status(404).json({ message: 'Record not found or unauthorized' });
        }

        if (record.extermination?.pictures?.length) {
            for (const pic of record.extermination.pictures) {
                const picPath = pic.split("/storage/v1/object/public/pest-sentry/")[1];
                if (picPath) {
                    const { error: uploadError } = await supabase
                        .storage
                        .from('pest-sentry')
                        .remove([picPath]);

                    if (uploadError) {
                        console.error("Error deleting picture:", picPath, uploadError);
                    }
                }
            }
        }


        await Record.deleteOne({ _id: recordId });

        res.json({ message: 'Record and related pictures deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting record' });
    }
};


const getRecordById = async (req, res) => {

    try {
        const recordId = req.params.id;

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

const createRecordReport=async (req,res)=>{

    const recordId = req.params.id;

    const userId = req.user._id.toString();

    const record = await Record.findOne({ _id: recordId, exterminatorId: userId });
    if (!record) {
        return res.status(404).json({ message: 'Record not found' });
    }

    const response = await ai.models.generateContent({
        model:'gemini-2.0-flash-001',
        contents:`This is pest report generator app and following is an object containing all the data regarding the current pest extermination, I need you to generate a report regarding this extermination which should be under 10 lines, concise and to the point and it should have a structure where you first tell what was the problem and what was the observation and what seemed to be the solution and how it turned out and what did you use etc here is the record object ${record} `,
    })
    console.log(response)
    if(response){
        return res.status(200).json({ report: response.text });
    }else{
        return res.status(400).json({message:"Something went wrong."})
    }
}

module.exports = { createRecord, getRecordByUser, editRecord, deleteRecord, getRecordById, createRecordReport };