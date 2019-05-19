'use strict';

const path = require('path');
const Dotenv = require('dotenv');
const SequelizeLoader = require('../sequelize-loader');
Dotenv.config();
const fs = require('fs-extra');
const database = SequelizeLoader.database;
const sequelize = SequelizeLoader.sequelize;
const Apps = require('../apps');
const moment = require('moment');
const Line = require('@line/bot-sdk');
const toString = Object.prototype.toString;

const client = new Line.Client({
  channelAccessToken: (process.env.channelAccessToken || ''),
  channelSecret: (process.env.channelSecret || ''),
  channelId: (process.env.channelId || ''),
});

const Users = database.define('users', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  line: {
    type: sequelize.STRING,
    allowNull: false
  },
  name: {
    type: sequelize.STRING,
    allowNull: false
  },
  tutorial: {
    type: sequelize.STRING,
    allowNull: true
  },
  pin: {
    type: sequelize.INTEGER,
    allowNull: true
  },
  picture: {
    type: sequelize.STRING,
    allowNull: true
  },
  reply: {
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

const findOrAddByLineId = (lineId, callback) => {
  if (toString.call(lineId) !== '[object String]') {
    callback(Error('lineId is String.'));
    return false;
  }
  Users.findOne({where: {line: lineId}}).then(user => {
    if (user) {
      callback(null, user);
      return true;
    }
    client.getProfile(lineId).then(profile => {
      const nowUnix = moment().unix();
      Users.create({
        line: lineId,
        name: profile.displayName,
        picture: ('pictureUrl' in profile) ? profile.pictureUrl.replace('https://profile.line-scdn.net/', '') : null,
        createdAt: nowUnix,
        updatedAt: nowUnix
      }).then(newUser => {
        Apps.table.create({
          users_id: newUser.id,
          title: '',
          intro: '',
          commit: 0,
          ver: 0,
          createdAt: nowUnix,
          updatedAt: nowUnix
        }).then(newApp => { fs.mkdirs(path.join(__dirname, '..', '..', 'public', `${newUser.id}`), err => {
          if (err) return false;
          fs.writeFile(path.join(__dirname, '..', '..', 'public', `${newUser.id}`, 'index.html'), '');
          fs.writeFile(path.join(__dirname, '..', '..', 'public', `${newUser.id}`, 'style.css'), '');
          fs.writeFile(path.join(__dirname, '..', '..', 'public', `${newUser.id}`, 'script.js'), '');
          fs.mkdirs(path.join(__dirname, '..', '..', 'public', `d${newUser.id}`), reErr => {
            if (reErr) return false;
            fs.writeFile(path.join(__dirname, '..', '..', 'public', `d${newUser.id}`, 'index.html'), '');
            fs.writeFile(path.join(__dirname, '..', '..', 'public', `d${newUser.id}`, 'style.css'), '');
            fs.writeFile(path.join(__dirname, '..', '..', 'public', `d${newUser.id}`, 'script.js'), '');
            newUser.tutorial = newApp.id;
            newUser.save().then(reNewUser => callback(null, reNewUser));
          });
        });});
      });
    }).catch(err => callback(err));
  });
};

const reply = (lineId, callback) => {
  if (toString.call(lineId) !== '[object String]') {
    callback(Error('lineId is String.'));
    return false;
  }
  Users.findOne({where: {line: lineId}}).then(user => {
    if (!user) return false;
    user.reply = (moment().diff(moment.unix(user.updatedAt),  'months') >= 1) ? 0 : user.reply + 1;
    user.updatedAt = moment().unix();
    user.save();
  });
};

module.exports.table = Users;
module.exports.findOrAddByLineId = findOrAddByLineId;
module.exports.reply = reply;
