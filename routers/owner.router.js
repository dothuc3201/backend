const express = require('express');
const {createOwner} = require('../controllers/owner.controller');
const {authenticate} = require('../middleware/authen')


const ownerRouter = express.Router();

ownerRouter.post('/create',authenticate ,createOwner);

module.exports = {ownerRouter};