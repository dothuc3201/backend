const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try {
        const token = req.header("token");
        const decode = jwt.verify(token, "pikachu");
        if (decode){
            console.log(decode);
            next();
        }
    } catch (error) {
        res.status(500).send("bạn cần đăng nhập");
    }
}

module.exports = {
    authenticate
}