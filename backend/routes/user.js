const userRouter=require('express').Router();
const userController =require('../controllers/user');
const { validateCreateUser, validateLoginUser, validateEditUser } =require('../utils/userValidation')

userRouter.post('/', validateCreateUser, userController.createUser);
userRouter.post('/login', validateLoginUser, userController.loginUser);
userRouter.post('/edit', validateEditUser, userController.editUser);

module.exports = userRouter;