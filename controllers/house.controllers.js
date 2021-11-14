const {House, User, HouseDetail, HouseImage} = require('../models');
const asyncRequest = require('async-request');
const jwt = require('jsonwebtoken');
const getAddress = async(house) => {
    url_province = `https://provinces.open-api.vn/api/p/${house.province_code}?depth=1`;
    url_district = `https://provinces.open-api.vn/api/d/${house.district_code}?depth=1` ;
    url_ward = `https://provinces.open-api.vn/api/w/${house.ward_code}?depth=1`;
    try {
        const res_province = await asyncRequest(url_province);
        const res_district = await asyncRequest(url_district);
        const res_ward = await asyncRequest(url_ward);
        const data_province = JSON.parse(res_province.body);
        const data_district = JSON.parse(res_district.body);
        const data_ward = JSON.parse(res_ward.body);
        const address = house.street +' ' + data_ward.name+ ' ' + data_district.name +' ' +data_province.name ;
        return address;
    } catch (error) {
        console.log(error)
    }
}

const uploadImageHouse = (req, res) =>{
    res.send(req.file);
}

const createHouse = async (req, res) => {
    
    const {title,
        price,
        area,
        province_code,
        district_code,
        ward_code,
        street,
        description,
        image} = req.body;
                        // const {title,
            //     price,
            //     area,
            //     province_code,
            //     district_code,
            //     ward_code,
            //     street,
            //     description} = req.body;
            const token = req.header("token");
            const decode = jwt.verify(token, "pikachu");
            const user= await User.findOne({
                where:{
                    username: decode.username,
                }
            });
            const newHouse = await House.create({title,
                price,
                area,
                province_code,
                district_code,
                ward_code,
                street,
                user_id : user.id
            });
            const newHouseDetail = await HouseDetail.create({
                description,
                house_id: newHouse.id
            })
            const newHouseImage = await HouseImage.create({
                image,
                house_id: newHouse.id
            })
            res.status(200).send(newHouse, newHouseDetail.description, newHouseImage.image);
     //res.send(user);  
}

const getList = async (req, res) => {
    const houses = await House.findAll({
        order:[
            ['createdAt', 'DESC']
        ]
    });
    const listHouse = [];
    for (let i=0; i<houses.length; i++){
        const address = await getAddress(houses[i]);
        const houseImage = await HouseImage.findOne({
            where : {
                house_id : houses[i].id
            }
        });
        listHouse.push({house:houses[i], address, image: houseImage.image})
    }
    //const address = houses.map( await getAddress)
    console.log(listHouse);
    res.status(200).send(listHouse);
}

const getHouseDetail = async (req, res) => {
    const house = await House.findOne({
        where : {
            id : req.params.id
        }
    });
    const houseDetail = await HouseDetail.findOne({
        where : {
            house_id : req.params.id
        }
    });
    const houseImage = await HouseImage.findOne({
        where : {
            house_id : req.params.id
        }
    });
    console.log({house});
    const address = await getAddress(house);
    res.status(200).send({house,address, description: houseDetail.description, image: houseImage.image});
}
module.exports = {
    uploadImageHouse,
    createHouse,
    getList,
    getHouseDetail
}