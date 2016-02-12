// Filename: cycvideo_slatepause.js  
// Timestamp: 2016.02.11-17:25:15 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var Rx = require('rx-dom');
var cycledom = require('@cycle/dom');

var cycvideo_bttnpause = module.exports = (function (o) {

  o.view = function (state$) {
    var div = cycledom.div;
    
    return div('.cycvideo_slatepause');
  };

  o.streams = function (DOM, opts) {
    return {
      click : DOM.select('.cycvideo_slatepause').events('click')
    };
  };

  return o;
  
}({}));
