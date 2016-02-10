// Filename: cycvideo_bttnminimize.js  
// Timestamp: 2016.02.10-14:03:42 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var cycledom = require('@cycle/dom');

var cycvideo_bttnminimize = module.exports = (function (o) {

  o.view = function (state$) {
    var label = cycledom.label,
        span = cycledom.span;
    
    return state$.map(
      vals =>
        label('.cycvideo_bttnminimize', [
          span('.cycvideo_bttnminimize_tl'),
          span('.cycvideo_bttnminimize_tr'),
          span('.cycvideo_bttnminimize_br'),
          span('.cycvideo_bttnminimize_bl')
        ]));
  };

  o.streams = function (DOM, opts) {
    return {
      click : DOM.select('.cycvideo_bttnminimize').events('click')
    };
  };

  return o;

}({}));
