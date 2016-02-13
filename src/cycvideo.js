// Filename: cycvideo.js  
// Timestamp: 2016.02.12-14:55:35 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var cyclecore = require('@cycle/core'),
    cyclehttp = require('@cycle/http'),
    cycledom = require('@cycle/dom'),
    cycvideo_mvi = require('./cycvideo_mvi');

cyclecore.run(obj => {
  return {
    DOM: cycvideo_mvi(obj.DOM).skip(1)
  };
  /*
  var dom$ = cycvideo_mvi(obj.DOM).map(function (e) {
    console.log('dom$ udpated ', e);
    
    return e;
  });
        
  return {DOM: dom$ };
   */
}, {
  HTTP: cyclehttp.makeHTTPDriver(),
  DOM: cycledom.makeDOMDriver('#root')
});




