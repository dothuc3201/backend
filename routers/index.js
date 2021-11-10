const express = require('express');
const {userRouter} = require('./user.routers');
const {ownerRouter} = require('./owner.router')

const rootRouter= express.Router();

rootRouter.use('/user', userRouter);
rootRouter.use('/owner', ownerRouter);

module.exports = {
    rootRouter
}