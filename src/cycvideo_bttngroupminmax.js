// Filename: cycvideo_bttngroup.js  
// Timestamp: 2016.02.19-11:40:02 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var Rx = require('rx-dom');
var cycledom = require('@cycle/dom');

// change to maximized...
var cycvideo_bttngroupminmax = module.exports = (function (o) {

  o.view = function (state$, ismaximized) {
    var div = cycledom.div,
        span = cycledom.span,
        label = cycledom.label;        
    
    return div('.cycvideo_bttngroupminmax.cycvideo_bttnismaximized-'+ismaximized+'#uidcycvideo_bttngroup', [
      label('.cycvideo_bttnmaximize', [
        span('.cycvideo_bttnmaximize_tl'),
        span('.cycvideo_bttnmaximize_tr'),
        span('.cycvideo_bttnmaximize_br'),
        span('.cycvideo_bttnmaximize_bl')
      ]),
      label('.cycvideo_bttnminimize', [
        span('.cycvideo_bttnminimize_tl'),
        span('.cycvideo_bttnminimize_tr'),
        span('.cycvideo_bttnminimize_br'),
        span('.cycvideo_bttnminimize_bl')
      ]),
    ]);
  };

  o.streams = function (DOM, opts) {
    return Rx.Observable.merge(
      DOM.select('.cycvideo_bttnmaximize').events('click').map(e => true),
      DOM.select('.cycvideo_bttnminimize').events('click').map(e => false)
    );
  };

  return o;
  
}({}));
