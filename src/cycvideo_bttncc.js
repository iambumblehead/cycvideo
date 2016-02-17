// Filename: cycvideo_bttncc.js  
// Timestamp: 2016.02.17-11:56:56 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

var cycledom = require('@cycle/dom');

var cycvideo_bttnminimize = module.exports = (function (o) {

  o.view = function (state$) {
    var div = cycledom.div;
    
    return div('.cycvideo_bttncc', [], 'CC');
  };

  o.streams = function (DOM, opts) {
    return {
      click : DOM.select('.cycvideo_bttncc').events('click')
    };
  };

  return o;

}({}));
