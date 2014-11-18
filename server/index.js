'use strict';

var meta = require('../package.json'),
  express = require('express'),
  compress = require('compression'),
  engine = require('scrat-swig'),
  path = require('path'),
  app = module.exports = express(),
  middleware = ['combo', 'router', 'proxy', 'static', 'error'],
  root = path.resolve(__dirname, '../').replace(/\/+$/, '');

// lazy load middlewares
middleware.forEach(function (m) {
  middleware.__defineGetter__(m, function () {
    return require('./' + m);
  });
});

process.on('uncaughtException', function (err) {
  (app.get('logger') || console).error('Uncaught exception:\n', err.stack);
});

engine.setDefaults({
  locals: {
    _map: root + '/config/map.json'
  },
  // TODO use env
  cache: false
});

engine.Resource.prototype.comboURI = function(uri){
  return uri.replace(/^\/public\//g, '');
};

app.engine('tpl', engine.renderFile);
app.set('view engine', 'tpl');
app.set('views', root + '/views');

app.set('name', meta.name);
app.set('version', meta.version);
app.set('port', process.env.PORT || 5000);
app.set('root', root);
app.set('logger', console);

app.enable('trust proxy');

app.use(compress());
app.use('/co', middleware.combo('/public'));
app.use(middleware.router());
// app.use('/api/*', middleware.proxy('http://cors-api-host'));
app.use('/public', middleware.static());
app.use(middleware.error());

if (require.main === module) {
  app.listen(app.get('port'), function () {
    console.log('[%s] Express server listening on port %d',
      app.get('env').toUpperCase(), app.get('port'));
  });
}