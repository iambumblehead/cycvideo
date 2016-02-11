// Filename: cycvideo_bttngroup.js  
// Timestamp: 2016.02.10-15:11:31 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var Rx = require('rx-dom');
var cycvideo_bttnmaximize = require('./cycvideo_bttnmaximize');
var cycvideo_bttnminimize = require('./cycvideo_bttnminimize');
var cycledom = require('@cycle/dom');

var cycvideo_bttngroupminmax = module.exports = (function (o) {

  o.view = function (state$, minmaxstate) {
    var div = cycledom.div;
    
    return state$.map(
      (vals) => {
        return div('.cycvideo_bttngroupminmax.cycvideo_bttngroupminmax-'+minmaxstate+'#uidcycvideo_bttngroup', [
          cycvideo_bttnmaximize.view(state$),
          cycvideo_bttnminimize.view(state$)
        ]);
      }
    );
  };

  o.streams = function (DOM, opts) {
    return Rx.Observable.merge(
      cycvideo_bttnmaximize.streams(DOM, opts).click.map(ev => 'maximized'),
      cycvideo_bttnminimize.streams(DOM, opts).click.map(ev => 'minimized')    
    );
  };

  return o;
  
}({}));
