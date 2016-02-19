// Filename: cycvideo_bttngroup.js  
// Timestamp: 2016.02.19-11:51:07 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var rx = require('rx-dom');
var cycledom = require('@cycle/dom');

var cycvideo_bttngroup = module.exports = (function (o) {
  
  o.view = function (state$, playstate) {
    var div = cycledom.div,
        span = cycledom.span,
        label = cycledom.label;
    
    return div('.cycvideo_bttngroup.cycvideo_bttngroup-'+playstate+'#uidcycvideo_bttnplay', [
      label('.cycvideo_bttnplay#uidcycvideo_bttnplay', [
        span('.cycvideo_bttnplay-primary')
      ]),
      label('.cycvideo_bttnpause', [
        span('.cycvideo_bttnpause-primary')
      ]),
      label('.cycvideo_bttnload', [
        span('.cycvideo_bttnload-primary')
      ])
    ]);
  };

  o.streams = function (DOM, opts) {
    return rx.Observable.merge(
      DOM.select('.cycvideo_bttnpause').events('click').map(e => 'pause'),      
      DOM.select('.cycvideo_bttnplay').events('click').map(e => 'play'),
      DOM.select('.cycvideo_bttnload').events('click').map(e => 'load')
    );
  };

  return o;

}({}));
