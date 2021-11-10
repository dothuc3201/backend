const express = require('express');
const {createUser, loginUser, getUserById, updateUser, logoutUser} = require('../controllers/user.controllers');
const{authenticate} = require('../middleware/authen');
const userRouter = express.Router();

userRouter.post('/register', createUser);
userRouter.post('/login', loginUser);
userRouter.put('/update', authenticate, updateUser);
userRouter.get('/getById', authenticate, getUserById);
userRouter.post('/logout', authenticate, logoutUser);


module.exports = {userRouter};