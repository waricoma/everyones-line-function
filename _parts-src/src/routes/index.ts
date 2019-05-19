import * as Express from 'express';
// import * as Consola from 'consola';

const router = Express.Router();

router.get('/', (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  res.send('aa');
});

export default router;
