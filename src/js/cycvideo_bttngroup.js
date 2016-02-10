// Filename: cycvideo_bttngroup.js  
// Timestamp: 2016.02.10-13:55:27 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var rx = require('rx-dom');
var cycvideo_bttnplay = require('./cycvideo_bttnplay');
var cycvideo_bttnpause = require('./cycvideo_bttnpause');
var cycvideo_bttnload = require('./cycvideo_bttnload');
var cycledom = require('@cycle/dom');

// is there a way to make stylesheets work?

var cycvideo_bttngroup = module.exports = (function (o) {
  
  o.view = function (state$, playstate) {
    var div = cycledom.div;
    
    return state$.map(
      (vals) => {
        return div('.cycvideo_bttngroup.cycvideo_bttngroup-'+playstate+'#uidcycvideo_bttnplay', [
          cycvideo_bttnplay.view(state$),
          cycvideo_bttnpause.view(state$),
          cycvideo_bttnload.view(state$)
        ]);
      }
    );
  };

  o.streams = function (DOM, opts) {
    return rx.Observable.merge(
      cycvideo_bttnplay.streams(DOM, opts).click.map(ev => 'play'),
      cycvideo_bttnpause.streams(DOM, opts).click.map(ev => 'pause'),
      cycvideo_bttnload.streams(DOM, opts).click.map(ev => 'load')
    );
  };

  return o;

}({}));
