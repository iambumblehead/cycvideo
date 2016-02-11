// Filename: cycvideo_labelindicator.js  
// Timestamp: 2016.02.10-14:36:21 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  


var cycledom = require('@cycle/dom');
var cycvideo_time = require('./cycvideo_time');

var cycvideo_labelindicator = module.exports = (function (o) {

  o.view = function (state$, buffer) {
    const format = cycvideo_time.get_best_format(buffer.timess_duration),
          fulltime = cycvideo_time.format(buffer.timess_duration, format),
          seektime = cycvideo_time.format(buffer.timess_current, format),
          label = cycledom.label,
          span = cycledom.span;

    //console.log('format is ', format);
    return state$.map(
      vals =>
        label('.cycvideo_labelindicator', [
          span('.cycvideo_labelindicator_seektime', seektime),
          span('.cycvideo_labelindicator_fulltime', fulltime)
        ])
    );
  }

  return o;

}({}));
