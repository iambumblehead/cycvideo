// Filename: index.js  
// Timestamp: 2016.02.10-15:40:05 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

import fs from 'fs';
import express from 'express';
import { run } from '@cycle/core';
import { makeHTMLDriver } from '@cycle/dom';

// Error.stackTraceLimit = Infinity;
const log = console.log,
      production = process.env.NODE_ENV === 'production',
      port       = process.env.PORT || 3000,
      app    = express(),
      router = express.Router(),
      mvisrc = require.resolve('../src/js/cycvideo'),
      DOM    = makeHTMLDriver(),
      main   = ({ DOM }) => ({ DOM: mvi(DOM) });

var mvi = require(mvisrc);

if (production) {
  log('[pro]');
  app.use(require('compression')());
} else {
  log('[dev]');
  // use dev compilation and hot reloading
  const config = require('./dev.babel').default,
	compiler = require('webpack')(config),
	dev = require('webpack-dev-middleware'),
	hot = require('webpack-hot-middleware');

  app.use(dev(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  })).use(hot(compiler));

  // register mvi file with hot rebuilder
  require('./hot').default({
    [mvisrc]: next => { mvi = next; }
  });
}

router.get('/', (req, res, next) => {
  run(main, { DOM }).sources.DOM.forEach(ssr => {
    fs.readFile('./src/html/index.html', 'utf-8', function (err, content) {
      res.end(content.replace(/__ssr__/, ssr));
    });    
  }, next);
});

app.use(router).use(express.static('./public'));

app.listen(port, 'localhost', err => {
  if (err) return console.err(err);

  log(`listening on http://localhost:${ port }`);
});
