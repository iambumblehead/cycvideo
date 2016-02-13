// Filename: cycvideo_slategroup.js  
// Timestamp: 2016.02.11-18:09:07 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var Rx = require('rx-dom');
var cycvideo_slatepause = require('./cycvideo_slatepause');
var cycvideo_slateplay = require('./cycvideo_slateplay');
var cycvideo_slateload = require('./cycvideo_slateload');
var cycledom = require('@cycle/dom');

var cycvideo_stategroup = module.exports = (function (o) {

  o.view = function (opts, playstate, progress) {
    var div = cycledom.div;
    
    return div('.cycvideo_slategroup.cycvideo_slategroup-'+playstate+'#uidcycvideo_slategroup', [
      cycvideo_slateload.view(progress),
      cycvideo_slateplay.view(),        
      cycvideo_slatepause.view()
    ]);
  };

  o.streams = function (DOM, opts) {
    return Rx.Observable.merge(
      cycvideo_slateplay.streams(DOM, opts).click.map(ev => 'play'),    
      cycvideo_slatepause.streams(DOM, opts).click.map(ev => 'pause')
    );
  };
  
  return o;

}({}));
