const express = require('express');
const {userRouter} = require('./user.routers');
const{houseRouter} = require('./house.routers');
const { homeRouter } = require('./home.routers');

const rootRouter= express.Router();

rootRouter.use('/user', userRouter);
rootRouter.use('/house', houseRouter);
rootRouter.use('/', homeRouter);

module.exports = {
    rootRouter
}