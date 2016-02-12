// Filename: cycvideo_slideseek.js  
// Timestamp: 2016.02.11-17:25:58 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var cycledom = require('@cycle/dom');

var cycvideo_slideseek = module.exports = (function (o) {

  o.view = function (state$, buffer, loadprogress) {
    var label = cycledom.label,
        input = cycledom.input,
        span = cycledom.span,
        h = cycledom.h;
    
    return label('.cycvideo_slideseek#uidcycvideo_slideseek', [
      span('.cycvideo_slideseek_label_primary'), 
      h('progress.cycvideo_slideseek_progress#uidcycvideo_slideseek_progress', {
        value : loadprogress, // progress of video load
        min   : 0,
        max   : 100
      }),
      h('progress.cycvideo_slideseek_progress.position', {
        value : buffer.seek_percent * 100, // progress of video load
        min   : 0,
        max   : 100
      }),
      input('.cycvideo_slideseek_input#uidcycvideo_slideseek_input', { 
        type  : 'range',         
        value : buffer.seek_percent * 100, // position of video
        min   : 0,
        max   : 100
      })
    ]);
  };

  o.streams = function (DOM, opts) {
    return {
      focus$  : DOM.select('#uidcycvideo_slideseek_input').events('focus'),
      change$ : DOM.select('#uidcycvideo_slideseek_input').events('change')
    };
  };

  return o;

}({}));
