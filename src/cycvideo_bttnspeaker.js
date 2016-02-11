// Filename: cycvideo_bttntheater.js  
// Timestamp: 2016.02.10-14:10:41 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

var cycledom = require('@cycle/dom');

var cycvideo_bttnspeaker = module.exports = (function (o) {

  o.view = function (state$) {
    var div = cycledom.div;
    
    return state$.map(
      vals =>
        div('.cycvideo_bttnspeaker', [
          div('.cycvideo_bttnspeaker_icon')
        ]));
  };

  o.streams = function (DOM, opts) {
    return {
      click : DOM.select('.cycvideo_bttnspeaker').events('click')
    };
  };

  return o;

}({}));
