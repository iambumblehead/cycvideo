// Filename: cycvideo.js  
// Timestamp: 2016.02.11-15:09:09 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var cyclecore = require('@cycle/core'),
    cycledom = require('@cycle/dom'),
    cycvideo_mvi = require('./cycvideo_mvi');

cyclecore.run(obj => {
  return {DOM: cycvideo_mvi(obj.DOM).skip(1)};
}, {
  DOM: cycledom.makeDOMDriver('#root')
});




