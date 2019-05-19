// import * as path from 'path';
import * as Dotenv from 'dotenv';
import * as SequelizeLoader from '../sequelize-loader';

Dotenv.config();

const database = SequelizeLoader.database;
const Sequelize = SequelizeLoader.sequelize;

const App = database.define(
  'app',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: true
    },
    intro: {
      type: Sequelize.STRING,
      allowNull: true
    },
    ver: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    commit: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.TIME,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.TIME,
      allowNull: false
    }
  }
);

console.log(App);
