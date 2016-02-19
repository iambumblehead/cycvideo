// Filename: cycvideo.js  
// Timestamp: 2016.02.17-13:23:30 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var cyclecore = require('@cycle/core'),
    cyclehttp = require('@cycle/http'),
    cycledom = require('@cycle/dom'),
    cycvideo_mvi = require('./cycvideo_mvi');

// main should be modifed to use configurations from server
// or client which provide access to http or filesystem accordingly...
cyclecore.run(function main (sources) {
  // http://cycle.js.org/drivers.html
  return {
    DOM: cycvideo_mvi.DOM(sources),
    HTTP: cycvideo_mvi.HTTP(sources)    
  };  
}, {
  DOM: cycledom.makeDOMDriver('#root'),
  //DOM: cycledom.makeHTMLDriver('#root'),
  HTTP: cyclehttp.makeHTTPDriver()
});
