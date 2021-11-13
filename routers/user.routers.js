const express = require('express');
const {createUser, loginUser, getUserById, updateUser, logoutUser} = require('../controllers/user.controllers');
const{authenticate} = require('../middleware/authen');
const userRouter = express.Router();
// đăng ký
userRouter.post('/register', createUser);
//đăng nhập
userRouter.post('/login', loginUser);
//update thông tin
userRouter.put('/update', authenticate, updateUser);
//lấy thông tin
userRouter.get('/getById', authenticate, getUserById);
//logout
userRouter.post('/logout', authenticate, logoutUser);


module.exports = {userRouter};