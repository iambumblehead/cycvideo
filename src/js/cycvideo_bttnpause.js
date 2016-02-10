// Filename: cycvideo_bttnpause.js  
// Timestamp: 2016.02.10-15:16:29 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var cycledom = require('@cycle/dom');

var cycvideo_bttnpaus = module.exports = (function (o) {

  o.view = function (state$) {
    var label = cycledom.label,
        span = cycledom.span;
    
    return state$.map(
      vals =>
        label('.cycvideo_bttnpause', [
          span('.cycvideo_bttnpause-primary')
        ]));
  };

  o.streams = function (DOM, opts) {
    return {
      click : DOM.select('.cycvideo_bttnpause').events('click')
    };
  };

  return o;

}({}));
