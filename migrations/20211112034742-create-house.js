'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Houses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      area: {
        type: Sequelize.INTEGER
      },
      province_code: {
        type: Sequelize.STRING
      },
      district_code: {
        type: Sequelize.STRING
      },
      ward_code: {
        type: Sequelize.STRING
      },
      street: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      user_id :{
        type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: 'users',
          // This is the column name of the referenced model
          key: 'id',
          }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Houses');
  }
};