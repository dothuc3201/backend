const express = require('express');
const {createUser, loginUser, userList} = require('../controllers/user.controllers');

const userRouter = express.Router();

userRouter.post('/register', createUser);
userRouter.post('/login', loginUser);
userRouter.get('/', userList);

module.exports = {userRouter};