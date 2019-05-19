'use strict';
const path = require('path');
const Dotenv = require('dotenv');
const ORM = require('sequelize');
Dotenv.config();
const orm = new ORM('database', (process.env.dbUser || ''), (process.env.dbPassword || ''), {
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', '..', 'main.sqlite3'),
  logging: (process.env.dbLogging !== 'false'),
  operatorsAliases: false
});
module.exports.database = orm;
module.exports.sequelize = ORM;
