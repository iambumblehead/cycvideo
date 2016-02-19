// Filename: cycvideo.js  
// Timestamp: 2016.02.19-12:19:39 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var cyclecore = require('@cycle/core'),
    cyclehttp = require('@cycle/http'),
    cycledom = require('@cycle/dom'),
    cycvideo_mvi = require('./cycvideo_mvi');

cyclecore.run((sources) => ({
  DOM  : cycvideo_mvi.DOM(sources),
  HTTP : cycvideo_mvi.HTTP(sources)    
}), {
  // drivers
  DOM  : cycledom.makeDOMDriver('#root'),
  HTTP : cyclehttp.makeHTTPDriver()
});
