import * as path from 'path';
import * as Dotenv from 'dotenv';
import * as ORM from 'sequelize';

Dotenv.config();

console.log(path.join(__dirname, '..', 'main.sqlite3'));

const orm = new ORM(
  'database',
  (process.env.dbUser || ''),
  (process.env.dbPassword || ''),
  {
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'main.sqlite3'),
    logging: (process.env.dbLogging !== 'false'),
    operatorsAliases: false,
  },
);

export const database = orm;
export const sequelize = ORM;
