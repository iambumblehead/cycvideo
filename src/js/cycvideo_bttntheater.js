// Filename: cycvideo_bttntheater.js  
// Timestamp: 2016.02.10-14:12:01 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

var cycledom = require('@cycle/dom');

var cycvideo_bttntheater = module.exports = (function (o) {

  o.view = function (state$) {
    var div = cycledom.div;
    
    return state$.map(
      vals =>
        div('.cycvideo_bttntheater', [
          div('.cycvideo_bttntheater_tl'),
          div('.cycvideo_bttntheater_tr'),
          div('.cycvideo_bttntheater_br'),
          div('.cycvideo_bttntheater_bl')
        ]));
  };

  o.streams = function (DOM, opts) {
    return {
      click : DOM.select('.cycvideo_bttntheater').events('click')
    };
  };
  
  return o;

}({}));
