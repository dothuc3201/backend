const{User} = require('../models');
const jwt = require('jsonwebtoken');
const createUser = async (req, res) => {
    const{username, password, firstName, lastName}=req.body;
    try {
        const newUser= await User.create({username, password,firstName,lastName});
        res.status(201).send(newUser);
    } catch (error) {
        res.status(500).send(error);
    }
}

const loginUser = async (req, res) => {
    const{username, password}=req.body;
    try {
        const loginUser= await User.findOne({
            where:{
                username,
                password
            }
        });
        if(loginUser){
            const token = jwt.sign({id: loginUser.id, username: loginUser.username, type: loginUser.type}, "pikachu", {expiresIn: 7 * 24 * 60 * 60});
            res.status(201).send({messenger:"Đăng nhập thành công", id: loginUser.id, username: loginUser.username, type: loginUser.type ,token});
        }else{
            res.status(404).send("Tài khoản hoặc mật khẩu bạn không đúng!");
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const userList = async (req, res) => {
    try {
        const users= await User.findAll();
        res.status(201).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createUser,
    loginUser,
    userList
}