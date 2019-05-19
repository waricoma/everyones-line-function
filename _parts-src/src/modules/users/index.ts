// import * as path from 'path';
import * as Dotenv from 'dotenv';
import * as SequelizeLoader from '../sequelize-loader';
import { UserParams, UserInstance } from '../interfaces/interface';

Dotenv.config();

const database = SequelizeLoader.database;
const sequelize = SequelizeLoader.sequelize;

export const user = database.define<UserInstance, UserParams>(
  'users',
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    line: {
      type: sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: sequelize.STRING,
      allowNull: false,
    },
    pin: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
    picture: {
      type: sequelize.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  },
);

/*
const lineId:UserParams = {
  id: 0,
  line: 'aaa',
  name: 'aaa',
  pin: 0,
  picture: '0'
};

user.find({
  line: lineId.line
});
*/
