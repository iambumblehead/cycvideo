// Filename: cycvideo_slateplay.js  
// Timestamp: 2016.02.11-17:25:35 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  


var cycledom = require('@cycle/dom');

var cycvideo_slateplay = module.exports = (function (o) {

  o.view = function (state$) {
    var div = cycledom.div;
    
    return div('.cycvideo_slateplay', [
      div('.pgplaycircle', [
        div('.video-layer-load-playiconbg'),
        div('.video-layer-load-playicon')
      ])
    ]);
  };

  o.streams = function (DOM, opts) {
    return {
      click : DOM.select('.cycvideo_slateplay').events('click')
    };
  };

  return o;

}({}));
