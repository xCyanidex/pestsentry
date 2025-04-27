const recordRouter=require('express').Router();
const recordControllers=require('../controllers/record');
const {validateRecord} =require('../utils/recordValidation');
const authenticate=require('../middleware/auth');


const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

recordRouter.get('/content/:id', authenticate, recordControllers.getRecordByUser);
recordRouter.get('/:id', recordControllers.getRecordById);

recordRouter.post(
    '/',
    authenticate,
    upload.array('pictures', 3),
    // validateRecord,
    recordControllers.createRecord
);

recordRouter.put('/:id', authenticate,
    upload.array('pictures', 3),
    // validateRecord,
    recordControllers.editRecord
);

recordRouter.delete('/:id', authenticate,recordControllers.deleteRecord);

recordRouter.get('/report/:id', authenticate,recordControllers.createRecordReport)

module.exports=recordRouter;
