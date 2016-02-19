// Filename: cycvideo_bttnvr.js  
// Timestamp: 2016.02.19-11:07:40 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

var cycledom = require('@cycle/dom');

var cycvideo_bttnvr = module.exports = (function (o) {

  o.view = function (state$) {
    var div = cycledom.div;
    
    return div('.cycvideo_bttnvr', [
      div('.g-top'),
      div('.g-left.glass'),
      div('.g-right.glass'),
      div('.cycvideo_bttnvr_bridge')      
    ]);
  };

  o.streams = function (DOM, opts) {
    return DOM.select('.cycvideo_bttnvr').events('click').map(e => true);
  };

  return o;

}({}));
