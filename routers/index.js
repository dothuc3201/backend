const express = require('express');
const {userRouter} = require('./user.routers');
const{houseRouter} = require('./house.routers');

const rootRouter= express.Router();

rootRouter.use('/user', userRouter);
rootRouter.use('/house', houseRouter);

module.exports = {
    rootRouter
}