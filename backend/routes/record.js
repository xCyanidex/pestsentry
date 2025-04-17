const recordRouter=require('express').Router();
const recordControllers=require('../controllers/record');
const {validateRecord} =require('../utils/recordValidation');
const authenticate=require('../middleware/auth');


const multer = require('multer');

// In-memory storage for Supabase upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

recordRouter.get('/content/:id', authenticate, recordControllers.getRecordByUser);
recordRouter.get('/:id', recordControllers.getRecordById);

recordRouter.post(
    '/',
    upload.array('pictures', 3),
    // validateRecord,
    authenticate,
    recordControllers.createRecord
);

recordRouter.put('/:id', validateRecord, recordControllers.editRecord);
recordRouter.delete('/:id', recordControllers.deleteRecord);

module.exports=recordRouter;
