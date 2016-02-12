// Filename: cycvideo_bttnpause.js  
// Timestamp: 2016.02.11-17:21:38 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>
//
// not really a button.

var cycledom = require('@cycle/dom');
var rx = require('rx-dom');

var cycvideo_bttnload = module.exports = (function (o) {

  o.view = function (state$) {
    var label = cycledom.label,
        span = cycledom.span;
    
    return label('.cycvideo_bttnload', [
      span('.cycvideo_bttnload-primary')
    ]);
  };

  o.streams = function (DOM, opts) {
    return {
      click : DOM.select('.cycvideo_bttnload').events('click')
    };
  };

  return o;

}({}));
