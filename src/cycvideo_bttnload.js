// Filename: cycvideo_bttnpause.js  
// Timestamp: 2016.02.10-13:59:45 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>
//
// not really a button.

var cycledom = require('@cycle/dom');
var rx = require('rx-dom');

var cycvideo_bttnload = module.exports = (function (o) {

  o.view = function (state$) {
    var label = cycledom.label,
        span = cycledom.span;
    
    return state$.map(
      vals =>
        label('.cycvideo_bttnload', [
          span('.cycvideo_bttnload-primary')
        ]));
  };

  o.streams = function (DOM, opts) {
    return {
      click : DOM.select('.cycvideo_bttnload').events('click')
    };
  };

  return o;

}({}));
