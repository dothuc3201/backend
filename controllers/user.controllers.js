const{User} = require('../models');
const jwt = require('jsonwebtoken');
const createUser = async (req, res) => {
    const{username, password, firstName, lastName, email, phone, type}=req.body;
    const token = jwt.sign({username, type}, "pikachu", {expiresIn: 7 * 24 * 60 * 60});
    try {
        const newUser= await User.create({username, password,firstName,lastName, email, phone, type, token});
        res.status(201).send({messenger:"Đăng ký thành công", id:newUser.id, username, type, token});
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
            res.status(201).send({messenger:"Đăng nhập thành công", id: loginUser.id, username: loginUser.username, type: loginUser.type ,token: loginUser.token});
        }else{
            res.status(404).send("Tài khoản hoặc mật khẩu bạn không đúng!");
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const getUserById = async (req, res) => {
    try {
        const token = req.header("token");
        const decode = jwt.verify(token, "pikachu");
        const userById= await User.findOne({
            where:{
                username: decode.username,
            }
        });
        res.status(200).send(userById);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateUser = async (req, res) => {
        const token = req.header("token");
        const decode = jwt.verify(token, "pikachu");
        const {password, firstName, lastName, email, phone, type} = req.body;
        try {
            const user = await User.findOne({
                where:{
                    username: decode.username,
                }
            });
            user.password = password;
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.phone = phone;
            user.type = type;
            await user.save();
            res.status(200).send(user);
        } catch (error) {
            res.status(500).send(error);
        }
}

const logoutUser = async (req, res) => {
        const token = req.header("token");
        const decode = jwt.verify(token, "pikachu");
        try {
            const user = await User.findOne({
                where:{
                    username: decode.username,
                }
            });
            const updatedAt = new Date();
            user.updatedAt = updatedAt;
            await user.save();
            const newToken = jwt.sign({username:user.username, type:user.type, updatedAt: user.updatedAt}, "pikachu", {expiresIn: 7 * 24 * 60 * 60});
            user.token = newToken;
            await user.save();
            res.status(200).send({messenger: "bạn đã đăng xuất"});
        } catch (error) {
            
        }
}

module.exports = {
    createUser,
    loginUser,
    getUserById,
    updateUser,
    logoutUser
}