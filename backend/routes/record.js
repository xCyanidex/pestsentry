const recordRouter=require('express').Router();
const recordControllers=require('../controllers/record');
const {validateRecord} =require('../utils/recordValidation');


recordRouter.get('/', recordControllers.getRecordByUser);
recordRouter.get('/:id', recordControllers.getRecordById);
recordRouter.post('/', validateRecord, recordControllers.createRecord);
recordRouter.put('/:id', validateRecord, recordControllers.editRecord);
recordRouter.delete('/:id', recordControllers.deleteRecord);

module.exports=recordRouter;
