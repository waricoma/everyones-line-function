'use strict';

const path = require('path');
const moment = require('moment');
const Express = require('express');
const Line = require('@line/bot-sdk');
const Dotenv = require('dotenv');
const Consola = require('consola');
const Users = require('./modules/users');
const Apps = require('./modules/apps');
const LineMsg = require('./modules/line-msg');
const api = require('./routes/api');
const index = require('./routes/index');
const helmet = require('helmet');
Dotenv.config();
const port = parseFloat(process.env.PORT || '3000');
const config = {
  channelAccessToken: (process.env.channelAccessToken || ''),
  channelSecret: (process.env.channelSecret || ''),
  channelId: (process.env.channelId || ''),
};
const appsMax = parseFloat((process.env.appsMax || 5));
const app = Express();
const client = new Line.Client(config);
const defaultAction = {
  'type': 'uri',
  'label': 'About',
  'uri': 'https://twitter.com/waritocomatta'
};
LineMsg.hears(/^!init$/, ['all'], event => { Users.findOrAddByLineId(event.source.userId, (err, user) => { if (err) return false;
  Apps.table.count({where: {users_id: user.id}}).then(count => {
    if(count >= appsMax) return false;
    const nowUnix = moment().unix();
    Apps.table.create({
      users_id: user.id,
      title: '',
      intro: '',
      commit: 0,
      ver: 0,
      createdAt: nowUnix,
      updatedAt: nowUnix
    }).then(newApp => {
      client.replyMessage(event.replyToken, {
        'type': 'template',
        'altText': 'New your app🎉',
        'template': {
          'type': 'buttons',
          'thumbnailImageUrl': 'https://pbs.twimg.com/media/DtV-c2NUcAA06Ok.png',
          'imageAspectRatio': 'rectangle',
          'imageSize': 'cover',
          'imageBackgroundColor': '#FFFFFF',
          'title': 'New your app🎉',
          'text': `AppID:${newApp.id} ${count+1}/${appsMax}`,
          'defaultAction': defaultAction,
          'actions': [{
            'type': 'uri',
            'label': '🔧 Open this',
            'uri': `line://app/1566540742-QMn83gRP?mode=dev&app=${newApp.id}`
          }]
        }
      }).then(Users.reply(user.line));
    });
  });
})});
LineMsg.hears(/^!(html|css|js|deploy),[0-9]+,:.+/, ['all'], event => {
  const cmdArr = event.message.text.split(',');
  const cmdType = cmdArr[0];
  const appId = parseFloat(cmdArr[1]);
  const appSrc = event.message.text.split(':')[1];
  Apps.table.findById(appId).then(app => {
    if (!app) return false;
    Users.findOrAddByLineId(event.source.userId, (err, user) => {
      if (err) return false;
      if (user.id !== app.users_id) return false;
    });
  });
});
LineMsg.hears(/メニュー|menu|start|すたーと|スタート|はじめる|始める|ハジメル/i, ['all'], event => { Users.findOrAddByLineId(event.source.userId, (err, user) => { if (err) return false;
  client.replyMessage(event.replyToken, {
    'type': 'template',
    'altText': 'Menu',
    'template': {
      'type': 'buttons',
      'thumbnailImageUrl': 'https://pbs.twimg.com/media/DtV-c2NUcAA06Ok.png',
      'imageAspectRatio': 'rectangle',
      'imageSize': 'cover',
      'imageBackgroundColor': '#FFFFFF',
      'title': 'Menu',
      'text': 'はじめての方は【Tutorial】を選択してみて下さい🙇 ※通知が多いときはOFF設定推奨',
      'defaultAction': defaultAction,
      'actions': [
        {
          'type': 'uri',
          'label': '🎓 Tutorial',
          'uri': `line://app/1566540742-QMn83gRP?mode=tutorial&app=${user.tutorial}`
        },
        {
          'type': 'message',
          'label': '🔧 New App',
          'text': '!init'
        },
        {
          'type': 'uri',
          'label': '📔 Open App',
          'uri': 'line://app/1566540742-QMn83gRP?mode=open'
        }
      ]
    }
  }).then(Users.reply(user.line));
})});
const helloMsg = (event, name, lineId) => {
  client.replyMessage(event.replyToken, {
    'type': 'template',
    'altText': 'Menu',
    'template': {
      'type': 'buttons',
      'text': `${name ? `${name}さん` : ''}はじめまして！\n\n【みんなでWebアプリ】でプログラミング入門やLINE-LIFFアプリ開発を今直ぐはじめられます💪\n\n&作ったアプリをシェア🎮`,
      'defaultAction': defaultAction,
      'actions': [
        {
          'type': 'message',
          'label': '🚀 Start',
          'text': 'start'
        }
      ]
    }
  }).then(() => {
    if(lineId) Users.reply(lineId);
  });
};
const handleEvent = event => LineMsg.ear(event, event => {
  console.log(event);
  if (event.type === 'follow' || event.type === 'join' || event.type === 'memberJoined') if (event.type === 'follow' || event.type === 'memberJoined') {
    Users.findOrAddByLineId(event.source.userId, (err, user) => {
      if (err) { helloMsg(event); return true; }
      helloMsg(event, user.name, user.line);
    });
  }else{ helloMsg(event); }
});
app.use(helmet());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(Express.static(path.join(__dirname, 'public')));
app.use('/api', api);
app.use('/', index);
app.post('/callback', Line.middleware(config), (req, res, next) => {
  Promise.all(req.body.events.map(handleEvent)).then(result => res.json(result)).catch(err => {
    Consola.error(err);
    res.status(500).end();
  });
});
app.use((err, req, res, next) => res.status(500).render('error', { code: 500 }));
app.listen(port, () => console.log(`listening on port ${port}!`));
app.use((req, res, next) => res.status(404).render('error', { code: 404 }));
