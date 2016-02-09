// Filename: cycvideo_labelindicator.js  
// Timestamp: 2016.02.09-02:57:25 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  


import {label, span} from '@cycle/dom';
import cycvideo_time from './cycvideo_time';

function view(state$, buffer) {

  const format = cycvideo_time.get_best_format(buffer.timess_duration),
        fulltime = cycvideo_time.format(buffer.timess_duration, format),
        seektime = cycvideo_time.format(buffer.timess_current, format);

  //console.log('format is ', format);
  return state$.map(
    vals =>
      label('.cycvideo_labelindicator', [
        span('.cycvideo_labelindicator_seektime', seektime),
        span('.cycvideo_labelindicator_fulltime', fulltime)
      ])
  );
}

export default {
  view : view
};
