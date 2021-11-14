const {House, User, HouseDetail, HouseImage} = require('../models');
const asyncRequest = require('async-request');
const { Op } = require("sequelize");

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

const resSearch = async (houses) =>{
    //console.log(houses);
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
        //console.log(listHouse);
        return listHouse;    
}
const search = async (req, res) =>{
    const {p, d, w, price_min, price_max, area_min, area_max} = req.query;
    if(w){
        const houses = await House.findAll({
            where: {
                [Op.and]:[{ward_code: w},
                    {price:{
                        [Op.gte]:price_min,
                        [Op.lt]:price_max
                    }},
                    {area:{
                        [Op.gte]:area_min,
                        [Op.lt]:area_max
                    }}]
            },
            order:[
                ['createdAt', 'DESC']
            ]
        });
        console.log(houses.dataValues);
        const listHouse = await resSearch(houses);
        res.status(200).send(listHouse);
    }
    else if(d){
        const houses = await House.findAll({
            where: {
                [Op.and]:[{district_code: d},
                    {price:{
                        [Op.gte]:price_min,
                        [Op.lt]:price_max
                    }},
                    {area:{
                        [Op.gte]:area_min,
                        [Op.lt]:area_max
                    }}]
            },
            order:[
                ['createdAt', 'DESC']
            ]
        });
        console.log(houses);
        const listHouse = await resSearch(houses);
        res.status(200).send(listHouse);
    }else {
        const houses = await House.findAll({
            where: {
                [Op.and]:[{province_code: p},
                    {price:{
                        [Op.gte]:price_min,
                        [Op.lt]:price_max
                    }},
                    {area:{
                        [Op.gte]:area_min,
                        [Op.lt]:area_max
                    }}]
            },
            order:[
                ['createdAt', 'DESC']
            ]
        });
        const listHouse = await resSearch(houses);
        console.log(listHouse);
        res.status(200).send(listHouse);
    }
    console.log({p, d, w, price_min, price_max, area_min, area_max});
    //res.send(req.query)
} 

module.exports = {
    search
}