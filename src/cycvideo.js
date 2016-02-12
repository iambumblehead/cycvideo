// Filename: cycvideo.js  
// Timestamp: 2016.02.11-17:18:59 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var cyclecore = require('@cycle/core'),
    cycledom = require('@cycle/dom'),
    cycvideo_mvi = require('./cycvideo_mvi');

cyclecore.run(obj => {
  return {DOM: cycvideo_mvi(obj.DOM).skip(1)};
  /*
  var dom$ = cycvideo_mvi(obj.DOM).map(function (e) {
    console.log('dom$ udpated ', e);
    
    return e;
  });
        
  return {DOM: dom$ };
   */
}, {
  DOM: cycledom.makeDOMDriver('#root')
});




