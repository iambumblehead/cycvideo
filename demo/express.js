// Filename: index.js  
// Timestamp: 2016.02.10-18:29:51 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>


var express = require('express'),
    morgan = require('morgan'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    serveIndex = require('serve-index'),
    compression = require('compression'),
    cookieParser = require('cookie-parser'),
    errorhandler = require('errorhandler'),
    methodOverride = require('method-override'),
    scroungejs = require('scroungejs'),
    http = require('http'),
    app;

var fs = require('fs');
var cyclecore = require('@cycle/core');
var cycledom = require('@cycle/dom');

scroungejs.build({
  inputpath      : './src/',
  outputpath     : './www/',
  publicpath     : './www',    
  iscompressed   : false,
  isconcatenated : true,
  basepage       : './demo/index.html',  
  treearr        : [
    'cycvideo.js',
    'cycvideo.css'
  ]
}, function (err, res) {
  if (err) throw new Error(err);

  console.log('build done?', err, res);

// Error.stackTraceLimit = Infinity;
const log = console.log,
      app    = express(),
      mvisrc = require.resolve('../src/cycvideo'),
      DOM    = cycledom.makeHTMLDriver(),
      main   = ({ DOM }) => ({ DOM: mvi(DOM) });

var mvi = require(mvisrc);

  app.engine('html', function (fpath, data, fn) {
    console.log('engine path');
    
    cyclecore.run(main, { DOM }).sources.DOM.forEach(ssr => {
      fs.readFile('./demo/index.html', 'utf-8', function (err, content) {
        res.end(content.replace(/__ssr__/, ssr));
      });    
    }, fn);
  });

  app.use(methodOverride());
  app.use(compression());

  app.use('/www', express.static(__dirname + '/../www/'));  

  app.use('/', express.static(__dirname + '/'));
  //app.use('/', serveIndex(__dirname + '/'));

  // express' template path, path to index.html
  //app.set('views', __dirname + '/');
  //app.set('view engine', 'html');
  //app.set('view options', {
  //  layout : false
  //});

  app.use(errorhandler({
    dumpExceptions : true, 
    showStack : true
  }));  
  
app.listen(port, 'localhost', err => {
  if (err) return console.err(err);

  log(`listening on http://localhost:${ port }`);
});


});
