// Filename: index.js  
// Timestamp: 2016.02.17-10:57:38 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var fs = require('fs'),
    express = require('express'),
    morgan = require('morgan'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    serveIndex = require('serve-index'),
    compression = require('compression'),
    cookieParser = require('cookie-parser'),
    errorhandler = require('errorhandler'),
    methodOverride = require('method-override'),
    scroungejs = require('scroungejs'),
    cyclecore = require('@cycle/core'),
    cycledom = require('@cycle/dom'),
    http   = require('http'),
    port   = 3000,
    app    = express(),    
    mvisrc = require.resolve('../src/cycvideo_mvi'),
    mvi    = require(mvisrc),
    DOM    = cycledom.makeHTMLDriver(),
    main   = (sources) => ({
      DOM: mvi.DOM(sources),
      HTTP: mvi.HTTP(sources)        
    });

scroungejs.build({
  inputpath      : './src/',
  outputpath     : './www/',
  publicpath     : './www',    
  iscompressed   : false,
  isconcatenated : true,
  basepage       : './demo/index.html',
  globalarr  : [{
    filepath : 'rx/dist/rx.all.js',
    name     : 'Rx'
  }],
  treearr        : [
    'cycvideo.js',
    'cycvideo.css'
  ]
}, function (err, res) {
  if (err) throw new Error(err);

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.get('/', function (req, res, fn) {
    cyclecore.run(main, { DOM }).sources.DOM.forEach(ssr => {
      fs.readFile('./demo/index.html', 'utf-8', function (err, content) {
        res.end(content.replace(/__ssr__/, ssr));
      });    
    }, fn);
  });

  app.use('/www', express.static(__dirname + '/../www'));  
  app.use(errorhandler({
    dumpExceptions : true, 
    showStack : true
  }));  
  
  app.listen(port, 'localhost', err => {
    if (err) console.err(err);
    else console.log(`listening on http://localhost:${ port }`);
  });
});
