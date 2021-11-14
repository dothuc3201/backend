'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class House extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,HouseDetail, HouseImage}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'user_id'});
      this.hasOne(HouseDetail, {foreignKey: 'house_id'});
      this.hasMany(HouseImage, {foreignKey: 'house_id'})
    }
  };
  House.init({
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    area: DataTypes.INTEGER,
    province_code: DataTypes.STRING,
    district_code: DataTypes.STRING,
    ward_code: DataTypes.STRING,
    street: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'House',
  });
  return House;
};