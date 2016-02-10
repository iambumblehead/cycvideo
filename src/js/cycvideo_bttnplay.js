// Filename: cycvideo_bttnplay.js  
// Timestamp: 2016.02.10-15:16:01 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

var cycledom = require('@cycle/dom');

var cycvideo_bttnplay = module.exports = (function (o) {

  o.view = function (state$) {
    var label = cycledom.label,
        span = cycledom.span;
    
    return state$.map(
      vals =>
        label('.cycvideo_bttnplay#uidcycvideo_bttnplay', [
          span('.cycvideo_bttnplay-primary')
        ]));
  };

  o.streams = function (DOM, opts) {
    return {
      click : DOM.select('.cycvideo_bttnplay').events('click')
    };
  };
  
  return o;
  
}({}));
