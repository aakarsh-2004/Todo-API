const express = require('express');
const { createUser, loginUser, deleteUser } = require('../controllers/userController');
const authenticate = require('../middlewares/userAuth');

const userRouter = express.Router();

userRouter.post('/signup', createUser);
userRouter.post('/signin', loginUser);
userRouter.delete('/deleteuser/:userId', authenticate, deleteUser);


module.exports = userRouter;