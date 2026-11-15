'use strict';

const sequelize = require('../database/database');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Student', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email: {
        type: Sequelize.STRING,
      allowNull:false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      
      department:{
        type: Sequelize.STRING,
        allowNull: false
      },
      profileImage: {
        type: Sequelize.STRING,
        allowNull: true
      },
      
      galleryImages:{
        type:Sequelize.JSON,
        allowNull: false
      },
      
      passportImage: {
        type:Sequelize.STRING,
        allowNull:true
      },
      
      identityCardImage:{
        type:Sequelize.STRING,
        allowNull: true
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Students');
  }
};