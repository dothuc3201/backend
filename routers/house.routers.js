const express = require('express');
const {uploadImage} = require('../middleware/upload');
const {authenticate} = require('../middleware/authen');
const {createHouse, uploadImageHouse, getList, getHouseDetail} = require('../controllers/house.controllers');
const houseRouter = express.Router();

houseRouter.post('/upload', authenticate,uploadImage(), uploadImageHouse)
houseRouter.post('/create', authenticate, uploadImage(), createHouse);
houseRouter.get('/thuenha/:id', getHouseDetail);
houseRouter.get('/thuenha', getList)

module.exports = {
    houseRouter
}
