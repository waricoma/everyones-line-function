import * as path from 'path';
import * as Express from 'express';
import * as Line from '@line/bot-sdk';
import * as Dotenv from 'dotenv';
import * as Consola from 'consola';
import * as Users from './modules/users';
import * as LineMsg from './modules/line-msg';
import index from './routes/index';
import * as helmet from 'helmet';

Dotenv.config();
const port:number = parseFloat(process.env.PORT || '3000');

console.log(Users);

const config = {
  channelAccessToken: (process.env.channelAccessToken || ''),
  channelSecret: (process.env.channelSecret || ''),
  channelId: (process.env.channelId || ''),
};

const app = Express();

const client = new Line.Client(config);

LineMsg.hears(/start|すたーと|スタート|はじめる|始める|ハジメル/i, ['all'], (event:MessageEvent, eventAny:any) => {
  client.replyMessage(eventAny.replyToken, {
    type: 'text',
    text: 'にゃーん',
  });
});

const handleEvent = (event: MessageEvent) => LineMsg.ear(event, (event) => {});

app.use(helmet());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(Express.static(path.join(__dirname, '..', 'public')));

app.use('/', index);

app.use((req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  res.render('error', { code: 404 });
});

app.use(
  (err: Express.Errback,
   req: Express.Request,
   res: Express.Response,
   next: Express.NextFunction) => {
    res.status(500);
    res.render('error', { code: 500 });
  },
);

app.post(
  '/callback',
  Line.middleware(config),
  (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    Promise.all(req.body.events.map(handleEvent)).then(result => res.json(result)).catch((err) => {
      Consola.error(err);
      res.status(500).end();
    });
  },
);

app.listen(port, () => console.log(`listening on port ${port}!`));
