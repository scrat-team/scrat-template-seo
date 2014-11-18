'use strict';

var express = require('express'),
    router = express.Router();

router.get('/', function (req, res, next) {
  req.url = router.options.index || '/index';
  next();
});

router.get('/api', function(req, res){
  res.json({title:123});
});

router.get('/favicon.ico', function(req, res){
  res.sendStatus(404);
})

router.get('/:page', function (req, res) {
  var page = req.params.page;
  if(!/\.tpl$/i.test(page)){
    page += '.tpl';
  }
  // TODO get data from napi
  var data = {
    title: 'SEO'
  };
  if(req.query.pagelets){
    res.setHeader('Content-Type', 'application/json');
    data.pagelets = req.query.pagelets;
  }
  res.render(page, data);
});

module.exports = function (options) {
  router.options = options || {};
  return router;
};