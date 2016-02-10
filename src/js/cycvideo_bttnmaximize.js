// Filename: cycvideo_bttnmaximize.js  
// Timestamp: 2016.02.10-14:01:26 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var cycledom = require('@cycle/dom');

var cycvideo_bttnmaximize = module.exports = (function (o) {
  
  o.view = function (state$) {
    var label = cycledom.label,
        span = cycledom.span;
    
    return state$.map(
      vals =>
        label('.cycvideo_bttnmaximize', [
          span('.cycvideo_bttnmaximize_tl'),
          span('.cycvideo_bttnmaximize_tr'),
          span('.cycvideo_bttnmaximize_br'),
          span('.cycvideo_bttnmaximize_bl')
        ]));
  };

  o.streams = function (DOM, opts) {
    return {
      click : DOM.select('.cycvideo_bttnmaximize').events('click')
    };
  };

  return o;

}({}));
