// Filename: cycvideo_slateplay.js  
// Timestamp: 2016.02.10-15:15:16 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  


var Rx = require('rx-dom');
var cycledom = require('@cycle/dom');

var cycvideo_slateplay = module.exports = (function (o) {

  o.view = function (state$) {
    var div = cycledom.div;
    
    return state$.map(
      vals =>
        div('.cycvideo_slateplay', [
          // use whole number
          // Math.floor(per * 100)
          div('.pgplaycircle', [
            div('.video-layer-load-playiconbg'),
            div('.video-layer-load-playicon')
          ])
        ]));
  };

  o.streams = function (DOM, opts) {
    return {
      click : DOM.select('.cycvideo_slateplay').events('click')
    };
  };

  return o;

}({}));
