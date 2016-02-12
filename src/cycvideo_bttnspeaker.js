// Filename: cycvideo_bttntheater.js  
// Timestamp: 2016.02.11-17:22:36 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

var cycledom = require('@cycle/dom');

var cycvideo_bttnspeaker = module.exports = (function (o) {

  o.view = function (state$) {
    var div = cycledom.div;
    
    return div('.cycvideo_bttnspeaker', [
      div('.cycvideo_bttnspeaker_icon')
    ]);
  };

  o.streams = function (DOM, opts) {
    return {
      click : DOM.select('.cycvideo_bttnspeaker').events('click')
    };
  };

  return o;

}({}));
