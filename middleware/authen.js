const{User} = require('../models');
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    try {
        const token = req.header("token");
        const decode = jwt.verify(token, "pikachu");
        const user = await User.findOne({
            where:{
                username: decode.username,
            }
        });
        if (user.token == token){
            next();
        }
        else{res.status(500).send({decode});}
    } catch (error) {
        res.status(500).send("bạn cần đăng nhập");
    }
}

module.exports = {
    authenticate
}