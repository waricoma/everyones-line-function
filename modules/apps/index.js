'use strict';
const Dotenv = require('dotenv');
const SequelizeLoader = require('../sequelize-loader');
Dotenv.config();
const database = SequelizeLoader.database;
const sequelize = SequelizeLoader.sequelize;
const Apps = database.define('apps', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  users_id: {
    type: sequelize.INTEGER,
    allowNull: false
  },
  title: {
    type: sequelize.STRING,
    allowNull: true
  },
  intro: {
    type: sequelize.STRING,
    allowNull: true
  },
  commit: {
    type: sequelize.INTEGER,
    allowNull: false
  },
  ver: {
    type: sequelize.INTEGER,
    allowNull: false
  },
  createdAt: {
    type: sequelize.INTEGER,
    allowNull: false
  },
  updatedAt: {
    type: sequelize.INTEGER,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false
});

module.exports.table = Apps;
