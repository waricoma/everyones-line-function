'use strict';
const Express = require('express');
const router = Express.Router();
router.get('/test', (req, res, next) => {
  res.send(req.query.test);
});
module.exports = router;
