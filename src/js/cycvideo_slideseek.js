// Filename: cycvideo_slideseek.js  
// Timestamp: 2016.02.09-00:53:30 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

import {label, span, progress, input, h} from '@cycle/dom';

function view(state$, buffer, loadprogress) {
  return state$.map(
    vals =>
      label('.cycvideo_slideseek#uidcycvideo_slideseek', [
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
      ])
  );
}

function streams (DOM, opts) {
  return {
    focus$  : DOM.select('#uidcycvideo_slideseek_input').events('focus'),
    change$ : DOM.select('#uidcycvideo_slideseek_input').events('change')
  };
}

export default {
  view : view,
  streams : streams
};
