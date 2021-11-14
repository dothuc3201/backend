const express = require('express');
const { search } = require('../controllers/home.controllers');
const { getList } = require('../controllers/house.controllers');

const homeRouter = express.Router();
//lấy data tất cả các bài đăng
homeRouter.get('/', getList);
homeRouter.get('/search', search);

module.exports = {
    homeRouter
}