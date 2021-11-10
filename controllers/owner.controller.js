const {Owner} = require('../models');
const{User} = require('../models');
const jwt = require('jsonwebtoken');

const createOwner = async (req, res) =>{
    
        const token = req.header("token");
        const decode = jwt.verify(token, "pikachu");
        const {phone, email} = req.body;
        try {
            const newOwner= await Owner.create({phone, email, user_id : decode.id});
            const owner = await User.findOne({
                where:{
                    id: decode.id,
                }
            });
            owner.type = "owner";
            await owner.save();
            res.status(201).send(newOwner);
        } catch (error) {
            res.status(500).send(error);
        }
    
}

module.exports ={
    createOwner,
}