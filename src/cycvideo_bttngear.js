// Filename: cycvideo_bttngear.js  
// Timestamp: 2016.02.10-13:57:02 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

var cycledom = require('@cycle/dom'),
    rx = require('rx-dom');    

var cycvideo_bttngear = module.exports = (function (o) {
  
  o.view = function (state$) {
    var label = cycledom.label,
        span = cycledom.span;
    
    return state$.map(
      vals =>
        label('.cycvideo_bttngear', [
          span('.cycvideo_bttngear-primary')
        ]));
  };

  o.streams = function (DOM, opts) {
    return {
      click : DOM.select('.cycvideo_bttngear').events('click')
    };
  };

  return o;

}({}));
