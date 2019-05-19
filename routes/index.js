'use strict';
const Express = require('express');
const router = Express.Router();
router.get('/', (req, res, next) => {
  if ('mode' in req.query) {
    if (req.query.mode === 'dev' && 'app' in req.query) {
      res.render('dev');
    }else if(req.query.mode === 'tutorial' && 'app' in req.query){
      res.render('tutorial');
    }else if(req.query.mode === 'open'){
      res.render('open');
    }else{
      res.render('index');
    }
  }else{
    res.render('index');
  }
});
module.exports = router;
