// Filename: cycvideo_bttntheater.js  
// Timestamp: 2016.02.19-10:56:58 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

var cycledom = require('@cycle/dom');

var cycvideo_bttntheater = module.exports = (function (o) {

  o.view = function (state$) {
    var div = cycledom.div;
    
    return div('.cycvideo_bttntheater', [
      div('.cycvideo_bttntheater_tl'),
      div('.cycvideo_bttntheater_tr'),
      div('.cycvideo_bttntheater_br'),
      div('.cycvideo_bttntheater_bl')
    ]);
  };

  o.streams = function (DOM, opts) {
    return DOM.select('.cycvideo_bttntheater').events('click').map(e => true);
      //.events('change').pluck('target', 'value');
  };
  
  return o;

}({}));
